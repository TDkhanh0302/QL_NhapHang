import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import ChauCay from './pages/ChauCay';
import LoaiChauCay from './pages/LoaiChauCay';
import NhaCungCap from './pages/NhaCungCap';
import NhanVien from './pages/NhanVien';
import TaiKhoan from './pages/TaiKhoan';
import PhieuNhap from './pages/PhieuNhap';
import ContextProvider from './contexts/Context';

function App() {
  return (
    <ContextProvider>
      <Router>
        <Switch>
          <Route path="/nhacungcap" component={NhaCungCap} />
          <Route path="/chaucay" component={ChauCay} />
          <Route path="/loaichaucay" component={LoaiChauCay} />
          <Route path="/phieunhap" component={PhieuNhap} />
          <Route path="/nhanvien" component={NhanVien} />
          <Route path="/taikhoan" component={TaiKhoan} />
        </Switch>
      </Router>
    </ContextProvider>
  );
}

export default App;
