import React, { useContext, useEffect } from 'react';
import Charts from '../components/Charts/Charts';
import Slidebar from '../components/Slidebar/Slidebar';
import { Context } from '../contexts/Context';

function ThongKe(props) {
  const { getTblPhieuNhap, phieunhap } = useContext(Context);
  useEffect(() => {
    getTblPhieuNhap();
  }, []);
  return (
    <div className="app">
      <Slidebar />
      <Charts phieunhap={phieunhap} />
    </div>
  );
}

export default ThongKe;
