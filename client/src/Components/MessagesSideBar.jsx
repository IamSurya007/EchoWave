import {useEffect, useState} from "react";
import axios from "@/utils/api.js";
import {useAuthContext} from "@/hooks/UseAuthContext.jsx";

const MessagesSideBar = () => {

    const [following, setFollowing] = useState([]);

    const {user} = useAuthContext();

    const getFollowers = async () => {
        try {
            const res = await axios.get("/user/secured/following/useraccount", {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
                params: {
                    userAccountId: user?._id
                }
            });
            setFollowing(res.data); // Update following state
        } catch (error) {
            console.error("Failed to fetch following:", error);
        }
    }
    useEffect(() => {
        getFollowers()
    }, [user]);
    return (
        <div className="h-screen fixed hidden md:block md:w-1/4">
            {following && (
                <div>

                </div>
            )}
        </div>
    )
}

export default MessagesSideBar;
