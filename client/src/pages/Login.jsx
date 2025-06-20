import React, { useState } from 'react'
import {Container, Paper, TextField, Typography,Button, Stack, Avatar, IconButton} from '@mui/material'
import {CameraAlt} from '@mui/icons-material';
import { VisuallyHiddenInput } from '../components/styles/StyledComponents';
const Login = () => {
    const [isLogin,setIsLogin] = useState(true)
    const toggleLogin = ()=>{setIsLogin((prev)=>!prev)};

  return (
    <Container component={"main"}  maxWidth='xs' className='h-screen flex items-center justify-center'>
        <Paper className='p-4 
        justify-center flex flex-col items-center'
        elevation={3}
        >
        {isLogin?
        <>
            <Typography variant='h5'>Login</Typography>
            <form className='mt-4 w-full' >
                <TextField required fullWidth label="Username"
                margin='normal'
                variant='outlined'/>
                <TextField required fullWidth label="Password"
                type='password'
                margin='normal'
                variant='outlined'/>
            <Button className='mt-4' type='submit' variant='contained'
            color='primary'
            fullWidth
            >
                Login
            </Button>

            <Typography className=' text-center p-4' >OR</Typography>

            <Button className='mt-4' variant='text'
            fullWidth
            onClick={toggleLogin}
            >
                Create Account
            </Button>

            </form>
        
        </>
        
        :
        <>
            <Typography variant='h5'>Create Account</Typography>
            <Stack className='relative w-40 m-auto flex justify-center items-center'>
                <Avatar sx={{width:'10rem',height:'10rem', objectFit:'contain'}} />

                <IconButton
                sx={{
                    height:'2rem',
                    width:'2rem',
                    position:'absolute',
                    bottom:0,
                    right:0,
                    color:'white',
                    bgcolor:"rgba(0,0,0,0.5)",
                    ":hover":{
                        bgcolor:'rgba(0,0,0,0.7)'
                    },
                    
                }}
                component='label'
                >
                    <>
                    <CameraAlt/>
                    <VisuallyHiddenInput type='file'/>
                    </>
                </IconButton>
            </Stack>
            <form className='mt-4 w-full' >
                <TextField required fullWidth label="Name"
                margin='normal'
                variant='outlined'/>
                <TextField required fullWidth label="Bio"
                margin='normal'
                variant='outlined'/>
                <TextField required fullWidth label="Username"
                margin='normal'
                variant='outlined'/>
                <TextField required fullWidth label="Password"
                type='password'
                margin='normal'
                variant='outlined'/>
            <Button className='mt-4' type='submit' variant='contained'
            color='primary'
            fullWidth
            >
                create 
            </Button>

            <Typography className=' text-center p-4' >OR</Typography>

            <Button className='mt-4' variant='text'
            fullWidth
            onClick={toggleLogin}
            >Login Instead
            </Button>

            </form>
        
        </>
        }
        </Paper>
    </Container>
  )
}

export default Login
