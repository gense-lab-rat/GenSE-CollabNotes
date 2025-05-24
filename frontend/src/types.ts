export interface Note {
  id: number;
  title: string;
  content?: string;
}

export interface Task {
  id: number;
  title: string;
  dueDate?: string;     
  priority?: 'Urgent' | 'Moderate' | 'Low';
  status?: 'active' | 'done';
}
