import React from 'react';
import AddNhanVien from '../components/QLnhanvien/AddNhanVien';
import ListNhanVien from '../components/QLnhanvien/ListNhanVien';
import Slidebar from '../components/Slidebar/Slidebar';

function NhanVien(props) {
  return (
    <div className="app">
      <Slidebar />
      <ListNhanVien />
      <AddNhanVien />
    </div>
  );
}

export default NhanVien;
