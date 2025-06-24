import React, { useEffect, useState } from 'react'
import Header from './Header'
import Title from '../shared/Title'
import ChatList from '../specific/ChatList'
import { sampleChat } from '../../constants/sampleData'
import { useParams } from 'react-router-dom'
import Profile from '../specific/Profile'

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
            flex: 3,
            display: width < 600 ? 'none' : 'block',
            backgroundColor: 'rgba(0,0,0,0.05)',
            
          }}
        >
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
