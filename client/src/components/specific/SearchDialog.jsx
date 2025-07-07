import { useInputValidation } from '6pp'
import { Search as SearchIcon } from '@mui/icons-material'
import { Dialog, DialogTitle, InputAdornment, List, Stack, TextField } from '@mui/material'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useAsyncMutation } from '../../hooks/hook'
import { useLazySearchUserQuery, useSendFriendRequestMutation } from '../../redux/api/api'
import { setIsSearch } from '../../redux/reducers/misc'
import UserItem from '../shared/UserItem'
const SearchDialog = () => {
  const dispatch = useDispatch()
  const { isSearch } = useSelector(state => state.misc)
  const [searchUser] = useLazySearchUserQuery()
  const [sendFriendRequest,isLoadingSendFriendRequest] = useAsyncMutation(useSendFriendRequestMutation);
  const search = useInputValidation('');
  const addFriendHandler =
    async (id) => {
      await sendFriendRequest("Sending friend request", { userId:id })
    }
  const searchCloseHandler = () => dispatch(setIsSearch(false))
  const [users, setUsers] = useState([]); //will contain actual user data


  useEffect(() => {
    const timeOutId = setTimeout(() => {
      if (search.value.length === 0) return setUsers([])
      searchUser(search.value).then(({ data }) => setUsers(data.users)).catch((e) => console.log(e))
    }, 1000)
    return () => {
      clearTimeout(timeOutId);
    }
  }, [search.value])

  return (
    <Dialog  
    sx={{
      display:'flex',
      justifyContent:'center',
      alignItems:'center',
      width:'100%',
      
    }}
    open={isSearch} onClose={searchCloseHandler}>
      <Stack 
        sx={{
          width: {sm:'22rem',md:'25rem'},
          padding: '2rem 0',
          backgroundColor: '#f0f0f0',
        }}
        alignItems={'center'}
        direction={'column'}
        spacing={2}
      >
        <DialogTitle
          textAlign={'center'}
        >
          Find People
        </DialogTitle>
        <TextField
          sx={{
            maxWidth:'90%',
          }}
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
        <List
        sx={{
          maxHeight:'50vh',
          overflow:'auto',
          
        }}
        >
          {
            users.map((i) => {
              return (
                <UserItem
                  displayUserName={true}
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
