import { useState } from "react";
import { useTasks } from "../hooks/useTasks";
import TaskForm from "../components/TaskForm";
import TaskCard from "../components/TaskCard";
import "./Dashboard.css";
import "./Tasks.css";

const FILTERS = ["All", "Pending", "In Progress", "Completed"];

function MyTasks() {
  const {
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
  } = useTasks();
  const [filter, setFilter] = useState("All");

  const filteredTasks =
    filter === "All" ? tasks : tasks.filter((t) => t.status === filter);

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <div>
          <h1>My Tasks</h1>
          <p className="subtitle">Every task you're tracking, in one place.</p>
        </div>
        <button className="btn-add" onClick={openCreate}>
          + Add Task
        </button>
      </div>

      {error && <p style={{ color: "#dc2626", marginBottom: 20 }}>{error}</p>}

      {showForm && (
        <TaskForm onSubmit={handleSave} onCancel={closeForm} initialData={editingTask} />
      )}

      <div className="filter-tabs">
        {FILTERS.map((f) => (
          <button
            key={f}
            className={`filter-tab${filter === f ? " active" : ""}`}
            onClick={() => setFilter(f)}
          >
            {f}
          </button>
        ))}
      </div>

      <div className="tasks-section">
        {loading ? (
          <p className="subtitle">Loading tasks...</p>
        ) : filteredTasks.length === 0 ? (
          <div className="empty-state">
            {filter === "All"
              ? 'No tasks yet. Click "+ Add Task" to create one.'
              : `No ${filter.toLowerCase()} tasks.`}
          </div>
        ) : (
          <div className="task-list">
            {filteredTasks.map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                onDelete={handleDelete}
                onStatusChange={handleStatusChange}
                onEdit={openEdit}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default MyTasks;