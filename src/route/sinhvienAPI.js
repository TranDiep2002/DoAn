
import api from './axios'
const sinhvienAPI =  {
  getSinhVien(){
    return api.get('/sinhvien')
  },
  postSinhVien(body){
    return api.post('/postsinhvien',body)
  }
}

export default sinhvienAPI