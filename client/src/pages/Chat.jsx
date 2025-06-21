import React from 'react'
import AppLayout from '../components/layout/AppLayout';

const Chat = (params) => {
  return (
    <div>
      chat with : {params.chatId}
    </div>
  )
}

export default AppLayout()(Chat);
