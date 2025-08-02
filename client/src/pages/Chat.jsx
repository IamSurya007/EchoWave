import {SocketContext} from "@/context/SocketProvider"
import {useContext, useEffect, useState} from "react"
import axios from "@/utils/api.js";
import {useParams} from "react-router-dom";
import Layout from "@/Components/Layout";
import {Input} from "@material-tailwind/react";
import {IoSendOutline} from "react-icons/io5";


const Chat = () => {
    const [currentUser, setCurrentUser] = useState('');
    const [selectedUser, setSelectedUser] = useState('')
    const socket = useContext(SocketContext);
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const {username} = useParams();

    const sendMessage = () => {
        if (!input.trim()) return;

        socket.emit('chat_message', {
            to: selectedUser._id,
            message: input
        });

        setMessages(prev => [...prev, {from: currentUser._id, message: input, to: selectedUser._id}]);
        setInput('');
    };


    useEffect(() => {

        setCurrentUser(localStorage.getItem('user'))

        const fetchMessages = async () => {
            try {
                const res = await axios.get(
                    `/messages/useraccount/${username}`,
                    {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem("token")}`,
                        },
                    }
                )
                if (res.data.messages?.length) {
                    setMessages(res.data.messages);
                }
            } catch (err) {
                console.log(err);
            }

        }

        const fetchUser = async () => {
            try {
                const res = await axios.post(
                    `/user/userId/${username}`,
                    {username},
                    {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem("token")}`,
                        },
                    }
                );
                setSelectedUser(res.data.user);
            } catch (err) {
                console.log(err);
            }
        };
        socket.on('chat_message', ({from, message}) => {
            setMessages(prev => [...prev, {from, message}])
        })


        fetchUser();
        fetchMessages();
        return () => {
            socket.off('chat_message')
        }
    }, [socket]);
    return (
        <Layout>
            <div className="sm:w-1/2 h-screen mx-auto flex flex-col border-l">
                {/* Header */}
                <div className="flex items-center gap-4 p-4 border-b">
                    <img className="size-12 rounded-full object-cover" src={selectedUser.userIcon} alt="user"/>
                    <label className="font-serif text-lg">{selectedUser.name}</label>
                </div>

                {/* Messages list */}
                <div className="flex-1 overflow-y-auto px-4 py-2 space-y-2">
                    {messages?.map((msg, i) => {
                        const isCurrentUser = msg?.to === username;
                        return (
                            <div
                                key={i}
                                className={`flex ${isCurrentUser ? 'justify-end' : 'justify-start'}`}
                            >
                                <div
                                    className={`px-4 py-2 rounded-lg max-w-[85%] ${
                                        isCurrentUser
                                            ? 'bg-blue-500 text-white rounded-br-none'
                                            : 'bg-gray-200 text-black rounded-bl-none'
                                    }`}
                                >
                                    <span className="text-sm block">{msg.message}</span>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Input bar */}
                <div className="p-4 mb-8 sm:mb-0 border-t">
                    <div className="flex items-center gap-3">
                        <Input
                            className="flex-1"
                            value={input}
                            onKeyDown={e => {
                                if (e.key === 'Enter') sendMessage();
                            }}
                            onChange={e => setInput(e.target.value)}
                        />
                        <IoSendOutline className="cursor-pointer size-6" onClick={sendMessage}/>
                    </div>
                </div>
            </div>

        </Layout>
    )
}

export default Chat
