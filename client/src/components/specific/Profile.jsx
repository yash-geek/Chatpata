import {
    AlternateEmail,
    CalendarMonth as CalendarMonthIcon,
    Face as FaceIcon
} from '@mui/icons-material';
import { Avatar, Skeleton, Stack, Typography } from '@mui/material';
import moment from 'moment';
import { transformImage } from '../../lib/features';

const Profile = ({user}) => {


    return (
        user?
        <Stack 
        p={{ xs: '1rem', sm: '3rem' }}
        spacing={'2rem'} 
        direction={'column'}
        alignItems={'center'}
        >
            <Avatar
            src={transformImage(user?.avatar?.url)}
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
            text={user?.bio}
            
            
            />
            <ProfileCard 
            
            Icon={<AlternateEmail />}
            heading={'Username'}
            text={user?.username}
            
            
            />
            <ProfileCard 
            Icon={<FaceIcon />}
            heading={'Name'}
            text={user?.name}
            
            
            />
            <ProfileCard 
            Icon={<CalendarMonthIcon/>}
            heading={'Joined'}
            text={moment(user?.createdAt).fromNow()}
            
            
            />
            
        </Stack>:
        <Skeleton/>
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