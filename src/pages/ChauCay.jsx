import React from 'react';
import ListChauCay from '../components/QLchaucay/ListChauCay';
import Slidebar from '../components/Slidebar/Slidebar';

function ChauCay(props) {
  return (
    <div className="app">
      <Slidebar />
      <ListChauCay />
    </div>
  );
}

export default ChauCay;
