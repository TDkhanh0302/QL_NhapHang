import React from 'react';
import ListPhieuNhap from '../components/QLphieunhap/ListPhieuNhap';
import Slidebar from '../components/Slidebar/Slidebar';

function PhieuNhap(props) {
  return (
    <div className="app">
      <Slidebar />
      <ListPhieuNhap />
    </div>
  );
}

export default PhieuNhap;
