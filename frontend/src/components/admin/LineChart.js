import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS } from 'chart.js/auto'
import { Chart }            from 'react-chartjs-2'

function LineChart(props) {
  const { total } = props;
  const data = {
    labels: ['From', 'To'],
    datasets: [
      {
        label: 'Sales in USD',
        data: [0, total],
        fill: false,
        backgroundColor: 'rgba(75,192,192,1)',
        borderColor: 'rgba(75,192,192,1)',
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        grid: {
          color: '#e3e3e3',
        },
        ticks: {
          beginAtZero: true,
        },
      },
    },
  };

  return <Line data={data} options={options} />;
}

export default LineChart;
