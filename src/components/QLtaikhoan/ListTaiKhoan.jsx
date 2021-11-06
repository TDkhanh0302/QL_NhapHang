import React, { useContext } from 'react';
import { useEffect, useRef, useState } from 'react/cjs/react.development';
import { Context } from '../../contexts/Context';

function ListTaiKhoan(props) {
  const {
    getTblTaiKhoan,
    getTblNhanVien,
    nhanVien,
    setTaiKhoan,
    taiKhoan,
    writeDataTable,
    getTableId,
  } = useContext(Context);
  useEffect(() => {
    getTblTaiKhoan();
    getTblNhanVien();
  }, []);

  const [title, setTitle] = useState('Thêm tài khoản');
  const [valueTenTK, setValueTenTK] = useState('Null');
  const [valueLoaiTK, setValueLoaiTK] = useState('Null');

  const idInput = useRef(null);
  const inputTenTK = useRef(null);
  const inputTenDN = useRef(null);
  const inputMatKhau = useRef(null);
  const inputSearch = useRef(null);
  const invalidUsername = useRef(null);

  const handleChangeTenTK = (e) => {
    setValueTenTK(e.target.value);
    console.log(e.target.value);
  };

  const handleChangeLoaiTK = (e) => {
    setValueLoaiTK(e.target.value);
    console.log(e.target.value);
  };

  const handleEdit = (item) => {
    idInput.current.value = item.id;
    setValueTenTK(item.tentaikhoan);
    setValueLoaiTK(item.loaitaikhoan);
    inputTenDN.current.value = item.tendangnhap;
    inputMatKhau.current.value = item.matkhau;
    setTitle('Cập nhật tài khoản');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let id = idInput.current.value;
    let tentaikhoan = valueTenTK;
    let tendangnhap = inputTenDN.current.value;
    let matkhau = inputMatKhau.current.value;
    let loaitaikhoan = valueLoaiTK;
    const listTaiKhoan = [...taiKhoan];
    const regexUsername = /^[a-zA-Z0-9]+$/;
    // const regexPassword = '^(?=.*[A-Za-z])(?=.*d)[A-Za-zd]{8,}$';
    console.log(regexUsername.test(tendangnhap));

    if (regexUsername.test(tendangnhap) === false) {
      invalidUsername.current.classList.remove('hidden');
      inputTenDN.current.focus();
    } else {
      if (id && tentaikhoan && !!listTaiKhoan.length) {
        const TK = getTableId(id, listTaiKhoan);
        TK.tentaikhoan = tentaikhoan;
        TK.tendangnhap = tendangnhap;
        TK.matkhau = matkhau;
        TK.loaitaikhoan = loaitaikhoan;
        setTaiKhoan(listTaiKhoan);
        writeDataTable(listTaiKhoan, 'tblTaiKhoan');
      } else if (tentaikhoan && tendangnhap && matkhau) {
        const id = Date.now();
        listTaiKhoan.push({ id, tentaikhoan, tendangnhap, matkhau, loaitaikhoan });
        setTaiKhoan(listTaiKhoan);
        writeDataTable(listTaiKhoan, 'tblTaiKhoan');
      }
      invalidUsername.current.classList.add('hidden');
      idInput.current.value = '';
      inputTenDN.current.value = '';
      inputMatKhau.current.value = '';
      setTitle('Thêm tài khoản');
    }
  };

  const handleRemove = (item) => {
    const listTK = [...taiKhoan];
    const newArr = listTK.filter((data) => {
      return data.id !== item.id;
    });
    setTaiKhoan(newArr);
    writeDataTable(newArr, 'tblTaiKhoan');
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const searchText = inputSearch.current.value.toUpperCase();
    const result = [];
    if (searchText !== '') {
      taiKhoan?.forEach((item) => {
        if (item.tentaikhoan.toUpperCase().includes(searchText) === true) {
          result.push(item);
        } else if (item.loaitaikhoan.toUpperCase().includes(searchText) === true) {
          result.push(item);
        }
      });
      setTaiKhoan(result);
    } else if (searchText === '') {
      getTblTaiKhoan();
    }
  };

  return (
    <>
      <div className="wrap">
        <h2 className="title">Danh sách tài khoản</h2>

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
                <th scope="col">Tên tài khoản</th>
                <th scope="col">Tên đăng nhập</th>
                <th scope="col">Loại tài khoản</th>
                <th scope="col">Hành động</th>
              </tr>
            </thead>
            <tbody>
              {taiKhoan?.map((item, idx) => (
                <tr key={item.id}>
                  <th scope="row">{idx}</th>
                  <td>{item.tentaikhoan}</td>
                  <td>{item.tendangnhap}</td>
                  <td>{item.loaitaikhoan}</td>
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
            <label htmlFor="ten-tai-khoan" className="form-label">
              Tên tài khoản
            </label>
            <select
              ref={inputTenTK}
              value={valueTenTK}
              onChange={handleChangeTenTK}
              className="form-select form-select-lg"
              required
            >
              {nhanVien?.map((nv, idx) => (
                <option key={idx} value={nv.ten}>
                  {nv.ten}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-3">
            <label htmlFor="tenDN" className="form-label">
              Tên đăng nhập
            </label>
            <input ref={inputTenDN} type="text" className="form-control" id="tenDN" required />
            <p ref={invalidUsername} className="invalid hidden">
              Tài khoản chỉ được chứa các ký tự chữ và số
            </p>
          </div>

          <div className="mb-3">
            <label htmlFor="matkhau" className="form-label">
              Mật khẩu
            </label>
            <input
              ref={inputMatKhau}
              type="password"
              className="form-control"
              id="matkhau"
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Loại tài khoản
            </label>
            <select
              value={valueLoaiTK}
              onChange={handleChangeLoaiTK}
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

export default ListTaiKhoan;
