import React from 'react';
import ListTaiKhoan from '../components/QLtaikhoan/ListTaiKhoan';
import Slidebar from '../components/Slidebar/Slidebar';

function TaiKhoan(props) {
  return (
    <div className="app">
      <Slidebar />
      <ListTaiKhoan />
    </div>
  );
}

export default TaiKhoan;
