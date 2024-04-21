/* eslint-disable react/prop-types */
import { LuSend, LuHeart } from "react-icons/lu";
import { PiDotsThreeVertical } from "react-icons/pi";
import { FaRegComment } from "react-icons/fa";


const PostCard = ({ post }) => {
  return (
    <div className=' pt-3 border-2 rounded-md'>
        <div className=' flex items-center space-x-4 h-12 pb-3'>
            <div className=' ml-5'>
             <img src={post.user.userIcon} alt="profile" className=' object-cover rounded-full h-12 w-12 '/>
            </div>
        <div className=' font-semibold text-lg w-3/4'>{post.user.name}</div>
        <div className=' pr-3'>
        <PiDotsThreeVertical className=' text-2xl ' />
        </div>
        </div>
        <div className=' flex justify-center'>
          <img src={post.fileUrl} alt="post" className=' object-cover'/>
        </div>
        <div className=' pt-2'>
        <span className=' font-medium ml-3'>{post.name}</span>
        <span className=' ml-2'>{post.description}</span>
        </div>
        <div className=' flex space-x-5 ml-3 pt-2 items-center'>
          <LuHeart className=' text-3xl'/>
          <FaRegComment className=' text-3xl '/>
          <LuSend className=' text-3xl'/>
        </div>
        <div>
          <div className=' flex flex-col mb-3'>
        <span className=' pl-3'>{post.likes} likes</span>
        <span className=' pl-3'>view all {post.comments} comments</span>   
          </div>
        </div>
    </div>
  )
}

export default PostCard