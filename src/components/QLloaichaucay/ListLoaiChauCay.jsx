import React, { useContext } from 'react';
import { useEffect, useRef, useState } from 'react/cjs/react.development';
import { Context } from '../../contexts/Context';
import './styles.css';

function ListLoaiChauCay(props) {
  const { getTblLoaiChauCay, getTableId, setLoaiChauCay, writeDataTable, loaiChauCay } =
    useContext(Context);
  useEffect(() => {
    getTblLoaiChauCay();
  }, []);

  const [title, setTitle] = useState('Thêm loại chậu cây');

  const idInput = useRef(null);
  const inputTenLoai = useRef(null);
  const inputSearch = useRef(null);

  const handleEditLoaiChau = (item) => {
    idInput.current.value = item.id;
    inputTenLoai.current.value = item.ten;
    setTitle('Cập nhật loại chậu cây');
  };

  const handleSubmitLoaiChau = (e) => {
    e.preventDefault();
    let id = idInput.current.value;
    let ten = inputTenLoai.current.value;
    const listLoaiChau = [...loaiChauCay];

    if (id && ten && listLoaiChau.length) {
      const loaiChauCurrent = getTableId(id, listLoaiChau);
      loaiChauCurrent.ten = ten;
      setLoaiChauCay(listLoaiChau);
      writeDataTable(listLoaiChau, 'tblLoaiChauCay');
    } else if (ten) {
      const id = Date.now();
      listLoaiChau.push({ id, ten });
      setLoaiChauCay(listLoaiChau);
      writeDataTable(listLoaiChau, 'tblLoaiChauCay');
    }
    idInput.current.value = '';
    inputTenLoai.current.value = '';
    setTitle('Thêm loại chậu cây');
  };

  const removeLoaiChau = (item) => {
    const listLoaiChau = [...loaiChauCay];
    const arr = listLoaiChau.filter((data) => {
      return data.id !== item.id;
    });
    if (window.confirm('Bạn có chắc muốn xóa')) {
      setLoaiChauCay(arr);
      writeDataTable(arr, 'tblLoaiChauCay');
    }
  };

  const searchLoaiChau = (e) => {
    e.preventDefault();
    const searchText = inputSearch.current.value.toUpperCase();
    if (searchText !== '') {
      const result = loaiChauCay?.filter((item) => item.ten.toUpperCase().includes(searchText));
      setLoaiChauCay(result);
    } else if (searchText === '') {
      getTblLoaiChauCay();
    }
  };

  return (
    <>
      <div className="wrap">
        <h2 className="title">Danh sách loại chậu cây</h2>

        <form onSubmit={searchLoaiChau} action="">
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
                <th scope="col">Tên loại chậu cây</th>
                <th scope="col">Hành động</th>
              </tr>
            </thead>
            <tbody>
              {loaiChauCay?.map((item, idx) => (
                <tr key={item.id}>
                  <th scope="row">{idx}</th>
                  <td>{item.ten}</td>
                  <td>
                    <a href="#" className="table-icon" onClick={() => handleEditLoaiChau(item)}>
                      <i className="fas fa-edit"></i>
                    </a>
                    <a href="#" className="table-icon" onClick={() => removeLoaiChau(item)}>
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

        <form onSubmit={handleSubmitLoaiChau}>
          <input ref={idInput} type="hidden" name="" />
          <div className="mb-3">
            <label htmlFor="ten-loai" className="form-label">
              Tên Loại chậu cây
            </label>
            <input ref={inputTenLoai} type="text" className="form-control" id="ten-loai" />
          </div>

          <button type="submit" className="btn btn-primary btn-lg">
            Submit
          </button>
        </form>
      </div>
    </>
  );
}

export default ListLoaiChauCay;
