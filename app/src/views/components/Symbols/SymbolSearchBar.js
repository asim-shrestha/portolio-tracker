import React, {useState} from 'react';
import { useHistory } from "react-router-dom";
import { Box, TextField } from '@material-ui/core';

// Search bar that will update the route to /symbol?search={SEARCH TERM}
const SymbolSearchBar = () => {
    const [search, setSearch] = useState('');
    const history = useHistory();

    // Update route and reset search bar
    const handleSearch = (e) => {
        if(e.keyCode == 13) {
            const value = e.target.value;
            if(value == '') { return; }
            history.push('/symbol?search=' + e.target.value);
            setSearch('');
        }
    }

    return (
        <Box marginTop="5em">
            <TextField
                variant="outlined"
                fullWidth label="Search symbols"
                onKeyDown={e => handleSearch(e)}
                value={search}
                onChange={e => setSearch(e.target.value)}
            />
        </Box>
    );
}

export default SymbolSearchBar
