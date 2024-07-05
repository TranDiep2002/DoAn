import api from './axios'
const authAPI = {
  login(body){
    return api.post('/login',body)
  },
  getRole(maUser){
    return api.get(`getLoaiTaiKhoan/${maUser}`,maUser);
  },
  ThemKyHoc(body){
    return api.post('ThemKyHoc',body)
  },
  getNamHocKyHocHienTai(){
    return api.get('getNamHocKyHocHienTai');
  }
}

export default authAPI