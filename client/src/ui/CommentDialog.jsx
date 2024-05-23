import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogFooter
} from "@/Components/ui/dialog.jsx";
import { FaRegComment } from "react-icons/fa";
import { Input } from "@/Components/ui/input";
import { Button } from "@/Components/ui/button";
import { useEffect, useState } from "react";
import axios from '@/utils/api.js'

const CommentDialog = (props) => {
  // eslint-disable-next-line react/prop-types
  const post = props.post
  const [content, setContent] = useState("")
  const [comments, setComments]= useState([])
  const [isLoading, setIsLoading] = useState(false)
  const addComment = async()=>{
    try{
      console.log(post, content)
    setIsLoading(true)
    const res= await axios.post(`/post/${post}/addcomment`, {content, post},
    {
      headers:{
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    }
  )
    comments.push(res.data.comment)
    console.log(res.data)
    setIsLoading(false)
    }catch(e){
      alert(e.message)
      setIsLoading(false)
    }
  }

  useEffect(()=>{
    const fetchComments = async () => {
      try {
        const res = await axios.post(`/post/${post}/comments`,  post );
        setComments(res.data.comments);
      } catch (e) {
        console.log(e.message);
      }
    };
    fetchComments();
  },[post])

  return (
    <Dialog>
      <DialogTrigger>
          <FaRegComment className=" text-3xl " />
      </DialogTrigger>
      <DialogContent className= " h-2/3"> 
      <div>
        {/* {comment} */}
        <ul className=" ">
        {comments.map((comment, index) => (
          <li key={index}>{comment?.content}</li>
        ))}
      </ul>
      </div>
      <DialogFooter>
        <Input  className="  bg-inherit bottom-2 left-2 w-4/5 focus:outline-none fixed" onChange={(e)=>{setContent(e.target.value)}} type="text" placeholder="Add a comment"/>
        <Button className=" bg-blue-600 fixed  bottom-2 text-base w-1/6 right-1 h-9" disabled={isLoading} onClick={addComment} >Post</Button>
      </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CommentDialog;
