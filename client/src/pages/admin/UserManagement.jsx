import { Avatar, Skeleton } from '@mui/material';
import { useEffect, useState } from 'react';
import Table from '../../components/shared/Table';

import { useErrors } from '../../hooks/hook';
import { transformImage } from '../../lib/features';
import { useGetAdminUsersQuery } from '../../redux/api/api';
import moment from 'moment';

const columns = [
  {
    field: 'id',
    headerName: 'ID',
    headerClassName: 'table-header',
    width: '200'
  },
  {
    field: 'avatar',
    headerName: 'Avatar',
    headerClassName: 'table-header',
    width: '150',
    renderCell: (params) => <Avatar alt={params.row.name} src={params.row.avatar} />
  },
  {
    field: 'name',
    headerName: 'Name',
    headerClassName: 'table-header',
    width: '150',
  },
  {
    field: 'username',
    headerName: 'Username',
    headerClassName: 'table-header',
    width: '200',
  },
  {
    field: 'friends',
    headerName: 'Friends',
    headerClassName: 'table-header',
    width: '150',
  },
  {
    field: 'groups',
    headerName: 'Groups',
    headerClassName: 'table-header',
    width: '150',
  },
  {
    field: 'createdAt',
    headerName: 'Date Joined',
    headerClassName: 'table-header',
    width: '200',
  },
]
const UserManagement = () => {
  const { isLoading, data, isError, error } = useGetAdminUsersQuery(undefined,{refetchOnMountOrArgChange:true})
  const errors = [
    {
      isError,
      error
    }
  ]
  useErrors(errors)
  const [rows, setRows] = useState([]);
  useEffect(() => {
    if(data){
    setRows(
      data?.users?.map((i) => (
        {
          ...i,
          id: i._id,
          avatar: transformImage(i.avatar, 50),
          createdAt:moment(i.createdAt).format('MMMM Do YYYY,h:mm:ss a'),
        }

      ))

    )}
  }, [data])
  return (
    isLoading?
    <Skeleton height={'100vh'}/>
    :
    <Table
      heading={'All Users'}
      columns={columns}
      rows={rows}
    />
  )
}

export default UserManagement