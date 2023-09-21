//axios.js

import axios from "axios"

axios.defaults.withCredentials = true;

export const axiosInstance = axios.create({
baseURL: "http://localhost:3000",
  baseURL: "https://kef.onrender.com",
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  }
}) 
 
export const axiosPrivateInstance = axios.create({
  baseURL: 'http://localhost:3000', // Make sure this matches your server's address
   baseURL: "https://kef.onrender.com",
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});





 //baseURL: "https://kef.onrender.com",