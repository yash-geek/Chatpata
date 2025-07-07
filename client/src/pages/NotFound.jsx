import { Container, Typography } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'

const NotFound = () => {
  return (
    <Container
    sx={{
      height:'100vh',
      width:'100vh',
      display:'flex',
      flexDirection:'column',
      alignItems:'center',
      justifyContent:'center',
      gap:'4rem',
    }}
    >

      <img
      style={{
        height:'20%',
        opacity:'0.8'
      }}
      src="https://play-lh.googleusercontent.com/yT_LBq_tyKeIDohKDsqN_Qt18jGIPUYIxY2C-1-E2YA9Qd60uZW08pua17qBmIiDPA" alt="" />
      <Typography 
      textAlign={'center'} 
      width={'100%'} 
      variant='h3'
      fontFamily={'cursive'}
      >NOT FOUND !</Typography>
      <Link style={{fontFamily:'cursive'}} to={'/'}>return back to home</Link>
    </Container>
  )
}

export default NotFound
