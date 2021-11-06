import React from 'react';

function FormLogin(props) {
  return (
    <div>
      <form action="" method="POST" className="form" id="form-1">
        <h3 className="heading">Form đăng nhập</h3>

        <div className="form-group invalid">
          <label for="username" className="form-label">
            Tên đăng nhập
          </label>
          <input required="" id="username" name="username" type="text" className="form-control" />
          <span className="form-message">chỉ được phép nhập chữ</span>
        </div>

        <div className="form-group invalid">
          <label for="password" className="form-label">
            Mật khẩu
          </label>
          <input required="" id="password" name="password" type="text" className="form-control" />
          <span className="form-message">chỉ được phép nhập chữ</span>
        </div>

        <button className="form-submit">Đăng nhập</button>
      </form>
    </div>
  );
}

export default FormLogin;
