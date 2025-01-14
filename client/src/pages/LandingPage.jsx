// import React from 'react'
// import Navbar from "./Navbar"
import Posts from "@/Components/Posts"
import Layout from "@/Components/Layout"
import {Suggestions} from "@/Components/Suggestions.jsx";

const LandingPage = () => {
  return (
    <Layout>
      <Suggestions/>
      <Posts/>
    </Layout>
  )
}

export default LandingPage
