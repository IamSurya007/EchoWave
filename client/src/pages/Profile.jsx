import { useAuthContext } from "@/hooks/UseAuthContext"
import Layout from "@/Components/Layout";

const Profile = () => {
    const {user} = useAuthContext();
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