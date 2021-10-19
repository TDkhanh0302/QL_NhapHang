import React from 'react';
import AddPhieunhap from '../components/QLphieunhap/AddPhieunhap';
import ListPhieuNhap from '../components/QLphieunhap/ListPhieuNhap';
import Slidebar from '../components/Slidebar/Slidebar';

function PhieuNhap(props) {
  return (
    <div className="app">
      <Slidebar />
      <ListPhieuNhap />
      <AddPhieunhap />
    </div>
  );
}

export default PhieuNhap;
