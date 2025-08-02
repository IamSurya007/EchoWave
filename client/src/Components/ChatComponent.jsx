import { SocketContext } from "@/context/SocketProvider"
import { useContext, useEffect } from "react"
import { log } from "react-modal/lib/helpers/ariaAppHider"
import Layout from "./Layout"

const ChatComponent = ({ currentUserId, selected }) => {
    const currentuser = localStorage.getItem('user')
    const currentUserId = currentuser._id;
    const [selectedUser, setSelectedUser] = userState(undefined)
    console.log(currentuser)
    const socket = useContext(SocketContext);
    const [messages, setMessages] = userState([]);
    const [input, setInput] = useState('');

    useEffect(() => {
        socket.on('chat_message', ({ from, message }) => {
            setMessages(prev => [...prev, { from, message }])
        })
        return () => {
            socket.off('chat_message')
        }
    }, [socket]);
    return (
        <Layout>
            <div className="md:w-1/3 rounded-md mx-auto">
                <h3>Chat with {selectedUser.display_name}</h3>
                <ul>
                    {messages.map((msg, i) => (
                        <li key={i}>
                            <strong>{msg.from === currentUserId ? 'You' : msg.from}:</strong> {msg.message}
                        </li>
                    ))}
                </ul>
                <input value={input} onChange={e => setInput(e.target.value)} />
                <button onClick={sendMessage}>Send</button>
            </div>
        </Layout>
    )
}

export default Chat
