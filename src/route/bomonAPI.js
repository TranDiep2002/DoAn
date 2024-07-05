
import api from './axios'
const BoMonAPI =  {
  getallBoMon(){
    return api.get('/getallBoMon')
  },
   getBoMonbyID(id){
    return api.get(`/getBoMonbyID/${id}`,id)
    
  },
  insertBoMon(body){
    return api.post('/insertBoMon',body)
  },
  updateBoMon(body){
    return api.put('/updateBoMon',body)
  },
  deleteBoMon(id){
    return api.delete( `/deleteBoMon/${id}`,id)
  }
}

export default BoMonAPI