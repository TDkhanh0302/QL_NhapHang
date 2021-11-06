import React, { useContext } from 'react';
import { useEffect, useRef, useState } from 'react/cjs/react.development';
import { Context } from '../../contexts/Context';

function ListNhanVien(props) {
  const { getTblNhanVien, setNhanVien, writeDataTable, nhanVien, getTableId } = useContext(Context);
  useEffect(() => {
    getTblNhanVien();
  }, []);

  const [title, setTitle] = useState('Thêm nhân viên');
  const [valueGioiTinh, setValueGioiTinh] = useState('Nam');
  const [valueChucVu, setValueChucVu] = useState('Nhân viên');

  const idInput = useRef(null);
  const inputTen = useRef(null);
  const inputSdt = useRef(null);
  const inputDiaChi = useRef(null);
  const inputSearch = useRef(null);
  const invalidSDT = useRef(null);

  const handleSelectGioiTinh = (e) => {
    setValueGioiTinh(e.target.value);
    console.log(e.target.value);
  };

  const handleSelectChucVu = (e) => {
    setValueChucVu(e.target.value);
    console.log(e.target.value);
  };

  const handleEditClick = (item) => {
    idInput.current.value = item.id;
    inputTen.current.value = item.ten;
    inputSdt.current.value = item.sdt;
    inputDiaChi.current.value = item.diachi;
    setValueGioiTinh(item.gioitinh);
    setValueChucVu(item.chucvu);
    setTitle('Cập nhật nhân viên');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let id = idInput.current.value;
    let ten = inputTen.current.value;
    let gioitinh = valueGioiTinh;
    let sdt = inputSdt.current.value;
    let diachi = inputDiaChi.current.value;
    let chucvu = valueChucVu;
    const listNhanVien = [...nhanVien];
    const regexSDT = /((09|03|07|08|05)+([0-9]{8})\b)/g;

    if (regexSDT.test(sdt) == false) {
      invalidSDT.current.classList.remove('hidden');
      inputSdt.current.focus();
    } else {
      if (id && ten && !!listNhanVien.length) {
        const NV = getTableId(id, listNhanVien);
        NV.ten = ten;
        NV.gioitinh = gioitinh;
        NV.sdt = sdt;
        NV.diachi = diachi;
        NV.chucvu = chucvu;
        setNhanVien(listNhanVien);
        writeDataTable(listNhanVien, 'tblNhanVien');
      } else if (ten && gioitinh && chucvu) {
        const id = Date.now();
        listNhanVien.push({ id, ten, gioitinh, sdt, diachi, chucvu });
        setNhanVien(listNhanVien);
        writeDataTable(listNhanVien, 'tblNhanVien');
      }
      invalidSDT.current.classList.add('hidden');
      idInput.current.value = '';
      inputTen.current.value = '';
      inputSdt.current.value = '';
      inputDiaChi.current.value = '';
      setTitle('Thêm nhân viên');
    }
  };

  const handleRemove = (item) => {
    const listNV = [...nhanVien];
    const newArr = listNV.filter((data) => {
      return data.id !== item.id;
    });
    setNhanVien(newArr);
    writeDataTable(newArr, 'tblNhanVien');
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const searchText = inputSearch.current.value.toUpperCase();
    const results = [];
    if (searchText !== '') {
      nhanVien?.forEach((item) => {
        if (item.ten.toUpperCase().includes(searchText) === true) {
          results.push(item);
        } else if (item.sdt.toUpperCase().includes(searchText) === true) {
          results.push(item);
        } else if (item.diachi.toUpperCase().includes(searchText) === true) {
          results.push(item);
        }
      });
      setNhanVien(results);
    } else if (searchText === '') {
      getTblNhanVien();
    }
  };

  return (
    <>
      <div className="wrap">
        <h2 className="title">Danh sách nhân viên</h2>

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
                <th scope="col">Tên nhân viên</th>
                <th scope="col">Giới tính</th>
                <th scope="col">Số điện thoại</th>
                <th scope="col">Địa chỉ</th>
                <th scope="col">Chức vụ</th>
                <th scope="col">Hành động</th>
              </tr>
            </thead>
            <tbody>
              {nhanVien?.map((item, idx) => (
                <tr key={item.id}>
                  <th scope="row">{idx}</th>
                  <td>{item.ten}</td>
                  <td>{item.gioitinh}</td>
                  <td>{item.sdt}</td>
                  <td>{item.diachi}</td>
                  <td>{item.chucvu}</td>
                  <td>
                    <a href="#" className="table-icon" onClick={() => handleEditClick(item)}>
                      <i className="fas fa-edit"></i>
                    </a>
                    <a href="#" className="table-icon" onClick={() => handleRemove(item)}>
                      <i className="fas fa-trash-alt"></i>
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
            <label htmlFor="ten-nhan-vien" className="form-label">
              Tên nhân viên
            </label>
            <input
              required
              ref={inputTen}
              type="text"
              className="form-control"
              id="ten-nhan-vien"
            />
          </div>

          <div className="mb-3">
            <label htmlFor="gioi-tinh" className="form-label">
              Giói tính
            </label>
            <select
              value={valueGioiTinh}
              onChange={handleSelectGioiTinh}
              className="form-select form-select-lg"
              required
            >
              <option value="Nam">Nam</option>
              <option value="Nữ">Nữ</option>
            </select>
          </div>

          <div className="mb-3">
            <label htmlFor="sdt" className="form-label">
              Số điện thoại
            </label>
            <input ref={inputSdt} type="text" className="form-control" id="sdt" />
            <p ref={invalidSDT} className="invalid hidden">
              Bạn cần nhập đúng định dạng số điện thoại
            </p>
          </div>

          <div className="mb-3">
            <label htmlFor="dia-chi" className="form-label">
              Địa chỉ
            </label>
            <input ref={inputDiaChi} type="text" className="form-control" id="dia-chi" />
          </div>

          <div className="mb-3">
            <label htmlFor="chuc-vu" className="form-label">
              Chức vụ
            </label>
            <select
              value={valueChucVu}
              onChange={handleSelectChucVu}
              className="form-select form-select-lg"
              required
            >
              <option value="Nhân viên">Nhân Viên</option>
              <option value="Quản lý">Quản lý</option>
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

export default ListNhanVien;
