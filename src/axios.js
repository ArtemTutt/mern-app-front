import axios from "axios";

const http = axios.create({
  baseURL: "http://localhost:8000",
});

http.interceptors.request.use((config) => {
  config.headers.Authorization = window.localStorage.getItem("token");

  return config;
});

export default http;
