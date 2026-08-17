import './TaskCard.css';

const STATUS_CLASS = {
  "Pending": "status-pending",
  "In Progress": "status-progress",
  "Completed": "status-completed",
};

function TaskCard({ task, onDelete, onStatusChange, onEdit }) {
  return (
    <div className="task-card">
      <div className="task-card-left">
        <h4 className="task-title">{task.title}</h4>
        <p className="task-description">
          {task.description || "No description"}
        </p>
        <div className="task-meta">
          <span className={`status-badge ${STATUS_CLASS[task.status] || ""}`}>
            {task.status}
          </span>
          <span className="due-date">Due: {task.dueDate || "—"}</span>
        </div>
      </div>

      <div className="task-card-actions">
        <select
          value={task.status}
          onChange={(e) => onStatusChange(task.id, e.target.value)}
        >
          <option value="Pending">Pending</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>

        <button className="btn-edit" onClick={() => onEdit(task)}>
          Edit
        </button>

        <button className="btn-delete" onClick={() => onDelete(task.id)}>
          Delete
        </button>
      </div>
    </div>
  );
}

export default TaskCard;