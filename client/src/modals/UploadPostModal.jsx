import Modal from 'react-modal'
import { LuPlus } from "react-icons/lu";
import { Input } from "@/Components/ui/input";
import axios from "@/utils/api.js";
import { useRef, useState } from "react";
import { GoPaperclip } from "react-icons/go";
import { Button } from "@/Components/ui/button";

Modal.setAppElement(document.getElementById('root'));
const customStyles = {
    overlay: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    }
}

const UploadPostModal = () => {
    const [modalIsOpen, setIsOpen] = useState(false);

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
    const opeModal = () => {
        setIsOpen(true)
    }
    const closeModal = () => {
        setIsOpen(false);
    }
    return (
        <div>
            <button onClick={opeModal}><LuPlus /></button>
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                style={customStyles}
                className="h-1/2 w-1/2"
            >
                <div>
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
                    <div><Button className=" bg-blue-400" disabled={isLoading} onClick={handleSubmit} type="submit">
                        Post
                    </Button></div>
                </div>
            </Modal>
        </div>
    )
}

export default UploadPostModal