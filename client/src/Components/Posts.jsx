import PostCard from "./PostCard"
import { useEffect, useState } from "react"
import axios from "@/utils/api.js"


const Posts = () => {

  const [posts, setPosts] = useState([])

  useEffect(()=>{
    const getPosts = async()=>{
      try{
        const res = await axios.get('/post')
        setPosts(res.data)
      }catch(e){
        console.log(e)
      }
    }
    getPosts();
  },[])
  console.log(posts)
  return (
    <div className=" md:w-1/3 rounded-md mx-auto" >
        {posts.sort((a,b)=> new Date(b.createdAt)- new Date(a.createdAt)).map((post, index)=>{
          return <PostCard key={index} post={post} />
        })}
    </div>
  )
}

export default Posts