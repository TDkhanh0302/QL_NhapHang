import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import ChauCay from './pages/ChauCay';
import LoaiChauCay from './pages/LoaiChauCay';
import NhaCungCap from './pages/NhaCungCap';
import NhanVien from './pages/NhanVien';
import TaiKhoan from './pages/TaiKhoan';
import PhieuNhap from './pages/PhieuNhap';
import ContextProvider from './contexts/Context';
import FormLogin from './components/FormLogin/FormLogin';
import CTphieunhap from './pages/CTphieunhap';
import ThongKe from './pages/ThongKe';

function App() {
  return (
    <ContextProvider>
      <Router>
        <Switch>
          <Route exact path="/" component={FormLogin} />
          <Route path="/nhacungcap" component={NhaCungCap} />
          <Route path="/chaucay" component={ChauCay} />
          <Route path="/loaichaucay" component={LoaiChauCay} />
          <Route path="/phieunhap" component={PhieuNhap} />
          <Route exact path="/ctphieunhap/:id" component={CTphieunhap} />
          <Route path="/nhanvien" component={NhanVien} />
          <Route path="/taikhoan" component={TaiKhoan} />
          <Route path="/thongke" component={ThongKe} />
        </Switch>
      </Router>
    </ContextProvider>
  );
}

export default App;
