import { Button, Dialog, DialogTitle, Skeleton, Stack, Typography } from '@mui/material'
import UserItem from '../shared/UserItem'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setIsAddMember } from '../../redux/reducers/misc'
import { useAsyncMutation, useErrors } from '../../hooks/hook'
import { useAddGroupMembersMutation, useAvailableFriendsQuery } from '../../redux/api/api'


const AddMemberDialog = ({ chatId }) => {

    const dispatch = useDispatch();
    const { isAddMember } = useSelector(state => state.misc)

    const { isLoading, data, isError, error } = useAvailableFriendsQuery(chatId)



    const [addMembers, isLoadingAddMembers] = useAsyncMutation(useAddGroupMembersMutation);
    const [selectedMembers, setSelectedMembers] = useState([])



    const selectMemberHandler = (id) => {
        setSelectedMembers((prev) => (prev.includes(id) ? prev.filter((currElement) => currElement !== id) : [...prev, id]))
    }


    const addMemberSubmitHandler = () => {
        addMembers("Adding Members...", { members:selectedMembers, chatId })
        closeHandler();
    }
    const closeHandler = () => {
        setSelectedMembers([]);
        dispatch(setIsAddMember(false))
    }
    console.log(data)
    useErrors([{ isError, error }])
    return (
        <Dialog open={isAddMember} onClose={closeHandler}>
            <Stack p={{ xs: '0.5rem', sm: '1rem 2rem' }} width={'20rem'} spacing={'2rem'}
                maxHeight={'40rem'}
            >
                <DialogTitle textAlign={'center'}>Add Member</DialogTitle>
                <Stack
                    spacing={'1rem'}
                    borderLeft={'1px solid rgba(0,0,0,0.1)'}
                    borderRight={'1px solid rgba(0,0,0,0.1)'}
                    overflow={'auto'}
                >
                    {
                        isLoading ? <Skeleton /> :
                            data?.friends?.length > 0 ? (data?.friends?.map(i => (
                                <UserItem
                                    key={i._id}
                                    user={i}
                                    handler={selectMemberHandler}
                                    isAdded={selectedMembers.includes(i._id)}
                                />
                            ))) : <Typography textAlign={'center'}
                            >No Friends</Typography>
                    }
                </Stack>
                <Stack
                    direction={'row'}
                    alignItems={'center'}
                    justifyContent={'space-evenly'}
                    spacing={'1rem'}
                >
                    <Button
                        color='error'
                        onClick={closeHandler}
                    >Cancel</Button>
                    <Button
                        onClick={addMemberSubmitHandler}
                        variant='contained'
                        disabled={isLoadingAddMembers}
                    >
                        Confirm Changes
                    </Button>
                </Stack>
            </Stack>
        </Dialog>
    )
}

export default AddMemberDialog