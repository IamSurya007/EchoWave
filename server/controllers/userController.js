import User from "../models/User.js";
import Post from "../models/Post.js";
import {uploadFile} from "../s3.js";
import jwt from 'jsonwebtoken'

const fetchUser = async (req, res) => {
    const {username} = req.body;
    try {
        const user = await User.findOne({name: username});
        const posts = await Post.find({user: user._id}).populate('user')
        res.json({user, posts});
    } catch (error) {
        console.error(error);
        res.status(500).json({message: 'Server error'});
    }
};

export const getUser = async (req, res) => {
    const {userId} = req.params;
    console.log(userId)
    try {
        const user = await User.findById(userId);
        res.json({user});
    } catch (error) {
        console.error(error);
        res.status(500).json({message: 'Server error'});
    }
};

export const editProfile = async (req, res) => {
    const {name, email, username} = req.body;
    try {
        const user = await User.findById(req.user._id);
        if (!user) {
            return res.status(404).json({message: "user not found"})
        }
        if (req.file) {
            await uploadFile(req.file, user.name, "userIcons")
            const userIcon = `https://${process.env.AWS_BUCKET_NAME_1}.s3.amazonaws.com/${user.name}/userIcons/${req.file.originalname}`
            req.body.userIcon = userIcon
        }
        const updatedUser = await User.findByIdAndUpdate(user._id, req.body, {new: true});
        res.json(updatedUser);
    } catch (e) {
        res.status(404).json({message: e.message})
    }
}

export const followUser = async (req, res) => {
    const {username} = req.body

    try {
        const user = await User.findById(req.user._id);
        const userToFollow = await User.findOne({name: username});
        if (!userToFollow) {
            res.status(404).json({message: 'user not found'});
        }
        //add userToFollow in the following of user
        await User.findByIdAndUpdate(user._id, {$addToSet: {following: userToFollow._id}})

        //add user in the followers of userToFollow
        await User.findByIdAndUpdate(userToFollow._id, {$addToSet: {followers: user._id}})

        res.status(200).json({message: 'followed successfully'});
    } catch (e) {
        console.error(e);
        res.status(500).json({message: 'Server error'});
    }
}
export const unfollowUser = async (req, res) => {
    const {username} = req.body;
    try {
        const user = await User.findById(req.user._id);
        const userToUnfollow = await User.findOne({name: username});
        if (!userToUnfollow) {
            res.status(404).json({message: 'user not found'});
        }
        //remove userToFollow in the following of user
        await User.findByIdAndUpdate(user._id, {$pull: {following: userToUnfollow._id}});

        //remove user in the followers of userToFollow
        await User.findByIdAndUpdate(userToUnfollow._id, {$pull: {followers: user._id}})
        res.status(200).json({message: 'unfollowed successfully'});

    } catch (e) {
        res.status(404).json({message: e.message})
    }

}

export default fetchUser;


export const fetchFollowers = async (req, res) => {
    const token = req.headers.authorization && req.headers.authorization.split(' ')[1];
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const currentUser = await User.findById(decoded._id);
        const followers = await User.find({_id: {$in: currentUser.followers}})
        res.json(followers);
    } catch (error) {
        res.json('error');
    }
}

export const getSuggestedUsers = async (req, res) => {
    const page = parseInt(req.query.page) || 0;
    const limit = parseInt(req.query.limit) || 10;
    try {
        const totalUsers = await User.countDocuments();
        const users = await User.find()
            .sort({createdAt: -1}) // Populate user field
            .skip((page) * limit)
            .limit(limit);
        res.json(users);
    } catch (err) {
        res.status(500).json({message: err.message});
    }
}

export const getUserFollowersByUserAccount = async (req, res) => {
    const {userAccountId} = req.query;
    try {
        const userAccount = await User.findById(userAccountId);
        const followers = await User.find({_id: {$in: userAccount.followers}});
        res.json(followers);
    } catch (error) {
        res.json(error);
    }
}
export const getUserFollowingByUserAccount = async (req, res) => {
    const {userAccountId} = req.query;
    try {
        const userAccount = await User.findById(userAccountId);
        const following = await User.find({_id: {$in: userAccount.following}});
        res.json(following);
    } catch (error) {
        res.json(error);
    }
}

export const updateAllUserImages = async (req, res) => {
    try {
        // Placeholder image URL
        const placeholderImage = "https://batman-uploads.s3.us-east-1.amazonaws.com/blank-profile-picture-973460_1280.webp";

        // Update all documents where the image link is invalid
        const result = await User.updateMany(
            { userIcon: { $exists: true } }, // Match documents where 'profile' exists
            { $set: { userIcon: placeholderImage } }, // Replace 'profile' with the placeholder
            { multi: true } // Update multiple documents
        );

        res.json({
            message: "Image links updated successfully",
            modifiedCount: result.nModified,
        });
    } catch (err) {
        console.error("Error updating image links:", err);
        res.status(500).json({ message: "An error occurred while updating image links" });
    }
};

