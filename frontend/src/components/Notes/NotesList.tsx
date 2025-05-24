import React, { useEffect, useState } from 'react'
import { Note } from '../../types'
import { getAllNotes, deleteNote } from '../../services/NoteService'
import NoteForm from './NoteForm'

export default function NotesList() {
  const [notes, setNotes] = useState<Note[]>([])
  const [editing, setEditing] = useState<Note | null>(null)

  const load = () => getAllNotes().then(r => setNotes(r.data))

  useEffect(() => {
    load()
  }, [])

  const onDelete = (id: number) => deleteNote(id).then(() => load())

  const onSave = () => {
    setEditing(null)
    load()
  }

  return (
    <div className="main-content">
      <div className="content-header">
        <h2 className="content-title">
          <i className="fas fa-sticky-note"></i>
          My Notes
        </h2>
        <button
          onClick={() => setEditing({ id: 0, title: '', content: '' })}
          className="btn-primary"
        >
          <i className="fas fa-plus"></i>
          New Note
        </button>
      </div>

      {editing && (
        <NoteForm
          note={editing}
          onDone={onSave}
          onCancel={() => setEditing(null)}
        />
      )}

      {notes.length === 0 ? (
        <div className="empty-state">
          <i className="fas fa-note-sticky"></i>
          <p>No notes yet.</p>
        </div>
      ) : (
        <div className="card-grid">
          {notes.map(n => (
            <div className="card" key={n.id}>
              <div className="card-header">
                <div>
                  <h3 className="card-title">{n.title}</h3>
                  <div className="card-meta">
                    <i className="fas fa-calendar"></i>
                    <span>ID: {n.id}</span>
                  </div>
                </div>
                <div>
                  <button
                    className="btn-secondary"
                    onClick={() => setEditing(n)}
                  >
                    <i className="fas fa-pen"></i>
                  </button>
                  <button
                    className="btn-secondary"
                    onClick={() => onDelete(n.id)}
                    style={{ marginLeft: '0.5rem' }}
                  >
                    <i className="fas fa-trash"></i>
                  </button>
                </div>
              </div>
              <div className="card-content">{n.content}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
