import { Backdrop, Box, Button, Drawer, IconButton, Stack, TextField, Tooltip, Typography } from '@mui/material'
import { bluey, matBlack } from '../constants/color'
import { Add as AddIcon, Delete as DeleteIcon, Done as DoneIcon, Edit as EditIcon, KeyboardBackspace as KeyboardBackSpaceIcon, Menu as MenuIcon } from "@mui/icons-material";
import React, { lazy, memo, Suspense, useEffect, useState } from 'react'
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { Link } from '../components/styles/StyledComponents'
import AvatarCard from '../components/shared/AvatarCard';
import { sampleChat, sampleUsers } from '../constants/sampleData'
import UserItem from '../components/shared/UserItem';
import { borderRadius, padding } from '@mui/system';
const ConfirmDeleteDialog = lazy(()=>import('../components/dialogs/confirmDeleteDialog'))
const AddMemberDialog = lazy(()=>import('../components/dialogs/AddMemberDialog'))
const isAddMember = false
const Groups = () => {

  const navigate = useNavigate();

  const chatId = useSearchParams()[0].get('group')
  const [isEdit, setIsEdit] = useState(false)
  const [groupName, setGroupName] = useState('')
  const [groupNameUpdatedValue, setGroupNameUpdatedValue] = useState('')
  const [confirmDeleteDialog,setConfirmDeleteDialog] = useState(false)

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
    setGroupNameUpdatedValue()
    console.log(groupNameUpdatedValue)
  }
  const openConfirmDeleteHandler = ()=>{
    setConfirmDeleteDialog(true);
    console.log('confirm delete')
  }
  const closeConfirmDeleteHandler = ()=>{
    setConfirmDeleteDialog(false);
    console.log('confirm delete')
  }
  
  const openAddMemberHandler = ()=>{
    console.log('add memebre')
  }
  const deleteHandler = ()=>{
    alert('Group Deleted')
    closeConfirmDeleteHandler();
  }
  const removeMemberHandler = (id) =>{
    console.log(`Remove Member with id ${id}`)
  }



  useEffect(() => {
    if(chatId){
    setGroupName(`Group Name ${chatId}`)
    setGroupNameUpdatedValue(`Group Name ${chatId}`)}
    return () => {
      setGroupName('')
      setGroupNameUpdatedValue('')
      setIsEdit(false)
    }
  }, [chatId])
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
          <IconButton onClick={updateGroupName}>
            <DoneIcon />
          </IconButton>
        </>
        :
        <>
          <Typography variant='h4'>{groupName}</Typography>
          <IconButton onClick={() => setIsEdit(true)}>
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
    startIcon={<DeleteIcon/>}
    onClick={openConfirmDeleteHandler}
    >Delete Group</Button>
    <Button 
    size='large' 
    variant='contained' 
    startIcon={<AddIcon/>} 
    onClick={openAddMemberHandler}
    >Add Member</Button>
  </Stack>);


  return (
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
          myGroups={sampleChat}
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
              
              sampleUsers.map((i)=>(
                <UserItem 
                key={i._id}
                user={i}
                isAdded 
                styling={{
                  boxShadow:'0 0 0.5rem rgba(0,0,0,0.2)',
                  padding:'1rem 2rem',
                  borderRadius:'1rem',
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
          isAddMember && (<Suspense fallback={<Backdrop open/>}>
          <AddMemberDialog
          addMember={isAddMember}
          />
        </Suspense>)
        }
        {
        confirmDeleteDialog && (<Suspense fallback={<Backdrop open/>}>
          <ConfirmDeleteDialog 
          open={confirmDeleteDialog}
          handleClose={closeConfirmDeleteHandler}
          deleteHandler={deleteHandler}
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
          myGroups={sampleChat}
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
