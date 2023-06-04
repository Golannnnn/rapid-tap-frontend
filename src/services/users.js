import axios from "axios";
const baseUrl = `${import.meta.env.VITE_BACKEND_URL}/users`;

axios.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

const signup = async (newUser) => {
  const response = await axios.post(`${baseUrl}/signup`, newUser);
  return response.data;
};

const login = async (user) => {
  const response = await axios.post(`${baseUrl}/login`, user);
  return response.data;
};

const update = async (id, user) => {
  const response = await axios.put(`${baseUrl}/update/${id}`, user);
  return response.data;
};

const logout = () => {
  localStorage.removeItem("token");
};

export default { signup, login, update, logout };
