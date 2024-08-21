import { LuHome, LuMessageSquare, LuSearch , LuPlus } from "react-icons/lu";
import { Link } from "react-router-dom";
import { useAuthContext } from "../hooks/UseAuthContext";
import { PiSignIn } from "react-icons/pi";
import {useState} from "react";
import axios from "@/utils/api.js";
import {IoIosArrowBack} from "react-icons/io";
import DialogDemo from "@/ui/DialogMemo.jsx";
import UploadPostModal from "@/modals/UploadPostModal";

const NavBar = () => {
  const { user } = useAuthContext();
    const [query, setQuery] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [serachVisible, setSearchVisible] = useState(false);
    const toggleSearch = () => {
        setSearchVisible(!serachVisible);
    };
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
  return (
      <div>
          {serachVisible && (
              <div className="  flex flex-col rounded-sm">
                  <div className=" flex-col fixed top-0 left-0 w-full  mt-3 bg-opacity-50 flex justify-center items-center">
                      <div className="bg-white bg-opacity-90 w-full p-2 shadow-lg flex items-center">
                          <IoIosArrowBack onClick={toggleSearch} className=" text-black hover:cursor-pointer" />
                          <input
                              type="text"
                              onChange={handleChange}
                              value={query}
                              className=" text-black bg-white w-full ml-2 pl-2 py-2 border-b  focus:outline-none"
                              placeholder= "Search..."
                          />
                      </div>
                      <ul className=" flex w-full flex-col bg-white bg-opacity-90 text-black">
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
          <nav
              className="fixed bottom-0 left-0 w-full border-t bg-black text-white text-black flex justify-around py-2 md:hidden">
              <Link to="/#" className="flex flex-col items-center">
                  <LuHome className=" text-xl"/>
              </Link>
              <Link onClick={toggleSearch} className="flex flex-col items-center">
                  <LuSearch className=" text-xl"/>
              </Link>
              <Link onClick="/" className="flex flex-col items-center">
                 <UploadPostModal/>
              </Link>
              <Link to="/notifications" className="flex flex-col items-center">
                  <LuMessageSquare className="text-xl"/>
              </Link>
              {!user && (
                  <Link to='/auth/login'>
                      <PiSignIn className="text-xl"/>
                  </Link>
              )}
              {user && (
                  <Link to={`/${user?.name}`} className="flex flex-col items-center">
                      <img
                          className=" size-6 rounded-full object-cover"
                          src={user?.userIcon}
                          alt="img"
                      />
                  </Link>
              )}
          </nav>
      </div>
  );
};

export default NavBar;
