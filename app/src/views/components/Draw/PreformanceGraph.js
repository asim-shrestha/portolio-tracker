import React, { useState, useEffect } from 'react';
import {
    AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip,
} from 'recharts';
import theme from '../../../../public/style/theme';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

// TODO share method with HoldingsTable
// Format currency related strings to include commas and only two decimal places
const currencyFormat = (n) => {
    if(n === null) {return 0};
    return n.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
}

// Graph of preformance data that resizes alongside the window
// Will return the preformance graph if data is given
// Will otherwise return a message saying the portfolio is currently empty
const PreformanceGraph = ({ data }) => {
    const [width, setWidth] = useState(0);
    const color = theme.palette.primary.main;

    // Update with on window size change
    const updateWidth = () => {
        setWidth(window.innerWidth - theme.spacing(28) * 2);
    }

    // Add event listener to the window so that we can capture window width changes
    useEffect(() => {
        window.addEventListener('resize', updateWidth);
        updateWidth();
        // returned function will be called on component unmount 
        return () => {
            window.removeEventListener('resize', updateWidth)
        }
    }, [])

    // Calculate total cash in portfolio
    let totalCash = 0;
    if(data.length > 0) {totalCash = data[data.length - 1].y;}
    console.log("data", data)
    // Only render if data is available and width !- 0
    // This ensures that the graph will be animated when loaded
    if (data.length > 0 && width != 0) return (
        <>
            <Box >
                <Typography variant="h5" color="primary">Your portfolio currently has ${currencyFormat(totalCash)}</Typography>
            </Box>
            <AreaChart
                width={width}
                height={400}
                data={data}
                margin={{
                    top: 10, right: 0, left: 0, bottom: 0,
                }}
            >
                <CartesianGrid strokeDasharray="1 1 " />
                <XAxis dataKey="x" />
                <YAxis />
                <Tooltip />
                <Area type="monotone" dataKey="y" stroke={color} fill={color} />
            </AreaChart>
        </>
    ); else return <Typography variant="h4" color="primary">Your portfolio is currently empty.</Typography>
}

export default PreformanceGraph;