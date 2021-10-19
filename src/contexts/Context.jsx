import React, { createContext, useEffect, useState } from 'react';
import { realtimeDB, storage } from '../firebase/firebaseConfig';

export const Context = createContext();

const ContextProvider = ({ children }) => {
  const [nhaCungCap, setNhaCungCap] = useState(null);
  const [chauCay, setChauCay] = useState(null);
  const [loaiChauCay, setLoaiChauCay] = useState(null);
  const [phieunhap, setPhieuNhap] = useState(null);
  const [ctPhieuNhap, setCTphieunhap] = useState(null);
  const [nhanVien, setNhanVien] = useState(null);
  const [taiKhoan, setTaiKhoan] = useState(null);
  const [userLogged, setUserLogged] = useState(null);

  // gọi dữ liệu về và set các bảng dữ liệu vào các state tương ứng
  const getTblNCC = () => {
    realtimeDB.ref('tblNhaCungCap').on('value', (snapshot) => {
      const state = snapshot.val();
      setNhaCungCap(state);
    });
  };

  const getTblChauCay = () => {
    realtimeDB.ref('tblChauCay').on('value', (snapshot) => {
      const state = snapshot.val();
      setChauCay(state);
    });
  };
  const getTblLoaiChauCay = () => {
    realtimeDB.ref('tblLoaiChauCay').on('value', (snapshot) => {
      const state = snapshot.val();
      setLoaiChauCay(state);
    });
  };
  const getTblPhieuNhap = () => {
    realtimeDB.ref('tblPhieuNhap').on('value', (snapshot) => {
      const state = snapshot.val();
      setPhieuNhap(state);
    });
  };
  const getTblCTPhieuNhap = () => {
    realtimeDB.ref('tblCTPhieuNhap').on('value', (snapshot) => {
      const state = snapshot.val();
      setCTphieunhap(state);
    });
  };
  const getTblNhanVien = () => {
    realtimeDB.ref('tblNhanVien').on('value', (snapshot) => {
      const state = snapshot.val();
      setNhanVien(state);
    });
  };
  const getTblTaiKhoan = () => {
    realtimeDB.ref('tblTaiKhoan').on('value', (snapshot) => {
      const state = snapshot.val();
      setTaiKhoan(state);
    });
  };
  const getUserLogged = () => {
    realtimeDB.ref('userLogged').on('value', (snapshot) => {
      const state = snapshot.val();
      setUserLogged(state);
    });
  };

  // add || update dữ liệu vào 1 bảng
  const writeDataTable = (data, table_name) => {
    realtimeDB.ref(table_name).set(data);
  };

  // upload file
  const uploadFile = (ref, file) => {
    storage.ref(ref).put(file);
  };

  // download file
  const downloadFile = (ref) => {
    storage
      .ref(ref)
      .getDownloadURL()
      .then((url) => {
        var img = document.getElementById('myimg');
        img.setAttribute('src', url);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // delete file
  const deleteFile = (ref) => {
    storage.ref(ref).delete();
  };

  // const dataNCC = [
  //   {
  //     id: Date.now(),
  //     ten: 'kim long',
  //     diachi: 'Ha Noi',
  //     sdt: '012345678',
  //     email: 'kimlong@gmail.com',
  //   },
  // ];

  // useEffect(() => {
  //   writeDataTable(dataNCC, 'tblNhaCungCap');
  // }, []);

  // get Tournament By Id
  const getTableId = (id, table) => {
    return table?.find((item) => item.id == id);
  };

  const ContextData = {
    getTblNCC,
    getTblChauCay,
    getTblLoaiChauCay,
    getTblPhieuNhap,
    getTblCTPhieuNhap,
    getTblNhanVien,
    getTblTaiKhoan,
    getUserLogged,
    getTableId,
    writeDataTable,
    setNhaCungCap,
    setChauCay,
    setLoaiChauCay,
    setPhieuNhap,
    setCTphieunhap,
    setNhanVien,
    setTaiKhoan,
    setUserLogged,
    nhaCungCap,
    chauCay,
    loaiChauCay,
    phieunhap,
    ctPhieuNhap,
    nhanVien,
    taiKhoan,
    userLogged,
  };

  return <Context.Provider value={ContextData}>{children}</Context.Provider>;
};

export default ContextProvider;
