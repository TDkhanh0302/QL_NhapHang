import React, { useContext, useEffect, useRef, useState } from 'react';
import { Context } from '../../contexts/Context';
import './styles.css';

function ListNCC(props) {
  const { getTblNCC, nhaCungCap, setNhaCungCap, writeDataTable, getTableId } = useContext(Context);
  useEffect(() => {
    getTblNCC();
  }, []);

  const [title, setTitle] = useState('Thêm Nhà cung cấp');

  const idInput = useRef(null);
  const inputTen = useRef(null);
  const inputDiaChi = useRef(null);
  const inputSDT = useRef(null);
  const inputEmail = useRef(null);
  const invalidSDT = useRef(null);
  const invalidEmail = useRef(null);

  const handleEditClick = (item) => {
    idInput.current.value = item.id;
    inputTen.current.value = item.ten;
    inputDiaChi.current.value = item.diachi;
    inputSDT.current.value = item.sdt;
    inputEmail.current.value = item.email;
    setTitle('Cập nhật nhà cung cấp');
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    let id = idInput.current.value;
    let ten = inputTen.current.value;
    let diachi = inputDiaChi.current.value;
    let sdt = inputSDT.current.value;
    let email = inputEmail.current.value;
    const listNCC = [...nhaCungCap];
    const regexSDT = /((09|03|07|08|05)+([0-9]{8})\b)/g;
    const regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    if (regexSDT.test(sdt) == false) {
      invalidSDT.current.classList.remove('hidden');
      inputSDT.current.focus();
    } else if (regexEmail.test(email) == false) {
      invalidSDT.current.classList.add('hidden');
      invalidEmail.current.classList.remove('hidden');
      inputEmail.current.focus();
    } else {
      if (id && ten && !!listNCC.length) {
        const NCC = getTableId(id, listNCC);
        NCC.ten = ten;
        NCC.diachi = diachi;
        NCC.sdt = sdt;
        NCC.email = email;
        setNhaCungCap(listNCC);
        writeDataTable(listNCC, 'tblNhaCungCap');
      } else if (ten && diachi && sdt && email) {
        const id = Date.now();
        listNCC.push({ id, ten, diachi, sdt, email });
        setNhaCungCap(listNCC);
        writeDataTable(listNCC, 'tblNhaCungCap');
      }
      invalidEmail.current.classList.add('hidden');
      idInput.current.value = '';
      inputTen.current.value = '';
      inputDiaChi.current.value = '';
      inputSDT.current.value = '';
      inputEmail.current.value = '';
      setTitle('Thêm nhà cung cấp');
    }
  };

  const removeNCC = (item) => {
    const listNCC = [...nhaCungCap];
    const arr = listNCC.filter((data) => {
      return data.id !== item.id;
    });
    if (window.confirm('Bạn có chắc muốn xóa')) {
      setNhaCungCap(arr);
      writeDataTable(arr, 'tblNhaCungCap');
    }
  };

  const inputSearch = useRef(null);

  const searchNCC = (event) => {
    event.preventDefault();
    const searchText = inputSearch.current.value.toUpperCase();
    const result = [];
    if (searchText !== '') {
      nhaCungCap?.forEach((item) => {
        if (item.ten.toUpperCase().includes(searchText) === true) {
          result.push(item);
        } else if (item.diachi.toUpperCase().includes(searchText) === true) {
          result.push(item);
        } else if (item.sdt.toUpperCase().includes(searchText) === true) {
          result.push(item);
        }
      });
      setNhaCungCap(result);
    } else if (searchText === '') {
      getTblNCC();
    }
  };

  return (
    <>
      <div className="wrap">
        <h2 className="title">Danh sách Nhà cung cấp</h2>

        <form onSubmit={searchNCC} action="">
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
                <th scope="col">Tên nhà cung cấp</th>
                <th scope="col">Địa chỉ</th>
                <th scope="col">Số điện thoại</th>
                <th scope="col">Email</th>
                <th scope="col">Hành động</th>
              </tr>
            </thead>
            <tbody>
              {nhaCungCap?.map((item, index) => (
                <tr key={item.id}>
                  <th scope="row">{index}</th>
                  <td>{item.ten}</td>
                  <td>{item.diachi}</td>
                  <td>{item.sdt}</td>
                  <td>{item.email}</td>
                  <td>
                    <a href="#" className="table-icon" onClick={() => handleEditClick(item)}>
                      <i className="fas fa-edit"></i>
                    </a>
                    <a href="#" className="table-icon" onClick={() => removeNCC(item)}>
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
          <input type="hidden" ref={idInput} />

          <div className="mb-3">
            <label htmlFor="ten" className="form-label">
              Tên nhà cung cấp
            </label>
            <input ref={inputTen} type="text" className="form-control" id="ten" required />
          </div>

          <div className="mb-3">
            <label htmlFor="diachi" className="form-label">
              Địa chỉ
            </label>
            <input ref={inputDiaChi} type="text" className="form-control" id="diachi" required />
          </div>

          <div className="mb-3">
            <label htmlFor="sdt" className="form-label">
              Số điện thoại
            </label>
            <input ref={inputSDT} type="text" className="form-control" id="sdt" required />
            <p ref={invalidSDT} className="invalid hidden">
              Bạn cần nhập đúng định dạng số điện thoại
            </p>
          </div>

          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Email
            </label>
            <input ref={inputEmail} type="text" className="form-control" id="exampleInputEmail1" />
            <p ref={invalidEmail} className="invalid hidden">
              Bạn cần nhập đúng định dạng email
            </p>
          </div>

          <button type="submit" className="btn btn-primary btn-lg">
            Submit
          </button>
        </form>
      </div>
    </>
  );
}

export default ListNCC;
