import api from './axios'
const ThongBaoAPI = {
  ThemThongBao(body){
    return api.post('/ThemThongBao',body)
  },
  allGetThongBao(){
    return api.get('allGetThongBao');
  }
}

export default ThongBaoAPI