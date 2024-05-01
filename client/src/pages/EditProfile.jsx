import Layout from "@/Components/Layout";
import { Input } from "@/Components/ui/input";
import { useAuthContext } from "@/hooks/UseAuthContext";
import { Button } from "@material-tailwind/react";
import { Label } from "@radix-ui/react-dropdown-menu";
import { EditIcon } from "lucide-react";
import { useRef, useState } from "react";
import axios from "@/utils/api.js";

const EditProfile = () => {
  const { user, updateUser } = useAuthContext();

  const inputRef = useRef(null);
  const initialState = {
    name: user?.name || "",
    email: user?.email || "",
    bio: user?.bio || "",
  };
  const [formData, setFormData] = useState(initialState);
  const [file, setFile] = useState(user?.file);
  const [imgPreview, setImgPreview] = useState(user?.userIcon);

  const handleChange = (e) => {
    const selected = e.target.files[0];
    setFile(selected);
    const imageUrl = URL.createObjectURL(selected);
    setImgPreview(imageUrl);
  };
  const handleInp = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  };
  const handleIconClick = () => {
    inputRef.current.click();
  };

  const handleSubmit = async (e) => {
    const formdata = new FormData();
    if(file){
      formdata.append("file", file);
    }
    formdata.append("name", formData.name);
    formdata.append("email", formData.email);
    formdata.append("bio", formData.bio);
    e.preventDefault();
    const res = await axios.post("user/account/edit", formdata, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    if(res.status===200){
      updateUser(res.data)
      alert("Profile updated successfully")
      console.log("user",user, res.data)
    }
  };

  return (
    <Layout>
      <div className=" ml-[calc(1/4*90vw)] mt-6">
        <span className=" font-semibold text-2xl ">Edit Profile</span>
        <div className=" mt-5 grid gap-2">
          <div className="flex items-end">
            <img
              src={imgPreview}
              alt="user-photo"
              className=" size-24 object-cover rounded-full"
            />
            <Input
              type="file"
              onChange={handleChange}
              ref={inputRef}
              className=" hidden"
            />
            <EditIcon onClick={handleIconClick} className="w-5 h-5 items-end" />
          </div>
          <div className=" mt-3 flex items-center">
            <Label className=" w-1/12">Name :</Label>
            <Input
              className=" w-1/3 outline-none bg-inherit"
              defaultValue={formData?.name}
              type="text"
              onChange={handleInp}
              name="name"
            />
          </div>
          <div className=" flex items-center">
            <Label className=" w-1/12">Email :</Label>
            <Input
              className=" w-1/3 outline-none bg-inherit"
              type="email"
              defaultValue={formData?.email}
              onChange={handleInp}
              name="email"
            />
          </div>
          <div className=" flex items-center">
            <Label className=" w-1/12">Bio :</Label>
            <Input
              className="  w-1/3 max-h-full overflow-auto outline-none bg-inherit"
              defaultValue={formData?.bio}
              type="email"
              onChange={handleInp}
              name="bio"
            />
          </div>
        </div>
        <div className="flex mt-5 ml-[calc(1/4*107vw)]">
          <Button
            onClick={handleSubmit}
            className="text-white text-base flex justify-center p-1 px-6 bg-blue-600"
          >
            Save
          </Button>
        </div>
      </div>
    </Layout>
  );
};

export default EditProfile;
