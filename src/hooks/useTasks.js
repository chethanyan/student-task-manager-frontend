import { useEffect, useState, useCallback } from "react";
import { getTasks, createTask, updateTask, deleteTask } from "../api/tasks";

// Shared task state + CRUD handlers used by Dashboard, My Tasks, and Completed pages.
export function useTasks() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  const fetchTasks = useCallback(async () => {
    try {
      setLoading(true);
      const res = await getTasks();
      setTasks(res.data);
      setError("");
    } catch (err) {
      console.error(err);
      setError("Failed to load tasks. Please login again.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const openCreate = () => {
    setEditingTask(null);
    setShowForm(true);
  };

  const openEdit = (task) => {
    setEditingTask(task);
    setShowForm(true);
  };

  const closeForm = () => {
    setShowForm(false);
    setEditingTask(null);
  };

  const handleSave = async (taskData) => {
    try {
      if (editingTask) {
        await updateTask(editingTask.id, taskData);
      } else {
        await createTask(taskData);
      }
      closeForm();
      fetchTasks();
    } catch (err) {
      alert(editingTask ? "Failed to update task" : "Failed to create task");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this task?")) return;
    try {
      await deleteTask(id);
      fetchTasks();
    } catch (err) {
      alert("Failed to delete task");
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      const task = tasks.find((t) => t.id === id);
      await updateTask(id, { ...task, status: newStatus });
      fetchTasks();
    } catch (err) {
      alert("Failed to update status");
    }
  };

  return {
    tasks,
    loading,
    error,
    showForm,
    editingTask,
    openCreate,
    openEdit,
    closeForm,
    handleSave,
    handleDelete,
    handleStatusChange,
    refetch: fetchTasks,
  };
}