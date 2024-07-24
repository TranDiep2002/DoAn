import api from './axios'
const TaiKhoanAPI = {
    getAllTaiKhoan(){
    return api.get('/getallTaiKhoan')
  },
  insertTaiKhoan(body){
    return api.post('insertTaiKhoan',body);
  },
  updateTaiKhoan(body){
    return api.post('updateTaiKhoan',body);
  },
  deleteTaiKhoan(id){
    return api.delete(`deleteTaiKhoan/${id}`,id)
  },
  getTaiKhoanbyMaUser(maUser){
    return api.get(`getTaiKhoanbyMaUser/${maUser}`,maUser)
  },
  getTaiKhoanbyLoaiTaiKhoan(loaiTaiKhoan){
    return api.get(`getTaiKhoanbyLoaiTaiKhoan/${loaiTaiKhoan}`,loaiTaiKhoan)
  },
  getTaiKhoanbyId(id){
    return api.get(`getTaiKhoanbyId/${id}`)
  }

}

export default TaiKhoanAPI