import React, { useState, useEffect } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import theme from '../../../../public/style/theme';
import Typography from '@material-ui/core/Typography';

// TODO share method with HoldingsTable
// Format currency related strings to include commas and only two decimal places
const currencyFormat = (n) => {
    if (n === null) { return 0 };
    return n.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
}

// Graph of preformance data that resizes alongside the window
// Returns the graph if data is given and a message saying "the portfolio is currently empty" otherwise
const PreformanceGraph = ({ data }) => {
    const [width, setWidth] = useState(0);
    const color = theme.palette.primary.main;

    const updateWidth = () => {
        // Subtract magic number to get proper right margins
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

    let totalPortfolioCash = 0;
    if (data.length > 0) { totalPortfolioCash = data[data.length - 1].y; } // Ammount at today's date

    // This loading ensures that the graph will be animated when loaded
    if (data.length > 0 && width != 0) return (
        <>
            <Typography variant="h5" color="primary">Your portfolio currently has ${currencyFormat(totalPortfolioCash)}</Typography>
            <AreaChart width={width} height={400} data={data}>
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