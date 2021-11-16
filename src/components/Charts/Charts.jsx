import React, { useContext } from 'react';
import { useEffect } from 'react/cjs/react.development';
import { Bar, BarChart, CartesianGrid, Legend, Tooltip, XAxis, YAxis } from 'recharts';
import { Context } from '../../contexts/Context';
import './styles.css';

function Charts() {
  const { getTblPhieuNhap, phieunhap } = useContext(Context);
  useEffect(() => {
    getTblPhieuNhap();
  }, []);
  console.log(phieunhap);

  return (
    <div className="wrap-chart">
      <h2 className="title">Thống kê phiếu nhập</h2>
      <div className="chart">
        <BarChart
          width={900}
          height={450}
          data={phieunhap}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="ngaylap" />
          <YAxis />
          <Tooltip />
          {/* <Legend /> */}
          {/* <Bar dataKey="pv" fill="#8884d8" /> */}
          <Bar dataKey="tongtien" fill="#82ca9d" />
        </BarChart>
      </div>
    </div>
  );
}

export default Charts;
