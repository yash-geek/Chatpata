import { Menu, Typography } from '@mui/material'
import { Stack } from '@mui/material'
import React from 'react'
import { useSelector } from 'react-redux'
import { setIsDeleteMenu } from '../../redux/reducers/misc'
import { Delete as DeleteIcon, ExitToApp as ExitToAppIcon } from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'
import { useAsyncMutation } from '../../hooks/hook'
import { useDeleteChatMutation, useLeaveGroupMutation } from '../../redux/api/api'
import { useEffect } from 'react'

const DeleteChatMenu = (
    {dispatch, deleteMenuAnchor}
) => {
    const navigate = useNavigate();
    const {isDeleteMenu, selectedDeleteChat} = useSelector((state)=>state.misc)
    const [deleteChat,_,deleteChatData] = useAsyncMutation(useDeleteChatMutation)
    const [leaveGroup,__,leaveGroupData] = useAsyncMutation(useLeaveGroupMutation)

    const isGroup = selectedDeleteChat.groupChat;
    const onCloseHandler =()=>{
        dispatch(setIsDeleteMenu(false));
        deleteMenuAnchor.current = null;
    }
    const leaveGroupHandler = ()=>{
        onCloseHandler();
        leaveGroup("Leaving Group...",selectedDeleteChat.chatId)
    }
    const deleteChatHandler = ()=>{
        onCloseHandler();
        deleteChat("Deleting Chat...",selectedDeleteChat.chatId)
    }
    useEffect(()=>{
        if(deleteChatData || leaveGroupData)
            navigate('/')
    },[deleteChatData,leaveGroupData])
  return (
    <Menu 
    open={isDeleteMenu} 
    onClose={onCloseHandler}
    anchorEl={deleteMenuAnchor.current}
    anchorOrigin={{
        vertical:'bottom',
        horizontal:'right'
    }}
    transformOrigin={{
        vertical:'center',
        horizontal:'center'
    }}
    >
        <Stack
        sx={{
            width:'10rem',
            padding:'0.5rem',
            cursor:'pointer',
        }}
        direction={'row'}
        alignItems={'center'}
        spacing={'0.5rem'}
        onClick={isGroup?leaveGroupHandler:deleteChatHandler}
        >
            {
                selectedDeleteChat.groupChat?
                (
                <>
                <ExitToAppIcon/>
                <Typography>
                    Leave Group
                </Typography>
                </>
                )
                :
                (
                <>
                <DeleteIcon color='error' />
                <Typography color='error'>
                    Delete Chat
                </Typography>
                </>
                )

            }

        </Stack>
    </Menu>
  )
}

export default DeleteChatMenu