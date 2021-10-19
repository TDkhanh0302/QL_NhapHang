import React from 'react';
import AddTaiKhoan from '../components/QLtaikhoan/AddTaiKhoan';
import ListTaiKhoan from '../components/QLtaikhoan/ListTaiKhoan';
import Slidebar from '../components/Slidebar/Slidebar';

function TaiKhoan(props) {
  return (
    <div className="app">
      <Slidebar />
      <ListTaiKhoan />
      <AddTaiKhoan />
    </div>
  );
}

export default TaiKhoan;
