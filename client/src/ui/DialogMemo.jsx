import { Button } from "@/Components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/Components/ui/dialog";
import { Input } from "@/Components/ui/input";
import axios from "@/utils/api.js";
import { useRef, useState } from "react";
import { GoPaperclip } from "react-icons/go";
import { LuPlus } from "react-icons/lu";

export default function DialogDemo() {
  const [description, setDescription] = useState("");
  const [file, setFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const inputRef = useRef(null);
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleIconClick = () => {
    inputRef.current.click();
  };

  const handleChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    const imageUrl = URL.createObjectURL(selectedFile);
    setImagePreview(imageUrl);
  };

  const formData = new FormData();
  formData.append("description", description);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true)
    try {
      const { url } = await axios.get("/s3Url").then(res => res.data)
      await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": file.type
        },
        body: file
      })

      const imageUrl = url.split('?')[0]
      formData.append('imageUrl', imageUrl)
      const response = await axios.post("/post/", formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      console.log(response.data.message);
      if (response.status === 201) {
        alert(response.data.message);
      }
      setIsLoading(false)
    } catch (e) {
      if (e.response && e.response.status !== 200) {
        setError(e.response.data.message);
      }
      console.log(e.message)
    }
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          className="bg-blue-500 text-md items-center text-white p-3 py-5 justify-center ml-2 hover:cursor-pointer hover:bg-blue-400 flex md:w-2/3 rounded-full"
          variant="outline"
        >
          <span className=""><LuPlus className=" text-xl" /></span>
          <span className=" hidden lg:block">Post</span>
        </Button>
      </DialogTrigger>
      <DialogContent className=" sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Post</DialogTitle>
          <DialogDescription>What&apos;s Happening?!</DialogDescription>
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
            {imagePreview && (
              <img
                className=" border-b max-h-[calc(3/4*90vh)] border-black items-center "
                src={imagePreview}
                alt="imagePreview"
              />
            )}
          </div>
          <div className=" flex items-center">
            <input
              id="username"
              className=" outline-none overflow-hidden bg-inherit resize-none w-4/5"
              placeholder="What's on your mind?"
              onChange={(e) => setDescription(e.target.value)}
              style={{ overflow: 'auto' }}
            />
            <GoPaperclip
              onClick={handleIconClick}
              className=" cursor-pointer text-center text-xl ml-5"
            />
          </div>
        </div>
        {error && <div className=" text-red-600 font-medium">{error}</div>}
        <DialogFooter>
          <Button className=" bg-blue-400" disabled={isLoading} onClick={handleSubmit} type="submit">
            Post
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
