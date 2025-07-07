import { compare } from 'bcrypt';
import { TryCatch } from '../middlewares/error.js';
import { cookieOptions, emitEvent, sendToken, uploadFilesToCloudinary } from '../utils/features.js';
import { ErrorHandler } from '../utils/utility.js';

//models
import { NEW_REQUEST, REFETCH_CHATS } from '../constants/events.js';
import { getOtherMember } from '../lib/helper.js';
import { Chat } from '../models/chat.js';
import { Request } from '../models/request.js';
import { User } from '../models/user.js';
//create new user, save to db, save in cookie
const newUser = TryCatch(
    async (req, res, next) => {

        const { name, username, password, bio } = req.body;
        const file = req.file
        if (!file)
            return next(new ErrorHandler('Please upload avatar', 400))
        const result = await uploadFilesToCloudinary([file])
        const avatar = {
            public_id: result[0].public_id,
            url: result[0].url,
        }
        const user = await User.create({
            name,
            bio,
            username,
            password,
            avatar,
        });
        sendToken(res, user, 201, "User Created")
    }
)
//Login user and save token in cookie
const login = TryCatch(async (req, res, next) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username }).select("+password");
    if (!user) return next(new ErrorHandler('User not found', 404));
    const isMatch = await compare(password, user.password);
    if (!isMatch) return next(new ErrorHandler('Invalid Username or Password', 404));
    sendToken(res, user, 200, `Welcome back, ${user.name}`);
});

const getMyProfile = TryCatch(async (req, res, next) => {
    const user = await User.findById(req.user);
    if (!user)
        return next(new ErrorHandler("User not found", 404));
    res.status(200).json({
        success: true,
        user,
    });
})
const logout = TryCatch(async (req, res) => {

    return res.status(200).cookie("chat-token", "", {
        ...cookieOptions,
        maxAge: 0,
    }).json({
        success: true,
        message: "Logged out successfully",
    });
})
const searchUser = TryCatch(async (req, res) => {
    const { name = "" } = req.query
    // finding all non group chats with me as a member
    const username = name;
    const myChats = await Chat.find({
        groupChat: false,
        members: req.user,
    })
    //all users who are my direct friends or i have chatted with
    const allUsersFromMyChats = myChats.flatMap((chat) => chat.members);
    allUsersFromMyChats.push(req.user);

    const allUsersExceptMyAndFriends = await User.find({
        _id: { $nin: allUsersFromMyChats },
        $or: [
            { name: { $regex: name, $options: "i" } },
            { username: { $regex: username, $options: "i" } }
        ]
        //case insensitive search}
    });

    const users = allUsersExceptMyAndFriends.map(({ _id, name, avatar, username }) => (
        {
            _id,
            name,
            avatar: avatar.url,
            username,
        }
    ))


    return res.status(200).json({
        success: true,
        users,
    });
})

const sendFriendRequest = TryCatch(async (req, res, next) => {
    const { userId } = req.body;
    const request = await Request.findOne({
        $or: [
            { sender: req.user, receiver: userId },
            { sender: userId, receiver: req.user }
        ]
    })
    if (request)
        return next(new ErrorHandler("Request Already Sent", 400));
    await Request.create({
        sender: req.user,
        receiver: userId,
    })
    emitEvent(
        req,
        NEW_REQUEST,
        [userId]
    )
    return res.status(200).json({
        success: true,
        message: "Friend Request Sent",
    });
})
const acceptFriendRequest = TryCatch(async (req, res, next) => {
    const { requestId, accept } = req.body;
    const request = await Request.findById(requestId)
        .populate("sender", "name")
        .populate("receiver", "name");
    if (!request) return next(new ErrorHandler("Request not found", 404));
    if (request.receiver._id.toString() !== req.user.toString())
        return next(new ErrorHandler("You are not authorized to accept this request", 401))
    if (!accept) {
        await request.deleteOne();
        return res.status(200).json({
            success: true,
            message: "Friend Request Rejected",
        });
    }
    const members = [request.sender._id, request.receiver._id];
    await Promise.all([
        Chat.create({
            members,
            name: `${request.sender.name}-${request.receiver.name}`
        }),
        request.deleteOne()
    ])
    emitEvent(req, REFETCH_CHATS, members);
    return res.status(200).json({
        success: true,
        message: "Friend Request Accepted",
        senderId: request.sender._id,
    });
})

const getMyNotifications = TryCatch(async (req, res) => {
    const requests = await Request.find({ receiver: req.user })
        .populate("sender", "name avatar");
    const allRequests = requests.map(({ _id, sender }) => ({
        _id,
        sender: {
            _id: sender._id,
            name: sender.name,
            avatar: sender.avatar.url,
        }
    }))
    return res.status(200).json({
        success: true,
        allRequests,
    });
})

const getMyFriends = TryCatch(async (req, res) => {
    const chatId = req.query.chatId;
    const chats = await Chat.find({
        members: req.user,
        groupChat: false,
    }).populate("members", "name avatar");
    const friends = chats.map(({ members }) => {
        const otherUser = getOtherMember(members, req.user);
        return {
            _id: otherUser._id,
            name: otherUser.name,
            avatar: otherUser.avatar.url,
        }
    })
    if (chatId) {
        const chat = await Chat.findById(chatId);
        const availableFriends = friends.filter(
            (friend) => !chat.members.includes(friend._id)
        );
        return res.status(200).json({
            success: true,
            friends: availableFriends,
        });
    }
    else {
        return res.status(200).json({
            success: true,
            friends,
        }); //
    }
})

export {
    acceptFriendRequest, getMyFriends, getMyNotifications, getMyProfile, login, logout, newUser, searchUser,
    sendFriendRequest
};
