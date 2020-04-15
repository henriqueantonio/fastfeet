import axios from 'axios';
// 10.0.2.2
// 192.168.100.41
const api = axios.create({
  baseURL: 'http://localhost:3333',
});

export default api;
