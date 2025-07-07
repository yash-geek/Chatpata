import { useInfiniteScrollTop } from '6pp';
import { AttachFile as AttachFileIcon, Send as SendIcon } from '@mui/icons-material';
import { Avatar, IconButton, Stack, Typography } from '@mui/material';
import { useCallback, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import FileMenu from '../components/dialogs/FileMenu';
import { LayoutLoader, TypingLoader } from '../components/layout/Loaders';
import MessageComponent from '../components/shared/MessageComponent';
import { InputBox } from '../components/styles/StyledComponents';
import { bluey, blueyDarker, grayColor } from '../constants/color';
import { ALERT, CHAT_JOINED, CHAT_LEFT, NEW_MESSAGE, START_TYPING, STOP_TYPING } from '../constants/events';
import { useErrors, useSocketEvents } from '../hooks/hook';
import { transformImage } from '../lib/features';
import { useChatDetailsQuery, useGetMessagesQuery } from '../redux/api/api';
import { getSocket } from '../socket';
import { setIsFileMenu, setIsMobile } from '../redux/reducers/misc'
import { useEffect } from 'react';
import { removeNewMessagesAlert } from '../redux/reducers/chat';
import { useNavigate } from 'react-router-dom';

const Chat = ({ chatId, user }) => {
  const containerRef = useRef(null);
  const socket = getSocket();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [selectedFiles, setSelectedFiles] = useState([])
  const [message, setMessage] = useState();
  const [messages, setMessages] = useState([])
  const [page, setPage] = useState(1)
  const [fileMenuAnchor, setFileMenuAnchor] = useState(null)
  const [iAmTyping, setIAmTyping] = useState(false);
  const [userTyping, setUserTyping] = useState(false);
  const typingTimeout = useRef(null)
  const bottomRef = useRef(null);



  const chatDetails = useChatDetailsQuery({ chatId, skip: !chatId })
  const oldMessagesChunk = useGetMessagesQuery({ chatId, page })
  const { data: oldMessages, setData: setOldMessages } = useInfiniteScrollTop(
    containerRef,
    oldMessagesChunk.data?.totalPages,
    page,
    setPage,
    oldMessagesChunk.data?.messages
  )
  //console.log("old Messages ",oldMessages)
  const members = chatDetails?.data?.chat?.members
  const errors = [
    { isError: chatDetails.isError, error: chatDetails.error },
    { isError: oldMessagesChunk.isError, error: oldMessagesChunk.error }
  ]
  // console.log('oldMessage Chunk',oldMessagesChunk.data)

  const messageOnChangeHandler = (e) => {
    setMessage(e.target.value)
    if (!iAmTyping) {
      socket.emit(START_TYPING, { members, chatId })
      setIAmTyping(true)
    }
    if (typingTimeout.current)
      clearTimeout(typingTimeout.current)
    typingTimeout.current = setTimeout(() => {
      socket.emit(STOP_TYPING, { members, chatId })
      setIAmTyping(false)
    }, 3000)
  }
  const handleFileOpen = (e) => {
    dispatch(setIsFileMenu(true));
    setFileMenuAnchor(e.currentTarget)
  }

  const sendMessage = (e) => {
    e.preventDefault();
    if (!message.trim())
      return;

    //emitting message to the server
    socket.emit(NEW_MESSAGE, { chatId, members, message })
    setMessage("")
    setIAmTyping(false)
  }

  useEffect(() => {
    socket.emit(CHAT_JOINED,{userId:user._id, members})
    dispatch(setIsMobile(false))
    dispatch(removeNewMessagesAlert(chatId))
    return () => {
      setMessages([]),
        setMessage(""),
        setOldMessages([]),
        setPage(1);
        socket.emit(CHAT_LEFT,{userId:user._id, members})
    }
  }, [chatId]);

  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, userTyping]);

  useEffect(() => {
    if(chatDetails.isError)
        return navigate('/')
  }, [chatDetails.isError]);

  const newMessagesListener = useCallback((data) => {
    if (data.chatId !== chatId) return;
    setMessages((prev) => [...prev, data.message])
  }, [chatId])
  const startTypingListener = useCallback((data) => {
    if (data.chatId !== chatId) return;

    setUserTyping(true)
  }, [chatId])
  const stopTypingListener = useCallback((data) => {
    if (data.chatId !== chatId) return;

    setUserTyping(false)
  }, [chatId])
  const alertListener = useCallback((data) => {
    if(data.chatId !== chatId)
        return;
    const messageForAlert = {
      content:data.message ,
      sender: {
        _id: '$',
        name: 'Admin',
      },
      chat: chatId,
      createdAt: new Date().toISOString(),
    };
    setMessages((prev) => [...prev, messageForAlert]);
  }, [chatId])



  const eventHandler = {
    [ALERT]: alertListener,
    [NEW_MESSAGE]: newMessagesListener,
    [START_TYPING]: startTypingListener,
    [STOP_TYPING]: stopTypingListener,
  }
  useSocketEvents(socket, eventHandler);
  useErrors(errors)
  const allMessages = [...oldMessages, ...messages]

  return (

    chatDetails.isLoading ? <LayoutLoader /> : <>
<Stack
  ref={containerRef}
  padding="1rem"
  spacing="1rem"
  bgcolor={grayColor}
  sx={{
    height: 'calc(100vh - 64px)', // Adjust based on input height
    overflowY: 'auto',
    overflowX: 'hidden',
  }}
>
        {
          allMessages.length > 0 ? allMessages.map(
            (i) => {
              const sameSender = i.sender?._id === user?._id;
              return (
                <Stack
                 key={i._id}
                  style={{
                    alignSelf: sameSender ? 'flex-end' : 'flex-start'
                  }}

                  direction={'row'}
                  spacing={'0.5rem'}
                >
                  {
                    !sameSender
                    &&
                    <Avatar
                      style={{
                        height: '2rem',
                        width: '2rem',
                      }}
                      src={transformImage(i.sender?.avatar?.url)}
                    />
                  }

                  <MessageComponent
                    key={i._id}
                    message={i}
                    user={user} />
                </Stack>
              )
            }
          ) :
            <Typography
              padding={'15rem 0'}
              fontSize={'2rem'}
              fontFamily={'cursive'}
              color='rgba(0,0,0,0.5)'
              width={'100%'}
              textAlign={'center'}

              height={'100%'}
            > Type something to start a chat...</Typography>
        }
        {userTyping && <TypingLoader />}

        {/* <Stack 
      bgcolor={'red'}
      
      height={'3rem'}
      >  </Stack> */}
        <div ref={bottomRef} />
      </Stack>



<form
  onSubmit={sendMessage}
  style={{
    height:'70px',
    position: 'sticky',
    bottom: 0,
    zIndex: 10,
    backgroundColor: 'white',
    borderTop: '1px solid #ddd',
  }}
>


        <Stack
          height={'100%'}
          direction={'row'}
          padding={'0.8rem'}
          alignItems={'center'}
          position={'relative'}

        >
          <IconButton
            sx={{
              position: 'absolute',
              rotate: '30deg',
              left: '1.5rem'
            }}
            onClick={handleFileOpen}
          >
            <AttachFileIcon />
          </IconButton>
          <InputBox
            
            placeholder='Type Message Here...' value={message}
            onChange={messageOnChangeHandler} />
          <IconButton type='submit' sx={{
            rotate: '-30deg',
            backgroundColor: bluey,
            color: 'white',
            marginLeft: '1rem',
            padding: '0.5rem',
            '&:hover': {
              bgcolor: blueyDarker,
            }
          }}>
            <SendIcon />
          </IconButton>
        </Stack>


      </form>
      <FileMenu
        anchorE1={fileMenuAnchor}
        chatId={chatId}
        message={message}
        selectedFiles={setSelectedFiles}

      />



    </>

  )

}

export default Chat;
