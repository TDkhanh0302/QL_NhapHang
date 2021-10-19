import React from 'react';

function ListTaiKhoan(props) {
  return (
    <div className="wrap">
      <h2 className="title">Danh sách tài khoản</h2>

      <div className="search-box">
        <input type="text" name="" id="" />
        <button>Tìm kiếm</button>
      </div>

      <div className="table-responsive">
        <table className="table table-md table-hover">
          <thead className="table-dark">
            <tr>
              <th scope="col">STT</th>
              <th scope="col">Tên tài khoản</th>
              <th scope="col">Loại tài khoản</th>
              <th scope="col">Hành động</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">1</th>
              <td>Mark</td>
              <td>Otto</td>
              <td>
                <a href="" className="table-icon">
                  <i className="fas fa-edit"></i>
                </a>
                <a href="" className="table-icon">
                  <i className="fas fa-trash-alt"></i>
                </a>
              </td>
            </tr>
            <tr>
              <th scope="row">2</th>
              <td>Jacob</td>
              <td>@fat</td>
              <td>@fat</td>
            </tr>
            <tr>
              <th scope="row">3</th>
              <td>Larry the Bird</td>
              <td>@twitter</td>
              <td>@twitter</td>
            </tr>
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
  );
}

export default ListTaiKhoan;
