import React from 'react'
import AppLayout from '../components/layout/AppLayout'
import { Box, Typography } from '@mui/material';

const Home = () => {
  return (
    <Box bgcolor={'rgba(0,0,0,0.5)'}  
    width={'100%'} 
    display={'flex'} 
    flexDirection={'column'} 
    alignItems={'center'}
    height={'100%'}
    >
      <Typography p={'2rem'} variant='h5' textAlign={'center'}>Select a friend to chat</Typography>
    </Box>

  )
}

export default Home;
