import React, { useCallback } from 'react'
import { PieChart, Pie, Tooltip } from 'recharts'
import { Box, CircularProgress } from '@material-ui/core';

export default ({ data }) => {
    if (!data) {
        return (
            <Box align="center">
                <CircularProgress size={50} color="primary" />
            </Box>
        )
    }
    else {
        const pieData = data.map(e => {
            return {
                name: e.symbol,
                value: e.marketValue
            }
        })
        let pieSum = 0
        pieData.map(e => {pieSum += e.value})
        const RADIAN = Math.PI / 180;
        const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, value, name }) => {
            const radius = 20 + innerRadius + (outerRadius - innerRadius) * 0.5;
            const x = cx + radius * Math.cos(-midAngle * RADIAN);
            const y = cy + radius * Math.sin(-midAngle * RADIAN);
            const percent = (100 * value / pieSum).toFixed(0)
            return (
                <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
                    {name} {percent}%
                </text>
            )
        }

        // const pieColors = ['#39ab74', '#18f58b']

        return (
            <Box align='center'>
                <div style={{fontSize: '16px'}}>
                    <PieChart width={600} height={600} >
                        <Pie
                            // no animation because recharts sucks and cant render
                            isAnimationActive={false}
                            data={pieData}
                            dataKey='value'
                            startAngle={360} endAngle={0}
                            cx={300} cy={300}
                            outerRadius={250}
                            fill="#39ab74"
                            labelLine={false}
                            label={renderCustomizedLabel}
                        />
                        <Tooltip />
                    </PieChart>
                </div>
            </Box>
        )
    }

}