import React from 'react'
import { Avatar, Icon, Stack, Typography } from '@mui/material'
import moment from 'moment'
import {
    Face as FaceIcon, 
    AlternateEmail,
    CalendarMonth as CalendarMonthIcon
} from '@mui/icons-material';

const Profile = () => {
    return (
        <Stack 
        p={{ xs: '1rem', sm: '3rem' }}
        spacing={'2rem'} 
        direction={'column'}
        alignItems={'center'}
        >
            <Avatar
            sx={{

                width:'200px',
                height:'200px',
                objectFit:'contain',
                marginTop:'1rem',
                border:'5px solid white',
            }}
            />
            <ProfileCard 
            
            heading={'Bio'}
            text={'Lorem ipsum. '}
            
            
            />
            <ProfileCard 
            
            Icon={<AlternateEmail />}
            heading={'Username'}
            text={'nonchalantyash'}
            
            
            />
            <ProfileCard 
            Icon={<FaceIcon />}
            heading={'Name'}
            text={'Yash'}
            
            
            />
            <ProfileCard 
            Icon={<CalendarMonthIcon/>}
            heading={'Joined'}
            text={moment('2023-11-05T00:00:00.000Z').fromNow()}
            
            
            />
            
        </Stack>
    )
}

const ProfileCard = ({text,Icon,heading}) => (
    <Stack
    direction={'row'}
    sx={{
        display:'flex',
        alignItems:'center',
    }}
    spacing={'0.8rem'}
    color={
        'white'
    }
    textAlign={'center'}
    >
    {Icon && Icon}
    <Stack>
        <Typography variant='body1'>
            {text}
        </Typography>
        <Typography variant='caption' color={'gray'}>
            {heading}
        </Typography>
    </Stack>
    </Stack>
)

export default Profile