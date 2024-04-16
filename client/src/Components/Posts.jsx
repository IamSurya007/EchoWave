import { posts } from "@/data/posts"
import PostCard from "./PostCard"

const Posts = () => {
  return (
    <div className=" sm:w-1/3 rounded-md mx-auto" >
     
        {posts.map((post, index)=>{
          return <PostCard key={index} post={post} />
        })}
    </div>
  )
}

export default Posts