import { useSocketEvents } from '6pp'
import { Box, Drawer, Skeleton } from '@mui/material'
import { useCallback, useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { NEW_MESSAGE_ALERT, NEW_REQUEST, ONLINE_USERS, REFETCH_CHATS } from '../../constants/events'
import { useErrors } from '../../hooks/hook'
import { getOrSaveFromStorage } from '../../lib/features'
import { useMyChatsQuery } from '../../redux/api/api'
import { incrementNotificationCount, setNewMessagesAlert } from '../../redux/reducers/chat'
import { setIsDeleteMenu, setIsMobile, setSelectedDeleteChat } from '../../redux/reducers/misc'
import { getSocket } from '../../socket'
import DeleteChatMenu from '../dialogs/DeleteChatMenu'
import Title from '../shared/Title'
import ChatList from '../specific/ChatList'
import Profile from '../specific/Profile'
import Header from './Header'

const AppLayout = ({ Component, ...props }) => {

  const params = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const chatId = params.chatId;
  const deleteMenuAnchor = useRef();
  const [onlineUsers,setOnlineUsers] = useState([])


  const socket = getSocket();
  const { isMobile } = useSelector((state) => state.misc);
  const { user } = useSelector((state) => state.auth);
  const {newMessagesAlert} = useSelector((state)=>state.chat)
  const { isLoading, data, isError, error, refetch } = useMyChatsQuery("")
  useErrors([{isError,error}])

  useEffect(()=>{
    getOrSaveFromStorage({key:NEW_MESSAGE_ALERT,value:newMessagesAlert})
  },[newMessagesAlert])

  const handleDeleteChat = (e, chatId, groupChat) => {
    dispatch(setIsDeleteMenu(true))
    dispatch(setSelectedDeleteChat({ chatId, groupChat }))
    deleteMenuAnchor.current = e.currentTarget;
  }

  const handleMobileClose = ()=> dispatch(setIsMobile(false))
  const newMessageAlertHandler = useCallback((data)=>{
    if(data.chatId === chatId)
      return;
    dispatch(setNewMessagesAlert(data))
  },[chatId])
  const newRequestListener = useCallback(()=>{
    dispatch(incrementNotificationCount())

  },[dispatch])
  
  
  const refetchListener = useCallback(()=>{
    refetch();
    navigate('/')
  },[refetch, navigate])
  
  
  const onlineUsersListener = useCallback((data)=>{
      setOnlineUsers(data);
  },[])

  const eventHandler = { 
    [NEW_MESSAGE_ALERT]: newMessageAlertHandler,
    [NEW_REQUEST]: newRequestListener,
    [REFETCH_CHATS]: refetchListener,
    [ONLINE_USERS]: onlineUsersListener,
   }
  useSocketEvents (socket, eventHandler);
  



  return (

    <>
      <Title />
      <Header />
      <DeleteChatMenu
      dispatch={dispatch}
      deleteMenuAnchor={deleteMenuAnchor}
      />
      {
        isLoading?<Skeleton/>:
        <Drawer open={isMobile}
         onClose={handleMobileClose}>
          <ChatList
            w='70vw'
                chats={data?.chats}
                chatId={chatId}
                handleDeleteChat={handleDeleteChat}
                newMessagesAlert={newMessagesAlert}
                onlineUsers={onlineUsers}
              />
        </Drawer>
      }
<div
  style={{
    height: 'calc(100vh - 4rem)',
    display: 'flex',
    padding: 0,
    margin: 0,
    boxSizing: 'border-box',
    overflow:'clip'
  }}
>


        <Box
          sx={{

            flex: {
              sm: 1,
              md: 3,
              lg: 3
            },
            display: { xs: 'none', sm: 'block' },
            
          }}
          height={'100%'}
        >

          {
            isLoading ? (<Skeleton />) : (
              <ChatList
                chats={data?.chats}
                chatId={chatId}
                handleDeleteChat={handleDeleteChat}
                newMessagesAlert={newMessagesAlert}
                onlineUsers={onlineUsers}
              />
            )
          }
        </Box>


        <Box
          sx={{
            flex: {
              xs: 1,
              sm: 2,
              md: 5,
              lg: 6
            },
            display: 'block',
            backgroundColor: 'rgba(0,0,0,0.05)',
          }}
          height={'100%'}
        >
          <Component {...props} user={user} chatId={chatId} />
        </Box>


        <Box
          height={'100%'}
          sx={{
            flex: {
              md: 4,
              lg: 3
            },
            display: { xs: 'none', md: 'block' },
            padding: '2rem',
            backgroundColor: 'rgba(0,0,0,0.85)',
            color: 'white',
          }}
        >
          <Profile user={user} />
        </Box>


      </div>
    </>
  )
}

export default AppLayout
