import jwt from "jsonwebtoken";

export const generateToken = (userId, res) => {
    const {JWT_SECRET, NODE_ENV} = process.env;
    if (!JWT_SECRET) {
        throw new Error("JWT_SECRET is not defined in environment variables");
    }

    const token = jwt.sign({userId}, JWT_SECRET,{
        expiresIn: '7d',
    });

    res.cookie("jwt", token, {
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        httpOnly: true, //prevent XSS attacks: cross-site scripting
        sameSite: "Strict", // CSRF protection: cross-site request forgery
        secure: NODE_ENV === "development" ? false : true, // set to true in production (HTTPS)
    });

    return token;
};