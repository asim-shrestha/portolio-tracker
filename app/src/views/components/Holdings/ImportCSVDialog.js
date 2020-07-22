import React, { useState, useContext } from 'react'
import Axios from 'axios'
import TextField from '@material-ui/core/TextField';
import {UserContext} from '../Auth/UserStore';
import AppDialog from '../AppDialog';

export default ({open, onClose}) => {
    return (
        <AppDialog open={open} onClose={onClose} title={"Import Holdings From CSV"} buttonClick={onClose} buttonText={"Import"}>
            Not Implemented
        </AppDialog>
    )
}