
import { relativeTimeRounding } from 'moment';
import api from './axios'
const groupAPI =  {
  // lấy ra những sinh viên chưa có nhóm
  getSinhVienGroup(maSV){
    console.log("Mã sinh viên la:",maSV);
    return api.get(`/getSinhVienbyKyandNamHoc/${maSV}`,maSV)
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
  // update trạng thái duyệt
  updateTrangThaibyGiangVienDeTai(MaGiangVien,TenDeTai,moTa){
    return api.put(`/updateTrangThaibyGiangVienDeTai/${MaGiangVien}/${TenDeTai}/${moTa}`)
  },
  // update trạng thái hủy
  updateTrangThaiHuybyGiangVienDeTai(MaGiangVien,TenDeTai,moTa){
    return api.put(`/updateTrangThaiHuybyGiangVienDeTai/${MaGiangVien}/${TenDeTai}/${moTa}`)
  },
  // cập nhật ghi chú
  updateGhiChu(tenDeTai,mota,ghichu){
    return api.put(`/updateGhiChu/${tenDeTai}/${mota}/${ghichu}`)
  },
  getTrangThaiDangKy(MaGiangVien,TenDeTai,moTaDeTai){
    return api.get(`getTrangThaiDangKy/${MaGiangVien}/${TenDeTai}/${moTaDeTai}`)
  },
  getallDangKyGiaoVu(){
    return api.get('getallDangKyGiaoVu')
  },
  getDangKybyTenDeTaiMoTaKyHoc(tenDeTai,moTaDeTai){
    return api.get(`getDangKybyTenDeTaiMoTaKyHoc/${tenDeTai}/${moTaDeTai}`)
  },
  updateGiangVienHD(body){
    return api.put('/updateGiangVienHD',body);
  }

  
}

export default groupAPI