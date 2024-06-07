import { useAuthContext } from "@/hooks/UseAuthContext"
import Layout from "./Layout"

const Chatbox = () => {
  const {user} = useAuthContext()
  return (
    <Layout >
      <div className=" flex ">
      <div className=" flex ml-auto flex-col w-3/4 h-screen rounded-md">
        <div className=" flex items-center border-2 mb-auto mt-3  w-full p-3 pl-5 gap-4">
        <img className=" rounded-full size-14" src={user?.userIcon} alt='usericon'/>
        <h1 className=" text-lg font-semibold">{user?.name}</h1>
        </div>
        <div className="  border-2 pb-2 h-full">
          this is a message
        </div>
      <div className=" mt-auto mb-3  ">
      <input className=" h-12 w-full pl-4 border-2 bg-inherit text-inherit" type="text" placeholder="Enter Your Message"/>
      </div>
    
      </div>
      </div>
    </Layout>
  )
}

export default Chatbox