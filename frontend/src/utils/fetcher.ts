import axios from 'axios'

const api = axios.create({
  baseURL : 'http://localhost:8900',
  timeout : 15000,
  withCredentials : true
})

export default api

