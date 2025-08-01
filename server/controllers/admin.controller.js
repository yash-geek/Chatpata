import { TryCatch } from "../middlewares/error.js";
import { Chat } from "../models/chat.js";
import { Message } from "../models/message.js";
import { User } from "../models/user.js";
import { ErrorHandler } from "../utils/utility.js";
import jwt from 'jsonwebtoken'
import {cookieOptions} from '../utils/features.js'
import { adminSecretKey } from "../app.js";

const adminLogin = TryCatch(
    async (req,res,next)=>{
        const {secretKey} = req.body;
        const isMatched = secretKey === adminSecretKey;
        if(!isMatched)
            return next(new ErrorHandler('Invalid Admin Key',401))
        const token = jwt.sign(secretKey,process.env.JWT_SECRET);
        return res.status(200).cookie('chat-admin-token',token,{...cookieOptions,
            maxAge:1000*60*15,
        }).json({
            success:true,
            message:"Authentication Successfull, Welcome Admin",
        })
    }
)
const adminLogout = TryCatch(
    async (req,res,next)=>{

        return res.status(200).cookie('chat-admin-token',"",{...cookieOptions,
            maxAge:0,
        }).json({
            success:true,
            message:"Logged Out Successfully, Admin, See You Soon :",
        })
    }
)

const getAdminData = TryCatch(
    async (req,res,next)=>{
        return res.status(200).json({
            admin:true
        })
    }
)

const allUsers = TryCatch(
    async (req,res,next)=>{
        const users = await User.find({});
        const transformedUsers = await Promise.all(users.map(async ({name,username,avatar,_id, createdAt})=>{
            const [groups, friends]  = await Promise.all([
                Chat.countDocuments({
                groupChat: true,
                members: _id,
                }),
                Chat.countDocuments({
                groupChat: false,
                members: _id,
                })
            ])
            return {
                name,
                username,
                avatar: avatar.url,
                _id,
                groups,
                friends,
                createdAt,
            }
        }))
        return res.status(200).json({
            success:true,
            users:transformedUsers,
        })
    }
)
const allChats = TryCatch(
    async (req,res)=>{
        const chats = await Chat.find({})
        .populate("members","name avatar")
        .populate("creator", "name avatar")


        const transformedChat = await Promise.all(
            chats.map(async ({_id, name, groupChat, creator, members})=>{
                const totalMessages = await Message.countDocuments({chat:_id});
                return {
                    _id,
                    name,
                    groupChat,
                    avatar:members.slice(0,3).map((member)=>member.avatar.url),
                    members: members.map(({_id, name, avatar})=>({
                        _id,
                        name,
                        avatar: avatar.url,
                    })),
                    creator:{
                        name: creator?.name || "None",
                        avatar: creator?.avatar.url || "",
                    },
                    totalMembers:members.length,
                    totalMessages,
                }
            })
        )

        return res.status(200).json({
            success:true,
            chats: transformedChat,
        })
    }
)
const allMessages = TryCatch(
    async (req,res)=>{
        const messages = await Message.find({})
        .populate('sender','name avatar')
        .populate('chat','groupChat')
        console.count("console")
        const transformedMessages = messages.map((
            {_id, 
            sender, 
            content, 
            chat,
            attachments, 
            createdAt})=>{
            return {
            _id,
            attachments:attachments || [],
            content,
            sender:{
                _id: sender?._id,
                name:sender?.name,
                avatar:sender?.avatar.url,
            },
            chat:chat?._id,
            groupChat:chat?.groupChat,
            time:createdAt,
            }
        })
        return res.status(200).json({
            success:true,
            messages: transformedMessages,
        })
    }
)
const getDashboardStats = TryCatch(
    async (req,res)=>{
        const [groupsCount, usersCount, messagesCount,totalChatsCount] = await Promise.all([
            Chat.countDocuments({groupChat:true}),
            User.countDocuments(),
            Message.countDocuments(),
            Chat.countDocuments()
        ]);

        const today = new Date();
        const last7Days = new Date();
        last7Days.setDate(last7Days.getDate() - 7);

        const last7DaysMessages = await Message.find({
            createdAt:{
                $gte: last7Days, 
                $lte: today
            }
        }).select("createdAt");



        const messages = new Array(7).fill(0);
        const dayInMilliSeconds = 1000*60*60*24;
        last7DaysMessages.forEach(message=>{
            const indexApprox = (today.getTime() - message.createdAt.getTime())/(dayInMilliSeconds);
            const index = Math.floor(indexApprox);
            messages[6-index]++;

        })
        const stats = {
            groupsCount, 
            usersCount, 
            messagesCount,
            totalChatsCount,
            messagesChart:messages,
        }
        return res.status(200).json({
            success:true,
            stats,
        })
    }
)
export {
    adminLogin,
    getAdminData,
    allUsers,
    allChats,
    allMessages,
    getDashboardStats,
    adminLogout,

}