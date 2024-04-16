import User from '../models/User.js';

const searchUsers = async (req, res) => {
    const query = req.query.q;
    // Get search query from request query parameters
    try {
        const users = await User.find({ 
            name: { $regex: '^' + query, $options: 'i' }
        });
        res.json(users);    
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
}

export default searchUsers;