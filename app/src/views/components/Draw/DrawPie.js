import React, { Component } from 'react';
import { PieChart, Pie, XAxis, YAxis, Label } from 'recharts';
import { Typography } from '@material-ui/core';

// TODO: this data needs to be replaced
const data01 = [
  { name: 'Group A', value: 400 }, 
  { name: 'Group B', value: 300 },
  { name: 'Group C', value: 300 }, 
  { name: 'Group D', value: 200 },
];

export default class DrawPie extends Component {
  render() {
    return (
      <Typography variant="caption" color="secondary">
        <PieChart width={500 } height={500}>
          <Pie data={data01} dataKey="value" cx={250} cy={250} outerRadius={150} fill="#A6192E" label />
        </PieChart>
      </ Typography>
    );
  }
}
