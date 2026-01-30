import jwt from "jsonwebtoken";
import User from "../models/User.js";
import { ENV } from "../lib/env.js";

export const protectRoute = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;
    if (!token)
      return res
        .status(401)
        .json({ message: "Unauthorized - No token provided" });

    
    if(!ENV.JWT_SECRET){
      console.error("JWT_SECRET is not defined in environment variables");
      return res.status(500).json({ message: "Internal server error" });
    }    
    let decoded;
    try {
      decoded = jwt.verify(token, ENV.JWT_SECRET); //main kaam ki line
    } catch (err) {
      const msg = err.name === "TokenExpiredError" ? "Unauthorized - Token expired" : "Unauthorized - Invalid token"; 
      console.log(msg, err);
      return res.status(401).json({ message: msg });
    }

    const user = await User.findById(decoded.userId).select("-password"); // select everything but not password
    if (!user) return res.status(404).json({ message: "User not found" });

    req.user = user;
    next();
  } catch (error) {
    console.error("Error in protectRoute middleware:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
