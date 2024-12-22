import React from 'react';
import { Doughnut } from 'react-chartjs-2';

function DoughnutChart(props) {
  const {stocks} = props

  const data = {
    labels: ['In Stock', 'Out of Stock'],
    datasets: [
      {
        label: 'Stocks',
        data: [stocks.inStock, stocks.outOfStock],
        backgroundColor: [
          'rgba(255, 99, 132, 0.6)',
          'rgba(54, 162, 235, 0.6)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
        ],
        borderWidth: 1,
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
  };

  return <Doughnut data={data} options={options} />;
}

export default DoughnutChart;
