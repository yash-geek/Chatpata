import { Avatar, IconButton, ListItem, ListItemText, Stack, Typography } from '@mui/material';
import React, { memo } from 'react'
import { Add as AddIcon, Remove as RemoveIcon } from '@mui/icons-material';
const UserItem = ({ 
    user,
    handler,
    handlerIsLoading, 
    isAdded = false,
    styling = {}
}) => {
    const { _id, name, avatar } = user;
    

    return (
        <ListItem >
            <Stack
                direction={'row'}
                alignItems={'center'}
                spacing={'1rem'}
                width={'100%'}
                {...styling}
                >
                <Avatar src={avatar} />
                <Typography
                    variant='body1'

                    sx={{
                        flexGrow: 1,
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        display: '-webkit-box',
                        WebkitLineClamp: 1,
                        WebkitBoxOrient: 'vertical',
                        width: '100%',
                    }}
                >
                    {name}
                </Typography>
                <IconButton

                    size='small'
                    sx={{
                        backgroundColor: isAdded ? 'error.main' : 'primary.main',
                        color: 'white' ,
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