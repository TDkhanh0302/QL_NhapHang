import React, { useContext } from 'react';
import { useHistory } from 'react-router';
import { useEffect, useRef } from 'react/cjs/react.development';
import { Context } from '../../contexts/Context';
import './styles.css';

function FormLogin(props) {
  const { getTblTaiKhoan, taiKhoan, writeDataTable } = useContext(Context);
  const history = useHistory();
  useEffect(() => {
    getTblTaiKhoan();
  }, []);

  const inputTenDN = useRef(null);
  const inputMatKhau = useRef(null);
  const errPasswordRef = useRef(null);

  const handleLogin = (e) => {
    e.preventDefault();
    const username = inputTenDN.current.value;
    const password = inputMatKhau.current.value;
    const listUser = [...taiKhoan];

    listUser.forEach((item) => {
      if (item.tendangnhap === username && item.matkhau == password) {
        console.log('dang nhap thanh cong');
        writeDataTable(item, 'userLogged');
        history.push('/nhacungcap');
      } else {
        errPasswordRef.current.innerText = 'Sai tên đăng nhập hoặc mật khẩu';
        errPasswordRef.current.style.display = 'block';
        inputTenDN.current.focus();
      }
    });
  };

  return (
    <div className="login-form">
      <form onSubmit={handleLogin}>
        <h2 className="heading">Form đăng nhập</h2>

        <div className="mb-4">
          <label htmlFor="tenDN" className="form-label">
            Tên đăng nhập
          </label>
          <input ref={inputTenDN} type="text" className="form-control" id="tenDN" required />
        </div>

        <div className="mb-4">
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
          <span ref={errPasswordRef} className="err_message"></span>
        </div>

        <button type="submit" className="btn btn-primary btn-lg">
          Đăng nhập
        </button>
      </form>
    </div>
  );
}

export default FormLogin;
