import React from 'react';
import ListNCC from '../components/QLnhacungcap/ListNCC';
import Slidebar from '../components/Slidebar/Slidebar';

function NhaCungCap(props) {
  return (
    <div className="app">
      <Slidebar />
      <ListNCC />
    </div>
  );
}

export default NhaCungCap;
