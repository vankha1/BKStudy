import React from 'react'
import { Pie } from 'react-chartjs-2'
import { Chart, ArcElement } from 'chart.js';
Chart.register(ArcElement);

const PieChart = ({quan1, quan2, quan3}) => {
    const options = {
        maintainAspectRatio: false, // Tắt duy trì tỉ lệ khung hình
        responsive: false, // Biểu đồ linh hoạt với kích thước màn hình
      };


    const data = {
      labels: ['Khóa học tốt', 'Khóa học trung bình', 'Khóa học tệ'],
      datasets: [
        {
          data: [quan1, quan2, quan3],
          backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
          hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
        },
      ],
    };
  
    return (
      <div>
        <Pie data={data} width={250} height={250} options={options}/>
      </div>
    );
  };

export default PieChart