import { S3Client, PutObjectCommand, GetObjectAclCommand } from "@aws-sdk/client-s3"
import * as dotenv from "dotenv";
dotenv.config();
import crypto from 'crypto'
import { promisify } from "util"
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const randomBytes = promisify(crypto.randomBytes)

const s3Client = new S3Client({
    region: process.env.AWS_REGION_1,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_1,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY_1,
    },
    signatureVersion: 'v4'
});

export const uploadFile = async (file, name, folderName) => {
    try {
        const s3Params = {
            Bucket: process.env.AWS_BUCKET_NAME_1,
            Key: `${name}/${folderName}/${file.originalname}`,
            Body: file.buffer,
            ContentType: file.mimetype
        };
        const command = new PutObjectCommand(s3Params)
        await s3Client.send(command)
    } catch (err) {
        console.error('Error uploading profile picture to S3:', err);
        return res.status(500).json({ message: 'Failed to upload profile picture' });
    }
}

export const generateUploadURL = async () => {
    const rawBytes = await randomBytes(16)
    const imageName = rawBytes.toString('hex')
    const params = ({
        Bucket: process.env.AWS_BUCKET_NAME_1,
        Key: imageName,
    })

    
    const command = new PutObjectCommand(params)
    const uploadURL = await getSignedUrl(s3Client, command, { expiresIn: 100 });
    return uploadURL;
}