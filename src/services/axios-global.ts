import axios from "axios";
axios.defaults.baseURL ="https://little-learners-academy-back-end-j3iu.onrender.com";
// axios.defaults.baseURL ="http://localhost:5000";

const token =localStorage.getItem('token')

axios.defaults.headers.common["Authorization"]=`Bearer ${token}`
