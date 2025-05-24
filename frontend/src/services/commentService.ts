import axios from 'axios';

export interface Comment {
  id: number;
  author: string;
  content: string;
  createdAt: string;
}


export const fetchComments = (noteId: number): Promise<Comment[]> =>
  axios.get(`/api/notes/${noteId}/comments`).then(res => res.data);


export const postComment = (noteId: number, content: string): Promise<Comment> =>
  axios.post(`/api/notes/${noteId}/comments`, { content }).then(res => res.data);
