import Layout from "@/Components/Layout.jsx";
import PostCard from "@/ui/PostCard";
import { Button } from "@/Components/ui/button";
import axios from "@/utils/api.js";
import { useEffect, useState } from "react";
// import { useAuthContext } from "../Components/hooks/UseAuthContext.jsx";
import { Link, useParams } from "react-router-dom";
import { useAuthContext } from "@/hooks/UseAuthContext";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/Components/ui/alert-dialog";
import SettingsModal from "@/modals/SettingsModal";
import FollowersModal from "@/modals/FollowersModal";
import { use } from "react";
import FollowingModal from "@/modals/FollowingModal";


const UserProfile = () => {
  const { user } = useAuthContext();
  const { username } = useParams();
  const [profile, setProfile] = useState("");
  const [posts, setPosts] = useState([]);
  const [isFollowing, setIsFollowing] = useState(false);
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const fetchUser = async () => {
      setIsLoading(true)
      try {
        const res = await axios.post(
          `/user/${username}`,
          { username },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setProfile(res.data.user);
        setPosts(res.data.posts);
        setIsLoading(false)
      } catch (err) {
        console.log(err);
      }
    };
    fetchUser();
  }, [username]);
  const isCurrentUser = profile?._id === user?._id;
  useEffect(() => {
    if (profile?.followers?.includes(user?._id)) {
      setIsFollowing(true);
    } else {
      setIsFollowing(false);
    }
  }, [profile, user]);
  const handleFollow = async () => {
    try {
      setIsFollowing(true);
      profile?.followers.push(user?._id);
      const res = await axios.post(
        `/user/${username}/follow`,
        { username },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
    } catch (e) {
      console.log(e);
    }
  };
  const handleUnfollow = async () => {
    try {
      setIsFollowing(false);
      const updatedFollowers = profile?.followers.filter(
        (id) => id !== user._id
      );
      profile.followers = updatedFollowers;
      const res = await axios.post(
        `/user/${username}/unfollow`,
        { username },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <Layout>

      {isLoading &&
        <div className="sm:w-1/3 mx-auto">
          <div>
            <div className=" flex justify-center items-center animate-pulse gap-2 p-4">
              <div className="h-20 w-20 rounded-full bg-slate-400"></div>
              <div className="flex-1">
                <div className="h-5 w-[40%] rounded-lg bg-slate-400 text-sm"></div>
                <div className="h-5 mt-2 w-[70%] rounded-lg bg-slate-400 text-sm"></div>
              </div>
            </div>
            <div className="h-64 w-full rounded-sm bg-slate-400 text-sm"></div>
          </div>
        </div>}
      {!isLoading &&
        <div className="flex justify-center sm:items-center sm:mt-20">
        <img
          src={profile?.userIcon}
          className=" size-24 md:size-28 sm:size-36 mt-6 rounded-full object-cover"
          alt="img"
        />
        <div className=" flex flex-col ">
          <div className=" md:flex items-center mt-5 sm:mt-0 ml-4 sm:ml-10">
            <div className=" text-xl flex items-end gap-2 flex-row">
              <div>{profile?.name}</div>
              {isCurrentUser &&
                <div className="sm:hidden">
                <SettingsModal/>
                </div>
              }
            </div>

            {!isCurrentUser && (
              <div className=" flex items-center mt-4 md:mt-0">
                <Button
                  onClick={handleFollow}
                  className={`bg-blue-600 ml-0 px-8 sm:ml-8 hover:bg-blue-500 ${isFollowing ? "hidden" : ""
                    }`}
                >
                  Follow
                </Button>
                <button
                  className={` rounded-md ml-8 bg-green-600 border-b hover:bg-green-500 ${isFollowing ? "" : "hidden"
                    }`}
                >
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button
                        variant="outline"
                        className=" bg-inherit border-none hover:bg-inherit"
                      >
                        Following
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>
                          Are you sure You want to Unfollow ?
                        </AlertDialogTitle>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={handleUnfollow}>
                          Unfollow
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </button>
                <Link to={`/direct/t/${profile._id}`} className=" ml-5  ">
                  Message
                </Link>
              </div>
            )}
            {isCurrentUser && (
              <div>
                <div className=" flex items-center mt-4 md:mt-0">
                  <Link
                    to="/account/edit"
                    className=" text-inherit bg-gray-400 p-1 rounded-md px-4 bg-opacity-20 hover:bg-opacity-40 hover:bg-gray-400 ml-0 md:ml-8"
                  >
                    Edit Profile
                  </Link>
                </div>
              </div>
            )}
          </div>
          <div className=" mt-3 flex ml-4 sm:ml-10 gap-x-2 justify-center sm:gap-x-8 font-sans">
            <h1>{posts.length} posts</h1>
            <h1 className=" flex items-center gap-1">{profile?.followers?.length} <FollowersModal
            userAccount = {profile}
            /></h1>
            <h1 className=" flex items-center gap-1">{profile?.following?.length} <FollowingModal
            userAccount={profile}/>
            </h1>
          </div>
          <div className="ml-4 sm:ml-10 mt-3 font-semibold">{profile?.username}</div>
          <div className="ml-4 sm:ml-10 mt-1 font-serif">{profile?.bio}</div>
        </div>
      </div>}
      <div className=" sm:w-1/3 rounded-md mx-auto mt-10 grid ">
        {posts
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
          .map((post, index) => {
            return <PostCard key={index} post={post} />;
          })}
      </div>
    </Layout>
  );
};

export default UserProfile;
