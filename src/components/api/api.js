import axios from 'axios'

const api = axios.create({
  baseURL: process.env.REACT_APP_PUBLIC_API, 
  
})

export default api
