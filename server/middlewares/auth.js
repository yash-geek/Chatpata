import { adminSecretKey } from "../app.js";
import { ErrorHandler } from "../utils/utility.js";
import { TryCatch } from "./error.js";
import jwt from 'jsonwebtoken'
const isAuthenticated = (req,res,next)=>{
    const token = req.cookies['chat-token'];
    if(!token)
        return next(new ErrorHandler("Please login to access this page",401));
    const decodedData = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decodedData._id
    next();
}
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
export {
    isAuthenticated,
    isAdmin
}