import { useTasks } from "../hooks/useTasks";
import TaskForm from "../components/TaskForm";
import TaskCard from "../components/TaskCard";
import "./Dashboard.css";

function Completed() {
  const {
    tasks,
    loading,
    error,
    showForm,
    editingTask,
    openEdit,
    closeForm,
    handleSave,
    handleDelete,
    handleStatusChange,
  } = useTasks();

  const completedTasks = tasks.filter((t) => t.status === "Completed");

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <div>
          <h1>Completed</h1>
          <p className="subtitle">Tasks you've already finished. Nice work.</p>
        </div>
      </div>

      {error && <p style={{ color: "#dc2626", marginBottom: 20 }}>{error}</p>}

      {showForm && (
        <TaskForm onSubmit={handleSave} onCancel={closeForm} initialData={editingTask} />
      )}

      <div className="tasks-section">
        {loading ? (
          <p className="subtitle">Loading tasks...</p>
        ) : completedTasks.length === 0 ? (
          <div className="empty-state">No completed tasks yet.</div>
        ) : (
          <div className="task-list">
            {completedTasks.map((task) => (
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

export default Completed;