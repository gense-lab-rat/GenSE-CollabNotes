import React, { useState } from 'react'
import { Note } from '../../types'
import { createNote, updateNote } from '../../services/NoteService'

interface Props {
  note: Note
  onDone: () => void
  onCancel: () => void
}

export default function NoteForm({ note, onDone, onCancel }: Props) {
  const [title, setTitle] = useState(note.title)
  const [content, setContent] = useState(note.content || '')

  const save = () => {
    const payload = { title, content }
    const action = note.id
      ? updateNote(note.id, payload)
      : createNote(payload)
    action.then(() => onDone())
  }

  return (
    <div className="main-content" style={{ maxWidth: 600 }}>
      <div className="content-header">
        <h2 className="content-title">
          <i className="fas fa-pen"></i>
          {note.id ? 'Edit Note' : 'New Note'}
        </h2>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <div>
          <label>Title</label>
          <input
            value={title}
            onChange={e => setTitle(e.target.value)}
            className="search-input"
            placeholder="Judul catatan"
          />
        </div>

        <div>
          <label>Content</label>
          <textarea
            rows={6}
            value={content}
            onChange={e => setContent(e.target.value)}
            className="search-input"
            placeholder="Isi catatan..."
          />
        </div>

        <div style={{ display: 'flex', gap: '1rem' }}>
          <button onClick={save} className="btn-primary">
            <i className="fas fa-save"></i>
            {note.id ? 'Update' : 'Create'}
          </button>
          <button onClick={onCancel} className="btn-secondary">
            Cancel
          </button>
        </div>
      </div>
    </div>
  )
}
