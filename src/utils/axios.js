//Let's try to create a button based on the following files that will perform the same functionality as in postman.

//axios.js

import axios from "axios"

axios.defaults.withCredentials = true;

export const axiosInstance = axios.create({
  baseURL: "http://localhost:3000",
//  baseURL: "https://kef.onrender.com",
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  }
})

export const axiosPrivateInstance = axios.create({
  baseURL: "http://localhost:3000",
//  baseURL: "http://localhost:3000",
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  }
})






