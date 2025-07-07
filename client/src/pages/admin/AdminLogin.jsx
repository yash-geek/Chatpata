import { useInputValidation } from '6pp'
import { AdminPanelSettings as AdminPanelSettingsIcon } from '@mui/icons-material'
import {
    Box,
    Button,
    Container,
    Paper,
    Stack,
    TextField,
    Typography
} from '@mui/material'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import { bluey } from '../../constants/color'
import { adminLogin, getAdmin } from '../../redux/reducers/thunks/admin'

const AdminLogin = () => {
    // const username = useInputValidation('', userNameValidator)

    const dispatch = useDispatch();
    const {isAdmin} = useSelector((state)=>state.auth)
    
    const secretKey = useInputValidation('')

    const submitHandler = (e)=>{
        e.preventDefault();
        dispatch(adminLogin(secretKey.value))

    }

    useEffect(()=>{
        dispatch(getAdmin())
    },[])

    if(isAdmin) return <Navigate to={'/admin/dashboard'}/>

    return (
    <Box
        sx={{
            minHeight: '100vh',
            width: '100vw',
            background: 'linear-gradient(to bottom, #60a5fa, #facc15)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        }}
    >
    <Container component="main" maxWidth="xs">
    <Paper
        elevation={3}
        sx={{
            p: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 2,
        }}
    >
    <Stack
    color={bluey}
    width={'100%'}
    direction={'row'}
    alignItems={'center'}
    justifyContent={'center'}
    spacing={'1rem'}
    >

    <AdminPanelSettingsIcon sx={{
        
        scale:'2'
    }}/>
    <Typography variant="h5">Admin Login</Typography>

    </Stack>
    <Box
        component="form"
        onSubmit={submitHandler}
        sx={{ mt: 2, width: '100%' }}
    >
        {/* <TextField
            required
            fullWidth
            label="Username"
            margin="normal"
            variant="outlined"
            value={username.value}
            onChange={username.changeHandler}
        /> */}
        <TextField
            required
            fullWidth
            label="Secret Key"
            type="password"
            margin="normal"
            variant="outlined"
            value={secretKey.value}
            onChange={secretKey.changeHandler}
        />
        <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2 }}
        >
            Login
        </Button>
        </Box>
        </Paper>
    </Container>
    </Box>
    )
}

export default AdminLogin