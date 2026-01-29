import axios from "axios";

const API_BASE = import.meta.env.VITE_API_BASE_URL;

export const getPosts = () => {
  return axios.get(`${API_BASE}/Posts`);
};

export const getPostById = (id) => {
  return axios.get(`${API_BASE}/Posts/${id}`);
};
