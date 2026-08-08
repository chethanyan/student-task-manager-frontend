function TaskCard({ task, onDelete, onStatusChange }) {
  return (
    <div
      style={{
        background: "white",
        padding: 16,
        borderRadius: 10,
        marginBottom: 12,
        border: "1px solid #e5e7eb",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <div>
        <h4 style={{ margin: "0 0 6px 0" }}>{task.title}</h4>
        <p style={{ margin: "0 0 6px 0", color: "#6b7280" }}>
          {task.description || "No description"}
        </p>
        <small>
          Due: {task.dueDate || "—"} | Status: <strong>{task.status}</strong>
        </small>
      </div>

      <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
        <select
          value={task.status}
          onChange={(e) => onStatusChange(task.id, e.target.value)}
          style={{ padding: "6px 10px" }}
        >
          <option value="Pending">Pending</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>

        <button
          onClick={() => onDelete(task.id)}
          style={{
            background: "#ef4444",
            color: "white",
            border: "none",
            padding: "6px 12px",
            borderRadius: 6,
            cursor: "pointer",
          }}
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default TaskCard;