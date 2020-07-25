import React, { useState, useContext } from 'react'
import Axios from 'axios'
import TextField from '@material-ui/core/TextField';
import {UserContext} from '../Auth/UserStore';
import AppDialog from '../AppDialog';

export default ({open, onClose}) => {

    const [file, setFile] = useState(null)
    const uploadHandler = (event) => {
        setFile(event.target.files[0])
    }

    const processCSV = (csv) => {

    }
    const submitHandler = (event) => {
        event.preventDefault()

        // sending to server
        const data = new FormData()
        data.append('file', file)
        Axios.post('/api/upload', data)
            .then( res => {
                console.log('Upload done', res)
            })
    }

    console.log(file)

    return (
        <AppDialog open={open} onClose={onClose} title={"Import Holdings From CSV"} buttonClick={submitHandler} buttonText={"Import"}>
            <form>
                <input type="file" name="file" accept=".csv" onChange={uploadHandler} />
            </form>
        </AppDialog>
    )
}