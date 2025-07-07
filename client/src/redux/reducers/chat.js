import { createSlice } from "@reduxjs/toolkit";
import { getOrSaveFromStorage } from "../../lib/features";
import { NEW_MESSAGE_ALERT } from "../../constants/events";

const initialState={
    notificationCount:0,
    newMessagesAlert: getOrSaveFromStorage({key:NEW_MESSAGE_ALERT,get:true})|| [
        {
            chatId:'',
            count:0,
        }, 
    ]
};

const chatSlice = createSlice({
    name:"chat",
    initialState,
    reducers:{
        incrementNotificationCount:(state)=>{
            state.notificationCount+=1;
        },
        resetNotificationCount:(state)=>{
            state.notificationCount=0;
        },
        setNewMessagesAlert:(state,action)=>{
            const chatId = action.payload.chatId;
            const index = state.newMessagesAlert.findIndex(
                (item)=>item.chatId === chatId
            )
            if(index !== -1){
                state.newMessagesAlert[index].count +=1;

            }else{
                state.newMessagesAlert.push(
                    {
                        chatId,
                        count:1,
                    }
                )
            }
        },
        removeNewMessagesAlert:(state,action)=>{
            state.newMessagesAlert = state.newMessagesAlert.filter((item)=>item.chatId !== action.payload)
        }
        // setIsNewGroup:(state,action)=>{
        //     state.isNewGroup=action.payload;
        // },
        // setIsAddMember:(state,action)=>{
        //     state.isAddMember=action.payload;
        // },
        // setIsNotification:(state,action)=>{
        //     state.isNotification=action.payload;
        // },
        // setIsMobile:(state,action)=>{
        //     state.isMobile=action.payload;
        // },
        // setIsSearch:(state,action)=>{
        //     state.isSearch=action.payload;
        // },
        // setIsFileMenu:(state,action)=>{
        //     state.isFileMenu=action.payload;
        // },
        // setIsDeleteMenu:(state,action)=>{
        //     state.isDeleteMenu=action.payload;
        // },
        // setUploadingLoader:(state,action)=>{
        //     state.uploadingLoader=action.payload;
        // },
        // setSelectedDeleteChat:(state,action)=>{
        //     state.selectedDeleteChat=action.payload;
        // },
    },
})

export default chatSlice;
export const {
    incrementNotificationCount,
    resetNotificationCount,
    setNewMessagesAlert,
    removeNewMessagesAlert,

} = chatSlice.actions;