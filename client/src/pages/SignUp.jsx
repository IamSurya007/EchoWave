import { useState } from "react";
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useSignup } from "@/Components/hooks/useSignUp";
// import { MdOutlineVisibility } from "react-icons/md";
// import { MdOutlineVisibilityOff } from "react-icons/md";
import { Label } from "@/Components/ui/label";
import { useNavigate } from "react-router-dom";


export default function Signup() {

  const navigate = useNavigate()

  const [formData, setFormData]= useState({
    email:'',
    password:'',
    name:'',
    file:'null'
  });
  const {signup, isLoading, error} = useSignup()


  const handleChange = async (e)=>{
    const {name, value, files} = e.target;
    if(name === 'image'){
      setFormData((prevData)=>({
       ...prevData,
        file:files[0]
      }))
    }else {
      setFormData((prevData)=>({
        ...prevData,
        [name]:value,
      }))}
    }

  const handleSubmit = async (e) => {
    e.preventDefault();
    await signup(formData.email, formData.password, formData.name, formData.file)
    navigate('/');
  };
  
    return (
      <div  className="flex justify-center items-center h-screen bg-slate-300">
      <div className=" grid w-full max-w-sm gap-3 p-10 rounded-lg shadow-xl border bg-white ">
        <div className=" flex justify-center font-semibold bg-slate-400 bg-opacity-40 rounded-md p-4 shadow-md">
        <label className=" ">EchoWave</label>
        </div>
        <Input name="name" type="name"  value={formData.name} onChange={handleChange} placeholder="enter your Name"/>
        <Input name="email" type="email"  value={formData.email} onChange={handleChange} placeholder="enter the email"/>
        <Input name="password" type="password"   value={formData.password} onChange={handleChange} placeholder="enter the password" />
        <div className="grid w-full max-w-sm items-center gap-1.5">
      <Label htmlFor="picture">User Icon</Label>
      <Input id="picture" name="image" onChange={handleChange} type="file" accept="image/*" />
    </div>
        <div className=" flex justify-center">
        <Button className=" w-24 rounded-md hover:bg-gray-700" disabled={isLoading} onClick={handleSubmit}>Signup</Button>
        </div>
        <div className=" flex gap-6">
        <label className=" text-gray-700 ">
            Do you have an account?
        </label>
        <a href="/auth/login" >Login</a>
        </div>
        {error && <div>{error}</div>}
      </div>
      </div>
    );
  }