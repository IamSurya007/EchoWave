import express from 'express';
import cors from 'cors'
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import dotenv from 'dotenv'
import authRoutes from './routes/authRoutes.js'
import searchRoutes from './routes/searchRoutes.js'
import userRoutes from './routes/userRoutes.js'
import postRoutes from './routes/postRoutes.js'
import http from 'http'
import {getUrl} from './controllers/getUrl.js';
import {Server} from 'socket.io';
import authSocketMiddleware from './middleware/authSocketMiddleware.js';
import Message from './models/Message.js'
import messageRoutes from "./routes/messageRoutes.js";

dotenv.config()

const userSocketMap = new Map();

const app = express();
const server = http.createServer(app)
app.use(cors({
    origin: '*',
    credentials: true,
}))

const io = new Server(server, {
    cors: {
        origin: [
            "http://localhost:5173",
            "https://echowave-8by4.onrender.com"
        ],
        methods: ["GET", "POST"],
        credentials: true
    }
});


io.use(authSocketMiddleware);

io.on('connection', socket => {
    userSocketMap.set(socket.userId, socket.id);

    socket.on('chat_message', async ({to, message}) => {
        try {
            const newMessage = new Message({
                from: socket.userId,
                to: to,
                message,
            })

            await newMessage.save();
        } catch (err) {
            console.log('Error saving message', err)
        }
        const targetSocketId = userSocketMap.get(to);
        if (targetSocketId) {
            io.to(targetSocketId).emit('chat_message', {
                from: socket.userId,
                message
            });
        }
    })

    socket.on('disconnet', () => {
        userSocketMap.delete(socket.userId);
        console.log(`${socket.userId} disconnected`)
    });
})


app.use(
    express.json({
        limit: '150mb'
    })
)

app.use(
    express.urlencoded({
        extended: true,
        limit: '150mb'
    })
)

app.use(bodyParser.json())
app.get('/s3Url', getUrl)
app.use('/auth', authRoutes)
app.use('/search', searchRoutes)
app.use('/user', userRoutes)
app.use('/post', postRoutes)
app.use('/messages', messageRoutes)


mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        // listen for requests
        const PORT = process.env.PORT || 5000
        server.listen(PORT, () => {
            console.log(`connected to db & listening on port ${PORT}`);
        })
    })
    .catch((error) => {
        console.log(error)
    })
