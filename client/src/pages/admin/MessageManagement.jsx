import { Avatar, Collapse } from '@mui/material';
import { useEffect, useState } from 'react';
import Table from '../../components/shared/Table';
import { ThumbUpOffAlt,ThumbDownOffAlt, ThumbUp } from "@mui/icons-material";
import { Box, Stack } from '@mui/system';
import { dashboardData } from '../../constants/sampleData';
import { fileFormat, transformImage } from '../../lib/features';
import moment from 'moment';
import RenderAttachment from '../../components/shared/RenderAttachment'

const columns = [
  {
  field:'id',
  headerName:'ID',
  headerClassName:'table-header',
  width:'200'
  },
  {
  field:'attachments',
  headerName:'Attachments',
  headerClassName:'table-header',
  width:'200',
  renderCell:(params)=>{
    const {attachments} = params.row;
    return attachments?.length > 0?attachments.map(i=>{
      const url = i.url;
      const file = fileFormat(url);
      return <Box>
        <a 
        href={url}
        download
        target='_blank'
        style={{
          color:'black',
        }}
        >
          {
            RenderAttachment(file,url)
          }

        </a>
      </Box>
    }):'No Attachment';
    
  }
  },
  {
  field:'content',
  headerName:'Content',
  headerClassName:'table-header',
  width:'400',
  },
  {
  field:'sender',
  headerName:'Sent by',
  headerClassName:'table-header',
  width:'200',
  renderCell:(params)=>(
    <Stack direction={'row'} spacing={'1rem'} alignItems={'center'}>
      <Avatar alt={params.row.sender.name} src={params.row.sender.avatar}/>
      <span>{params.row.sender.name}</span>
    </Stack>
  )
  },
  {
  field:'chat',
  headerName:'Chat',
  headerClassName:'table-header',
  width:'220',
  },
  {
  field:'groupChat',
  headerName:'Group Chat',
  headerClassName:'table-header',
  width:'100',
  renderCell:(params)=>(
    params.row.groupChat? <ThumbUpOffAlt/> : <ThumbDownOffAlt/>
  )
  },
    {
  field:'createdAt',
  headerName:'Time',
  headerClassName:'table-header',
  width:'100',
  },
]
const MessageManagement = () => {
  const [rows,setRows] = useState([]);
  useEffect(()=>{
    setRows(dashboardData.messages.map(i=>({
      ...i,
      id:i._id,
      sender:{
        name:i.sender.name,
        avatar:transformImage(i.sender.avatar,50)
      },
      createdAt:moment(i.createdAt).format('MMMM Do YYYY,h:mm:ss a')
    })))
  },[])
  return (
    <Table 
    heading={'All Messages'}
    columns={columns}
    rows={rows}
    rowHeight={200}

    />
  )
}

export default MessageManagement