import React from 'react'
import AdminLayout from '../../components/layout/AdminLayout'
import { Box, Container, Paper, Typography } from '@mui/material'
import { Stack } from '@mui/system'
import { AdminPanelSettings as AdminPanelSettingsIcon, Group as GroupIcon, Message as MessageIcon, Notifications as NotificationsIcon, Person as PersonIcon, Search as SearchIcon } from '@mui/icons-material'
import moment from 'moment'
import { CurveButton, SearchField } from '../../components/styles/StyledComponents'
import { matBlack } from '../../constants/color'
import { DoughnutChart, LineChart } from '../../components/specific/Charts'

const Dashboard = () => {
    const Appbar = <Paper 
    elevation={3}
    sx={{
        padding:'2rem',
        margin:{
            xs:'4rem 0',
            sm:'4rem 0',
            md:'1rem 0'
        },
        borderRadius:'1rem'
    }}
    >
        
    <Stack 
    direction={'row'}
    alignItems={'center'}
    spacing={'1rem'}
    >
        <AdminPanelSettingsIcon
        sx={{
            fontSize:'3rem',
        }}
        />
        <SearchField type='text'/>
        <CurveButton
        
        sx={{
            borderRadius:'4rem',
            scale:0.6
        }}
        >
            <SearchIcon sx={{
                scale:1.3,
                }} /></CurveButton>
        <Box flexGrow={1}/>
        <Typography
        display={{
            xs:'none',
            lg:'block'
        }}
        >{moment().format('dddd, MMMM Do YYYY')}</Typography>
        <NotificationsIcon/>
    </Stack>

    </Paper>



    const Widgets = <Stack 
    direction={{xs:'column',sm:'row'}}
    spacing={'2rem'}
    justifyContent={'space-between'}
    alignItems={'center'}
    margin={'2rem 0'}
    
    >
        <Widget 
        title={'Users'} 
        value={34}
        Icon={<PersonIcon/>}
        />
        <Widget 
        title={'Chats'} 
        value={3}
        Icon={<GroupIcon/>}
        />
        <Widget 
        title={'Messages'} 
        value={455}
        Icon={<MessageIcon/>}
        />
    </Stack>
  return (
    <Container

    sx={{
        overflow:'auto',
        height:'100%'
    }}
    component={'main'}>
        {
            Appbar
        }
        <Stack
        direction={{
            xs:'column',
            lg:'row'
        }}
        sx={{
            gap:'2rem',
        }}
        flexWrap={'wrap'}
        justifyContent={'center'}
        alignItems={{
            xs:'center',
            lg:'stretch',
        }}

        >
        <Paper
        elevation={3}
        sx={{
            padding:'2rem 3.5rem',
            borderRadius:'1rem',
            width:'100%',
            maxWidth:'45rem',
        }}
        >
        <Typography
        
        margin={'2rem 0'}
        variant='h4'
        
        >Last Messages</Typography>
        <LineChart value={[10,23,44,33,80,22,14]}/>
        </Paper>
        <Paper
        sx={{
            padding:'1rem ',
            borderRadius:'1rem',
            display:'flex',
            justifyContent:'center',
            alignItems:'center',
            width:{xs:'100%',sm:'50%'},
            position:'relative',
            maxWidth:'25rem',
        }}
        >
        <DoughnutChart 
        labels={['Single Chats','Group Chats']}
        value = {[23,66]}
        />
        
        <Stack
        position={'absolute'}
        direction={'row'}
        justifyContent={'center'}
        alignItems={'center'}
        spacing={'0.5rem'}
        width={'100%'}
        height={'100%'}
        >
        <GroupIcon/> <Typography>Vs</Typography>
        <PersonIcon/>
            
        </Stack>
        </Paper>

        </Stack>
        {
            Widgets
        }
    </Container>
  )
}

const Widget = ({title,value,Icon}) =>{
    return(
        <Paper
        elevation={3}
        sx={{
            padding:'2rem',
            margin:'2rem 0',
            borderRadius:'1rem',
            width:'20rem'
        }}
        >
            <Stack
            alignItems={'center'}
            spacing={'1rem'}
            >
            <Typography
            sx={{
                color:'rgba(0,0,0,0.7)',
                borderRadius:'50%',
                border:`5px solid ${matBlack}`,
                width:'5rem',
                height:'5rem',
                display:'flex',
                alignItems:'center',
                justifyContent:'center'
            }}
            
            
            >{value}</Typography>
            <Stack
            direction={'row'}
            alignItems={'center'}
            spacing={'1rem'}
            >
                {Icon}
                <Typography
                textAlign={'center'}
                >{title}</Typography>
            </Stack>

            </Stack>

        </Paper>
    )
}


export default Dashboard