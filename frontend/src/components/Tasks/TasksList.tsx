import React, { useEffect, useState } from 'react';
import { Task } from '../../types';
import {
  getAllTasks,
  deleteTask,
  toggleDone
} from '../../services/TaskService';
import TaskForm from './TaskForm';
export default function TasksList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [editing, setEditing] = useState<Task | null>(null);

  const load = () => getAllTasks().then(r => setTasks(r.data));
  useEffect(() => { load() }, []);

  const onDelete = (id: number) =>
    deleteTask(id).then(() => load());

  const onToggle = (t: Task) =>
    toggleDone(t.id, t.status !== 'done').then(() => load());

  const onSave = () => {
    setEditing(null);
    load();
  };

  return (
    <div>
      <h2>Tasks</h2>
      <button onClick={() => setEditing({ id: 0, title: '', status: 'active', priority: 'Moderate' })}>
        + New Task
      </button>

      {editing && <TaskForm task={editing} onDone={onSave} onCancel={() => setEditing(null)} />}

      <ul>
        {tasks.map(t => (
          <li key={t.id}>
            <input
              type="checkbox"
              checked={t.status === 'done'}
              onChange={() => onToggle(t)}
            />
            <strong>{t.title}</strong>{' '}
            <small>({t.priority} {t.dueDate ? `due ${t.dueDate}` : ''})</small>
            <button onClick={() => setEditing(t)}>Edit</button>
            <button onClick={() => onDelete(t.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}