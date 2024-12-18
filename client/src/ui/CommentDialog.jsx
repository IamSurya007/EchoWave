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
import { Link } from "react-router-dom";

const CommentDialog = (props) => {
  // eslint-disable-next-line react/prop-types
  const post = props.post
  const [content, setContent] = useState("")
  const [comments, setComments] = useState([])
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const addComment = async () => {
    try {
      setIsLoading(true)
      const res = await axios.post(`/post/${post}/addcomment`, { content, post },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
          }
        }
      )
      comments.push(res.data.comment)
      setIsLoading(false)
    } catch (e) {
      alert(e.message)
      setIsLoading(false)
    }
  }

  const fetchComments = async () => {
    try {
      const res = await axios.get(`/post/${post._id}/comments`);
      setComments(res.data.comments);
    } catch (e) {
      console.log(e.message);
    }
  };

  useEffect(() => {
    if (isOpen) {
      fetchComments();
    }
  }, [isOpen])

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        setIsOpen(open); // Ensure this updates without triggering a loop
      }}>
      <DialogTrigger>
        <FaRegComment className=" text-3xl " />
      </DialogTrigger>
      <DialogContent className=" h-2/3">
        <div>
          {/* {comment} */}
          <ul className=" ">
            {comments?.map((comment, index) => (
              <div key={index}>
                <Link to={`/${comment.user.name}`} className="flex py-2">
                  <img className="size-12 object-cover rounded-full" src={comment.user.userIcon} alt="profile pic" />
                  <div className="flex flex-col pl-2">
                    <label className="text-sm">{comment.user.name}</label>
                    <label className="text-base">{comment.content}</label>
                  </div>
                </Link>
              </div>
            ))}
          </ul>
        </div>
        <DialogFooter>
          <Input className="  bg-inherit bottom-2 left-2 w-4/5 focus:outline-none fixed" onChange={(e) => { setContent(e.target.value) }} type="text" placeholder="Add a comment" />
          <Button className=" bg-blue-600 fixed  bottom-2 text-base w-1/6 right-1 h-9" disabled={isLoading} onClick={addComment} >Post</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CommentDialog;
