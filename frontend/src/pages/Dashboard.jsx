import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/axios";

export default function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [statusFilter, setStatusFilter] = useState("All");
  const [sortBy, setSortBy] = useState("createdAt_desc");
  const [loading, setLoading] = useState(true);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const { data } = await api.get("/tasks");
      setTasks(data);
    } catch (err) {
      alert(err.response?.data?.message || "Failed to load tasks");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchTasks(); }, []);

  const handleDelete = async (id) => {
    if (!confirm("Delete this task?")) return;
    try {
      await api.delete(`/tasks/${id}`);
      setTasks((prev) => prev.filter((t) => t._id !== id));
      alert("Task deleted successfully");
    } catch (err) {
      alert(err.response?.data?.message || "Delete failed");
    }
  };

  const filtered = useMemo(() => {
    let list = [...tasks];
    if (statusFilter !== "All") list = list.filter((t) => t.status === statusFilter);
    const [field, order] = sortBy.split("_");
    list.sort((a, b) => {
      const av = a[field] ? new Date(a[field]).getTime() : 0;
      const bv = b[field] ? new Date(b[field]).getTime() : 0;
      return order === "asc" ? av - bv : bv - av;
    });
    return list;
  }, [tasks, statusFilter, sortBy]);

  
  const getBadgeClass = (status) => {
    if (status === "Pending") return "badge badge-pending";
    if (status === "In Progress") return "badge badge-progress";
    if (status === "Completed") return "badge badge-completed";
    return "badge bg-secondary";
  };

  return (
    <div className="container py-4">
      <div className="d-flex align-items-center justify-content-between mb-4">
        <h3 className="mb-0">Your Tasks</h3>
        <div className="d-flex gap-2">
          <select className="form-select" value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
            <option>All</option>
            <option>Pending</option>
            <option>In Progress</option>
            <option>Completed</option>
          </select>
         
        </div>
      </div>

      {loading ? (
        <div className="alert alert-info">Loading…</div>
      ) : !filtered.length ? (
        <div className="alert alert-secondary">No tasks yet</div>
      ) : (
        <div className="row g-4">
          {filtered.map((t) => (
            <div className="col-md-4" key={t._id}>
              <div className="task-card card h-100 shadow-sm">
                <div className="card-body d-flex flex-column">
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <h5 className="card-title mb-0">{t.title}</h5>
                    <span className={getBadgeClass(t.status)}>{t.status}</span>
                  </div>
                  <p className="card-text flex-grow-1">{t.description || "No description"}</p>
                  <p className="small text-info mb-3">
  <strong>Due:</strong>{" "}
  {t.dueDate
    ? new Date(t.dueDate).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric"
      })
    : "No due date"}
</p>

                  <div className="d-flex justify-content-between mt-auto">
                    <Link className="btn btn-sm btn-outline-primary" to={`/edit/${t._id}`}>
                      Edit
                    </Link>
                    <button className="btn btn-sm btn-outline-danger" onClick={() => handleDelete(t._id)}>
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
