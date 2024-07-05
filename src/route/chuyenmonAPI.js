
import api from './axios'
const ChuyenMonAPI =  {
  getallChuyenMon(){
    return api.get('/getallChuyenMon')
  },
   getChuyenMonbyID(id){
    return api.get(`/getChuyenMonbyID/${id}`,id)
    
  },
  insertChuyenMon(body){
    return api.post('/insertChuyenMon',body)
  },
  updateChuyenMon(body){
    return api.put('/updateChuyenMon',body)
  },
  deleteChuyenMonbyID(id){
    return api.delete( `/deleteChuyenMonbyID/${id}`,id)
  }
}

export default ChuyenMonAPI