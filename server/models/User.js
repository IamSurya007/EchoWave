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
    }
});

// userSchema.pre("save", async function (next) {
//     const user = this;
//     if (user.isModified("password")) {
//       user.password = await bcrypt.hash(user.password, 10);
//     }
//     next();
//   });
const User = mongoose.model('User', userSchema)
export default User;
