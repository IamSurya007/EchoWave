/* eslint-disable react/prop-types */
import { LuSend, LuHeart } from "react-icons/lu";
import { formatDistanceToNow } from "date-fns";
import { Link } from "react-router-dom";
import axios from "../utils/api.js";
import { useEffect, useState } from "react";
import { useAuthContext } from "../hooks/UseAuthContext.jsx";
import { Delete } from "./Delete.jsx";
import CommentDialog from "./CommentDialog.jsx";

const PostCard = ({ post }) => {
  const user = useAuthContext();
  const [likes, setLikes] = useState(false);
  var time = formatDistanceToNow((new Date(post.createdAt)), {
    addSuffix: false,
    includeSeconds: true,
  });
  const customTime = () => {
    if (time.startsWith("almost")) time = time.slice(6);
    if (time.startsWith("about")) time = time.slice(6);
    if (time.startsWith("less")) time = time.slice(10);
    if (time.includes("year")) time = time[0] + "y";
    if (time.includes("month")) {
      time = time.substring(0, 2) + "m";
      time = time.replace(/\s+/, "");
    }
    if (time.includes("week")){
      time =time.substring(0, 2) + "w";
      time = time.replace(/\s+/, "");
    }
    if (time.includes("day")) {
      time = time.substring(0, 2) + "d";
      time = time.replace(/\s+/, "");
    }
    if (time.includes("hour")) {
      time = time.substring(0, 2) + "h";
      time = time.replace(/\s+/, "");
    }
    if (time.includes("minute")) {
      time = time.substring(0, 2) + "m";
      time = time.replace(/\s+/, "");
    }
    if (time.includes("second")) {
      time = time.substring(0, 2) + "s";
      time = time.replace(/\s+/, "");
    }
  };
  customTime();

  const handleLike = async () => {
    try {
      setLikes(true);
      post.likedBy.push(user?.user._id);
      const res = await axios.post(
        `/post/${post._id}/like`,
        { post },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      console.log(res.data);
    } catch (err) {
      console.log(err);
    }
  };
  const unlike = async () => {
    try {
      setLikes(false);
      const updatedLikes = post.likedBy.filter((id) => id !== user?.user._id);
      post.likedBy = updatedLikes;

      const res = await axios.post(
        `/post/${post._id}/unlike`,
        { post },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      console.log(res.data);
    } catch (err) {
      console.log(err);
    }
  };
 
  useEffect(() => {
    if (post?.likedBy?.includes(user?.user?._id)) {
      setLikes(true);
    }
  }, [post, user]);
  return (
    <div className=" pt-3 border-2 rounded-md ">
      <div className=" flex items-center space-x-4 h-12 pb-3">
        <div className=" ml-5">
          <img
            src={post.user?.userIcon}
            alt="profile"
            className=" object-cover rounded-full h-12 w-12 "
          />
        </div>
        <Link to={`/${post.user?.name}`} className=" w-3/4">
          <span className=" font-semibold text-lg">{post.user?.name}</span>
          <span className=" ml-3 font-light">{time}</span>
        </Link>
        <div className=" pr-3">
          <Delete />
        </div>
      </div>
      <div className=" flex justify-center  ">
        {post.fileUrl && (
          <img
            src={post.fileUrl}
            alt="post"
            className=" max-h-[calc(3/4*96vh)] object-cover"
          />
        )}
      </div>
      <div className=" pt-2">
        <span className=" font-medium ml-3">{post.name}</span>
        <span className=" ml-2">{post.description}</span>
      </div>
      <div className=" flex space-x-5 ml-3 pt-2 items-center">
        {likes && (
          <button className=" " onClick={unlike}>
            <LuHeart
              className=" text-3xl"
              style={{ fill: "red", color: "red" }}
            />
          </button>
        )}
        {!likes && (
          <button className=" " onClick={handleLike}>
            <LuHeart className=" text-3xl" />
          </button>
        )}
        {/* <FaRegComment className=" text-3xl " /> */}
        <div  >
          <CommentDialog post={post}  />
        </div>
        <LuSend className=" text-3xl" />
      </div>
      <div>
        <div className=" flex flex-col mb-3">
          <span className=" pl-3">{post.likedBy?.length} likes</span>
          <span className=" pl-3" >
            view all {post.comments.length} comments
          </span>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
