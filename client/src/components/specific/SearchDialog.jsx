import { Avatar, Dialog, DialogTitle, InputAdornment, List, ListItem, ListItemText, TextField } from '@mui/material'
import React, { useState } from 'react'
import { Stack } from '@mui/material'
import { useInputValidation } from '6pp'
import { Search as SearchIcon, StreamOutlined } from '@mui/icons-material'
import UserItem from '../shared/UserItem'
import { sampleUsers } from '../../constants/sampleData'
const SearchDialog = () => {
  const search = useInputValidation('');
  const addFriendHandler =
    (id) => {
      console.log(id)
    }
  let isLoadingSendFriendRequest = false;
  const [users, setUsers] = useState(sampleUsers); //will contain actual user data
  return (
    <Dialog open>
      <Stack
        sx={{
          width: '25rem',
          padding: '2rem',
          backgroundColor: '#f0f0f0',
        }}
        direction={'column'}
        spacing={2}
      >
        <DialogTitle
          textAlign={'center'}
        >
          Find People
        </DialogTitle>
        <TextField
          label=''
          value={search.value}
          onChange={search.changeHandler}
          variant='outlined'
          size='small'
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
        <List>
          {
            users.map((i) => {
              return (
                <UserItem
                  user={i}
                  key={i._id}
                  handler={addFriendHandler}
                  handlerIsLoading={isLoadingSendFriendRequest}
                />
              )
            })
          }
        </List>
      </Stack>
    </Dialog>
  )
}

export default SearchDialog
