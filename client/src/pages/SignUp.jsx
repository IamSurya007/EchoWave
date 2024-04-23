import { useState } from "react";
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useSignup } from "@/Components/hooks/useSignUp";
// import { MdOutlineVisibility } from "react-icons/md";
// import { MdOutlineVisibilityOff } from "react-icons/md";
import { Label } from "@/Components/ui/label";
import { GoPaperclip } from "react-icons/go";


export default function Signup() {

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
    
  };
  
    return (
      <div  className="flex justify-center items-center h-screen">
      <div className=" grid w-full max-w-sm gap-3 p-10 rounded-lg shadow-xl border bg-white ">
        <div className=" flex justify-center font-semibold bg-slate-400 bg-opacity-40 rounded-md p-4 shadow-md">
        <label className=" text-black">EchoWave</label>
        </div>
        <Input className="bg-white text-black" name="name" type="name"  value={formData.name} onChange={handleChange} placeholder="enter your Name"/>
        <Input className="bg-white text-black" name="email" type="email"  value={formData.email} onChange={handleChange} placeholder="enter the email"/>
        <Input className="bg-white text-black" name="password" type="password"   value={formData.password} onChange={handleChange} placeholder="enter the password" />
      <Label htmlFor="picture" className=" hover:cursor-pointer text-black flex w-full max-w-sm items-center gap-1.5">User Icon: <GoPaperclip className=" text-md"/>  </Label>
      <Input id="picture" name="image" className=" hidden" onChange={handleChange} type="file" accept="image/*" />

    {error && <div className=" pl-2 text-red-500 font-bold">{error}</div>}
        <div className=" flex justify-center">
        <Button className=" w-24 bg-black text-white rounded-md hover:bg-gray-700" disabled={isLoading} onClick={handleSubmit}>Signup</Button>
        </div>
        <div className=" flex gap-6">
        <label className=" text-gray-700 ">
            Do you have an account?
        </label>
        <a href="/auth/login" className=" text-black" >Login</a>
        </div>
        
      </div>
      </div>
    );
  }