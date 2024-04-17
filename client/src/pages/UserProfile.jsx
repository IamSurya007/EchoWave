import Layout from "@/Components/Layout.jsx";
import axios from "axios";
import { useEffect, useState } from "react";
// import { useAuthContext } from "../Components/hooks/UseAuthContext.jsx";
import { useParams } from "react-router-dom";

const UserProfile = () => {

    const {username} = useParams()
    const [profile, setProfile] = useState("")
    // const {user} = useAuthContext();
    useEffect(()=>{
      const fetchUser = async () => {
        try{
          const res = await axios.post(`http://localhost:5000/${username}`, {username});
          setProfile(res.data)
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
        <div className=" flex justify-center">
        <div>
            <img src={profile?.userIcon} className=" w-36 h-36 rounded-full object-cover" alt="img" />
            {profile?.name}
        </div>
      </div>
      </Layout>
  )
}

export default UserProfile;