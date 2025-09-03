import { useEffect, useMemo, useState } from "react";
import api from "../api/axios";
import TaskForm from "../components/TaskForm";
import TaskList from "../components/TaskList";

export default function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [editing, setEditing] = useState(null);
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

  const handleCreate = async (payload) => {
    try {
      if (editing) {
        const { data } = await api.put(`/tasks/${editing._id}`, payload);
        setTasks((prev) => prev.map((t) => (t._id === data._id ? data : t)));
        setEditing(null);
      } else {
        const { data } = await api.post("/tasks", payload);
        setTasks((prev) => [data, ...prev]);
      }
    } catch (err) {
      alert(err.response?.data?.message || "Save failed");
    }
  };


  const handleDelete = async (id) => {
  if (!confirm("Delete this task?")) return;
  try {
    await api.delete(`/tasks/${id}`);
    setTasks((prev) => prev.filter((t) => t._id !== id));
  } catch (err) {
    alert(err.response?.data?.message || "Delete failed");
  }
};


  const filtered = useMemo(() => {
    let list = [...tasks];
    if (statusFilter !== "All") {
      list = list.filter((t) => t.status === statusFilter);
    }
    const [field, order] = sortBy.split("_");
    list.sort((a, b) => {
      const av = a[field] ? new Date(a[field]).getTime() : 0;
      const bv = b[field] ? new Date(b[field]).getTime() : 0;
      return order === "asc" ? av - bv : bv - av;
    });
    return list;
  }, [tasks, statusFilter, sortBy]);

  return (
    <div className="container py-4">
      <div className="d-flex align-items-center justify-content-between mb-3">
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

      <TaskForm onSubmit={handleCreate} editing={editing} />

      {loading ? (
        <div className="alert alert-info">Loading…</div>
      ) : (
        <TaskList tasks={filtered} onEdit={setEditing} onDelete={handleDelete} />
      )}
    </div>
  );
}
