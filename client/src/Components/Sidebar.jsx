import { LuHome } from "react-icons/lu";
import { LuSearch } from "react-icons/lu";
import { LuMessageSquare } from "react-icons/lu";
import { PiNotification, PiSignIn } from "react-icons/pi";
import { PiSignOut } from "react-icons/pi";
import { useLogout } from "./hooks/UseLogout";
import { useAuthContext } from "./hooks/UseAuthContext";
import {  useState } from "react";
import axios from "@/utils/api.js"
import { IoIosArrowBack } from "react-icons/io";
import { ModeToggle } from "./mode-toggle";
import { Link } from "react-router-dom";
import DialogDemo from "./DialogMemo";
import logo from '../assets/logo.png'

const Sidebar = () => {
  const { logout } = useLogout();
  const { user } = useAuthContext();
  const [query, setQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const handleChange = async (e) => {
    const value = e.target.value.trim();
    setQuery(value);
    if(value != ''){
      try {
        const response = await axios.get(`/search?q=${value}`);
        setSearchResults(response.data);
      } catch (error) {
        console.error(error);
      }
    }
  };
  const handleSubmit = () => {
    logout();
  };
  const [serachVisible, setSearchVisible] = useState(false);
  const toggleSearch = () => {
    setSearchVisible(!serachVisible);
  };

  return (
    <div className="h-screen border-r fixed shadow-2xl mt-7 ml-10 hidden md:block md:w-1/6 ">
      {serachVisible && (
        <div className=" flex flex-col rounded-sm">
          <div className=" flex-col fixed top-0 left-0 w-full mt-3 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white bg-opacity-90 p-2 w-1/3  shadow-lg flex items-center">
          <IoIosArrowBack onClick={toggleSearch} className=" text-black hover:cursor-pointer" />
            <input
              type="text"
              onChange={handleChange}
              value={query}
              className=" text-black bg-white w-full ml-2 pl-2 py-2 border-b  focus:outline-none"
              placeholder= "Search..."
            />
          </div>
          <ul className=" flex flex-col bg-white bg-opacity-90 text-black w-1/3 ">
                {searchResults.map((user, index) => (
                    <li  key={index}>
                      <Link className=" mt-1 font-medium flex items-center space-x-2 hover:cursor-pointer hover:bg-slate-400 hover:rounded-md " onClick={toggleSearch} to={`/${user.name}`}>
                      <img className=" size-12 rounded-full object-cover" src={user.userIcon} alt="Profile" />
                      <div> {user.name}</div>
                      </Link>
                    </li>
                ))}
            </ul>
        </div>
        </div>
      )}
      <div className=" p-2 font-bold bg-white-200 hover:bg-slate-400 hover:rounded-md hover:cursor-pointer flex items-center" >
          <img className=" size-12 rounded-full object-cover" src={logo} alt="logo"/>
          <span className=" hidden lg:block">Echowave</span>
        </div>
      <ul className="list-none flex flex-col space-y-1">
        
        <li className="">
          <Link to="/" className="p-3 pl-3 font-bold  hover:bg-slate-400 hover:rounded-md hover:cursor-pointer flex items-center gap-3">
          <LuHome className=" text-xl" />
          
          <span className=" hidden lg:block">Home</span>
          </Link>
        </li>
        <li
          onClick={toggleSearch}
          className="p-3 pl-3 font-bold bg-white-200 hover:bg-slate-400 hover:rounded-md hover:cursor-pointer flex items-center gap-3"
        >
          <LuSearch className="text-xl" />
          
          <span className=" hidden lg:block">Search</span>
        </li>
        <li className="p-3 pl-3 font-bold bg-white-200 hover:bg-slate-400 hover:rounded-md hover:cursor-pointer flex items-center gap-3">
          <LuMessageSquare className="text-xl" />
          
          <span className=" hidden lg:block">Messages</span>
        </li>
        <li className="p-3 pl-3 font-bold bg-white-200 hover:bg-slate-400 hover:rounded-md hover:cursor-pointer flex items-center gap-3">
          <PiNotification className="text-xl" />
          <span className=" hidden lg:block">Notifications</span>
        </li>
        <li className=" p-1 flex items-center rounded-sm font-bold hover:bg-slate-400 hover:cursor-pointer">
          <ModeToggle /> 
          <span className=" hidden lg:block">Theme</span>
        </li>
        <li className=" pt-2">
          <DialogDemo/>
        </li>
      </ul>
      {!user && (
        <a
          href="/auth/login"
          className="p-3 pl-3 font-bold flex gap-2 items-center bg-white-200 hover:bg-slate-400 hover:rounded-md hover:cursor-pointer mt-24 "
        >
          <PiSignIn className="text-xl" />
          
          <span className=" hidden lg:block">Login</span>
        </a>
      )}
      {/* <div className=" mt-3 p-1.5 font-bold bg-white-200">
        <ModeToggle /> 
      </div> */}
      {user && (
        <ul className=" mt-32 space-y-1">
          <li className="">
            <Link className="p-3 font-bold bg-white-200 hover:bg-slate-400 hover:rounded-md hover:cursor-pointer flex items-center gap-3" to={`/${user?.name}`}>
            <img
              className=" size-10 rounded-full object-cover"
              src={user?.userIcon}
              alt="img"
            />{" "}
            
            <span className=" hidden lg:block">{user?.name}</span>
            </Link>
          </li>
          <li
            onClick={handleSubmit}
            className="p-3 pl-3 font-bold bg-white-200 hover:bg-slate-400 hover:rounded-md hover:cursor-pointer flex items-center gap-3"
          >
            <PiSignOut className="text-xl" />
            
            <span className=" hidden lg:block">Logout</span>
          </li>
        </ul>
      )}
    </div>
  );
};

export default Sidebar;
