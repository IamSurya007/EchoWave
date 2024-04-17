import User from "../models/User.js";

const fetchUser = async (req, res) => {
    const {username} = req.body;
    try {
        const user = await User.findOne({name: username});
        res.json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

export default fetchUser;