import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/axios";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const { data } = await api.post("/auth/login", form);
      login(data);
      navigate("/");
    } catch (err) {
      toast.success(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container py-4" style={{ maxWidth: 480 }}>
      <h3 className="mb-3">Login</h3>
      <form className="card card-body" onSubmit={handleSubmit}>
        <div className="mb-2">
          <label className="form-label">Email</label>
          <input type="email" className="form-control" name="email" value={form.email} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Password</label>
          <input type="password" className="form-control" name="password" value={form.password} onChange={handleChange} required />
        </div>
        <button className="btn btn-primary" disabled={loading}>{loading ? "Signing in..." : "Login"}</button>
        <p className="mt-3 mb-0">No account? <Link to="/signup">Signup</Link></p>
      </form>
    </div>
  );
}
