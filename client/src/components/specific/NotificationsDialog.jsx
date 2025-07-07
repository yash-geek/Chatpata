import { Avatar, Button, Dialog, DialogTitle, ListItem, Skeleton, Stack, Typography } from '@mui/material'
import { memo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useAsyncMutation, useErrors } from '../../hooks/hook'
import { useAcceptFriendRequestMutation, useGetNotificationsQuery } from '../../redux/api/api'
import { setIsNotification } from '../../redux/reducers/misc'

const NotificationsDialog = () => {
  const dispatch = useDispatch();
  const { isNotification } = useSelector((state) => state.misc)
  const closeNotificationHandler = () =>
    dispatch(setIsNotification(false))

  const { isLoading, data, error, isError } = useGetNotificationsQuery();


  const [acceptRequest] = useAsyncMutation(useAcceptFriendRequestMutation);
  const friendRequestHandler = async ({ _id, accept }) => {
    dispatch(setIsNotification(false))
    await acceptRequest("Accepting...",{ requestId: _id, accept })

    // Add your logic to handle friend requests here
  }
  useErrors([{ error, isError }]);
  return (
    <Dialog open={isNotification} onClose={closeNotificationHandler}>
      <Stack p={{ xs: '1rem', sm: '2rem' }}
        maxWidth={'25rem'}
      >
        <DialogTitle>Notifications</DialogTitle>
        {
          isLoading ? <Skeleton /> : <>
            {
              data?.allRequests.length > 0 ? (
                data?.allRequests?.map((i, index) => {
                  return (<NotificationsItem
                    key={index}
                    sender={i.sender}
                    _id={i._id}
                    handler={friendRequestHandler}
                  />)
                })
              ) : <Typography textAlign={'center'}>0 Notifications</Typography>
            }
          </>
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
        <Button onClick={() => handler({ _id, accept: true })}>Accept</Button>
        <Button color='error' onClick={() => handler({ _id, accept: false })}>Reject</Button>
      </Stack>
    </ListItem>
  )
});

export default NotificationsDialog
