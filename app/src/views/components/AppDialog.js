import React, { useEffect } from 'react'
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Button from '@material-ui/core/Button';
import theme from '../../../public/style/theme';
import {IconButton} from "@material-ui/core";

// A generic dialog component
// Always contains a close button
// Has one additional button which you can provide the text and action for
export default ({open, onClose, title, children, buttonClick, buttonText}) => {
    const closeButtonStyle = {color:'white', cursor:'pointer', float:'right', margin: '0px', padding: '0px', width: '20px'};

    // Add event listener that will check for enter presses and preform action if so
    useEffect(() => {
        const enterPressListener = (e) => {
            if ((e.code === "Enter" || e.code === "NumpadEnter") && open) {
                buttonClick();
            }
        };
        document.addEventListener("keydown", enterPressListener);
        return () => {
            document.removeEventListener("keydown", enterPressListener);
        };
    }, [open, buttonClick]);

    
    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle style={{backgroundColor: theme.palette.primary.main, color: "white"}}>
                {title}
                <IconButton color="secondary" onClick={onClose} style={closeButtonStyle}>x</IconButton>
            </DialogTitle>
                
            <DialogContent style={{marginTop: "1em"}}>
                {children}
            </DialogContent>
            <DialogActions>
                <Button variant="contained" color="primary" onClick={buttonClick}>{buttonText}</Button>
            </DialogActions>
        </Dialog>
    )
}