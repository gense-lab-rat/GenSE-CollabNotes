import axios from 'axios'
import { Note } from '../types'

const API = '/api/notes'

export const getAllNotes = () => axios.get<Note[]>(API)
export const createNote = (note: { title: string; content: string }) =>
  axios.post<Note>(API, note)
export const updateNote = (id: number, note: Partial<Note>) =>
  axios.put<Note>(`${API}/${id}`, note)
export const deleteNote = (id: number) =>
  axios.delete(`${API}/${id}`)
