import React from 'react';
import { Bar, BarChart, CartesianGrid, Tooltip, XAxis, YAxis } from 'recharts';
import './styles.css';

function Charts({ phieunhap }) {
  return (
    <div className="wrap-chart">
      <h2 className="title">Thống kê phiếu nhập</h2>
      <div className="chart">
        <BarChart
          width={900}
          height={550}
          data={phieunhap}
          margin={{
            top: 5,
            right: 30,
            left: 10,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="ngaylap" />
          <YAxis />
          <Tooltip />
          {/* <Legend /> */}
          {/* <Bar dataKey="pv" fill="#8884d8" /> */}
          <Bar dataKey="tongtien" fill="#0d6efd" />
        </BarChart>
      </div>
    </div>
  );
}

export default Charts;
