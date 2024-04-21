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

export default fetchUser;