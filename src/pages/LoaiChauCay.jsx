import React from 'react';
import AddLoaiChauCay from '../components/QLloaichaucay/AddLoaiChauCay';
import ListLoaiChauCay from '../components/QLloaichaucay/ListLoaiChauCay';
import Slidebar from '../components/Slidebar/Slidebar';

function LoaiChauCay(props) {
  return (
    <div className="app">
      <Slidebar />
      <ListLoaiChauCay />
      <AddLoaiChauCay />
    </div>
  );
}

export default LoaiChauCay;
