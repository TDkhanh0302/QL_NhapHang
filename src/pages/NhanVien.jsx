import React from 'react';
import ListNhanVien from '../components/QLnhanvien/ListNhanVien';
import Slidebar from '../components/Slidebar/Slidebar';

function NhanVien(props) {
  return (
    <div className="app">
      <Slidebar />
      <ListNhanVien />
    </div>
  );
}

export default NhanVien;
