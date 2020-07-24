import React from 'react'
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Button from '@material-ui/core/Button';
import theme from '../../../public/style/theme';

// A generic dialog component
// Always contains a close button
// Has one additional button which you can provide the text and action for
export default ({open, onClose, title, children, buttonClick, buttonText}) => {
    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle style={{backgroundColor: theme.palette.primary.main, color: "white"}}>{title}</DialogTitle>
            <DialogContent style={{marginTop: "1em"}}>
                {children}
            </DialogContent>
            <DialogActions>
                <Button variant="contained" color="primary" onClick={buttonClick}>{buttonText}</Button>
                <Button variant="contained" color="primary" onClick={onClose}>Close</Button>
            </DialogActions>
        </Dialog>
    )
}