import React, { useState, useEffect } from 'react'
import Typography from '@material-ui/core/Typography';

export default ({ uploadHandler }) => {

    return (
        < div >
            <Typography variant="h5" align="center" color="primary">
                Upload a CSV file with the following columns:
                    </Typography>
            <ul>
                <li>Symbol (example: TSLA, AMZN)</li>
                <li>Date (YYYY-MM-DD)</li>
                <li>Price</li>
                <li>Quantity</li>
            </ul>

            <form>
                <input type="file" id="CSVUpload" accept=".csv" onChange={uploadHandler} />
            </form>
        </div >
    )
}