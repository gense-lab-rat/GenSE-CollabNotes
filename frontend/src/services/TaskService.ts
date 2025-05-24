import axios from 'axios';
import { Task } from '../types';

const API = '/api/tasks';

export const getAllTasks = () => axios.get<Task[]>(API);
export const createTask  = (t: Partial<Task>) => axios.post<Task>(API, t);
export const updateTask  = (id: number, t: Partial<Task>) => axios.put<Task>(`${API}/${id}`, t);
export const deleteTask  = (id: number) => axios.delete<void>(`${API}/${id}`);
export const toggleDone  = (id: number, done: boolean) =>
  axios.patch<Task>(`${API}/${id}/status`, { status: done ? 'done' : 'active' });
