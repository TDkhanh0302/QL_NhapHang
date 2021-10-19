import React from 'react';
import AddChauCay from '../components/QLchaucay/AddChauCay';
import ListChauCay from '../components/QLchaucay/ListChauCay';
import Slidebar from '../components/Slidebar/Slidebar';

function ChauCay(props) {
  return (
    <div className="app">
      <Slidebar />
      <ListChauCay />
      <AddChauCay />
    </div>
  );
}

export default ChauCay;
