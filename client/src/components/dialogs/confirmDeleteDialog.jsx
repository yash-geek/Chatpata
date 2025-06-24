import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material'
import { Stack } from '@mui/system'
import React from 'react'

const confirmDeleteDialog = ({ message,open, handleClose, deleteHandler }) => {
    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Confirm Delete</DialogTitle>
            <DialogContent>
                {message}
            </DialogContent>
            <DialogActions 
            direction={'row'} 
            p={'1rem'} >
                <Button 
                onClick={deleteHandler}
                color='error'>Confirm</Button>
                <Button
                onClick={handleClose}
                >Cancel</Button>
            </DialogActions>
        </Dialog>
    )
}

export default confirmDeleteDialog