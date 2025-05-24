import { useState } from "react"
import { registerUser } from "../../services/userService"

export default function Register() {
  const [form, setForm] = useState({ fullName: "", email: "", password: "" })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await registerUser(form)
    alert("Registered!")
  }

  return (
    <div className="main-content">
      <div className="content-header">
        <h1 className="content-title">
          <i className="fas fa-user-plus"></i>
          Register
        </h1>
      </div>

      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem", maxWidth: 400 }}>
        <input
          placeholder="Full Name"
          className="search-input"
          value={form.fullName}
          onChange={(e) => setForm({ ...form, fullName: e.target.value })}
        />
        <input
          type="email"
          placeholder="Email"
          className="search-input"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
        <input
          type="password"
          placeholder="Password"
          className="search-input"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />
        <button type="submit" className="btn-primary">
          <i className="fas fa-user-check"></i>
          Register
        </button>
      </form>
    </div>
  )
}
