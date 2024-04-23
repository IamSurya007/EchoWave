import User from "../models/User.js";
import Post from "../models/Post.js";

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

export const followUser = async(req, res)=>{
    const {username} = req.body
    console.log(username)
    
    try{
        const user = await User.findById(req.user.userId);
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

export default fetchUser; 