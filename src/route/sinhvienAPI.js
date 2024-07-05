
import { relativeTimeRounding } from 'moment'
import api from './axios'
const sinhvienAPI =  {
  getSinhVien(){
    return api.get('/getallSinhVien')
  },
  postSinhVien(body){
    return api.post('/insertSinhVien',body)
  },
  deleteSinhVien(id){
    return api.delete(`/deleteSinhVien/${id}`,id)
  },
  getSinhVienById(id){
    return api.get(`/getSinhVienbyID/${id}`,id)
  },
  updateSinhVien(body){
    return api.put('/updateSinhVien',body)
  },
  getSinhVienbyHoTen(hoTen){
    return api.get(`/getSinhVienbyHoTen/${hoTen}`,hoTen)
  },
  getSinhVienbyChuyenNganh(nganh){
    return api.get(`getSinhVienbyChuyenNganh/${nganh}`,nganh)
  }
}

export default sinhvienAPI