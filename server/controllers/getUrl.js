import { generateUploadURL } from "../s3.js"

export const getUrl = async(req, res)=>{
    const url = await generateUploadURL()
    res.send({url})
}