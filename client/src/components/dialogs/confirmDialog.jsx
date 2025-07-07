import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material'

const confirmDialog = ({ message,open, handleClose, confirmHandler }) => {
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
                onClick={confirmHandler}
                color='error'>Confirm</Button>
                <Button
                onClick={handleClose}
                >Cancel</Button>
            </DialogActions>
        </Dialog>
    )
}

export default confirmDialog