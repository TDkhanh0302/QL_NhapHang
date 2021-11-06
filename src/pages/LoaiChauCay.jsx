import React from 'react';
import ListLoaiChauCay from '../components/QLloaichaucay/ListLoaiChauCay';
import Slidebar from '../components/Slidebar/Slidebar';

function LoaiChauCay(props) {
  return (
    <div className="app">
      <Slidebar />
      <ListLoaiChauCay />
    </div>
  );
}

export default LoaiChauCay;
