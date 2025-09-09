import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/axios";
import { toast } from "react-toastify";


export default function Signup() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await api.post("/auth/signup", form);
      toast.success("Account created successfully! Please login.");
      navigate("/login"); // go back to login
    } catch (err) {
      alert(err.response?.data?.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container py-4" style={{ maxWidth: 520 }}>
      <h3 className="mb-3">Create account</h3>
      <form className="card card-body" onSubmit={handleSubmit}>
        <div className="mb-2">
          <label className="form-label">Name</label>
          <input className="form-control" name="name" value={form.name} onChange={handleChange} required />
        </div>
        <div className="mb-2">
          <label className="form-label">Email</label>
          <input type="email" className="form-control" name="email" value={form.email} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Password</label>
          <input type="password" className="form-control" name="password" value={form.password} onChange={handleChange} required />
        </div>
        <button className="btn btn-primary" disabled={loading}>{loading ? "Creating..." : "Signup"}</button>
        <p className="mt-3 mb-0">Have an account? <Link to="/login">Login</Link></p>
      </form>
    </div>
  );
}
