import api from './axios'
const ThongBaoAPI = {
  ThemThongBao(body){
    return api.post('/ThemThongBao',body,{
      headers: {
        'Content-Type': 'application/json'
      }
    })
  },
  allGetThongBao(){
    return api.get('allGetThongBao');
  }
}

export default ThongBaoAPI