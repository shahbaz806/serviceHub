import axios from 'axios';
// In development, Vite proxies /api so browser cookies stay same-site with the UI.
const api = axios.create({ baseURL: import.meta.env.VITE_API_URL || '/api', withCredentials: true });
export default api;
