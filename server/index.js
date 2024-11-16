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
import { getUrl } from './controllers/getUrl.js';
import {Server} from 'socket.io'
import swaggerUi from 'swagger-ui-express'
import swaggerJsdoc from 'swagger-jsdoc';

dotenv.config()

const app = express();
const server = http.createServer(app)
app.use(cors({
  origin:'*',
  credentials:true,
}))

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Your API Title',
      version: '1.0.0',
    },
  },
  apis: ['./routes/*.js'],
};

const swaggerSpec = swaggerJsdoc(options);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));


// const io = new Server(server,
//   {cors:{
//     origin: "*"
//   }}
// )

// io.on( 'connection',socket=>{
//     console.log('connected', socket.id)
// })


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

mongoose.connect(process.env.MONGODB_URI)
.then(() => {
    // listen for requests
    const PORT=process.env.PORT || 5000
    server.listen(PORT, () => {
      console.log(`connected to db & listening on port ${PORT}`);
    })
  })
  .catch((error) => {
    console.log(error)
  })
