import {S3Client, PutObjectCommand} from "@aws-sdk/client-s3"
import * as dotenv from "dotenv";
dotenv.config();

const s3Client = new S3Client({
    region: process.env.AWS_REGION_1,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_1,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY_1,
    },
});

export const uploadFile = async (file, name, folderName)=>{
        try{
            const s3Params = {
            Bucket: process.env.AWS_BUCKET_NAME_1,
            Key: `${name}/${folderName}/${file.originalname}`,
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