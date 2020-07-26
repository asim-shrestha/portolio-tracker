import React, { useState, useEffect } from 'react'
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography';

export default ({ headers, symbol, price, quantity, date, setSymbol, setPrice, setQuantity, setDate }) => {

    return (
        <div>
            <Typography variant="h5" align="center" color="primary">Please match the following:</Typography>
            <br />
            <Grid container spacing={3}>
                <Grid item xs={3}>
                    {/* empty for spacing purposes */}
                    <Typography align="left" color="primary"></Typography>
                </Grid>
                <Grid item xs={9}>
                    <Typography align="center" color="primary">Columns found in CSV file</Typography>
                </Grid>

                <Grid item xs={3}>
                    <Typography variant="h6" align="left" color="primary">Symbol</Typography>
                </Grid>
                <Grid item xs={9}>
                    <FormControl variant="outlined" fullWidth>
                        <Select onChange={e => setSymbol(e.target.value)} value={symbol}>
                            {headers.map((element, i) => <MenuItem key={i} value={element}>{element}</MenuItem>)}
                        </Select>
                    </FormControl>
                </Grid>

                <Grid item xs={3}>
                    <Typography variant="h6" align="left" color="primary">Price</Typography>
                </Grid>
                <Grid item xs={9}>
                    <FormControl variant="outlined" fullWidth>
                        <Select onChange={e => setPrice(e.target.value)} value={price}>
                            {headers.map((element, i) => <MenuItem key={i} value={element}>{element}</MenuItem>)}
                        </Select>
                    </FormControl>
                </Grid>

                <Grid item xs={3}>
                    <Typography variant="h6" align="left" color="primary">Quantity</Typography>
                </Grid>
                <Grid item xs={9}>
                    <FormControl variant="outlined" fullWidth>
                        <Select onChange={e => setQuantity(e.target.value)} value={quantity}>
                            {headers.map((element, i) => <MenuItem key={i} value={element}>{element}</MenuItem>)}
                        </Select>
                    </FormControl>
                </Grid>

                <Grid item xs={3}>
                    <Typography variant="h6" align="left" color="primary">Date</Typography>
                </Grid>
                <Grid item xs={9}>
                    <FormControl variant="outlined" fullWidth>
                        <Select onChange={e => setDate(e.target.value)} value={date}>
                            {headers.map((element, i) => <MenuItem key={i} value={element}>{element}</MenuItem>)}
                        </Select>
                    </FormControl>
                </Grid>
            </Grid>
        </div>
    )
}