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