import React, { useState, useEffect } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import theme from '../../../../theme';
import useMediaQuery from '@material-ui/core/useMediaQuery';

// Graph of performance data that resizes alongside the window
const PerformanceGraph = ({ data }) => {
    let colour = theme.palette.positive.main;
    let width = 1200;
    let height = 600;

    // Dynamically change based on screen size
    if (useMediaQuery('(max-width:1500px)')) {
        width = 800;
        height = 400;
    }
    if (useMediaQuery('(max-width:1000px)')) {
        width = 450;
        height = 225;
    }


    // Set colour based on performance
    if (data.length > 0 && data[data.length - 1].y < 0) { colour = theme.palette.negative.main; }

    // This loading ensures that the graph will be animated when loaded
    return (
        <AreaChart width={width} height={height} data={data} isAbove >
            <defs>
                <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="10%" stopColor={colour} stopOpacity={1} />
                    <stop offset="95%" stopColor={colour} stopOpacity={0.0} />
                </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="1 1 " />
            <XAxis dataKey="x" dy={7} angle={15} />
            <YAxis type="number" domain={[
                // Use min / max incase of negative numbers
                dataMin => Math.floor(Math.min(dataMin * 0.75, dataMin * 1.25)),
                dataMax => Math.floor(Math.max(dataMax * 0.75, dataMax * 1.25))
            ]} />
            <Tooltip />
            <Area type="linear" dataKey="y" stroke={colour} strokeWidth="2.5" fill="url(#colorValue)" />
        </AreaChart>
    );
};

export default PerformanceGraph;