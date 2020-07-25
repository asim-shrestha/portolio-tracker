import React from 'react';
import { useHistory } from "react-router-dom";
import { Box, TextField } from '@material-ui/core';

const SymbolSearchBar = () => {
    const history = useHistory();

    const handleSearch = (e) => {
        if(e.keyCode == 13) {
            console.log('value', e.target.value);
            history.push('/search?symbol=' + e.target.value);
        }
    }

    return (
        <Box marginTop="5em">
            <TextField variant="outlined" fullWidth label="Search symbols" onKeyDown={e => handleSearch(e)}/>
        </Box>
    );
}

export default SymbolSearchBar
