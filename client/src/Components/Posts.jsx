import PostCard from "../ui/PostCard"
import { useEffect, useState } from "react"
import axios from "@/utils/api.js"
import { set } from "date-fns"


const Posts = () => {

  const [posts, setPosts] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [currentPage, setCurrentPage] = useState(0)
  const [totalPages, setTotalPages] = useState(0)
  const [uniques, setUniques] = useState([])
  const [loaded, setLoaded] = useState(false)
  useEffect(() => {
    const getPosts = async () => {
      if (loaded) {
        return
      }
      setIsLoading(true)
      try {
        const res = await axios.get('/post/getposts', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          params: {
            page: currentPage,
            limit: 6
          }
        })
        const { fetchedPosts, fetchedCurrentPage, fetchedTotalPages } = res.data
        const newPosts = fetchedPosts.filter(post => !posts.find(existingPost => existingPost._id === post._id))
        setPosts(prevPosts => [...prevPosts, ...newPosts])
        setTotalPages(fetchedTotalPages)
        if (fetchedCurrentPage >= fetchedTotalPages) {
          setLoaded(true)
        }
        setIsLoading(false)
        const newUniques = new Set(uniques)
        fetchedPosts.forEach(post => newUniques.add(post._id))
        setUniques(Array.from(newUniques))
      } catch (e) {
        console.log(e);
      }
    }
    getPosts();
  }, [currentPage])
  const handleScroll = () => {
    const { scrollHeight, scrollTop, clientHeight } = document.documentElement
    if (scrollTop + clientHeight >= scrollHeight - 5) {
      // if(currentPage<= totalPages){
      setCurrentPage(prevPage => prevPage + 1)
      // }
    }
  };
  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])
  return (
    <div className=" md:w-1/3 rounded-md mx-auto">
      {posts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).map((post, index) => {
        return <PostCard key={index} post={post} />
      })}
      {isLoading &&
        <div>
          <div>
            <div className=" flex w-full items-center animate-pulse gap-2 p-4">
              <div className="h-12 w-12 rounded-full bg-slate-400"></div>
              <div className="flex-1 ">
                <div className="h-5 w-[69%] rounded-lg bg-slate-400 text-sm"></div>
              </div>
              {/*<div className="absolute bottom-5 right-0 h-4 w-4 rounded-full bg-slate-400"></div>*/}
            </div>
            <div className="h-64 w-full rounded-sm bg-slate-400 text-sm"></div>
          </div>
          <div>
            <div className=" flex w-full items-center animate-pulse gap-2 p-4">
              <div className="h-12 w-12 rounded-full bg-slate-400"></div>
              <div className="flex-1 ">
                <div className="h-5 w-[69%] rounded-lg bg-slate-400 text-sm"></div>
              </div>
              {/*<div className="absolute bottom-5 right-0 h-4 w-4 rounded-full bg-slate-400"></div>*/}
            </div>
            <div className="h-64 w-full rounded-sm bg-slate-400 text-sm"></div>
          </div>
        </div>
      }

    </div>
  )
}

export default Posts
