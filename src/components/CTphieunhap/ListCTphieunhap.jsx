import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router';
import { useEffect, useRef } from 'react/cjs/react.development';
import { Context } from '../../contexts/Context';
import './styles.css';

function ListCTphieunhap({ idPhieuNhap }) {
  const {
    getTblCTPhieuNhap,
    writeDataTable,
    setCTphieunhap,
    ctPhieuNhap,
    getTableId,
    getTblChauCay,
    chauCay,
    getTblPhieuNhap,
    phieunhap,
  } = useContext(Context);
  useEffect(() => {
    getTblCTPhieuNhap();
    getTblChauCay();
    getTblPhieuNhap();
  }, []);

  const history = useHistory();

  const [title, setTitle] = useState('Thêm chi tiết phiếu nhập');
  const [valueTenChauCay, setValueTenChauCay] = useState('');
  const [donGia, setDonGia] = useState('');
  const [tongTien, setTongTien] = useState('...');

  const idInput = useRef(null);
  const inputSoLuong = useRef(null);
  const inputSearch = useRef(null);

  const data = ctPhieuNhap?.filter((item) => {
    return item.maPhieuNhap == idPhieuNhap;
  });

  const pushTotalPrice = () => {
    const listPhieuNhap = [...phieunhap];
    const phieuNhapById = getTableId(idPhieuNhap, listPhieuNhap);
    phieuNhapById.tongtien = tongTien;
    writeDataTable(listPhieuNhap, 'tblPhieuNhap');
  };

  useEffect(() => {
    pushTotalPrice();
  }, [tongTien]);

  const sum = () => {
    var total = 0;
    for (let i = 0; i < data?.length; i++) {
      total += data[i].thanhtien;
    }
    setTongTien(total);
  };

  useEffect(() => {
    sum();
  }, [data?.length]);

  const handleChangeChauCay = (e) => {
    const tenChauCay = e.target.value;
    setValueTenChauCay(tenChauCay);
    const cay = chauCay?.find((item) => item.ten == tenChauCay);
    setDonGia(cay.gia);
  };

  const handleEdit = (item) => {
    idInput.current.value = item.id;
    setValueTenChauCay(item.tenchaucay);
    inputSoLuong.current.value = item.soluong;
    console.log(item.dongia);
    setDonGia(item.dongia);
    setTitle('Cập nhật chi tiết phiếu nhập');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let id = idInput.current.value;
    let maPhieuNhap = idPhieuNhap;
    let tenchaucay = valueTenChauCay;
    let soluong = inputSoLuong.current.value;
    let dongia = donGia;
    let thanhtien = soluong * dongia;
    const listCTphieu = [...ctPhieuNhap];

    if (tenchaucay !== '' && soluong !== '' && dongia !== '') {
      if (id && !!data.length) {
        const ctPhieu = getTableId(id, listCTphieu);
        ctPhieu.maPhieuNhap = maPhieuNhap;
        ctPhieu.tenchaucay = tenchaucay;
        ctPhieu.soluong = soluong;
        ctPhieu.dongia = dongia;
        ctPhieu.thanhtien = thanhtien;
        setCTphieunhap(listCTphieu);
        writeDataTable(listCTphieu, 'tblCTPhieuNhap');
        sum();
      } else if (tenchaucay && soluong && dongia) {
        const id = Date.now();
        listCTphieu.push({ id, maPhieuNhap, tenchaucay, soluong, dongia, thanhtien });
        setCTphieunhap(listCTphieu);
        writeDataTable(listCTphieu, 'tblCTPhieuNhap');
      }
      idInput.current.value = '';
      setValueTenChauCay('');
      setDonGia('');
      inputSoLuong.current.value = '';
    }
  };

  const handleRemove = (item) => {
    const listCTPhieuNhap = [...ctPhieuNhap];
    const newArr = listCTPhieuNhap.filter((data) => {
      return data.id !== item.id;
    });
    if (window.confirm('Bạn có chắc muốn xóa')) {
      setCTphieunhap(newArr);
      writeDataTable(newArr, 'tblCTPhieuNhap');
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const searchText = inputSearch.current.value.toUpperCase();
    const result = [];
    if (searchText !== '') {
      data?.forEach((item) => {
        if (item.tenchaucay.toUpperCase().includes(searchText) === true) {
          result.push(item);
        } else if (item.dongia.toUpperCase().includes(searchText) === true) {
          result.push(item);
        }
      });
      setCTphieunhap(result);
    } else if (searchText === '') {
      getTblCTPhieuNhap();
    }
  };

  return (
    <>
      <div className="wrap">
        <h2 className="title">Chi tiết phiếu nhập</h2>
        <p className="sub-title">
          <a onClick={() => history.push('/phieunhap')} href="#">
            Quản lý phiếu nhập
          </a>
          {''} / Phiếu nhập số: <span>{idPhieuNhap}</span>
        </p>

        <form onSubmit={handleSearch} action="">
          <div className="search-box">
            <input ref={inputSearch} type="text" name="" id="" />
            <button type="submit">Tìm kiếm</button>
          </div>
        </form>

        <div className="table-responsive">
          <table className="table table-md table-hover">
            <thead className="table-dark">
              <tr>
                <th scope="col">STT</th>
                <th scope="col">Tên chậu cây</th>
                <th scope="col">Số lượng</th>
                <th scope="col">Đơn giá</th>
                <th scope="col">Thành tiền</th>
                <th scope="col">Hành động</th>
              </tr>
            </thead>
            <tbody>
              {data?.map((item, idx) => (
                <tr key={item.id}>
                  <th scope="row">{idx}</th>
                  <td>{item.tenchaucay}</td>
                  <td>{item.soluong}</td>
                  <td>{item.dongia}</td>
                  <td>{item.soluong * item.dongia}</td>
                  <td>
                    <a href="#" className="table-icon" onClick={() => handleEdit(item)}>
                      <i className="fas fa-edit"></i>
                    </a>
                    <a href="#" className="table-icon" onClick={() => handleRemove(item)}>
                      <i className="fas fa-trash-alt"></i>
                    </a>
                  </td>
                </tr>
              ))}
              <tr>
                <th colSpan="4">Tổng tiền</th>
                <th colSpan="2">{tongTien}</th>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="box-add">
        <h3>{title}</h3>

        <form onSubmit={handleSubmit}>
          <input ref={idInput} type="hidden" name="" />

          <div className="mb-3">
            <label htmlFor="ten-tai-khoan" className="form-label">
              Tên chậu cây
            </label>
            <select
              value={valueTenChauCay}
              onChange={handleChangeChauCay}
              className="form-select form-select-lg"
              required
            >
              <option value="">--Chọn chậu cây--</option>
              {chauCay?.map((nv, idx) => (
                <option key={idx} value={nv.ten}>
                  {nv.ten}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-3">
            <label htmlFor="soluong" className="form-label">
              Số lượng
            </label>
            <input
              ref={inputSoLuong}
              type="number"
              className="form-control"
              id="soluong"
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="don-gia" className="form-label">
              Đơn giá
            </label>
            <input
              readOnly
              // defaultValue={donGia}
              value={donGia}
              type="text"
              className="form-control"
              id="don-gia"
              required
            />
          </div>

          <button type="submit" className="btn btn-primary btn-lg">
            Submit
          </button>
        </form>
      </div>
    </>
  );
}

export default ListCTphieunhap;
