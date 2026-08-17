import { useEffect, useState } from "react";
import { getTasks, createTask, deleteTask, updateTask } from "../api/tasks";
import TaskForm from "../components/TaskForm";
import TaskCard from "../components/TaskCard";

function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchTasks = async () => {
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
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleCreate = async (taskData) => {
    try {
      await createTask(taskData);
      setShowForm(false);
      fetchTasks();
    } catch (err) {
      alert("Failed to create task");
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

  const total = tasks.length;
  const pending = tasks.filter((t) => t.status === "Pending").length;
  const inProgress = tasks.filter((t) => t.status === "In Progress").length;
  const completed = tasks.filter((t) => t.status === "Completed").length;

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <div>
          <h1>Dashboard</h1>
          <p>Here’s an overview of your tasks.</p>
        </div>
        <button className="add-task-btn" onClick={() => setShowForm(true)}>
          + Add Task
        </button>
      </div>

      {/* Stats */}
      <div className="stats-container">
        <div className="stat-card">
          <p>Total Tasks</p>
          <h2>{total}</h2>
        </div>
        <div className="stat-card">
          <p>Pending</p>
          <h2>{pending}</h2>
        </div>
        <div className="stat-card">
          <p>In Progress</p>
          <h2>{inProgress}</h2>
        </div>
        <div className="stat-card">
          <p>Completed</p>
          <h2>{completed}</h2>
        </div>
      </div>

      {/* Error Message */}
      {error && <p style={{ color: "red", marginTop: 20 }}>{error}</p>}

      {/* Add Task Form */}
      {showForm && (
        <TaskForm
          onSubmit={handleCreate}
          onCancel={() => setShowForm(false)}
        />
      )}

      {/* Task List */}
      <div style={{ marginTop: 30 }}>
        {loading ? (
          <p>Loading tasks...</p>
        ) : tasks.length === 0 ? (
          <p>No tasks yet. Click "+ Add Task" to create one.</p>
        ) : (
          tasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onDelete={handleDelete}
              onStatusChange={handleStatusChange}
            />
          ))
        )}
      </div>
    </div>
  );
}

export default Dashboard;