import axios from "axios";

// Default api url config

axios.defaults.baseURL = 'https://drf-movie-app.herokuapp.com';
axios.defaults.headers.post['Content-Type'] = 'multipart/form-data'
axios.defaults.withCredentials = true;

export const axiosReq = axios.create();
export const axiosRes = axios.create();