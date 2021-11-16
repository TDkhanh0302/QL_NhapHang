import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router';
import { useEffect, useRef } from 'react/cjs/react.development';
import { Context } from '../../contexts/Context';
import './styles.css';

function ListPhieuNhap(props) {
  const {
    getTblPhieuNhap,
    setPhieuNhap,
    phieunhap,
    writeDataTable,
    getTblNCC,
    nhaCungCap,
    getTblTaiKhoan,
    taiKhoan,
    getTableId,
  } = useContext(Context);
  useEffect(() => {
    getTblPhieuNhap();
    getTblNCC();
    getTblTaiKhoan();
  }, []);

  const history = useHistory();

  const [title, setTitle] = useState('Thêm phiếu nhập');
  const [valueNCC, setValueNCC] = useState('');
  const [valueNguoiLap, setValueNguoiLap] = useState('');
  const [valueNgayLap, setValueNgayLap] = useState('');

  const idInput = useRef(null);
  const inputSearch = useRef(null);
  const refNgayLap = useRef();

  const handleChangeNCC = (e) => {
    setValueNCC(e.target.value);
    console.log(e.target.value);
  };

  const handleChangeNguoiLap = (e) => {
    setValueNguoiLap(e.target.value);
    console.log(e.target.value);
  };

  const handleChangeNgayLap = (e) => {
    setValueNgayLap(e.target.value);
    console.log(e.target.value);
  };

  const handleEdit = (item) => {
    idInput.current.value = item.id;
    setValueNCC(item.ncc);
    setValueNguoiLap(item.nguoilap);
    setValueNgayLap(item.ngaylap);
    setTitle('Cập nhật phiếu nhập');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let id = idInput.current.value;
    let ncc = valueNCC;
    let ngaylap = valueNgayLap;
    let nguoilap = valueNguoiLap;
    let tongtien = '';
    const listPhieuNhap = [...phieunhap];

    if (ncc !== '' && ngaylap !== '' && nguoilap !== '') {
      if (id && !!listPhieuNhap.length) {
        const PN = getTableId(id, listPhieuNhap);
        PN.ncc = ncc;
        PN.ngaylap = ngaylap;
        PN.nguoilap = nguoilap;
        PN.tongtien = tongtien;
        setPhieuNhap(listPhieuNhap);
        writeDataTable(listPhieuNhap, 'tblPhieuNhap');
      } else if (ncc && ngaylap && nguoilap) {
        const id = Date.now();
        listPhieuNhap.push({ id, ncc, ngaylap, nguoilap, tongtien });
        setPhieuNhap(listPhieuNhap);
        writeDataTable(listPhieuNhap, 'tblPhieuNhap');
      }
      idInput.current.value = '';
      setTitle('Thêm phiếu nhập');
      setValueNCC('');
      setValueNguoiLap('');
      setValueNgayLap('');
    }
  };

  const viewPhieuNhap = (id) => {
    history.push(`/ctphieunhap/${id}`);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const searchText = inputSearch.current.value.toUpperCase();
    const result = [];
    if (searchText !== '') {
      phieunhap?.forEach((item) => {
        if (item.ncc.toUpperCase().includes(searchText) === true) {
          result.push(item);
        } else if (item.nguoilap.toUpperCase().includes(searchText) === true) {
          result.push(item);
        } else if (item.ngaylap.toUpperCase().includes(searchText) === true) {
          result.push(item);
        }
      });
      setPhieuNhap(result);
    } else if (searchText === '') {
      getTblPhieuNhap();
    }
  };

  return (
    <>
      <div className="wrap">
        <h2 className="title">Danh sách phiếu nhập</h2>

        <form onSubmit={handleSearch} action="">
          <div className="search-box">
            <input ref={inputSearch} type="text" name="" id="" />
            <button>Tìm kiếm</button>
          </div>
        </form>

        <div className="table-responsive">
          <table className="table table-md table-hover">
            <thead className="table-dark">
              <tr>
                <th scope="col">STT</th>
                <th scope="col">Mã phiếu</th>
                <th scope="col">Nhà cung cấp</th>
                <th scope="col">Ngày lập</th>
                <th scope="col">Người lập</th>
                <th scope="col">Hành động</th>
              </tr>
            </thead>
            <tbody>
              {phieunhap?.map((item, idx) => (
                <tr key={item.id}>
                  <th scope="row">{idx}</th>
                  <td>{item.id}</td>
                  <td>{item.ncc}</td>
                  <td>{item.ngaylap}</td>
                  <td>{item.nguoilap}</td>
                  <td>
                    <a href="#" className="table-icon" onClick={() => handleEdit(item)}>
                      <i className="fas fa-edit"></i>
                    </a>
                    <a href="#" className="table-icon" onClick={() => viewPhieuNhap(item.id)}>
                      <i className="fas fa-eye"></i>
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <nav className="mt-4" aria-label="Page navigation example">
          <ul className="pagination pagination-lg justify-content-center">
            <li className="page-item">
              <a className="page-link" href="#" aria-label="Previous">
                <span aria-hidden="true">&laquo;</span>
              </a>
            </li>
            <li className="page-item">
              <a className="page-link" href="#">
                1
              </a>
            </li>
            <li className="page-item">
              <a className="page-link" href="#" aria-label="Next">
                <span aria-hidden="true">&raquo;</span>
              </a>
            </li>
          </ul>
        </nav>
      </div>

      <div className="box-add">
        <h3>{title}</h3>

        <form onSubmit={handleSubmit}>
          <input ref={idInput} type="hidden" name="" />

          <div className="mb-3">
            <label htmlFor="ncc" className="form-label">
              Nhà cung cấp
            </label>
            <select
              value={valueNCC}
              onChange={handleChangeNCC}
              className="form-select form-select-lg"
              required
            >
              <option>--Chọn nhà cung cấp--</option>
              {nhaCungCap?.map((ncc, idx) => (
                <option key={idx} value={ncc.ten}>
                  {ncc.ten}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-3">
            <label htmlFor="ngay-lap" className="form-label">
              Ngày lập
            </label>
            <input
              ref={refNgayLap}
              value={valueNgayLap}
              onChange={handleChangeNgayLap}
              type="date"
              className="form-control"
              id="ngay-lap"
              aria-describedby="emailHelp"
            />
          </div>

          <div className="mb-3">
            <label htmlFor="nguoi-lap" className="form-label">
              Người lập
            </label>
            <select
              value={valueNguoiLap}
              onChange={handleChangeNguoiLap}
              className="form-select form-select-lg"
              required
            >
              <option>--Chọn người lập--</option>
              {taiKhoan?.map((TK, idx) => (
                <option key={idx} value={TK.tentaikhoan}>
                  {TK.tentaikhoan}
                </option>
              ))}
            </select>
          </div>

          <button type="submit" className="btn btn-primary btn-lg">
            Submit
          </button>
        </form>
      </div>
    </>
  );
}

export default ListPhieuNhap;
