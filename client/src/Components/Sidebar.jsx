import { LuHome } from "react-icons/lu";
import { LuSearch } from "react-icons/lu";
import { LuMessageSquare } from "react-icons/lu";
import { PiNotification, PiSignIn } from "react-icons/pi";
import { PiSignOut } from "react-icons/pi";
import { useLogout } from "./hooks/UseLogout";
import { useAuthContext } from "./hooks/UseAuthContext";
import { useState } from "react";
import axios from "axios";
import { IoIosArrowBack } from "react-icons/io";
import { ModeToggle } from "./mode-toggle";
import { Link } from "react-router-dom";

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
        const response = await axios.get(`http://localhost:5000/search?q=${value}`);
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
    <div className=" sm:w-1/5 h-screen border-r fixed shadow-2xl mt-7 ml-10">
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
                      <Link className=" mt-1 font-medium flex items-center space-x-2 hover:cursor-pointer hover:bg-slate-400 hover:rounded-md " to={`/${user.name}`}>
                      <img className=" size-12 rounded-full object-cover" src={user.userIcon} alt="Profile" />
                      <div> {user.name}</div>
                      </Link>
                    </li>
                ))}
            </ul>
        </div>
        </div>
      )}
      <ul className="list-none flex flex-col space-y-1">
        {user && (
          <li className="">
            <Link className="p-3 font-bold bg-white-200 hover:bg-slate-400 hover:rounded-md hover:cursor-pointer flex items-center gap-3" to={`/${user.name}`}>
            <img
              className=" size-10 rounded-full object-cover"
              src={user?.avatar}
              alt="img"
            />{" "}
            {user?.name}
            </Link>
          </li>
        )}
        <li className="">
          <Link to="/" className="p-3 pl-3 font-bold  hover:bg-slate-400 hover:rounded-md hover:cursor-pointer flex items-center gap-3">
          <LuHome className=" text-xl" />
          Home
          </Link>
        </li>
        <li
          onClick={toggleSearch}
          className="p-3 pl-3 font-bold bg-white-200 hover:bg-slate-400 hover:rounded-md hover:cursor-pointer flex items-center gap-3"
        >
          <LuSearch className="text-xl" />
          Search
        </li>
        <li className="p-3 pl-3 font-bold bg-white-200 hover:bg-slate-400 hover:rounded-md hover:cursor-pointer flex items-center gap-3">
          <LuMessageSquare className="text-xl" />
          Messages
        </li>
        <li className="p-3 pl-3 font-bold bg-white-200 hover:bg-slate-400 hover:rounded-md hover:cursor-pointer flex items-center gap-3">
          <PiNotification className="text-xl" />
          Notifications
        </li>
        <li className=" p-1 rounded-sm font-bold hover:bg-slate-400 hover:cursor-pointer">
          <ModeToggle />Theme
        </li>
      </ul>
      {!user && (
        <a
          href="/auth/login"
          className="p-3 pl-3 font-bold flex gap-2 items-center bg-white-200 hover:bg-slate-400 hover:rounded-md hover:cursor-pointer mt-24 "
        >
          <PiSignIn className="text-xl" />
          Login
        </a>
      )}
      {/* <div className=" mt-3 p-1.5 font-bold bg-white-200">
        <ModeToggle /> 
      </div> */}
      {user && (
        <ul className=" mt-32 space-y-1">
          <li className="p-3 pl-3 font-bold bg-white-200 hover:bg-slate-400 hover:rounded-md hover:cursor-pointer flex items-center gap-3">
            {user.email}
          </li>
          <li
            onClick={handleSubmit}
            className="p-3 pl-3 font-bold bg-white-200 hover:bg-slate-400 hover:rounded-md hover:cursor-pointer flex items-center gap-3"
          >
            <PiSignOut className="text-xl" />
            Logout
          </li>
        </ul>
      )}
    </div>
  );
};

export default Sidebar;
