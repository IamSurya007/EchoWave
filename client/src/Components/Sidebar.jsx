import { LuHome } from "react-icons/lu"
import { LuSearch } from "react-icons/lu"
import { LuMessageSquare } from "react-icons/lu"
import { PiNotification, PiSignIn } from "react-icons/pi"
import { PiSignOut } from "react-icons/pi"
import { useLogout } from "./hooks/UseLogout"
import { useAuthContext } from "./hooks/UseAuthContext"

const Sidebar = () => {

  const {logout} = useLogout()
  const {user}=useAuthContext()
  const handleSubmit=()=>{
    logout()
  }
  console.log(user?.name)
  
  return (
    <div className="hidden lg:block sm:w-1/5 h-screen fixed bg-orange-100 ml-10">
  <ul className="list-none flex flex-col space-y-1">
    {user && <li className="p-3 pl-10 font-bold bg-orange-200 hover:bg-orange-400 hover:rounded-md hover:cursor-pointer flex items-center gap-3">
      {user?.name}
    </li>}
    <li className="p-3 pl-3 font-bold bg-orange-200 hover:bg-orange-400 hover:rounded-md hover:cursor-pointer flex items-center gap-3">
      <LuHome className="text-xl"/>Home
    </li>
    <li className="p-3 pl-3 font-bold bg-orange-200 hover:bg-orange-400 hover:rounded-md hover:cursor-pointer flex items-center gap-3">
      <LuSearch className="text-xl"/>Search
    </li>
    <li className="p-3 pl-3 font-bold bg-orange-200 hover:bg-orange-400 hover:rounded-md hover:cursor-pointer flex items-center gap-3">
      <LuMessageSquare className="text-xl"/>Messages
    </li>
    <li className="p-3 pl-3 font-bold bg-orange-200 hover:bg-orange-400 hover:rounded-md hover:cursor-pointer flex items-center gap-3">
      <PiNotification className="text-xl"/>Notifications
    </li>
  </ul>
  {!user && (
    <a href="/auth/login" className="p-3 pl-3 font-bold flex gap-2 items-center bg-orange-200 hover:bg-orange-400 hover:rounded-md hover:cursor-pointer mt-24 ">
      <PiSignIn className="text-xl"/>
        Login
    </a>
  )}
  {user && (
    <ul className=" mt-32 space-y-1">
      <li className="p-3 pl-3 font-bold bg-orange-200 hover:bg-orange-400 hover:rounded-md hover:cursor-pointer flex items-center gap-3">
        {user.email}
      </li>
      <li onClick={handleSubmit} className="p-3 pl-3 font-bold bg-orange-200 hover:bg-orange-400 hover:rounded-md hover:cursor-pointer flex items-center gap-3">
        <PiSignOut className="text-xl"/>Logout
      </li>
    </ul>
  )}
</div>

  )
}

export default Sidebar