import { Avatar, Button, Dialog, DialogTitle, ListItem, Stack, Typography } from '@mui/material'
import React, { memo } from 'react'
import { sampleNotifications } from '../../constants/sampleData'

const NotificationsDialog = () => {
  const friendRequestHandler = ({id,accept}) => {
    console.log('Friend request handler called for id:', id);
    // Add your logic to handle friend requests here
  }
  return (
    <Dialog open>
      <Stack p={{ xs: '1rem', sm: '2rem' }}
        maxWidth={'25rem'}
      >
        <DialogTitle>Notifications</DialogTitle>
        {
          sampleNotifications.length > 0 ? (
            sampleNotifications.map((i,index) => {
              return (<NotificationsItem
              key={index}
              sender={i.sender} 
              _id={i._id}
              handler={friendRequestHandler}
              />)
            })
          ) : <Typography textAlign={'center'}>0 Notifications</Typography>
        }
      </Stack>
    </Dialog>
  )
}

const NotificationsItem = memo(({ sender, _id, handler }) => {
  const { avatar, name } = sender;
  return (
        <ListItem >
            <Stack 
            direction={'row'} 
            alignItems={'center'} 
            spacing={'1rem'} 
            width={'100%'}>
                <Avatar src={avatar} />
                <Typography
                variant='body1'
                
                sx={{
                    flexGrow: 1,
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    display: '-webkit-box',
                    WebkitLineClamp: 1,
                    WebkitBoxOrient: 'vertical',
                    width: '100%',
                }}
                >
                    {`${name} sent you a friend request`}
                </Typography>

            </Stack>
            <Stack direction={{
              xs: 'column',
              sm: 'row'
            }}>
              <Button onClick={()=>handler({_id,accept:true})}>Accept</Button>
              <Button color='error' onClick={()=>handler({_id,accept:false})}>Reject</Button>
            </Stack>
        </ListItem>
    )
});

export default NotificationsDialog
