import { Avatar, IconButton, ListItem, ListItemText, Stack, Typography } from '@mui/material';
import React, { memo } from 'react'
import { Add as AddIcon, Remove as RemoveIcon } from '@mui/icons-material';
import { transformImage } from '../../lib/features';
import { bluey } from '../../constants/color';
const UserItem = ({
    user,
    isOwner = false,
    isAdmin = false,
    handler,
    handlerIsLoading,
    isAdded = false,
    styling = {},
    displayUserName = false,
}) => {


    const { _id, name, avatar, username } = user;


    return (
        <ListItem >
            <Stack
                direction={'row'}
                alignItems={'center'}
                spacing={'1rem'}
                width={'100%'}
                {...styling}
            >
                <Avatar src={transformImage(avatar)} />
                <Stack
                    direction={'column'}
                    sx={{
                        flexGrow: 1,
                        textOverflow: 'ellipsis',
                        display: '-webkit-box',
                        WebkitLineClamp: 1,
                        WebkitBoxOrient: 'vertical',
                        width: '100%',
                    }}
                >
                    <Stack>
                    <Typography
                        variant='body1'
                    >
                        {name}
                    </Typography>
                    {
                        isAdmin && 
                        <Typography 
                        color={bluey}
                        width={'100%'}
                        textAlign={'left'}
                        variant='caption'>
                            {isOwner ? "Owner":"Admin"}
                        </Typography>
                    }
                    </Stack>
                    <Typography
                        variant='caption'
                        sx={{
                            whiteSpace: 'nowrap',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            maxWidth: '150px', // or whatever fits your layout best
                            display: displayUserName ? 'block' : 'none',
                        }}
                    >
                        @{username}
                    </Typography>
                </Stack>
                <IconButton

                    size='small'
                    sx={{
                        backgroundColor: isAdded ? 'error.main' : 'primary.main',
                        color: 'white',
                        '&:hover': {
                            backgroundColor: isAdded ? 'error.dark' : 'primary.dark',
                        },
                    }}
                    onClick={() => {
                        handler(_id);
                    }}
                    disabled={handlerIsLoading}
                >

                    {
                        isAdded ? <RemoveIcon /> : <AddIcon />
                    }

                </IconButton>
            </Stack>
        </ListItem>
    )
}

export default memo(UserItem)