import PostCard from "../ui/PostCard"
import { useEffect, useState } from "react"
import axios from "@/utils/api.js"


const Posts = () => {

  const [posts, setPosts] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  useEffect(()=>{
    setIsLoading(true)
    const getPosts = async()=>{
      try{
        const res = await axios.get('/post')
        setPosts(res.data)
        setIsLoading(false)
      }catch(e){
        console.log(e)
      }
    }
    getPosts();
  },[])
  console.log(posts)
  return (
    <div className=" md:w-1/3 rounded-md mx-auto" >
      {isLoading && <div className=" flex justify-center items-center">Loading...!!!</div>}
        {posts.sort((a,b)=> new Date(b.createdAt)- new Date(a.createdAt)).map((post, index)=>{
          return <PostCard key={index} post={post} /> 
        })}
    </div>
  )
}

export default Posts