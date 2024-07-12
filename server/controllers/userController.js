import User from "../models/User.js";
import Post from "../models/Post.js";
import { uploadFile } from "../s3.js";

const fetchUser = async (req, res) => {
    const {username} = req.body;
    try {
        const user = await User.findOne({name: username});
        const posts= await Post.find({user: user._id}).populate('user')
        res.json({user, posts});
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

export const editProfile = async(req, res)=>{
    const {name, email, username} = req.body;
    console.log(req.user, req.body)
    try{
        const user = await User.findById(req.user._id);
        if(!user){
            return res.status(404).json({message:"user not found"})
        }
        if(req.file){
            await uploadFile(req.file, user.name, "userIcons")
            console.log(req.file.originalname)
            const userIcon = `https://${process.env.AWS_BUCKET_NAME_1}.s3.amazonaws.com/${user.name}/userIcons/${req.file.originalname}`
            req.body.userIcon = userIcon
        }
        const updatedUser = await User.findByIdAndUpdate(user._id, req.body, {new: true});
        res.json(updatedUser);
    }catch(e){
        res.status(404).json({message: e.message})
    }
}

export const followUser = async(req, res)=>{
    const {username} = req.body
    console.log(username)
    
    try{
        const user = await User.findById(req.user._id);
        const userToFollow = await User.findOne({name: username});
        if(!userToFollow) {
            res.status(404).json({ message: 'user not found' });
        }
        //add userToFollow in the following of user
        await User.findByIdAndUpdate(user._id, {$addToSet:{following: userToFollow._id}}) 
        console.log(user)
        
        //add user in the followers of userToFollow
        await User.findByIdAndUpdate(userToFollow._id, {$addToSet:{followers: user._id}})
        console.log(userToFollow)

    res.status(200).json({ message: 'followed successfully' });
    }catch(e){
        console.error(e);
        res.status(500).json({ message: 'Server error' });
    }
}
export const unfollowUser = async(req, res)=>{
    const {username}= req.body;
    try{
        const user = await User.findById(req.user._id);
        const userToUnfollow = await User.findOne({name: username});
        if(!userToUnfollow) {
            res.status(404).json({ message: 'user not found' });
        }
        //remove userToFollow in the following of user
        await User.findByIdAndUpdate(user._id, {$pull:{following: userToUnfollow._id}}) 
        console.log(user)
        
        //remove user in the followers of userToFollow
        await User.findByIdAndUpdate(userToUnfollow._id, {$pull:{followers: user._id}})
        console.log(userToUnfollow)
        res.status(200).json({ message: 'unfollowed successfully' });

    }catch(e){
        res.status(404).json({message: e.message})
    }

}

export default fetchUser; 
