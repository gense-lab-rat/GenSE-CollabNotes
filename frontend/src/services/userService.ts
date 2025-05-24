import axios from 'axios'

const API = '/api/users'

export const registerUser = (data: { fullName: string; email: string; password: string }) =>
  axios.post(`${API}/register`, data)

export const loginUser = (data: { email: string; password: string }) =>
  axios.post(`${API}/login`, data)

export const updateProfile = (data: any) =>
  axios.put(`${API}/profile`, data)

export const getUser = (id: number) =>
  axios.get(`${API}/${id}`)
