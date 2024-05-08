import PostCard from "../ui/PostCard"
import { useEffect, useState } from "react"
import axios from "@/utils/api.js"
import { set } from "date-fns"


const Posts = () => {

  const [posts, setPosts] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(0)
  const [uniques, setUniques] = useState([])
  const [loaded, setLoaded] = useState(false)
  useEffect(()=>{
    const getPosts = async()=>{
      if(loaded){
        return
      }
      setIsLoading(true)
      try{
        const res = await axios.get('/post', {
          params:{
            page:currentPage,
            limit:10
          }
        })
        const {fetchedPosts, fetchedCurrentPage, fetchedTotalPages} = res.data
        const newPosts= fetchedPosts.filter(post=>!posts.find(existingPost => existingPost._id === post._id))
        setPosts(prevPosts=>[...prevPosts, ...newPosts])
        setCurrentPage(fetchedCurrentPage)
        setTotalPages(fetchedTotalPages)
        if(fetchedCurrentPage >= fetchedTotalPages){
          setLoaded(true)
        }
        setIsLoading(false)
        const newUniques = new Set(uniques)
        fetchedPosts.forEach(post => newUniques.add(post._id))
        setUniques(Array.from(newUniques))
      }catch(e){
        console.log(e)
      }
    }
    getPosts();
  },[currentPage])

  const handleScroll = ()=>{
    const {scrollHeight, scrollTop, clientHeight} = document.documentElement
    if(scrollTop + clientHeight >= scrollHeight){
      // if(currentPage<= totalPages){
      //   setCurrentPage(prevPage=>prevPage+1)
      // }
      setCurrentPage(prevPage=>prevPage+1)
    }
  };
  useEffect(()=>{
    window.addEventListener('scroll', handleScroll)
    return ()=>{
      window.removeEventListener('scroll', handleScroll)
    }
  },[])
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