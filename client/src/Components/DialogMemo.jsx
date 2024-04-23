import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import axios from "@/utils/api.js"
import {  useRef, useState } from "react"
import { GoPaperclip } from "react-icons/go";

export default function DialogDemo() {

  const [description, setDescription]= useState("");
  const [file, setFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const inputRef = useRef(null)

  const handleIconClick = ()=>{
    inputRef.current.click()
  }

  const handleChange= (e)=>{
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    const imageUrl = URL.createObjectURL(selectedFile);
    setImagePreview(imageUrl)
  }

  const formData = new FormData();
  formData.append("description", description);
  formData.append("file", file);
  const handleSubmit = async(e)=>{
    e.preventDefault();
    const response= await axios.post('/post/',formData,{
      headers:{
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    }) 
    console.log(response.data.message)
  }
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-blue-500 text-md text-white p-3 py-5 justify-center ml-2 hover:cursor-pointer hover:bg-blue-400 flex w-2/3 rounded-full" variant="outline">Post</Button>
      </DialogTrigger>
      <DialogContent className=" sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Post</DialogTitle>
          <DialogDescription>
            What&apos;s Happening?!
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4 ">
          
            <div className=" flex items-center">
              <Input
              id="name"
              type="file"
              ref={inputRef}
              className=" hidden"
              onChange={handleChange}
            />
            {imagePreview && <img className=" border-b border-black items-center " src={imagePreview} alt="imagePreview" />}
            </div>
          <div className=" flex items-center">
            <input
              id="username"
              className=" outline-none overflow-hidden resize-none w-4/5"
              placeholder="What's on your mind?"
              onChange={(e)=>setDescription(e.target.value)}
            />  
           <GoPaperclip onClick={handleIconClick} className=" cursor-pointer text-center text-xl ml-5"/>
          </div>
        </div>
        <DialogFooter>
          <Button className=" bg-blue-400" onClick={handleSubmit} type="submit">Post</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
