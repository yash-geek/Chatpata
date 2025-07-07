import { useInputValidation } from '6pp'
import { Button, Dialog, DialogTitle, Skeleton, Stack, TextField, Typography } from '@mui/material'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'
import { useAsyncMutation, useErrors } from '../../hooks/hook'
import { useAvailableFriendsQuery, useNewGroupMutation } from '../../redux/api/api'
import { setIsNewGroup } from '../../redux/reducers/misc'
import UserItem from '../shared/UserItem'
const NewGroupDialog = () => {

  const { isNewGroup } = useSelector(state => state.misc)
  const dispatch = useDispatch();

  const { isError, isLoading, error, data } = useAvailableFriendsQuery();

  const [newGroup,isLoadingNewGroup] = useAsyncMutation(useNewGroupMutation);
  const groupName = useInputValidation("");



  const errors = [
    {
      isError,
      error,
    }
  ]
  useErrors(errors)
  const [selectedMembers, setSelectedMembers] = useState([])

  const selectMemberHandler = (id) => {
    setSelectedMembers((prev) => (prev.includes(id) ? prev.filter((currElement) => currElement !== id) : [...prev, id]))
  }

  const submitHandler = () => {
    if (!groupName.value)
      return toast.error("Group name is required");
    if (selectedMembers.length < 2)
      return toast.error("Please select at least 3 members");


    //creating Group
    newGroup("Creating New Group...",{name:groupName.value, members:selectedMembers})
    closeHandler();
  }
  const closeHandler = () => {
    dispatch(setIsNewGroup(false))
  }


  return (
    <Dialog open={isNewGroup} onClose={closeHandler} maxWidth='md' >
      <Stack p={{ xs: '0.5rem', sm: '1rem 2rem' }} spacing={'2rem'} width={'25rem'}
        maxHeight={'40rem'}
      >
        <DialogTitle textAlign={'center'} width={'100%'} variant='h4'
        >New Group</DialogTitle>
        <TextField label='Group Name' value={groupName.value} onChange={groupName.changeHandler} />
        <Typography textAlign={'center'} variant='body1'>Members</Typography>
        <Stack
          borderLeft={'1px solid rgba(0,0,0,0.1)'}
          borderRight={'1px solid rgba(0,0,0,0.1)'}
          overflow={'auto'}
        >
          {
            isLoading ? <Skeleton />
              :
              data?.friends?.map((i) => {
                return (
                  <UserItem
                    user={i}
                    key={i._id}
                    handler={selectMemberHandler}
                    isAdded={selectedMembers.includes(i._id)}

                  />
                )
              })
          }
        </Stack>
        <Stack direction={'row'} width={'100%'} justifyContent={'space-evenly'} spacing={'1rem'} mt={'1rem'}>
          <Button
            onClick={closeHandler} 
            variant='text' 
            color='error' 
            size='large'
            >Cancel
          </Button>
          <Button 
          variant='contained' 
          size='large' 
          onClick={submitHandler}
          disabled={isLoadingNewGroup}
          >Create
          </Button>
        </Stack>
      </Stack>
    </Dialog>
  )
}

export default NewGroupDialog
