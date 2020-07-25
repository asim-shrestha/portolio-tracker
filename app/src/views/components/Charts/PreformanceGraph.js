import React, { useState, useEffect } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import theme from '../../../../theme';
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
    let colour = theme.palette.positive.main;

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

    // TODO fix calculation
    let totalPortfolioCash = 0;
    if (data.length > 0) { totalPortfolioCash = data[data.length - 1].y; } // Ammount at today's date

    // Set colour based on preformance
    if(data.length > 0 && data[data.length - 1].y < 0) { colour = theme.palette.negative.main; }

    // This loading ensures that the graph will be animated when loaded
    if (data.length > 0 && width != 0) return (
        <>
            <Typography variant="h5" color="primary">Your portfolio currently has ${currencyFormat(totalPortfolioCash)}</Typography>
            <AreaChart width={width} height={400} data={data}>
                <defs>
                    <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="10%" stopColor={colour} stopOpacity={1} />
                    <stop offset="95%" stopColor={colour} stopOpacity={0.0} />
                    </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="1 1 " />
                <XAxis dataKey="x" dy={7} angle={15}/> 
                <YAxis />
                <Tooltip />
                <Area type="monotone" dataKey="y" stroke={colour} strokeWidth="2.5" fill="url(#colorValue)" />
            </AreaChart>
        </>
    ); else return <Typography variant="h4" color="primary">Your portfolio is currently empty.</Typography>
}

export default PreformanceGraph;