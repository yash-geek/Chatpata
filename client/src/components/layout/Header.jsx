import { Add as AddIcon, Group as GroupIcon, Logout as LogoutIcon, Menu as MenuIcon, Notifications as NotificationsIcon, Search as SearchIcon } from '@mui/icons-material'
import { AppBar, Backdrop, Badge, Box, IconButton, Toolbar, Tooltip, Typography } from '@mui/material'
import axios from 'axios'
import { lazy, Suspense, useState } from 'react'
import toast from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { bluey } from '../../constants/color'
import { server } from '../../constants/config'
import { userNotExists } from '../../redux/reducers/auth'
import { setIsMobile, setIsNewGroup, setIsNotification, setIsSearch } from '../../redux/reducers/misc'
import { resetNotificationCount } from '../../redux/reducers/chat'
const SearchDialog = lazy(() => import('../specific/SearchDialog'))
const NotificationsDialog = lazy(() => import('../specific/NotificationsDialog'))
const NewGroupDialog = lazy(() => import('../specific/NewGroupDialog'))
const Header = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isSearch, isNotification, isNewGroup } = useSelector(state => state.misc)
  const { notificationCount } = useSelector(state => state.chat)
  const handleMobile = () => dispatch(setIsMobile(true));

  const openSearch = () => dispatch(setIsSearch(true))

  const openNewGroup = () => {
    dispatch(setIsNewGroup(true));
  }

  const openNotification = () => {
    dispatch(setIsNotification(true));
    dispatch(resetNotificationCount())
  }

  const navigateToGroup = () => navigate('/groups')

  const logoutHandler = async () => {
    try {
      const { data } = await axios.get(`${server}/api/v1/user/logout`, {
        withCredentials: true
      })
      dispatch(userNotExists())
      toast.success(data.message)
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong")
    }
  }


  return (
    <>
      <Box sx={{ flexGrow: 1 }} height={'4rem'}>
        <AppBar position='static' sx={{ bgcolor: bluey }}>


          <Toolbar>
            <Typography variant='h6'
              sx={{ display: { xs: 'none', sm: 'block' } }}
            >
              Chatpata

            </Typography>

            <Box sx={{ display: { xs: 'block', sm: 'none' } }}>

              <IconButton color='inherit' onClick={handleMobile}>
                <MenuIcon />
              </IconButton>
            </Box>
            <Box sx={{ flexGrow: 1 }} />
            <Box>


              <IconBtn
                title={'Search'}
                icon={<SearchIcon />}
                onClick={openSearch}
              />
              <IconBtn
                title={'New Group'}
                icon={<AddIcon />}
                onClick={openNewGroup}
              />
              <IconBtn
                title={'Manage Groups'}
                icon={<GroupIcon />}
                onClick={navigateToGroup}
              />
              <IconBtn
                title={'Notifications'}
                icon={<NotificationsIcon />}
                onClick={openNotification}
                value={notificationCount}
              />
              <IconBtn
                title={'Logout'}
                icon={<LogoutIcon />}
                onClick={logoutHandler}
              />


            </Box>
          </Toolbar>


        </AppBar>
      </Box>

      {isSearch && <Suspense fallback={<Backdrop open />}><SearchDialog /></Suspense>}
      {isNotification && <Suspense fallback={<Backdrop open />}><NotificationsDialog /></Suspense>}
      {isNewGroup && <Suspense fallback={<Backdrop open />}><NewGroupDialog /></Suspense>}
    </>
  )
}

const IconBtn = ({ title, icon, onClick, value }) => {
  return (
    <Tooltip title={title}>
      <IconButton color='inherit' size='large' onClick={onClick}>
        {
          value?<Badge badgeContent={value} color='error'>{icon}</Badge>:icon
        }
      </IconButton>
    </Tooltip>
  )
}

export default Header
