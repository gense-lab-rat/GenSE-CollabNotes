import { useState } from "react"
import { loginUser } from "../../services/userService"

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const res = await loginUser(form)
    alert(`Login status: ${res.status}`)
  }

  return (
    <div className="main-content">
      <div className="content-header">
        <h1 className="content-title">
          <i className="fas fa-sign-in-alt"></i>
          Login
        </h1>
      </div>

      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem", maxWidth: 400 }}>
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
          <i className="fas fa-arrow-right-to-bracket"></i>
          Login
        </button>
      </form>
    </div>
  )
}
