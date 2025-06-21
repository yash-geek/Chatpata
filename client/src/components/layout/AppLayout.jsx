import React, { useEffect, useState } from 'react'
import Header from './Header'
import Title from '../shared/Title'
import ChatList from '../specific/ChatList'
import { sampleChat } from '../../constants/sampleData'

const AppLayout = ({ Component, ...props }) => {
  const [width, setWidth] = useState(window.innerWidth)

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
          display: 'flex',
          width: '100vw',
          height: '100vh',
          overflow: 'hidden',
          gap:'1rem'
        }}
      >
        
        <div
          style={{
            flex: 1,
            display: width < 600 ? 'none' : 'block',
            height: '100vh',
            backgroundColor: '',
          }}
        >
          <ChatList chats={sampleChat}/>
        </div>

        
        <div
          style={{
            flex: 2,
            height: '100%',
            backgroundColor: '',
          }}
        >
          <Component {...props} />
        </div>

        
        <div
          style={{
            flex: 1,
            display: width < 900 ? 'none' : 'block',
            height: '100vh',
            backgroundColor: 'rgba(0,0,0,0.85)',
            color: 'white',
          }}
        >
          Third
        </div>
      </div>
    </>
  )
}

export default AppLayout
