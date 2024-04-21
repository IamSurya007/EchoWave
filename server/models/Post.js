import mongoose from "mongoose";
import validator from "validator";

const Posts= new mongoose.Schema({

    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    fileUrl:{
        type: String,
        validate: validator.isURL,
    },
    description:{
        type: String,
        required: true
    },
    likes: {
        type: Number,
        default: 0
    },
    // comments: [{type:
    //     mongoose.Schema.Types.ObjectId,
    //     ref: "Comment"
    // }],
    createdAt:{
        type: Date,
        default: Date.now
    }
    
})

const Post = mongoose.model('Post', Posts);
export default Post;