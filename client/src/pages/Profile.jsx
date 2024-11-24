import { useAuthContext } from "@/hooks/UseAuthContext"
import Layout from "@/Components/Layout";
import { useEffect } from "react";
import axios from "axios";

const Profile = () => {
    const {user} = useAuthContext();
    useEffect(async()=>{
      const followers = await axios.get('/users/fetchfollwers',{
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
    },[])
  return (
    <Layout>
        <div className=" flex justify-center">
        <div>
            <img src={user?.avatar} className=" w-36 h-36 rounded-full object-cover" alt="img" />
            {user?.name}
        </div>
      </div>
      </Layout>
  )
}

export default Profile