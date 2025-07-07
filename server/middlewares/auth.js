import { adminSecretKey } from "../app.js";
import { User } from "../models/user.js";
import { ErrorHandler } from "../utils/utility.js";
import { TryCatch } from "./error.js";
import jwt from 'jsonwebtoken'
const isAuthenticated = TryCatch(
    (req,res,next)=>{
    const token = req.cookies['chat-token'];
    if(!token)
        return next(new ErrorHandler("Please login to access this page",401));
    const decodedData = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decodedData._id
    next();
}
)
const isAdmin = (req,res,next)=>{
    const token = req.cookies['chat-admin-token'];
    if(!token)
        return next(new ErrorHandler("Permission Denied!,Only admin can access this route",401));
    const secretKey = jwt.verify(token, process.env.JWT_SECRET);
    const isMatched = secretKey === adminSecretKey

    if(!isMatched)
        return next(new ErrorHandler("Permission Denied!,Only admin can access this route",401))
    next();
}
const socketAuthenticator = async (err,socket,next)=>{
    try {

        if(err)
            return next(err)
        const authToken = socket.request.cookies['chat-token']
        if(!authToken)
            return next(new ErrorHandler("Please login to access this route", 401))
        const decodedData = jwt.verify
        (authToken, process.env.JWT_SECRET);
        const user = await User.findById(decodedData._id)
        if(!user)
            return next(new ErrorHandler("Please login to access this route",401))
        socket.user = user
        return next();


    } catch (error) {
        console.log(error)
        return next(new ErrorHandler("Please login to access this route",401))
    }
}
export {
    isAuthenticated,
    isAdmin,
    socketAuthenticator,
}