import {useAuthContext} from "../hooks/UseAuthContext"
import Layout from "./Layout"
import {MessagingLayout} from "@/Components/MessagingLayout.jsx";

const Chatbox = () => {
    const {user} = useAuthContext()
    return (
        <MessagingLayout>
                <div className="flex flex-col ml-auto w-full md:w-3/4 h-screen">
                    <div className="flex items-center border mb-auto mt-3 w-full p-3 pl-5 gap-4">
                        <img className="rounded-full size-14" src={user?.userIcon} alt='usericon'/>
                        <h1 className=" text-lg font-semibold">{user?.name}</h1>
                    </div>
                    <div className="  border pb-2 h-full">
                        this is a message
                    </div>
                    <div className=" mt-auto mb-3  ">
                        <input className=" h-12 w-full pl-4 border bg-inherit text-inherit" type="text"
                               placeholder="Enter Your Message"/>
                    </div>
                </div>
        </MessagingLayout>
    )
}

export default Chatbox
