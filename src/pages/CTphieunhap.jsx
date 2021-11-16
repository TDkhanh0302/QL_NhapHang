import React from 'react';
import { useParams } from 'react-router';
import ListCTphieunhap from '../components/CTphieunhap/ListCTphieunhap';
import Slidebar from '../components/Slidebar/Slidebar';

function CTphieunhap(props) {
  const { id } = useParams();
  return (
    <div className="app">
      <Slidebar />
      <ListCTphieunhap idPhieuNhap={id} />
    </div>
  );
}

export default CTphieunhap;
