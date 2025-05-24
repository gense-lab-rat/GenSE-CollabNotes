import React, { useState, useEffect } from 'react'
import { fetchComments, postComment, Comment } from '../../services/commentService'

interface CommentsSectionProps {
  noteId: number
}

const CommentsSection: React.FC<CommentsSectionProps> = ({ noteId }) => {
  const [comments, setComments] = useState<Comment[]>([])
  const [newComment, setNewComment] = useState('')

  useEffect(() => {
    loadComments()
  }, [noteId])

  const loadComments = async () => {
    try {
      const data = await fetchComments(noteId)
      setComments(data)
    } catch (err) {
      console.error('Failed to load comments', err)
    }
  }

  const handleSubmit = async () => {
    if (!newComment.trim()) return
    try {
      const created = await postComment(noteId, newComment)
      setComments(prev => [...prev, created])
      setNewComment('')
    } catch (err) {
      console.error('Failed to post comment', err)
    }
  }

  return (
    <div className="main-content">
      <div className="content-header">
        <h2 className="content-title">
          <i className="fas fa-comments"></i>
          Comments
        </h2>
      </div>

      <div className="comments-list" style={{ marginBottom: '1rem' }}>
        {comments.length === 0 && (
          <div className="empty-state">
            <i className="fas fa-comment-slash"></i>
            <p>No comments yet.</p>
          </div>
        )}
        {comments.map(c => (
          <div key={c.id} className="activity-item">
            <div className="activity-avatar">
              {c.author.charAt(0).toUpperCase()}
            </div>
            <div className="activity-content">
              <div className="activity-text">
                <strong>{c.author}</strong> —{' '}
                <small>{new Date(c.createdAt).toLocaleString()}</small>
              </div>
              <div>{c.content}</div>
            </div>
          </div>
        ))}
      </div>

      <textarea
        className="search-input"
        value={newComment}
        onChange={e => setNewComment(e.target.value)}
        placeholder="Tulis komentar..."
        rows={3}
        style={{ marginBottom: '1rem' }}
      />

      <button
        onClick={handleSubmit}
        disabled={!newComment.trim()}
        className="btn-primary"
      >
        <i className="fas fa-paper-plane"></i>
        Post Comment
      </button>
    </div>
  )
}

export default CommentsSection
