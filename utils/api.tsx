import axios from 'axios';
const api = axios.create({
baseURL: 'http://localhost:3000/api.php', // URL backend Laravel
});
export default api;