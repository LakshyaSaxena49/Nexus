import Message from "../models/Message.js";
import User from "../models/User.js";

// Get all contacts (users) except the authenticated user
export const getAllContacts = async (req, res) => {
    try{
        const loggedInUserId = req.user._id;
        const filteredUsers = await User.find({ _id: { $ne: loggedInUserId } }).select('-password -email -createdAt -updatedAt -__v');  
        // find means i exclude the logged in user from the list
        
        res.status(200).json(filteredUsers);

    } catch (error) {
        console.error("Error in getAllContacts controller:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export const getMessagesByUserId = async (req, res) => {
    try {
        const myId = req.user._id;
        const {id: userToChatId} = req.params;

        // me and you
        // i send you the message
        // you send me the message
        const message = await Message.find({
            $or: [
                { senderId: myId, receiverId: userToChatId },
                { senderId: userToChatId, receiverId: myId },
            ],
        });

        res.status(200).json(message);

    } catch (error) {
        console.error("Error in getMessagesByUserId controller:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}