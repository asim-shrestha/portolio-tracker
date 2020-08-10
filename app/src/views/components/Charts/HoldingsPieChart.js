import React, { useState } from 'react';
import { PieChart, Pie, Tooltip } from 'recharts';
import { Box, CircularProgress, TextField, MenuItem } from '@material-ui/core';
import useMediaQuery from '@material-ui/core/useMediaQuery';

export default ({ data }) => {
    const [pieChartBreakdown, setPieChartBreakdown] = useState('marketValue');

    // Change pie chart size if the window is too small 
    let sizePercentage = 1;
    if (useMediaQuery('(max-width:1000px)')) {
        sizePercentage = 0.75;
    }

    if (!data) {
        return (
            <Box align="center">
                <CircularProgress size={50} color="primary" />
            </Box>
        );
    }
    else {

        let pieData = [];

        // number values
        if (pieChartBreakdown === 'marketValue' || pieChartBreakdown === 'bookValue') {
            pieData = data.map(e => {
                return {
                    name: e.symbol,
                    value: e[pieChartBreakdown]
                };
            });
        }
        // string values
        else {

            // count of each type
            const pieMap = new Map;
            data.forEach(e => {
                if (pieMap[e[pieChartBreakdown]]) {
                    pieMap[e[pieChartBreakdown]] = pieMap[e[pieChartBreakdown]] + 1;
                }
                else {
                    pieMap[e[pieChartBreakdown]] = 1;
                }
            });

            // map -> array
            for (const [k, v] of Object.entries(pieMap)) {
                pieData.push({ name: k, value: v });
            }
        }

        let pieSum = 0;
        pieData.forEach(e => { pieSum += e.value; });

        const RADIAN = Math.PI / 180;
        const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, value, name }) => {
            const radius = (20 + innerRadius + (outerRadius - innerRadius) * 0.5) * sizePercentage;
            const x = cx + radius * Math.cos(-midAngle * RADIAN);
            const y = cy + radius * Math.sin(-midAngle * RADIAN);
            const percent = (100 * value / pieSum).toFixed(0);
            return (
                <text x={x} y={y} fill="black" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
                    {name} {percent}%
                </text>
            );
        };

        return (
            <>
                <Box style={{ marginTop: '25px' }}>
                    <TextField fullWidth variant='outlined' label='Breakdown' select onChange={e => setPieChartBreakdown(e.target.value)} value={pieChartBreakdown}>
                        <MenuItem value='bookValue'>Book Value</MenuItem>
                        <MenuItem value='marketValue'>Market Value</MenuItem>
                        <MenuItem value='marketCap'>Market Cap</MenuItem>
                        <MenuItem value='country'>Country</MenuItem>
                        <MenuItem value='industry'>Industry</MenuItem>
                        <MenuItem value='sector'>Sector</MenuItem>
                    </TextField>
                </Box>

                <Box align='center'>
                    <div style={{ fontSize: '16px' }}>
                        <PieChart width={800 * sizePercentage} height={600 * sizePercentage} >
                            <Pie
                                // no animation because recharts sucks and cant render
                                isAnimationActive={false}
                                data={pieData}
                                dataKey='value'
                                startAngle={360} endAngle={0}
                                cx={400 * sizePercentage} cy={300 * sizePercentage}
                                outerRadius={250 * sizePercentage}
                                fill="#39ab74"
                                labelLine={false}
                                label={renderCustomizedLabel}
                            />
                            <Tooltip />
                        </PieChart>
                    </div>
                </Box>
            </>
        );
    }

};