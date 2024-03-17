import { LuHome } from "react-icons/lu"
import { LuSearch } from "react-icons/lu"
import { LuMessageSquare } from "react-icons/lu"
import { PiNotification } from "react-icons/pi"
import { PiSignOut } from "react-icons/pi"

const Sidebar = () => {
  return (
    <div className=" sm:w-1/5 h-screen fixed bg-orange-100">
      
        <ul className=" list-none flex flex-col space-y-1">
            <li className=" p-3 pl-3 font-bold bg-orange-200 hover:bg-orange-400 hover:rounded-md hover:cursor-pointer flex items-center gap-3"><LuHome className=" text-xl"/>Home</li>
            <li className=" p-3 pl-3 font-bold bg-orange-200 hover:bg-orange-400 hover:rounded-md hover:cursor-pointer flex items-center gap-3"><LuSearch className=" text-xl"/>Search</li>
            <li className=" p-3 pl-3 font-bold bg-orange-200 hover:bg-orange-400 hover:rounded-md hover:cursor-pointer flex items-center gap-3"><LuMessageSquare className=" text-xl"/>Messages</li>
            <li className= "p-3 pl-3 font-bold bg-orange-200 hover:bg-orange-400 hover:rounded-md hover:cursor-pointer flex items-center gap-3"><PiNotification className=" text-xl"/>Notifications</li>
        </ul>
        <div className="p-3 pl-3 font-bold flex gap-2 items-center bg-orange-200 hover:bg-orange-400 hover:rounded-md hover:cursor-pointer mt-96">
            <PiSignOut className=" text-xl"/>Signout
        </div>
    </div>
  )
}

export default Sidebar