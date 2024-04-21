import express from 'express';
import cors from 'cors'
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import dotenv from 'dotenv'
import authRoutes from './routes/authRoutes.js'
import searchRoutes from './routes/searchRoutes.js'
import userRoutes from './routes/userRoutes.js'
import postRoutes from './routes/postRoutes.js'

dotenv.config()

const app = express();
app.use(cors({
  origin:process.env.CLIENT_URL,
  credentials:true,
}))

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
app.use('/auth', authRoutes)
app.use('/search', searchRoutes)
app.use('/user', userRoutes)
app.use('/post', postRoutes)

mongoose.connect(process.env.MONGODB_URI)
.then(() => {
    // listen for requests
    const PORT=process.env.PORT || 5000
    app.listen(PORT, () => {
      console.log(`connected to db & listening on port ${PORT}`);
    })
  })
  .catch((error) => {
    console.log(error)
  })
