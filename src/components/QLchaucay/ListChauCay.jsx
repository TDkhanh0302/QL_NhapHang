import React, { useContext, useEffect, useRef, useState } from 'react';
import { Context } from '../../contexts/Context';
import './styles.css';

function ListChauCay(props) {
  const {
    getTblChauCay,
    setChauCay,
    chauCay,
    writeDataTable,
    getTableId,
    downloadFile,
    uploadFile,
    getTblLoaiChauCay,
    loaiChauCay,
  } = useContext(Context);
  useEffect(() => {
    getTblChauCay();
    getTblLoaiChauCay();
  }, []);

  const [title, setTitle] = useState('Thêm chậu cây');
  const [valueSelected, setValueSelect] = useState('Chọn loại cây');
  const [fileSelected, setFileSelected] = useState(null);

  const inputSearch = useRef(null);
  const idInput = useRef(null);
  const inputTen = useRef(null);
  const inputLoai = useRef(null);
  const inputKichThuoc = useRef(null);
  const inputMauSac = useRef(null);
  const inputFile = useRef(null);
  const inputChatLieu = useRef(null);
  const inputSoLuong = useRef(null);
  const inputGia = useRef(null);
  const elementIng = useRef(null);

  const getFileSelected = (e) => {
    setFileSelected(e.target.files[0]);
    console.log(e.target.files[0]);
  };

  const loadImg = (item) => {
    const ref = `imgChauCay/${item.hinhanh}`;
    downloadFile(ref, elementIng);
  };

  const handleChangeSelectedValue = (e) => {
    setValueSelect(e.target.value);
    console.log(e.target.value);
  };

  const handleEditChauCay = (item) => {
    idInput.current.value = item.id;
    inputTen.current.value = item.ten;
    inputKichThuoc.current.value = item.kichthuoc;
    inputMauSac.current.value = item.mausac;
    inputChatLieu.current.value = item.chatlieu;
    inputSoLuong.current.value = item.soluong;
    inputGia.current.value = item.gia;
    setValueSelect(item.loai);
    setTitle('Cập nhật chậu cây');
  };

  const handleSubmitChauCay = (e) => {
    e.preventDefault();
    let id = idInput.current.value;
    let ten = inputTen.current.value;
    let loai = valueSelected;
    let kichthuoc = inputKichThuoc.current.value;
    let mausac = inputMauSac.current.value;
    let chatlieu = inputChatLieu.current.value;
    let soluong = inputSoLuong.current.value;
    let gia = inputGia.current.value;
    let hinhanh = fileSelected.name;
    const listChauCay = [...chauCay];
    const ref = `imgChauCay/${hinhanh}`;

    if (id && ten && !!listChauCay.length) {
      const chauCayCurrent = getTableId(id, listChauCay);
      chauCayCurrent.ten = ten;
      chauCayCurrent.loai = loai;
      chauCayCurrent.kichthuoc = kichthuoc;
      chauCayCurrent.mausac = mausac;
      chauCayCurrent.hinhanh = hinhanh;
      chauCayCurrent.chatlieu = chatlieu;
      chauCayCurrent.soluong = soluong;
      chauCayCurrent.gia = gia;
      uploadFile(ref, fileSelected);
      setChauCay(listChauCay);
      writeDataTable(listChauCay, 'tblChauCay');
    } else if (ten && loai && soluong && gia) {
      const id = Date.now();
      listChauCay.push({ id, ten, loai, kichthuoc, mausac, hinhanh, chatlieu, soluong, gia });
      uploadFile(ref, fileSelected);
      setChauCay(listChauCay);
      writeDataTable(listChauCay, 'tblChauCay');
    }
    idInput.current.value = '';
    inputTen.current.value = '';
    inputKichThuoc.current.value = '';
    inputMauSac.current.value = '';
    inputChatLieu.current.value = '';
    inputSoLuong.current.value = '';
    inputGia.current.value = '';
    setTitle('Thêm châu cây');
  };

  const handleRemoveChauCay = (item) => {
    const listChauCay = [...chauCay];
    const newArr = listChauCay.filter((data) => {
      return data.id !== item.id;
    });
    if (window.confirm('Bạn có chắc muốn xóa')) {
      setChauCay(newArr);
      writeDataTable(newArr, 'tblChauCay');
    }
  };

  const searchChauCay = (e) => {
    e.preventDefault();
    const searchText = inputSearch.current.value.toUpperCase();
    const results = [];
    if (searchText !== '') {
      chauCay?.forEach((item) => {
        if (item.ten.toUpperCase().includes(searchText) === true) {
          results.push(item);
        } else if (item.loai.toUpperCase().includes(searchText) === true) {
          results.push(item);
        } else if (item.kichthuoc.toUpperCase().includes(searchText) === true) {
          results.push(item);
        }
      });
      setChauCay(results);
    } else if (searchText === '') {
      getTblChauCay();
    }
  };

  return (
    <>
      <div className="wrap">
        <h2 className="title">Danh sách chậu cây</h2>

        <form onSubmit={searchChauCay} action="">
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
                <th scope="col">Loại</th>
                <th scope="col">Kích thước</th>
                <th scope="col">Màu sắc</th>
                <th scope="col">Hình ảnh</th>
                <th scope="col">Chất liệu</th>
                <th scope="col">Số lượng</th>
                <th scope="col">Giá</th>
                <th scope="col">Hành động</th>
              </tr>
            </thead>
            <tbody>
              {chauCay?.map((item, index) => (
                <tr className="row-table" key={item.id}>
                  <th scope="row">{index}</th>
                  <td>{item.ten}</td>
                  <td>{item.loai}</td>
                  <td>{item.kichthuoc}</td>
                  <td>{item.mausac}</td>
                  <td>
                    <img
                      className="imgChauCay"
                      ref={elementIng}
                      onLoad={loadImg(item)}
                      src=""
                      alt={item.hinhanh}
                    />
                  </td>
                  <td>{item.chatlieu}</td>
                  <td>{item.soluong}</td>
                  <td>{item.gia}</td>
                  <td>
                    <a href="#" className="table-icon" onClick={() => handleEditChauCay(item)}>
                      <i className="fas fa-edit"></i>
                    </a>
                    <a href="#" className="table-icon" onClick={() => handleRemoveChauCay(item)}>
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

        <form onSubmit={handleSubmitChauCay}>
          <input type="hidden" ref={idInput} />

          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Tên chậu cây
            </label>
            <input ref={inputTen} type="text" className="form-control" required />
          </div>

          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Loại chậu
            </label>
            <select
              ref={inputLoai}
              value={valueSelected}
              onChange={handleChangeSelectedValue}
              className="form-select form-select-lg"
              required
            >
              {loaiChauCay?.map((loaichau, idx) => (
                <option key={idx} value={loaichau.ten}>
                  {loaichau.ten}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Kích thước
            </label>
            <input ref={inputKichThuoc} type="text" className="form-control" />
          </div>

          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Màu sắc
            </label>
            <input ref={inputMauSac} type="text" className="form-control" />
          </div>

          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Hình ảnh
            </label>
            <input onChange={getFileSelected} ref={inputFile} type="file" name="" id="" required />
          </div>

          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Chất liệu
            </label>
            <input ref={inputChatLieu} type="text" className="form-control" />
          </div>

          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Số lượng
            </label>
            <input ref={inputSoLuong} type="number" className="form-control" required />
          </div>

          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Giá
            </label>
            <input ref={inputGia} type="number" className="form-control" required />
          </div>

          <button type="submit" className="btn btn-primary btn-lg">
            Submit
          </button>
        </form>
      </div>
    </>
  );
}

export default ListChauCay;
