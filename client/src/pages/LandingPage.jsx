// import React from 'react'
// import Navbar from "./Navbar"
import Posts from "@/Components/Posts"
// import Home from "../Components/Home"
import Sidebar from "../Components/Sidebar"

const LandingPage = () => {
  return (
    <div className=" flex bg-orange-100">
      <Sidebar/>
      <Posts />
    </div>
  )
}

export default LandingPage