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
import { Label } from "@/components/ui/label"
import axios from "@/utils/api.js"
import {  useState } from "react"

export default function DialogDemo() {

  const [description, setDescription]= useState("");
  const [file, setFile] = useState(null);

  const formData = new FormData();
  formData.append("description", description);
  formData.append("file", file);
  const handleSubmit = async(e)=>{
    e.preventDefault();
    const response= await axios.post('/post/',formData,{
      headers:{
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    }
) 
    console.log(response.data)
  }
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-blue-500 text-md text-white p-3 py-5 justify-center ml-2 hover:cursor-pointer hover:bg-blue-400 flex w-2/3 rounded-full" variant="outline">Post</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Post</DialogTitle>
          <DialogDescription>
            What's Happening?!
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              File
            </Label>
            <Input
              id="name"
              type="file"
              className="col-span-3"
              onChange={(e) => setFile(e.target.files[0])}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              Description
            </Label>
            <Input
              id="username"
              className="col-span-3"
              placeholder="Description"
              onChange={(e)=>setDescription(e.target.value)}
            />
          </div>
        </div>
        <DialogFooter>
          <Button className=" bg-blue-400" onClick={handleSubmit} type="submit">Post</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
