import { AttachFile as AttachFileIcon, Send as SendIcon } from '@mui/icons-material';
import { IconButton, Stack } from '@mui/material';
import { useRef } from 'react';
import MessageComponent from '../components/shared/MessageComponent';
import FileMenu from '../components/dialogs/FileMenu';
import { InputBox } from '../components/styles/StyledComponents';
import { bluey, blueyDarker, grayColor } from '../constants/color';
import { sampleMessage, sampleUser } from '../constants/sampleData';


const Chat = () => {
  const containerRef = useRef(null);

  return (

    <>
      <Stack
        boxSizing={'border-box'}
        padding={'1rem'}
        spacing={'1rem'}
        ref={containerRef}
        bgcolor={grayColor}
        height={'90%'}
        sx={{
          overflowY: 'auto',
          overflowX: 'hidden',
        }}

      >
        {
          sampleMessage.map(
            (i) => {
              return (
                <MessageComponent
                key={i._id}
                message={i} 
                user={sampleUser} />
              )
            }
          )
        }
      </Stack>



      <form style={{
        height: '10%',
      }}>

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
          >
            <AttachFileIcon />
          </IconButton>
          <InputBox placeholder='Type Message Here...' />
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
      <FileMenu />


    </>

  )

}

export default Chat;
