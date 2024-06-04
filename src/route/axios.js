import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const api = axios.create({
  baseURL: 'http://localhost:8080/',
  timeout: 10000, // Thời gian quy định gọi trong trường hợp mạng chậm 
  headers: {"Content-Type": 'application/json'},
});

const getTokenFromLocal = () => {
  var s = localStorage.getItem("token");
  if (s) {
    var res = JSON.parse(s);
    var token = res?.data; // Sử dụng optional chaining để tránh lỗi nếu res không tồn tại
    console.log("token là:", token);
    return token;
  }
  
}


// Interceptor để thêm token vào tiêu đề 'Authorization' của mỗi yêu cầu
api.interceptors.request.use(
  config => {
    const token = getTokenFromLocal(); // Lấy token từ local storage hoặc bất kỳ cơ chế lưu trữ nào khác
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`; // Thêm token vào tiêu đề 'Authorization'
    }
    return config;
  },
  error => {
    
    console.log(error);
    return Promise.reject(error);
  }
);


// Interceptor để xử lý lại yêu cầu khi trả về mã trạng thái 401 (Unauthorized)
api.interceptors.response.use(
  response => {
    return response;
  },
  async function (error) {
    const originalRequest = error.config;
    console.log(error);
    if (error.response?.status === 401 ) { // Xử lý khi trạng thái là 401 (Unauthorized)
      const access_token = await getTokenFromLocal();
      if (access_token) {
        originalRequest.headers['Authorization'] = `Bearer ${access_token}`; // Thêm token vào tiêu đề 'Authorization' của yêu cầu gốc
        return axios(originalRequest); // Gửi lại yêu cầu gốc với token mới
      }
    }
    return Promise.reject(error);
  }
);

export default api;
