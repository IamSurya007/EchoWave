import Message from '../models/Message.js';

export const getAllChats = async (req, res) => {
    try {

    } catch (error) {
        res.json(error)
    }
}

export const getLastMessages = async (req, res) => {
    const currentUserId = req.user._id;
    const selectedUserId = req.params.username;

    try {
        const messages = await Message.find({
            $or: [
                { from: currentUserId, to: selectedUserId },
                { from: selectedUserId, to: currentUserId }
            ]
        })
            .sort({ timestamp: -1 })     // most recent first
            .limit(10)                    // get only 10
            .lean();                      // plain JS objects

        // Reverse to show oldest first in UI
        const sortedMessages = messages.reverse();

        res.status(200).json({ messages: sortedMessages });
    } catch (error) {
        console.error('Failed to get messages:', error);
        res.status(500).json({ message: 'Server error while fetching messages' });
    }
};

