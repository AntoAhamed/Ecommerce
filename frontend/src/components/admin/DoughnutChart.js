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
          '#80ff00',
          '#ff0000',
        ],
        borderColor: [
          'transparent',
          'transparent',
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
