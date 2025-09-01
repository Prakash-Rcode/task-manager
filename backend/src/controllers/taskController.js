import Task from "../models/Task.js";


export const getTasks = async (req, res) => {
  const tasks = await Task.find({ user: req.user._id });
  res.json(tasks);
};


export const createTask = async (req, res) => {
  const { title, description, status, dueDate } = req.body;
  if (!title) return res.status(400).json({ message: "Title is required" });

  const task = await Task.create({
    user: req.user._id,
    title,
    description,
    status,
    dueDate,
  });

  res.status(201).json(task);
};


export const updateTask = async (req, res) => {
  const task = await Task.findById(req.params.id);
  if (!task) return res.status(404).json({ message: "Task not found" });

  if (task.user.toString() !== req.user._id.toString())
    return res.status(401).json({ message: "Not authorized" });

  const updated = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
};


export const deleteTask = async (req, res) => {
  const task = await Task.findById(req.params.id);
  if (!task) return res.status(404).json({ message: "Task not found" });

  if (task.user.toString() !== req.user._id.toString())
    return res.status(401).json({ message: "Not authorized" });

  await task.remove();
  res.json({ message: "Task deleted" });
};
