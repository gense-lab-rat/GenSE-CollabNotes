import React, { useState } from 'react';
import { Task } from '../../types';
import { createTask, updateTask } from '../../services/TaskService';

interface Props {
  task: Task;
  onDone: () => void;
  onCancel: () => void;
}

export default function TaskForm({ task, onDone, onCancel }: Props) {
  const [title, setTitle] = useState(task.title);
  const [dueDate, setDueDate] = useState(task.dueDate || '');
  const [priority, setPriority] = useState(task.priority || 'Moderate');

  const save = () => {
    const payload = { title, dueDate, priority };
    const action = task.id
      ? updateTask(task.id, payload)
      : createTask(payload);
    action.then(() => onDone());
  };

  return (
    <div style={{ border: '1px solid #ccc', padding: 8, margin: 8 }}>
      <h3>{task.id ? 'Edit Task' : 'New Task'}</h3>
      <div>
        <label>Title</label><br/>
        <input value={title} onChange={e => setTitle(e.target.value)} />
      </div>
      <div>
        <label>Due Date</label><br/>
        <input
          type="date"
          value={dueDate}
          onChange={e => setDueDate(e.target.value)}
        />
      </div>
      <div>
        <label>Priority</label><br/>
        <select
          value={priority}
          onChange={e => setPriority(e.target.value as any)}
        >
          <option>Urgent</option>
          <option>Moderate</option>
          <option>Low</option>
        </select>
      </div>
      <button onClick={save}>{task.id ? 'Update' : 'Create'}</button>
      <button onClick={onCancel} style={{ marginLeft: 8 }}>Cancel</button>
    </div>
  );
}