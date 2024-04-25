/* eslint-disable react/prop-types */
import { LuSend, LuHeart } from "react-icons/lu";
import { PiDotsThreeVertical } from "react-icons/pi";
import { FaRegComment } from "react-icons/fa";
import { formatDistanceToNow } from "date-fns";
import { Link } from "react-router-dom";
import axios from '../utils/api.js'
import { useEffect, useState } from "react";
import { useAuthContext } from "./hooks/UseAuthContext.jsx";

const PostCard = ({ post }) => {
  const user = useAuthContext()
  const [likes, setLikes] = useState(false);
  var time= formatDistanceToNow(new Date(new Date(post.createdAt)), { addSuffix: false,includeSeconds: true})
  const customTime = ()=>{
    if(time.startsWith("about")) time= time.slice(6)
    if(time.startsWith('less')) time = time.slice(10)
    if(time.includes('year')) time = time[0] +"y"
    if(time.includes('month')) {
      time= time.substring(0,2)+ "h";
      time= time.replace(/\s+/, "")
  }
    if(time.includes('day')) {
      time= time.substring(0,2)+ "d";
      time= time.replace(/\s+/, "")
  }
    if(time.includes('hour')) {
      time= time.substring(0,2)+ "h";
      time= time.replace(/\s+/, "")
  }
    if (time.includes('minute')) {
      time= time.substring(0,2)+ "m";
      time= time.replace(/\s+/, "")
  }
    if (time.includes('second')) {
      time= time.substring(0,2)+ "s";
      time= time.replace(/\s+/, "")
  }
  }
  customTime()

  
  const handleLike = async()=>{
    try{
      const res = await axios.post(`/post/${post._id}/like`, {post},
      {
        headers:{
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      })
      console.log(res.data)
      if(res.status === 200){
        setLikes(true)
      }
    }catch(err){
      console.log(err)
    }
  }

  useEffect(()=>{
    if(post?.likedBy?.includes(user?.user.userId)){
      setLikes(true)
      post.likedBy.push(user?.user.userId)
    }
  },[post])
  return (
    <div className=' pt-3 border-2 rounded-md '>
        <div className=' flex items-center space-x-4 h-12 pb-3'>
            <div className=' ml-5'>
             <img src={post.user.userIcon} alt="profile" className=' object-cover rounded-full h-12 w-12 '/>
            </div>
        <Link to= {`/${post.user.name}`} className=' w-3/4'>
          <span className=" font-semibold text-lg">{post.user.name}</span>
          <span className=" ml-3 font-light">{time}</span>
        </Link>
        <div className=' pr-3'>
        <PiDotsThreeVertical className=' text-2xl' />
        </div>
        </div>
        <div className=' flex justify-center  '>
          {post.fileUrl && <img src={post.fileUrl} alt="post" className=' max-h-[calc(3/4*96vh)] object-cover'/>}
        </div>
        <div className=' pt-2'>
        <span className=' font-medium ml-3'>{post.name}</span>
        <span className=' ml-2'>{post.description}</span>
        </div>
        <div className=' flex space-x-5 ml-3 pt-2 items-center'>
          {likes && <button className=" "  ><LuHeart className=' text-3xl' style={{fill: 'red', color: 'red'  }}/></button>}
          {!likes && <button className=" "  onClick={handleLike}><LuHeart className=' text-3xl' /></button>}
          <FaRegComment className=' text-3xl '/>
          <LuSend className=' text-3xl'/>
        </div>
        <div>
          <div className=' flex flex-col mb-3'>
        <span className=' pl-3'>{post.likedBy?.length} likes</span>
        <span className=' pl-3'>view all {post.comments} comments</span>   
          </div>
        </div>
    </div>
  )
}

export default PostCard