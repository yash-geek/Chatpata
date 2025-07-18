import { Avatar, Skeleton } from '@mui/material';
import { useEffect, useState } from 'react';
import Table from '../../components/shared/Table';

import { Stack } from '@mui/system';
import AvatarCard from '../../components/shared/AvatarCard';
import { useErrors } from '../../hooks/hook';
import { transformImage } from '../../lib/features';
import { useGetAdminChatsQuery } from '../../redux/api/api';
const columns = [
  {
  field:'id',
  headerName:'ID',
  headerClassName:'table-header',
  width:'200'
  },
  {
  field:'avatar',
  headerName:'Avatar',
  headerClassName:'table-header',
  width:'150',
  renderCell:(params)=><AvatarCard 
  avatar={params.row.avatar}
  />
  },
  {
  field:'name',
  headerName:'Name',
  headerClassName:'table-header',
  width:'300',
  },
  {
  field:'groupChat',
  headerName:'Group',
  headerClassName:'table-header',
  width:'300',
  },
  {
  field:'totalMembers',
  headerName:'Total members',
  headerClassName:'table-header',
  width:'120',
  },
  {
  field:'members',
  headerName:'Members',
  headerClassName:'table-header',
  width:'400',
  renderCell:(params)=><AvatarCard 
  max={100}
  avatar={params.row.members}
  />

  },
  {
  field:'totalMessages',
  headerName:'Total Messages',
  headerClassName:'table-header',
  width:'120',
  },
    {
  field:'creator',
  headerName:'Created By',
  headerClassName:'table-header',
  width:'250',
  renderCell:(params)=>(
    <Stack 
    direction={'row'}
    alignContent={'center'}
    spacing={'1rem'}
    >
      <Avatar 
      alt={params.row.creator.name}
      src={params.row.creator.avatar}
      />
      <span>{params.row.creator.name}</span>
    </Stack>
  )
  },
]


const ChatManagement = () => {
  const { isLoading, data, isError, error } = useGetAdminChatsQuery(undefined,{refetchOnMountOrArgChange:true})
    const errors = [
      {
        isError,
        error
      }
    ]
  useErrors(errors)
  const [rows,setRows] = useState([]);
  useEffect(()=>{
    if(data)
    setRows(
      data?.chats?.map(i=>({
        ...i,
        id:i._id,
        avatar:i.avatar.map(av=>transformImage(av,50)),
        members:i.members.map(av=>transformImage(av.avatar,50)),
        creator:{
          name:i.creator.name,
          avatar:transformImage(i.creator.avatar,50),
        },
        groupChat:i.groupChat?'Yes':'No'
      }))
    )
  },[data])
  return (
    isLoading?
    <Skeleton height={'100vh'}/>:
    <Table 
    heading={'All Chats'}
    columns={columns}
    rows={rows}
    />
  )
}

export default ChatManagement