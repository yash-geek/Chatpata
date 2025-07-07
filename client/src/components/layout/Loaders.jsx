import { Skeleton, Stack } from '@mui/material';
import {SyncLoader} from 'react-spinners'
import React, { Fragment, useEffect, useState } from 'react'
import {blueyDarker } from '../../constants/color';

const LayoutLoader = () => {
    const [width, setWidth] = useState(window.innerWidth)

    useEffect(() => {
        const handleResize = () => setWidth(window.innerWidth)
        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    }, [])
    return (
        <div
            style={{
                display: 'flex',
                width: '100vw',
                height: '100vh',
                overflow: 'hidden',
                gap: '2rem'
            }}
        >
            <div
                style={{
                    flex: 1,
                    display: width < 600 ? 'none' : 'block',
                    height: '100%',
                    backgroundColor: '',
                }}
            >
                <Skeleton height={'100%'} variant='rectangular' />
            </div>

            <div
                style={{
                    flex: 2,
                    height: '100%',
                    backgroundColor: '',
                }}
            >
                <Stack spacing={'9rem'} >
                    {Array.from({ length: 5 }).map((_, index) => {
                        return <Skeleton 
                        key={index} 
                        variant='rounded' 
                        height={'8rem'} />
                    })}

                </Stack>
            </div>
            <div
                style={{
                    flex: 2,
                    height: '100%',
                    backgroundColor: '',
                }}
            >
                <Stack spacing={'0.7rem'} >
                    {Array.from({ length: 15 }).map((_, index) => {
                        return (
                        <Fragment key={index}>
                        <div  style={{height:'9rem'}}>

                        </div>
                        <Skeleton 
                        variant='rounded' height={'7rem'} />
                        
                        </Fragment>  
                        )
                    })}

                </Stack>
            </div>
            <div
                style={{
                    flex: 1,
                    display: width < 900 ? 'none' : 'block',
                    height: '100%',
                    color: 'white',
                }}
            >
                <Skeleton height={'100%'} variant='rectangular' />
            </div>
        </div>
    )
};
const TypingLoader = ()=>{
    return (
        <div
        style={{
            display:'flex',
            alignItems:'center',
            gap:'0.7rem',
            color:blueyDarker,
        }}
        >
        <span
        style={{
            fontFamily:'monospace'
        }}
        >Typing</span>
        <SyncLoader
        color={blueyDarker}
        size={'0.4rem'}
        />
        </div>
    )
}
export {
    TypingLoader,
    LayoutLoader,
}