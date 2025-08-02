// eslint-disable-next-line react/prop-types
import MessagesSideBar from "@/Components/MessagesSideBar.jsx";

export const MessagingLayout = ({children}) =>{
    return (
        <div className="flex flex-col">
            <MessagesSideBar/>
            <div className="flex-1">
                {children}
            </div>
        </div>
    )
}
