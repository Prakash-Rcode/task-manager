import { useEffect, useState } from "react";

const defaultState = { title: "", description: "", status: "Pending", dueDate: "" };

export default function TaskForm({ onSubmit, editing }) {
  const [form, setForm] = useState(defaultState);

  useEffect(() => {
    if (editing) {
      const { title, description = "", status = "Pending", dueDate } = editing;
      setForm({
        title,
        description,
        status,
        dueDate: dueDate ? new Date(dueDate).toISOString().slice(0, 10) : ""
      });
    } else {
      setForm(defaultState);
    }
  }, [editing]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.title.trim()) return alert("Title is required");
    onSubmit(form);
    setForm(defaultState);
  };

  return (
    <form className="card card-body mb-3" onSubmit={handleSubmit}>
      <h5 className="mb-3">{editing ? "Update Task" : "Create Task"}</h5>
      <div className="mb-2">
        <label className="form-label">Title *</label>
        <input name="title" className="form-control" value={form.title} onChange={handleChange} required />
      </div>
      <div className="mb-2">
        <label className="form-label">Description</label>
        <textarea name="description" className="form-control" value={form.description} onChange={handleChange} />
      </div>
      <div className="row g-2 mb-2">
        <div className="col-md-6">
          <label className="form-label">Status</label>
          <select name="status" className="form-select" value={form.status} onChange={handleChange}>
            <option>Pending</option>
            <option>In Progress</option>
            <option>Completed</option>
          </select>
        </div>
        <div className="col-md-6">
          <label className="form-label">Due Date</label>
          <input type="date" name="dueDate" className="form-control" value={form.dueDate} onChange={handleChange} />
        </div>
      </div>
      <button className="btn btn-primary">{editing ? "Save Changes" : "Add Task"}</button>
    </form>
  );
}
