import Layout from "@/Components/Layout.jsx";
import PostCard from "@/Components/PostCard";
import { Button } from "@/Components/ui/button";
import axios from '@/utils/api.js'
import { useEffect, useState } from "react";
// import { useAuthContext } from "../Components/hooks/UseAuthContext.jsx";
import { useParams } from "react-router-dom";

const UserProfile = () => {

    const {username} = useParams()
    const [profile, setProfile] = useState("")
    const [posts, setPosts] = useState([])
    // const {user} = useAuthContext();
    useEffect(()=>{
      const fetchUser = async () => {
        try{
          const res = await axios.post(`/user/${username}`, {username});
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
  

  return (
      <Layout>
        <div className=" flex  justify-center mt-20">
            <img src={profile?.userIcon} className=" w-36 h-36 rounded-full object-cover" alt="img" />
            <div className=" flex flex-col ">
            <div className=" font-medium  mt-5 ml-10">
            {profile?.name}
            <Button className=" bg-blue-600 ml-10 hover:bg-blue-500  ">Follow</Button>
            <Button className=" ml-5 ">Message</Button>
            </div>
            <div className=" mt-5 flex ml-10 gap-x-8 font-sans">
              <h1>721 posts</h1>
              <h1>22 followers</h1>
              <h1>22 following</h1>
            </div>
            <div className=" ml-10 mt-4 font-serif">{profile?.name}</div>
            </div>
      </div>
      <div className=" sm:w-1/3 rounded-md mx-auto mt-10 grid " >
     
        {posts.map((post, index)=>{
          return <PostCard key={index} post={post} />
        })}
    </div>
      </Layout>
  )
}

export default UserProfile;