import express from 'express';
import { addAdmin, removeAdmin, addMembers, deleteChat, getChatDetails, getMessages, getMyChats, getMyGroups, leaveGroup, newGroupChat, removeMember, renameGroup, sendAttachments } from '../controllers/chat.js';
import { addAdminValidator, addMemberValidator, chatIdValidator, newGroupValidator, removeMemberValidator, renameValidator, sendAttachmentsValidator, validateHandler } from '../lib/validators.js';
import { isAuthenticated } from '../middlewares/auth.js';
import { attachmentMulter } from '../middlewares/multer.js';

const app = express.Router();


//After here user need to login
app.use(isAuthenticated);


app.post('/new', newGroupValidator(), validateHandler,newGroupChat)
app.get('/my',getMyChats)
app.get('/my/groups',getMyGroups)
app.put('/addmembers',addMemberValidator(),validateHandler,addMembers)
app.put('/removemember',removeMemberValidator(),validateHandler,removeMember)
app.delete('/leave/:id',chatIdValidator(),validateHandler,leaveGroup)

// send attachment
app.post('/message',attachmentMulter,
    sendAttachmentsValidator(),
    validateHandler,
    sendAttachments)
// get messages
app.get('/message/:id', chatIdValidator(), validateHandler, getMessages);
// get chat detail, rename, delete
app.put('/addadmin',addAdminValidator(),validateHandler,addAdmin)
app.put('/removeadmin',addAdminValidator(),validateHandler,removeAdmin)
app.route('/:id')
.get(chatIdValidator(), validateHandler,getChatDetails)
.put(renameValidator(), validateHandler, renameGroup)
.delete(chatIdValidator(),validateHandler,deleteChat)





export default app