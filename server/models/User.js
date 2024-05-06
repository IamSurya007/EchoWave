import mongoose from "mongoose";
import validator from "validator";

const userSchema= new mongoose.Schema({
    email:{
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    password:{
        type: String,
        required: true
    },
    name :{
      type:String,
      required: true  
    },
    userIcon:{
        type:String,
        default:"https://echowave-uploads.s3.amazonaws.com/profile.png"
    },
    followers:[{type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
    following:[{type:mongoose.Schema.Types.ObjectId, ref: 'User'}],
    bio:{
        type: String,
        default: ""
    },
    username:{
        type: String,
        default: ""
    }
});

const User = mongoose.model('User', userSchema)
export default User;
