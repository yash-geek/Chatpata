import { Add as AddIcon, Delete as DeleteIcon, Done as DoneIcon, Edit as EditIcon, KeyboardBackspace as KeyboardBackSpaceIcon, Menu as MenuIcon } from "@mui/icons-material";
import { Backdrop, Box, Button, CircularProgress, Drawer, IconButton, Stack, TextField, Tooltip, Typography } from '@mui/material';
import { lazy, memo, Suspense, useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useSearchParams } from 'react-router-dom';
import { LayoutLoader } from '../components/layout/Loaders';
import AvatarCard from '../components/shared/AvatarCard';
import UserItem from '../components/shared/UserItem';
import { Link } from '../components/styles/StyledComponents';
import { bluey, matBlack } from '../constants/color';
import { useAsyncMutation, useErrors } from '../hooks/hook';
import { useChatDetailsQuery, useDeleteChatMutation, useMyGroupsQuery, useRemoveGroupMemberMutation, useRenameGroupMutation } from "../redux/api/api";
import { setIsAddMember } from "../redux/reducers/misc";
const ConfirmDialog = lazy(() => import('../components/dialogs/confirmDialog'))
const AddMemberDialog = lazy(() => import('../components/dialogs/AddMemberDialog'))
const Groups = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const chatId = useSearchParams()[0].get('group')

  const {isAddMember} = useSelector(state=>state.misc)
  const myGroups = useMyGroupsQuery('');
  const groupDetails = useChatDetailsQuery({ chatId, populate: true }, { skip: !chatId });



  const [isEdit, setIsEdit] = useState(false)
  const [groupName, setGroupName] = useState('')
  const [groupNameUpdatedValue, setGroupNameUpdatedValue] = useState('')
  const [confirmDeleteDialog, setConfirmDeleteDialog] = useState(false)
  const [members, setMembers] = useState([])
  const [groupOwner,setGroupOwner] = useState(null)
  const [groupAdmins,setGroupAdmins] = useState([])


  const errors = [
    {
      isError: myGroups.isError,
      error: myGroups.error,
    },
    {
      isError: groupDetails.isError,
      error: groupDetails.error,
    },
  ]
  useErrors(errors)
  useEffect(() => {
    const groupData = groupDetails.data;
    if (groupData) {
      setGroupName(groupData.chat.name);
      setGroupNameUpdatedValue(groupData.chat.name);
      setMembers(groupData.chat.members);
      setGroupOwner(groupData.chat.creator)
      setGroupAdmins(groupData.chat.admins)
    }
    
    return () => {
      setGroupName("");
      setGroupNameUpdatedValue("");
      setMembers([]);
      setIsEdit(false);
    }
  }, [groupDetails.data])




  const [updateGroup, isLoadingGroupName] = useAsyncMutation(useRenameGroupMutation)
  const [removeMember, isLoadingRemoveMember] = useAsyncMutation(useRemoveGroupMemberMutation)
  const [deleteGroup, _] = useAsyncMutation(useDeleteChatMutation)


  const navigateBack = () => {
    navigate('/');
  }
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleMobile = () => {
    setIsMobileMenuOpen((prev) => !prev)
  }
  const handleMobileClose = () => {
    setIsMobileMenuOpen(false)
  }
  const updateGroupName = () => {
    setIsEdit(false);
    updateGroup("Updating Group Name...",{chatId, name:groupNameUpdatedValue})
  }
  const openConfirmDeleteHandler = () => {
    setConfirmDeleteDialog(true);
  }
  const closeConfirmDeleteHandler = () => {
    setConfirmDeleteDialog(false);
  }

  const openAddMemberHandler = () => {
    dispatch(setIsAddMember(true));

  }
  const deleteHandler = () => {
    deleteGroup("Deleting Group...", chatId)
    closeConfirmDeleteHandler();
    navigate('/groups')
  }
  const removeMemberHandler = (userId) => {
    removeMember("Removing Member...", {chatId,userId})
  }



  // useEffect(() => {
  //   if (chatId) {
  //     setGroupName(`Group Name ${chatId}`)
  //     setGroupNameUpdatedValue(`Group Name ${chatId}`)
  //   }
  //   return () => {
  //     setGroupName('')
  //     setGroupNameUpdatedValue('')
  //     setIsEdit(false)
  //   }
  // }, [chatId])
  const GroupName = <Stack
    direction={'row'}
    alignItems={'center'}
    justifyContent={'center'}
    spacing={'1rem'}
    padding={'3rem'}
  >
    {
      isEdit ?
        <>
          <TextField
            value={groupNameUpdatedValue}
            onChange={(e) => setGroupNameUpdatedValue(e.target.value)}
          />
          <IconButton 
          onClick={updateGroupName}
          disabled={isLoadingGroupName}
          >
            <DoneIcon />
          </IconButton>
        </>
        :
        <>
          <Typography variant='h4'>{groupName}</Typography>
          <IconButton onClick={() => setIsEdit(true)}
            disabled={isLoadingGroupName}
            >
            <EditIcon />
          </IconButton>
        </>
    }
  </Stack>

  const IconBtns = <>

    <Box
      sx={{
        display: {
          xs: 'block',
          sm: 'none',
          position: 'fixed',
          top: '1rem',
          right: '1rem'
        }
      }}
    >

      <IconButton onClick={handleMobile}>
        <MenuIcon />
      </IconButton>
    </Box>
    <Tooltip title='back'>
      <IconButton

        onClick={navigateBack}
        sx={{
          position: 'absolute',
          top: '2rem',
          left: '2rem',
          bgcolor: matBlack,
          color: 'white',
          ':hover': {
            bgcolor: 'rgba(0,0,0,0.7)',
          }

        }}
      >
        <KeyboardBackSpaceIcon />
      </IconButton>
    </Tooltip>

  </>



  const ButtonGroup =
    (<Stack
      direction={{
        xs: 'column-reverse',
        sm: 'row',
      }}
      spacing={'1rem'}
      p={{
        xs: '0',
        sm: '1rem',
        md: '1rem 4rem',
      }}
    >
      <Button
        size='large'
        color='error'
        variant='outlined'
        startIcon={<DeleteIcon />}
        onClick={openConfirmDeleteHandler}
      >Delete Group</Button>
      <Button
        size='large'
        variant='contained'
        startIcon={<AddIcon />}
        onClick={openAddMemberHandler}
      >Add Member</Button>
    </Stack>);


  return myGroups.isLoading ? <LayoutLoader /> : (
    <div
      style={{
        display: 'flex',
        height: '100%'
      }}

    >

      <Box
        sx={{
          flex: 1,
          display: {
            xs: 'none',
            sm: 'block',
          },
          bgcolor: bluey,

        }}
      >
        <GroupsList
          myGroups={myGroups?.data?.groups}
          chatId={chatId}
        />

      </Box>



      <Box

        sx={{
          width: {
            sm: '66.7%',
            xs: '100%',
          },
          flex: 2,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          position: 'relative',
          padding: '1rem 3rem'
        }}
      >

        {
          IconBtns
        }

        {
          groupName && <>
            {GroupName}
            <Typography>Members</Typography>

            <Stack
              maxWidth={'45rem'}
              width={'100%'}
              boxSizing={'border-box'}
              padding={{
                sm: '1rem',
                xs: '0',
                md: '1rem 4rem'
              }}
              spacing={'2rem'}
              bgcolor={'beige'}
              height={'50vh'}
              overflow={'auto'}
            >
              {
                isLoadingRemoveMember ?
                <CircularProgress/>
                :

                members.map((i) => (
                  <UserItem
                    key={i._id}
                    isOwner = {i._id === groupOwner}
                    isAdmin={groupAdmins.includes(i._id)}
                    user={i}
                    isAdded
                    styling={{
                      boxShadow: '0 0 0.5rem rgba(0,0,0,0.2)',
                      padding: '1rem 2rem',
                      borderRadius: '1rem',
                    }}
                    handler={removeMemberHandler}
                  />
                ))


              }

            </Stack>
            {ButtonGroup}
          </>
        }

        {
          isAddMember && (<Suspense fallback={<Backdrop open />}>
            <AddMemberDialog
              chatId={chatId}
            />
          </Suspense>)
        }
        {
          confirmDeleteDialog && (<Suspense fallback={<Backdrop open />}>
            <ConfirmDialog
              open={confirmDeleteDialog}
              handleClose={closeConfirmDeleteHandler}
              confirmHandler={deleteHandler}
              message={`Are you sure about deleting ${groupNameUpdatedValue}?`}
            />
          </Suspense>)
        }

      </Box>


      <Drawer
        sx={{
          display: {
            xs: 'block',
            sm: 'none',
          }
        }}
        open={isMobileMenuOpen}
        onClose={handleMobileClose}
      >
        <GroupsList
          myGroups={myGroups?.data?.groups}
          chatId={chatId}
          w={'50vw'} />

      </Drawer>

    </div>
  )
}
const GroupsList = ({ w = '100%', myGroups = [], chatId }) => {
  return (
    <Stack
      width={w}
      height={'100vh'}
      overflow={'auto'}
    >
      {
        myGroups.length > 0 ?
          (
            myGroups.map((group) => <GroupsListItem
              group={group}
              chatId={chatId}
              key={group._id}
            />
            )
          )
          :
          (
            <Typography
              textAlign={'center'}
              padding={'1rem'}
            >
              No Groups
            </Typography>
          )
      }
    </Stack>
  )
}

const GroupsListItem = memo(({ group, chatId }) => {
  const {
    name,
    avatar,
    _id,
  } = group;

  return <Link
    to={`?group=${_id}`}
    onClick={e => {
      if (chatId === _id) e.preventDefault();

    }}

  >
    <Stack
      direction={'row'}
      spacing={'1rem'}
      alignItems={'center'}
    >
      <AvatarCard avatar={avatar} />
      <Typography> {name} </Typography>
    </Stack>
  </Link>
})

export default Groups
