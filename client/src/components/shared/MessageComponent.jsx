import { Typography } from '@mui/material';
import React, { memo } from 'react'
import { lightBlue } from '../../constants/color';
import moment from 'moment/moment';
import { Box } from '@mui/system';
import { fileFormat } from '../../lib/features';
import RenderAttachment from './RenderAttachment';
import {motion} from 'framer-motion'
 
const MessageComponent = ({message,user}) => {
    const {sender,content,attachments = [],createdAt} = message;
    const sameSender = sender?._id === user?._id
    const timeAgo = moment(createdAt).format("HH:mm");

  return (
    <motion.div
    initial={{
        opacity:'0.1',
        x:'-100%'
    }}
    whileInView={{
        opacity:'1',
        x:0,
    }}
    style={{
        alignSelf:sameSender?'flex-end':'flex-start',
        backgroundColor:'white',
        color:'black',
        borderRadius:'5px',
        padding:'0.5rem',
        width:'fit-content',
        height:'100%',
        maxWidth:'500px',
        minWidth:'100px'
    }}
    >
       {
        !sameSender && <Typography
        color= {lightBlue}
        fontWeight={'600'} 
        variant='caption'
        >
            {sender.name}
            </Typography>
       }
       {
        attachments.length > 0 && attachments.map(
            (attachment,index) => {
                const url = attachment.url;
                const fileType = fileFormat(url)
                return (
                    <Box key={index}>
                        <a 
                        href={url}
                        target='_blank' 
                        download 
                        style={{
                            color:'black',
                        }}
                        >
                            {
                                RenderAttachment(fileType,url)
                            }
                        </a>
                    </Box>
                )
            }
        )
       }
       {
        content && <Typography>{content}</Typography>
       }
       <Typography 
       variant='caption' 
       color='text.secondary'
       fontSize='0.5rem'
       >{timeAgo}</Typography>

    </motion.div>
  )
}

export default memo(MessageComponent);