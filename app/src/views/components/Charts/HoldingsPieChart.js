import React from 'react'
import { PieChart, Pie, Legend, Cell, Tooltip } from 'recharts'
import CircularProgress from '@material-ui/core/CircularProgress';

export default ({ data }) => {
    console.log('inside pie chart', data)

    if (!data) {
        return (
            <CircularProgress size={30} color="primary" />
        )
    }
    else {
        const pieData = data.map(e => {
            return {
                name: e.symbol,
                value: e.bookValue
            }
        })

        console.log('pieData', pieData)

        // const pieColors = ['#39ab74', '#18f58b']

        return (
            <PieChart width={400} height={400}>
                <Pie 
                    startAngle={450} 
                    endAngle={90} data={pieData} 
                    cx={200} cy={200} 
                    outerRadius={80} 
                    fill="#39ab74" 
                    label 
                />
                <Tooltip />
            </PieChart>
        )
    }

}