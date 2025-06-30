import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import { v4 as uuid } from 'uuid';

import { NEW_MESSAGE, NEW_MESSAGE_ALERT } from './constants/events.js';
import { getSockets } from './lib/helper.js';
import { errorMiddleware } from './middlewares/error.js';
import adminRoute from './routes/admin.js';
import chatRoute from './routes/chat.js';
import userRoute from './routes/user.js';
import { connectDB } from './utils/features.js';
import { Message } from './models/message.js';


dotenv.config({
    path: './.env',
})


const mongoURI = process.env.MONGO_URI_LOCAL
connectDB(mongoURI)




const port = process.env.PORT || 3000
const adminSecretKey = process.env.ADMIN_SECRET_KEY || "kinderheim@511";
const envMode = process.env.NODE_ENV.trim() || "PRODUCTION";

const userSocketIDs = new Map()


const app = express();
const server = createServer(app);
const io = new Server(server, {})

//middlewares
app.use(express.json());
app.use(cookieParser());

app.use('/user', userRoute)
app.use('/chat', chatRoute)
app.use('/admin', adminRoute)





app.get('/', (req, res) => {
    res.send('Hello World');
})

io.use((socket,next)=>{
    
})

io.on('connection', (socket) => {
    const user = {
        _id: "id no 1",
        name: "Don No 1",
        avatar: {
            public_id: "public id",
            url: "pic url"
        },
    }
    userSocketIDs.set(user._id.toString(), socket.id)
    console.log(userSocketIDs)
    socket.on(NEW_MESSAGE, async ({ chatId, members, message }) => {
        const messageForRealTime = {
            content: message,
            _id: uuid(),
            sender: {
                _id: user._id,
                name: user.name,
            },
            chat: chatId,
            createdAt: new Date().toISOString(),
        };
        const messageForDB = {
            content: message,
            sender: user._id,
            chat: chatId,
        };
        const membersSocket = getSockets(members);
        io.to(membersSocket).emit(NEW_MESSAGE, {
            chatId,
            message: messageForRealTime,
        })
        io.to(membersSocket).emit(NEW_MESSAGE_ALERT, { chatId })
        try {
            await Message.create(messageForDB);
        } catch (error) {
            console.log(error)
        }
        

    })
    socket.on("disconnect", () => {
        console.log("user disconnected")
        userSocketIDs.delete(user._id.toString())
    })
})

app.use(errorMiddleware)
server.listen(port, () => {
    console.log(`server is running at http://localhost:${port} in ${envMode} mode`)
})
export {
    adminSecretKey, envMode, userSocketIDs
};
