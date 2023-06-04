import axios from "axios";
const baseUrl = `${import.meta.env.VITE_BACKEND_URL}/scores`;

axios.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

const addScore = async (id, newScore) => {
  const response = await axios.post(`${baseUrl}/add/${id}`, newScore);
  return response.data;
};

const getHistory = async (id) => {
  const response = await axios.get(`${baseUrl}/history/${id}`);
  return response.data;
};

const getLastScore = async (id) => {
  const response = await axios.get(`${baseUrl}/last/${id}`);
  return response.data;
};

const getBestScore = async (id) => {
  const response = await axios.get(`${baseUrl}/best/${id}`);
  return response.data;
};

const getAllScores = async () => {
  const response = await axios.get(`${baseUrl}/all`);
  return response.data;
};

export default {
  addScore,
  getHistory,
  getLastScore,
  getBestScore,
  getAllScores,
};
