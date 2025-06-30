import express from 'express';
import { adminLogin, adminLogout, allChats, allMessages, allUsers, getAdminData, getDashboardStats } from '../controllers/admin.controller.js';
import { adminLoginValidator, validateHandler } from '../lib/validators.js';
import { isAdmin } from '../middlewares/auth.js';

const app = express.Router();

// app.get('/');
app.post('/verify',adminLoginValidator(),validateHandler,adminLogin);
app.get('/logout',adminLogout);


//only admin must be able to access below routes
app.use(isAdmin)
app.get('/',getAdminData);
app.get('/users', allUsers);
app.get('/chats', allChats);
app.get('/messages', allMessages);
app.get('/stats',getDashboardStats);
export default app