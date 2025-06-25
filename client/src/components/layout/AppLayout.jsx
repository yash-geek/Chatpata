import React, { useEffect, useState } from 'react'
import Header from './Header'
import Title from '../shared/Title'
import ChatList from '../specific/ChatList'
import { sampleChat } from '../../constants/sampleData'
import { useParams } from 'react-router-dom'
import Profile from '../specific/Profile'
import {ArrowLeft, ArrowRight, Menu as MenuIcon} from '@mui/icons-material'
import { Drawer, IconButton } from '@mui/material'
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

  const [isMobile,setIsMobile] = useState(false);
  const handleMobile = ()=>{
    setIsMobile((prev)=>!prev)
  }
  const closeHandler = ()=>{
    setIsMobile(false)
  }

  return (
    
    <>
      <Title />
      <Header />

      <div
        style={{
          height: '90%',
          display: 'flex',
          padding: 0,
          margin: 0,
          boxSizing: 'border-box',
        }}
      >


        <div
          style={{
            
            flex: 1,
            display: width < 600 ? 'none' : 'block',
            backgroundColor: 'rgba(0,0,0,0.15)',
          }}
        >
          <ChatList
            chats={sampleChat}
            chatId={chatId}
            handleDeleteChat={handleDeleteChat}
          />
        </div>


        <div
          style={{
            position:'relative',
            flex: 3,
            display:'block',
            backgroundColor: 'rgba(0,0,0,0.05)',
            
          }}
        >
          
          
          {
          <IconButton
          
          sx={{
            position:'fixed',
            top:'10rem' ,
            left:'2rem',
            cursor:'pointer',
            display:{
              xs:'block',
              sm:'none',
            },
            backgroundColor:grayBg,
            padding:'10px'
          
          }}
          onClick={handleMobile}
          >
            <ArrowRight
            sx={{
              scale:2
            }}
            />
            
          </IconButton>
          }
          <Drawer open={isMobile}
          sx={{
            width:'fit-content'
          }}
          onClose={closeHandler}
          >
            <ChatList
            chats={sampleChat}
            chatId={chatId}
            handleDeleteChat={handleDeleteChat}
          />
          </Drawer>



          <Component {...props} />
        </div>


        <div
          style={{
            flex: 1,
            display: width < 900 ? 'none' : 'block',
            backgroundColor: 'rgba(0,0,0,0.85)',
            color: 'white',
          }}
        >
          <Profile />
        </div>


      </div>
    </>
  )
}

export default AppLayout
