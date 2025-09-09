import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../api/axios";
import TaskForm from "../components/TaskForm";
import { toast } from "react-toastify";


export default function EditTask() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [task, setTask] = useState(null);

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const { data } = await api.get("/tasks");
        const found = data.find((t) => t._id === id);
        if (!found) {
          alert("Task not found");
          navigate("/");
        } else {
          setTask(found);
        }
      } catch (err) {
        alert(err.response?.data?.message || "Failed to load task");
        navigate("/");
      }
    };
    fetchTask();
  }, [id, navigate]);

  const handleUpdate = async (payload) => {
    try {
      await api.put(`/tasks/${id}`, payload);
      toast.success("Task updated successfully!");
      navigate("/"); // back to dashboard
    } catch (err) {
      alert(err.response?.data?.message || "Update failed");
    }
  };

  return (
    <div className="container py-4">
      <h3 className="mb-3">Edit Task</h3>
      {task ? <TaskForm onSubmit={handleUpdate} editing={task} /> : <p>Loading…</p>}
    </div>
  );
}
