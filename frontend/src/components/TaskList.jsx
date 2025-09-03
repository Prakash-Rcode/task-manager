export default function TaskList({ tasks, onEdit, onDelete }) {
  if (!tasks.length) {
    return <div className="alert alert-secondary">No tasks yet. Create one!</div>;
  }

  const badge = (status) => {
    const map = {
      "Pending": "bg-secondary",
      "In Progress": "bg-info",
      "Completed": "bg-success"
    };
    return `badge ${map[status] || "bg-secondary"}`;
  };

  return (
    <div className="table-responsive">
      <table className="table align-middle">
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Status</th>
            <th>Due</th>
            <th>Created</th>
            <th style={{ width: 150 }}></th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((t) => (
            <tr key={t._id}>
              <td className="fw-semibold">{t.title}</td>
              <td>{t.description || "-"}</td>
              <td><span className={badge(t.status)}>{t.status}</span></td>
              <td>{t.dueDate ? new Date(t.dueDate).toLocaleDateString() : "-"}</td>
              <td>{new Date(t.createdAt).toLocaleString()}</td>
              <td>
                <div className="btn-group btn-group-sm">
                  <button className="btn btn-outline-primary" onClick={() => onEdit(t)}>Edit</button>
<button className="btn btn-outline-danger" onClick={() => onDelete(t._id)}>
  Delete
</button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
