import { TryCatch } from "../middlewares/error.js";
import { ErrorHandler } from "../utils/utility.js";
import { deleteFilesFromCloudinary, emitEvent, uploadFilesToCloudinary } from "../utils/features.js";
import { ALERT, NEW_MESSAGE, NEW_MESSAGE_ALERT, REFETCH_CHATS } from "../constants/events.js";
import { getOtherMember } from "../lib/helper.js";
//models
import { Chat } from '../models/chat.js'
import { User } from '../models/user.js';
import { Message } from '../models/message.js'


const newGroupChat = TryCatch(
    async (req, res, next) => {
        const { name, members } = req.body
        const allMembers = [...members, req.user];
        const admins = [req.user];
        await Chat.create({
            name,
            groupChat: true,
            creator: req.user,
            admins,
            members: allMembers
        });
        emitEvent(req, ALERT, allMembers, `Welcome to ${name} group`);
        emitEvent(req, REFETCH_CHATS, members)


        return res.status(201).json({
            status: true,
            message: `Group chat ${name} created succesfully`,
        })
    }
)
const getMyChats = TryCatch(
    async (req, res, next) => {
        const chats = await Chat.find({ members: req.user }).populate(
            "members",
            "name avatar"
        )



        const transformedChats = chats.map(({ _id, name, members, groupChat }) => {
            const otherMember = getOtherMember(members, req.user);

            return {
                _id,
                groupChat,
                avatar: groupChat
                    ? members.slice(0, 3).map((m) => m?.avatar?.url || '')
                    : [otherMember?.avatar?.url || ''],
                name: groupChat
                    ? name
                    : otherMember?.name || 'Unknown User',
                members: members.reduce((prev, curr) => {
                    if (curr._id.toString() !== req.user.toString()) {
                        prev.push(curr._id);
                    }
                    return prev;
                }, []),
            };
        });


        return res.status(200).json({
            status: true,
            chats: transformedChats,
        })
    }
)
const getMyGroups = TryCatch(
    async (req, res, next) => {
        const chats = await Chat.find({
            members: req.user,
            groupChat: true,
            admins: req.user,
        }).populate("members", "name avatar");
        const groups = chats.map(({ members, _id, groupChat, admins, name, creator }) => (
            {
                _id,
                groupChat,
                name,
                creator,
                admins,
                avatar: members.slice(0, 3).map(({ avatar }) => avatar.url),
            }
        ))
        return res.status(200).json({
            status: true,
            groups,
        })
    }
)
const addMembers = TryCatch(
    async (req, res, next) => {
        const { chatId, members } = req.body;



        const chat = await Chat.findById(chatId);

        if (!chat) return next(new ErrorHandler("Chat not found", 404));

        if (!chat.groupChat) return next(new ErrorHandler("This ain't group chat", 400));

        const isGroupAdmin = chat.admins.includes(req.user);

        if (!isGroupAdmin) return next(new ErrorHandler("You are not allowed to add members", 403));


        const allNewMembersPromise = members.map((i) => User.findById(i, "name"));
        const allNewMembers = await Promise.all(allNewMembersPromise);
        const uniqueMembers = allNewMembers.filter((i) => !chat.members.includes(i._id.toString())).map((i) => i._id);

        chat.members.push(...uniqueMembers);

        if (chat.members.length > 100)
            return next(new ErrorHandler("Group members limit reached", 400));

        await chat.save();

        const allUsersName = allNewMembers.map((i) => i.name).join(", ");
        emitEvent(
            req,
            ALERT,
            chat.members,
            `${allUsersName} has been added in the group`
        )
        emitEvent(
            req,
            REFETCH_CHATS,
            chat.members
        )
        return res.status(200).json({
            status: true,
            message: "Members added succesfully"
        })
    }
)
const addAdmin = TryCatch(
    async (req, res, next) => {
        const { chatId, userId } = req.body;
        const chat = await Chat.findById(chatId);
        const user = await User.findById(userId);


        if (!chat) return next(new ErrorHandler("Chat not found", 404));

        if (!chat.groupChat) return next(new ErrorHandler("This ain't group chat", 400));
        const oldAdmins = chat.admins
        const isGroupAdmin = oldAdmins.includes(req.user)

        if (!isGroupAdmin) return next(new ErrorHandler("You are not allowed to assign admins", 403));

        const updatedAdmins = [...oldAdmins, userId]
        chat.admins = updatedAdmins;
        await chat.save();

        emitEvent(
            req,
            ALERT,
            chat.members,
            `${user.name} is an admin now`
        )
        emitEvent(
            req,
            REFETCH_CHATS,
            chat.members
        )
        return res.status(200).json({
            status: true,
            message: `${user.name} is an admin now`,
        })
    }
)
const removeAdmin = TryCatch(
    async (req, res, next) => {
        const { chatId, userId } = req.body;
        const chat = await Chat.findById(chatId);
        const user = await User.findById(userId);


        if (!chat) return next(new ErrorHandler("Chat not found", 404));

        if (!chat.groupChat) return next(new ErrorHandler("This ain't group chat", 400));
        const oldAdmins = chat.admins 
        const isGroupAdmin = oldAdmins.includes(req.user)
         

        if (!isGroupAdmin) return next(new ErrorHandler("You are not allowed to perform this action", 403));
        if (!oldAdmins.includes(userId)) return next(new ErrorHandler(`${user.name} is not an admin`, 400));
        

        const newAdmins = oldAdmins.filter(admin => admin.toString() !== userId.toString());
        chat.admins = newAdmins;
        await chat.save();

        emitEvent(
            req,
            ALERT,
            chat.members,
            `${user.name} is an admin now`
        )
        emitEvent(
            req,
            REFETCH_CHATS,
            chat.members
        )
        return res.status(200).json({
            status: true,
            message: `${user.name} is no longer an admin now`,
        })
    }
)
const removeMember = TryCatch(
    async (req, res, next) => {
        const { userId, chatId } = req.body;
        const [chat, userThatWillBeRemoved] = await Promise.all([
            Chat.findById(chatId),
            User.findById(userId, "name")
        ])
        if (!chat) return next(new ErrorHandler("Chat Not Found", 404));

        if (!chat.groupChat) return next(new ErrorHandler("This ain't group chat", 400));

        const admins = chat.admins;
        const isGroupAdmin = admins.includes(req.user)



        if (!isGroupAdmin) return next(new ErrorHandler("You are not allowed to remove members", 403));

        if (chat.creator.toString() === userId.toString() && req.user.toString() !== chat.creator.toString()) return next(new ErrorHandler("You are not Allowed to Remove Group Owner", 403));


        if (chat.members.length <= 3) return next(new ErrorHandler("Group must have atleast 3 members, Try Deleting the group", 400));
        const userIsGroupAdmin = admins.includes(userId)
        const newAdmins = userIsGroupAdmin ? admins.filter(admin => admin.toString() !== userId.toString()) : admins
        

        const allChatMembers = chat.members.map((i) => i.toString());

        chat.admins= newAdmins;
        chat.members = chat.members.filter(
            (member) => member.toString() !== userId.toString()
        )
        await chat.save();
        emitEvent(
            req,
            ALERT,
            chat.members,
            {
            message:`${userThatWillBeRemoved.name}'s a** got kicked`,
            chatId
            }
        )
        emitEvent(
            req,
            REFETCH_CHATS,
            allChatMembers,
        )
        return res.status(200).json({
            status: true,
            message: "Member Removed Succesfuly"
        });

    }
)
const leaveGroup = TryCatch(
    async (req, res, next) => {

        const chatId = req.params.id;

        const chat = await Chat.findById(chatId)
        if (!chat)
            return next(new ErrorHandler("Chat Not Found", 404));
        if (!chat.groupChat)
            return next(new ErrorHandler("This ain't group chat", 400));


        const remainingMembers = chat.members.filter(
            (member) => member.toString() !== req.user.toString()
        )

        if (remainingMembers.length < 3)
            return next(new ErrorHandler("Group must have atleast 3 members", 400));

        if (chat.creator.toString() === req.user.toString()) {
            const randomIndex = Math.floor(Math.random() * remainingMembers.length)
            const newCreator = remainingMembers[randomIndex]
            chat.creator = newCreator;
        }

        chat.members = remainingMembers

        const [user] = await Promise.all([
            User.findById(req.user, "name"),
            chat.save()
        ])


        emitEvent(
            req,
            ALERT,
            chat.members,
            {
                message:
            `User ${user.name} has left the group`,
                chatId
            }
        )
        emitEvent(
            req,
            REFETCH_CHATS,
            chat.members
        )
        return res.status(200).json({
            status: true,
            message: "Group Left Succesfully"
        });

    }
)
const sendAttachments = TryCatch(
    async (req, res, next) => {
        const { chatId } = req.body;

        const files = req.files || [];
        const content = req.content || "";


        if (files.length < 1)
            return next(new ErrorHandler("Please Upload Attachments", 400))
        if (files.length > 5)
            return next(new ErrorHandler("Max 5 files allowed", 400))

        const [chat, me] = await Promise.all([
            Chat.findById(chatId),
            User.findById(req.user, "name")
        ])


        if (!chat)
            return next(new ErrorHandler("Chat Not Found", 404));

        if (files.length < 1)
            return next(new ErrorHandler("Please add attachments", 400));

        //upload files
        const attachments = await uploadFilesToCloudinary(files);

        const messageForDB = {
            content,
            attachments,
            sender: me._id,
            chat: chatId
        }
        const messageForRealTime = {
            ...messageForDB,
            sender: {
                _id: me._id,
                name: me.name,
            }
        }
        const message = await Message.create(messageForDB);
        emitEvent(
            req,
            NEW_MESSAGE,
            chat.members,
            {
                message: messageForRealTime,
                chatId,
            }
        );
        emitEvent(
            req,
            NEW_MESSAGE_ALERT,
            chat.members,
            { chatId }
        )
        return res.status(200).json({
            status: true,
            message,
        })
    }
)
const getChatDetails = TryCatch(
    async (req, res, next) => {
        if (req.query.populate === "true") {
            const chat = await Chat.findById(req.params.id)
                .populate("members", "name avatar")
                .lean();
            if (!chat)
                return next(new ErrorHandler("Chat Not Found", 404))

            chat.members = chat.members.map(({ _id, name, avatar }) => (
                {
                    _id,
                    name,
                    avatar: avatar.url,
                }
            ))
            return res.status(200).json({
                status: true,
                chat,
            })
        } else {

            const chat = await Chat.findById(req.params.id);
            if (!chat)
                return next(new ErrorHandler("Chat Not Found", 404))
            return res.status(200).json({
                status: true,
                chat,
            })
        }
    }
)
const renameGroup = TryCatch(
    async (req, res, next) => {
        const chatId = req.params.id;
        const { name } = req.body;
        const chat = await Chat.findById(chatId);
        if (!chat)
            return next(new ErrorHandler("Chat Not Found", 404));
        if (!chat.groupChat)
            return next(new ErrorHandler("This ain't group chat", 400));
        if (chat.creator.toString() !== req.user.toString())
            return next(new ErrorHandler("You are not allowed to rename the group", 403));
        chat.name = name;
        await chat.save();
        emitEvent(
            req,
            REFETCH_CHATS,
            chat.members
        );
        return res.status(200).json({
            success: true,
            message: "Group Renamed Succesfully"
        })

    }
)
const deleteChat = TryCatch(
    async (req, res, next) => {
        const chatId = req.params.id;
        const chat = await Chat.findById(chatId)
        if (!chat)
            return next(new ErrorHandler("Chat Not Found", 404));
        const members = chat.members;
        if (chat.groupChat && chat.creator.toString() !== req.user.toString())
            return next(new ErrorHandler("You are not allowed to delete the group", 403));


        if (!chat.groupChat && !chat.members.includes(req.user.toString())) {
            return next(new ErrorHandler("You are not allowed to delete the chat", 403));
        }


        // delete all messages as well as attchments or files from cloudinary
        const messagesWithAttachments = await Message.find({
            chat: chatId,
            attachments: { $exists: true, $ne: [] },
        });

        const public_ids = [];
        messagesWithAttachments.forEach(({ attachments }) =>
            attachments.forEach(({ public_id }) =>
                public_ids.push(public_id)
            )
        );

        await Promise.all([
            //delete files from cloudinary
            deleteFilesFromCloudinary(public_ids),
            Chat.deleteOne({ _id: chatId }),
            Message.deleteMany({ chat: chatId }),
        ]);

        emitEvent(
            req,
            REFETCH_CHATS,
            members,
        )

        return res.status(200).json({
            success: true,
            message: "Chat Deleted Succesfully"
        })

    }
)
const getMessages = TryCatch(
    async (req, res, next) => {
        const chatId = req.params.id;
        const { page = 1 } = req.query;
        const resultPerPage = 20;
        const skip = (page - 1) * resultPerPage;
        const chat = await Chat.findById(chatId);
        if (!chat)
            return next(new ErrorHandler("Chat Not Found", 404))
        if (!chat.members.includes(req.user.toString()))
            return next(new ErrorHandler("You are not allowed to access this chat", 403))
        const [messages, totalMessageCount] = await Promise.all(
            [
                Message
                    .find({ chat: chatId })
                    .sort({ createdAt: -1 })
                    .skip(skip)
                    .limit(resultPerPage)
                    .populate("sender", "name avatar")
                    .lean(),

                Message.countDocuments({ chat: chatId })
            ]
        )
        const totalPages = Math.ceil(totalMessageCount / resultPerPage) || 0;

        return res.status(200).json({
            status: true,
            messages: messages.reverse(),
            totalPages,
        })
    }
)
export {
    newGroupChat,
    getMyChats,
    getMyGroups,
    addMembers,
    removeMember,
    leaveGroup,
    sendAttachments,
    getChatDetails,
    renameGroup,
    deleteChat,
    getMessages,
    addAdmin,
    removeAdmin,
}