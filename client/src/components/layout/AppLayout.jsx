import React, { useEffect, useState } from 'react'
import Header from './Header'
import Title from '../shared/Title'
import ChatList from '../specific/ChatList'
import { sampleChat } from '../../constants/sampleData'
import { useParams } from 'react-router-dom'
import Profile from '../specific/Profile'
import {ArrowLeft, ArrowRight, Menu as MenuIcon} from '@mui/icons-material'
import { Box, Drawer, IconButton } from '@mui/material'
import { grayBg } from '../../constants/color'

const AppLayout = ({ Component, ...props }) => {
  const [width, setWidth] = useState(window.innerWidth)
  const params = useParams();
  const chatId = params.chatId;

  const handleDeleteChat = (e, _id, groupChat) => {
    e.preventDefault();
    console.log(`Delete chat with id: ${_id}, groupChat: ${groupChat}`);

  }

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])



  return (
    
    <>
      <Title />
      <Header />

      <div
        style={{
          height: 'calc(100vh - 4rem)',
          display: 'flex',
          padding: 0,
          margin: 0,
          boxSizing: 'border-box',
        }}
      >


        <Box
          sx={{
            
            flex: {
              sm:1,
              md:3,
              lg:3
            },
            display: {xs:'none', sm:'block'},
          }}
          height={'100%'}
        >
          
          <ChatList
            chats={sampleChat}
            chatId={chatId}
            handleDeleteChat={handleDeleteChat}
          />
        </Box>


        <Box
          sx={{
            flex: {
              xs:1,
              sm:2,
              md:5,
              lg:6
            },
            display:'block',
            backgroundColor: 'rgba(0,0,0,0.05)',
          }}
          height={'100%'}
        >
          <Component {...props} />
        </Box>


        <Box
          height={'100%'}
          sx={{
            flex: {
              md:4,
              lg:3
            },
            display: {xs:'none',md:'block'},
            padding:'2rem',
            backgroundColor: 'rgba(0,0,0,0.85)',
            color: 'white',
          }}
        >
          <Profile />
        </Box>


      </div>
    </>
  )
}

export default AppLayout
