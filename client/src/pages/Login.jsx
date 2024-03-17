import { useState } from "react";
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export default function Login() {

  const [formData, setFormData]= useState({
    email:'',
    password:''
  });

  const handleChange = async (e)=>{
    const {name, value} = e.target;
    setFormData((prevData)=>({
      ...prevData,
      [name]:value,
    }))
  }

  const handleSubmit = async (e)=>{
    e.preventDefault()
    console.log('data:', formData)
  }
    return (
      <div  className="flex justify-center items-center h-screen bg-slate-300">
      <div className=" grid w-full max-w-sm gap-3 p-10 rounded-lg shadow-xl border bg-white ">
        <div className=" flex justify-center font-semibold bg-slate-400 bg-opacity-40 rounded-md p-4 shadow-md">
        <label className=" ">EchoWave</label>
        </div>
        <Input name="email"  value={formData.email} onChange={handleChange} placeholder="enter the email"/>
        <Input name="password"  value={formData.password} onChange={handleChange} placeholder="enter the password" />
        <div className=" flex justify-center">
        <Button className=" w-24 rounded-md hover:bg-gray-700" onClick={handleSubmit}>Login</Button>
        </div>
        <div className=" flex gap-6">
        <label className=" text-gray-700 ">
            Don&rsquo;t have an account?
        </label>
        <a href="/auth/signup" >Signup</a>
        </div>
      </div>
      </div>
    );
  }