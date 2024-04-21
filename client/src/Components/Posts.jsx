
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
    <div className=" sm:w-1/3 rounded-md mx-auto mt-20" >
     
        {posts.map((post, index)=>{
          return <PostCard key={index} post={post} />
        })}
    </div>
  )
}

export default Posts