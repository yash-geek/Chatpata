import { faker, simpleFaker } from "@faker-js/faker";
import { User } from "../models/user.js";
import { Chat } from "../models/chat.js";
import { Message } from "../models/message.js";


const createSingleChats = async (numChats) => {
    try {
        const users = await User.find().select("_id");
        const chatsPromise = [];
        for (let i = 0; i < users.length; i++) {
            for (let j = i + 1; j < users.length; j++) {
                chatsPromise.push(
                    Chat.create({
                        name: faker.lorem.word(2),
                        members: [users[i], users[j]]
                    })
                )
            }
        }
        await Promise.all(chatsPromise)

        console.log("Chats created succesfully");
        process.exit();
    } catch (err) {
        console.log(err)
        process.exit(1)
    }

}
const createGroupChats = async (numChats) => {
    try {
        const users = await User.find().select("_id");
        const chatsPromise = [];
        for (let i = 0; i < numChats; i++) {
            const numMembers = simpleFaker.number.int({ min: 3, max: users.length })
            const members = []
            for (let i = 0; i < numMembers; i++) {
                const randomIndex = Math.floor(Math.random() * users.length)
                const randomUser = users[randomIndex]
                if (!members.includes(randomUser)) {
                    members.push(randomUser)
                }
            }
            const chat = Chat.create({
                groupChat: true,
                name: faker.lorem.word(2),
                members,
                creator: members[0]

            })
            chatsPromise.push(chat)
        }
        await Promise.all(chatsPromise)

        console.log("Chats created succesfully");
        process.exit();
    } catch (err) {
        console.log(err)
        process.exit(1)
    }
}

const createMessages = async (numMessages) => {
    try {
        const users = await User.find().select("_id");
        const chats = await Chat.find().select("_id");
        const messagesPromise = [];
        for (let i = 0; i < numMessages; i++) {
            const randomUser = users[Math.floor(Math.random() * users.length)]
            const randomChat = chats[Math.floor(Math.random() * chats.length)]
            messagesPromise.push(
                Message.create({
                    chat: randomChat,
                    sender: randomUser,
                    content: faker.lorem.sentence(5)
                })
            )
        }
        await Promise.all(messagesPromise)
        console.log("Messages created succesfully")
        process.exit()
    } catch (err) { 
        console.log(err)
        process.exit(1)
    }
}

const createMessagesInAChat = async (chatId, numMessages) => {
    try {
        const users = await User.find().select("_id");
        const messagesPromise = [];
        for (let i = 0; i < numMessages; i++) {
            const randomUser = users[Math.floor(Math.random() * users.length)]
            messagesPromise.push(
                Message.create({
                    chat: chatId,
                    sender: randomUser,
                    content: faker.lorem.sentence(5)
                })
            )
        }
        await Promise.all(messagesPromise)
        console.log("Messages created succesfully")
        process.exit()
    } catch (err) {
        console.log(err)
        process.exit(1)
    }
}

export {
    createSingleChats,
    createGroupChats,
    createMessages,
    createMessagesInAChat
}