import React from 'react';
import { useState } from 'react';
import { Pie } from 'react-chartjs-2';
import {Chart, ArcElement} from 'chart.js'

Chart.register(ArcElement);


const PieChart = ({ data }) => {
    const labels = data.map((item) => item.name);
    const statistics = data.map((item) => item.statistics);

    const getRandomColor = () => {
      const letters = '0123456789ABCDEF';
      let color = '#';
      for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
      }
      return color;
    };  

    const backgroundColors = data.map(() => getRandomColor());
    
    const [activeSlice, setActiveSlice] = useState(null);
  
    const chartData = {
      labels: labels,
      datasets: [
        {
          data: statistics,
          backgroundColor: backgroundColors,
        },
      ],
    };

  
    const handleHover = (_, activeElements) => {
      if (activeElements.length > 0) {
        const activeIndex = activeElements[0].index;
        setActiveSlice(data[activeIndex]);
      } else {
        setActiveSlice(null);
      }
    };
  
    const legendItems = data.map((item, index) => (
      <div key={index}>
        <span
          style={{
            display: 'inline-block',
            width: '12px',
            height: '12px',
            backgroundColor: backgroundColors[index],
            marginRight: '4px',
          }}
        ></span>
        <span>{`${item.name}: ${item.statistics}`}</span>
      </div>
    ));
  
    return (
      <div>
        <div>{legendItems}</div>
        <Pie data={chartData} onHover={handleHover} />
        {activeSlice && (
          <div style={{ marginTop: '10px' }}>
            <strong>{activeSlice.name}</strong>: {activeSlice.statistics}
          </div>
        )}
      </div>
    );
  };
  
  export default PieChart;
