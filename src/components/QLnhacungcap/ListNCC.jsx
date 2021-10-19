import React, { useContext, useEffect, useRef, useState } from 'react';
import { Context } from '../../contexts/Context';
import './styles.css';

function ListNCC(props) {
  const { getTblNCC, nhaCungCap, setNhaCungCap, writeDataTable, getTableId } = useContext(Context);
  useEffect(() => {
    getTblNCC();
  }, []);
  console.log(nhaCungCap);

  const [title, setTitle] = useState('Thêm Nhà cung cấp');

  const idInput = useRef(null);
  const inputTen = useRef(null);
  const inputDiaChi = useRef(null);
  const inputSDT = useRef(null);
  const inputEmail = useRef(null);

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
    console.log('1', listNCC);

    if (id && ten && !!listNCC.length) {
      const NCC = getTableId(id, listNCC);
      NCC.ten = ten;
      NCC.diachi = diachi;
      NCC.sdt = sdt;
      NCC.email = email;
      setNhaCungCap(listNCC);
      console.log('2', listNCC);
      writeDataTable(listNCC);
    } else if (ten && diachi && sdt && email) {
      const id = Date.now();
      listNCC.push({ id, ten, diachi, sdt, email });
      setNhaCungCap(listNCC);
      writeDataTable(listNCC);
    }

    idInput.current.value = '';
    inputTen.current.value = '';
    inputDiaChi.current.value = '';
    inputSDT.current.value = '';
    inputEmail.current.value = '';
    setTitle('Thêm nhà cung cấp');
  };

  const removeNCC = () => {};

  return (
    <>
      <div className="wrap">
        <h2 className="title">Danh sách Nhà cung cấp</h2>

        <div className="search-box">
          <input type="text" name="" id="" />
          <button>Tìm kiếm</button>
        </div>

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
                    <a href="#" className="table-icon" onClick={() => removeNCC()}>
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
              <a className="page-link" href="#">
                2
              </a>
            </li>
            <li className="page-item">
              <a className="page-link" href="#">
                3
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
            <input ref={inputTen} type="text" className="form-control" id="ten" />
          </div>

          <div className="mb-3">
            <label htmlFor="diachi" className="form-label">
              Địa chỉ
            </label>
            <input ref={inputDiaChi} type="text" className="form-control" id="diachi" />
          </div>

          <div className="mb-3">
            <label htmlFor="sdt" className="form-label">
              Số điện thoại
            </label>
            <input ref={inputSDT} type="text" className="form-control" id="sdt" />
          </div>

          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Email
            </label>
            <input ref={inputEmail} type="email" className="form-control" id="exampleInputEmail1" />
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
