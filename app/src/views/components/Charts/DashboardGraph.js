import React from 'react';
import Typography from '@material-ui/core/Typography';
import PreformanceGraph from './PreformanceGraph';

// TODO share method with HoldingsTable
// Format currency related strings to include commas and only two decimal places
const currencyFormat = (n) => {
    if (n === null) { return 0 };
    return n.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
}

// Returns the preformance graph if data is given and a message saying "the portfolio is currently empty" otherwise
const DashboardGraph = ({ data, holdings }) => {
    let totalValue = 0;
    if (holdings) {
        totalValue = holdings.reduce((total, stock) => total + stock.marketValue, 0);
    }

    let portfolioPercentage = 0;
    if (data.length > 0) { portfolioPercentage = data[data.length - 1].y; } // Percentage at today's date

    // This loading ensures that the graph will be animated when loaded
    if (data.length > 0) return (
        <>
            <Typography variant="h5" color="primary">
                Your portfolio is currently worth ${currencyFormat(totalValue)}
            </Typography>
            <Typography variant="h6" color="primary">
                {data[data.length - 1].y > 0 ? "Up" : "Down"} {currencyFormat(portfolioPercentage)}% all time
            </Typography>
            <PreformanceGraph data={data}/>
        </>
    ); else return <Typography variant="h4" color="primary">Your portfolio is currently empty.</Typography>
}

export default DashboardGraph;