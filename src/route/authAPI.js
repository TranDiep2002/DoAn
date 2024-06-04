import api from './axios'
const authAPI = {
  login(body){
    return api.post('/login',body)
  }
}

export default authAPI