import { AvatarGroup, Avatar, Box, Stack } from '@mui/material'
import React from 'react'
import {transformImage} from '../../lib/features'
//To do transform this into a card component
const AvatarCard = ({ avatar = [], max = 4 }) => {
    return (
        <Stack direction={'row'} spacing={0.5}>

            <AvatarGroup max={max}>
                <Box width={'5rem'} height={'3rem'}>
                    {
                        avatar.map((i, index) => {
                            return (
                                <Avatar
                                    key={Math.random() *100 + index}
                                    src={transformImage(i)}
                                    sx={{
                                        width: '3rem',
                                        height: '3rem',
                                        position: 'absolute',
                                        left:{
                                            xs: `${index * 0.5}rem`,
                                            sm: `${index }rem`,
                                        }
                                    }}
                                />)
                        })

                    }
                </Box>
            </AvatarGroup>


        </Stack>
    )
}

export default AvatarCard