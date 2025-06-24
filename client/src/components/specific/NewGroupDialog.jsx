import { Button, Dialog, DialogTitle, Stack, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import { sampleUsers } from '../../constants/sampleData'
import UserItem from '../shared/UserItem'
import { useInputValidation } from '6pp'
const NewGroupDialog = () => {

  const groupName = useInputValidation("")

  const [members, setMembers] = useState(sampleUsers)
  const [selectedMembers, setSelectedMembers] = useState([])

  const selectMemberHandler = (id) => {
    setSelectedMembers((prev) => (prev.includes(id) ? prev.filter((currElement)=> currElement !== id) : [...prev, id]))
  }
  
  const submitHandler = () => { }
  const closeHandler = () => { }


  return (
    <Dialog open onClose={closeHandler} maxWidth='md' >
      <Stack p={{ xs: '1rem', sm: '3rem' }} spacing={'2rem'} width={'25rem'}>
        <DialogTitle textAlign={'center'} width={'100%'} variant='h4'>New Group</DialogTitle>
        <TextField label='Group Name' value={groupName.value} onChange={groupName.changeHandler} />
        <Typography variant='body1'>Members</Typography>
        <Stack>
          {
            members.map((i) => {
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
          <Button variant='text' color='error' size='large'>Cancel</Button>
          <Button variant='contained' size='large' onClick={submitHandler}>Create</Button>
        </Stack>
      </Stack>
    </Dialog>
  )
}

export default NewGroupDialog
