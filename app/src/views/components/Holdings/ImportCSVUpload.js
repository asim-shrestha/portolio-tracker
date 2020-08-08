import React from 'react'
import Typography from '@material-ui/core/Typography'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ArrowRightIcon from '@material-ui/icons/ArrowRight'
import Button from '@material-ui/core/Button'
import CloudUploadIcon from '@material-ui/icons/CloudUpload';

export default ({ uploadHandler }) => {


    // Create a reference to the hidden file input element
    const hiddenFileInput = React.useRef(null)

    // click hidden file input
    const handleClick = event => {
        hiddenFileInput.current.click();
    };

    return (
        < div >
            <div style={{ padding: '0 25px 0 25px' }}>
                <Typography variant="h6" align="center" color="primary">
                    Please ensure the CSV file has the following columns:
                </Typography>

                <List dense disablePadding>
                    <ListItem >
                        <ListItemIcon><ArrowRightIcon /></ListItemIcon>
                        <ListItemText primary="Symbol (example: TSLA, AMZN)" />
                    </ListItem>
                    <ListItem>
                        <ListItemIcon><ArrowRightIcon /></ListItemIcon>
                        <ListItemText primary="Price" />
                    </ListItem>
                    <ListItem>
                        <ListItemIcon><ArrowRightIcon /></ListItemIcon>
                        <ListItemText primary="Quantity" />
                    </ListItem>
                    <ListItem>
                        <ListItemIcon><ArrowRightIcon /></ListItemIcon>
                        <ListItemText primary="Date (YYYY-MM-DD)" />
                    </ListItem>
                    <ListItem>
                        <Typography align="center" color="primary">
                            Note that the "Action" value will be set to "Buy" and the "Commission" value will be set to 0 for all entries.
                        </Typography>
                    </ListItem>
                </List>
            </div>

            <div style={{ textAlign: 'center' }}>
                <Button onClick={handleClick} color="primary" variant="contained" startIcon={<CloudUploadIcon fontSize="large"/>}>
                        <Typography>Upload CSV</Typography>
                </Button>
            </div>
            <form>
                <input ref={hiddenFileInput} onChange={uploadHandler} style={{ display: 'none' }} type="file" id="CSVUpload" accept=".csv" />
            </form>

        </div >
    )
}