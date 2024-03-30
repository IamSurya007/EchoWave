import {S3Client, PutObjectCommand} from "@aws-sdk/client-s3"
import * as dotenv from "dotenv";
dotenv.config();

const s3Client = new S3Client({
    region: process.env.AWS_REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY,
        secretAccessKey: process.env.AWS_SECRET_KEY,
    },
});

export const uploadFile = async (file, name, email)=>{
        try{
            const s3Params = {
            Bucket: process.env.AWS_BUCKET_NAME,
            Key: `${name}/userIcons/${file.originalname}`,
            Body: file.buffer,
            ContentType: file.mimetype
        };
        const command= new PutObjectCommand(s3Params)
        await s3Client.send(command)
    }catch(err){
        console.error('Error uploading profile picture to S3:', err);
        return res.status(500).json({ message: 'Failed to upload profile picture' });
    }
}