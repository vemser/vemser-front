import axios from 'axios'

export const api = axios.create({
  baseURL: `${process.env.REACT_APP_BACKEND_URL}/vemser/chronos-back/`
})

export const authApi = axios.create({
  baseURL: `${process.env.REACT_APP_BACKEND_URL}/vemser/usuario-back/`
})