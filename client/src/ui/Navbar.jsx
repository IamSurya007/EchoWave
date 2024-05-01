import { LuHome, LuMessageSquare, LuSearch , LuPlus } from "react-icons/lu";
import { Link } from "react-router-dom";
import { useAuthContext } from "../hooks/UseAuthContext";
import { PiSignIn } from "react-icons/pi";

const NavBar = () => {
  const { user } = useAuthContext();
  return (
    <nav className="fixed bottom-0 left-0 w-full border-t bg-white bg-opacity-80 text-black flex justify-around py-2 md:hidden">
      <Link to="/" className="flex flex-col items-center">
        <LuHome className=" text-xl" />
      </Link>
      <Link to="/explore" className="flex flex-col items-center">
        <LuSearch className=" text-xl" />
      </Link>
      <Link to="/post" className="flex flex-col items-center">
        <LuPlus className=" text-xl"/>
      </Link>
      <Link to="/notifications" className="flex flex-col items-center">
        <LuMessageSquare className="text-xl" />
      </Link>
      {!user && (
        <Link to='/auth/login'>
          <PiSignIn className="text-xl" />
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
  );
};

export default NavBar;
