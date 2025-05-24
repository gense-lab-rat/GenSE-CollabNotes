import { Routes, Route, Link } from 'react-router-dom'
import Register from './components/Auth/Register'
import Login    from './components/Auth/Login'
import NotesList from './components/Notes/NotesList'
import TasksList from './components/Tasks/TasksList'

export default function App() {
  return (
    <>
      <nav style={{ marginBottom: 16 }}>
        <Link to="/register">Register</Link> |{' '}
        <Link to="/login">Login</Link> |{' '}
        <Link to="/notes">Notes</Link> |{' '}
        <Link to="/tasks">Tasks</Link>
      </nav>

      <Routes>
        
        <Route path="/register" element={<Register />} />
        <Route path="/login"    element={<Login />} />

        
        <Route path="/notes"    element={<NotesList />} />

        <Route path="/tasks"    element={<TasksList />} />
      </Routes>
    </>
  )
}
