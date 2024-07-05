
import api from './axios'
const sinhvienAPI =  {
  getGiangVien(){
    return api.get('/getallGiangVien')
  },
  postGiangVien(body){
    return api.post('/insertGiangVien',body)
  },
  deleteGiangVien(id){
    return api.delete(`/deleteGiangVien/${id}`,id)
  },
  getGiangVienById(id){
    return api.get(`/getGiangVienbyID/${id}`,id)
  },
  updateGiangVien(body){
    return api.put('/updateGiangVien',body)
  },
  getBoMonbyMaGV(maGV){
    return api.get(`/getBoMonbyGiangVien/${maGV}`,maGV)
  },
  getVaiTro(maGV){
    return api.get(`/getVaiTro/${maGV}`,maGV)
  },
  getGiangVienbyHoTen(hoTen){
    return api.get(`getGiangVienbyHoTen/${hoTen}`, hoTen)
  },
  getGiangVienbyBoMon(boMon){
    return api.get(`getGiangVienbyBoMon/${boMon}`,boMon)
  }
}

export default sinhvienAPI