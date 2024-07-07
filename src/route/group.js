
import api from './axios'
const groupAPI =  {
  // lấy ra những sinh viên chưa có nhóm
  getSinhVienGroup(){
    return api.get('/getSinhVienbyKyandNamHoc')
  },
  getGiangVienGroup(tenKy,namHoc){
    return api.get('/getGiangVienbySoLuongSinhVien')
  },
  getTenKy(tenTrangThai){
    return api.get(`/getTenKybyTrangThai/${tenTrangThai}`,tenTrangThai)
  },
  getNamHoc(tenTrangThai){
    return api.get(`/getNamHocbyTrangThai/${tenTrangThai}`,tenTrangThai)
  },
  postGroup(body){
    return api.post('/sinhVienDangKyDeTai',body)
  },
  
  getGroupbyMaSinhVien(MaSinhVien){
    return api.get(`/getDangKybyMaSV/${MaSinhVien}`,MaSinhVien)
  },
  getallGroup(tenChuyenMon){
    console.log("aa",tenChuyenMon)
    return api.get(`/getallDangKy/${tenChuyenMon}`,tenChuyenMon)
  },
  updateTrangThaibyGiangVienDeTai(MaGiangVien,TenDeTai){
    return api.put(`updateTrangThaibyGiangVienDeTai/${MaGiangVien}/${TenDeTai}`)
  }
  
}

export default groupAPI