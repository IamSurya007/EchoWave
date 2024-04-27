import Layout from "@/Components/Layout.jsx";
import PostCard from "@/Components/PostCard";
import { Button } from "@/Components/ui/button";
import axios from '@/utils/api.js'
import {  useEffect, useState } from "react";
// import { useAuthContext } from "../Components/hooks/UseAuthContext.jsx";
import { Link, useParams } from "react-router-dom";
import { useAuthContext } from "@/Components/hooks/UseAuthContext";

const UserProfile = () => {
    const {user} = useAuthContext()
    const {username} = useParams()
    const [profile, setProfile] = useState("")
    const [posts, setPosts] = useState([])
    const [isFollowing, setIsFollowing] = useState(false)

    
    useEffect(()=>{
      const fetchUser = async () => {
        try{
          const res = await axios.post(`/user/${username}`, {username},
          {headers:{
            Authorization: `Bearer ${localStorage.getItem("token")}`
          }});
          setProfile(res.data.user)
          setPosts(res.data.posts)
          console.log("response", res.data)
          
        }
        catch(err){
          console.log(err)
        }
      }
      fetchUser();
    },[username])
    useEffect(()=>{
      if(profile?.followers?.includes(user?.userId)){
        setIsFollowing(true)
        console.log("following")
      }
      else{
        setIsFollowing(false)
      }
    },[profile, user])
    const handleFollow= async()=>{
      try{
        const res = await axios.post(`/user/${username}/follow`, {username},
        {
          headers:{
            Authorization: `Bearer ${localStorage.getItem("token")}`
          }
        }
      )
      setIsFollowing(true)
      profile?.followers.push(user?.userId)
      console.log(res.data)
    }catch(e){
      console.log(e)
    }
  }
  return (
      <Layout>
        <div className=" flex items-center justify-center mt-20">
            <img src={profile?.userIcon} className=" size-24 md:size-36 rounded-full object-cover" alt="img" />
            <div className=" flex flex-col ">
            <div className=" md:flex font-medium  mt-5 ml-10">
            {profile?.name}
            <div className=" flex items-center mt-4 md:mt-0">
            <Button onClick={handleFollow} className={`bg-blue-600 ml-0 md:ml-8 hover:bg-blue-500 ${isFollowing ? 'hidden': ''}`}>Follow</Button>
            <Button  className={`md:ml-8 ml-0  bg-green-600 border-b hover:bg-green-500 ${isFollowing ? '': 'hidden'}`}>Following</Button>
          <Link to={`/direct/t/${profile._id}`} className=" ml-5  ">Message</Link>
            </div>
            </div>
            <div className=" mt-5 flex ml-10 gap-x-8 font-sans">
              <h1>{posts.length} posts</h1>
              <h1>{profile?.followers?.length} followers</h1>
              <h1>{profile?.following?.length} following</h1>
            </div>
            <div className=" ml-10 mt-4 font-serif">{profile?.name}</div>
            </div>
      </div>
      <div className=" sm:w-1/3 rounded-md mx-auto mt-10 grid ">
     
        {posts.sort((a, b)=> (new Date(b.createdAt)- new Date(a.createdAt))).map((post, index)=>{
          return <PostCard key={index} post={post} />
        })}
    </div>
      </Layout>
  )
}

export default UserProfile;