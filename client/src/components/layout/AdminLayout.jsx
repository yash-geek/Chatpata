import { Close as CloseIcon, ExitToApp as ExitToAppIcon, Menu as MenuIcon } from "@mui/icons-material";
import { Box, styled } from '@mui/material';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import { Link as LinkComponent, Navigate, useLocation } from 'react-router-dom';
import { grayColor, matBlack } from '../../constants/color';

const Link = styled(LinkComponent)`
    text-decoration:none;
    border-radius:2rem;
    padding:1rem 2rem;
    color:black;
    &:hover{
    color: rgba(0,0,0,0.54)
    }
`

import {
    Dashboard as DashboardIcon,
    Group as GroupIcon,
    ManageAccounts as ManageAccountsIcon,
    Message as MessageIcon
} from "@mui/icons-material";
import { useDispatch, useSelector } from 'react-redux';
import { adminLogout } from '../../redux/reducers/thunks/admin';

const adminTabs = [
    {
        name: 'Dashboard',
        path: '/admin/dashboard',
        icon: <DashboardIcon />,
    },
    {
        name: 'Users',
        path: '/admin/user-management',
        icon: <ManageAccountsIcon />,
    },
    {
        name: 'Chats',
        path: '/admin/chat-management',
        icon: <GroupIcon />,
    },
    {
        name: 'Messages',
        path: '/admin/messages',
        icon: <MessageIcon />,
    }

]


const AdminLayout = ({ component: Component, ...props }) => {
    const {isAdmin} = useSelector((state)=>state.auth)
    const [isMobile, setIsMobile] = useState(false);
    const handleMobile = () => {
        setIsMobile((prev) => !prev)
    }
    const handleClose = () => {
        setIsMobile(false)
    }
    if(!isAdmin)    return <Navigate to={'/admin'}/>

    return (
        <div

            style={{
                height:'100vh',
                display: 'flex'
            }}
        >

            <Box
                sx={{
                    display: { xs: 'block', md: 'none' },
                    position: 'fixed',
                    right: '1rem',
                    top: '1rem'
                }}
            >
                <IconButton onClick={handleMobile}>
                    {
                        isMobile ? <CloseIcon /> : <MenuIcon />
                    }
                </IconButton>



            </Box>

            <Box

                sx={{
                    flex: {
                        lg: 1,
                        md: 1,
                    },
                    display: {
                        xs: 'none',
                        md: 'block'
                    }
                }}
            >
                <Sidebar />

            </Box>
            <Box
                bgcolor={grayColor}
                sx={{
                    height:'100%',
                    
                    flex: {
                        lg: 3,
                        md: 2,
                        xs: 1
                    }
                }}

            >
                <Component {...props} />
            </Box>
            <Drawer 

            open={isMobile} onClose={handleClose}>

                <Sidebar w={'fit-content'}
                minWidth={'50%'}
                />

            </Drawer>


        </div>
    );
};

const Sidebar = ({ w = '100%', minWidth = w }) => {
    const location = useLocation();
    const dispatch = useDispatch();
    const logoutHandler=()=>{
        dispatch(adminLogout());
    }
    return (
        <Stack
        minWidth={w}
            direction={'column'}
            p={'3rem'}
            spacing={'3rem'}
            width={w}>

            <Typography 
            variant='h5' 
            textTransform={'uppercase'}
            >
                Chatpata
            </Typography>
            <Stack 
            spacing={'1rem'}>
                {
        adminTabs.map((tab) => (
            <Link 
            key={tab.path} to={tab.path}
            sx={
                location.pathname === tab.path && {
                    bgcolor:matBlack,
                    color:'white',
                    ':hover':{
                        color:'gray'
                    }
                }
            }
            >
                <Stack
                    direction={'row'}
                    alignItems={'center'}
                    spacing={'1rem'}
                >
                    {tab.icon}
                    <Typography
                    
                    >
                        {tab.name}
                    </Typography>



                </Stack>

            </Link>
        ))
                }
            
        <Link
        sx={{
            bottom:'1rem'
        }}
        onClick={logoutHandler}
        >
            <Stack
                direction={'row'}
                alignItems={'center'}
                spacing={'1rem'}
            >
            <Typography
            fontSize={'1.2rem'}
            >
                Logout
            </Typography>
            <ExitToAppIcon/>
            </Stack>

        </Link>
        </Stack>
        </Stack>
    )
}

export default AdminLayout;