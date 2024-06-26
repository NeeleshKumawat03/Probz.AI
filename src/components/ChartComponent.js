import React, { useEffect, useRef, useState } from 'react';
import Chart from 'chart.js/auto';
import moment from 'moment';

const ChartComponent = ({ data }) => {
  const chartRef = useRef(null);
  const [chart, setChart] = useState(null);

  useEffect(() => {
    if (chartRef.current && data.length > 0) {
      if (chart) {
        chart.destroy(); // Destroy the previous chart instance if exist
      }
      const ctx = chartRef.current.getContext('2d');
      if (ctx) {
        const chartInstance = new Chart(ctx, {
          type: 'line',
          data: {
            labels: data.map(point => moment(point.timestamp).format('MMM D')),
            datasets: [{
              label: 'Value',
              data: data.map(point => point.value),
              borderColor: 'blue',
              backgroundColor: 'rgba(0, 119, 204, 0.3)',
              tension: 0.4,
              fill: true,
            }],
          },
          options: {
            responsive: true,
            plugins: {
              legend: {
                display: false,
              },
              tooltip: {
                callbacks: {
                  label: function(tooltipItem) {
                    return `Value: ${tooltipItem.raw}`;
                  }
                }
              }
            },
          },
        });
        setChart(chartInstance);
      }
    }
  }, [data]);

  return (
    <div className='chartContainer'>
        <div className='chart'>
            <canvas ref={chartRef} />
        </div>
      
    </div>
  );
};

export default ChartComponent;
