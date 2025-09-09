import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import TaskForm from "../components/TaskForm";

export default function CreateTask() {
  const navigate = useNavigate();

  const handleCreate = async (payload) => {
    try {
      await api.post("/tasks", payload);
      toast.success("Task created successfully!");
      navigate("/"); 
    } catch (err) {
      alert(err.response?.data?.message || "Create failed");
    }
  };

  return (
    <div className="container py-4">
      <h3 className="mb-3">Create New Task</h3>
      <TaskForm onSubmit={handleCreate} />
    </div>
  );
}
