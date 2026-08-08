import { useState } from "react";

function TaskForm({ onSubmit, onCancel }) {
  const [form, setForm] = useState({
    title: "",
    description: "",
    status: "Pending",
    dueDate: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        background: "white",
        padding: 20,
        borderRadius: 12,
        marginTop: 20,
        border: "1px solid #e5e7eb",
      }}
    >
      <h3 style={{ marginTop: 0 }}>Add New Task</h3>

      <input
        name="title"
        placeholder="Title"
        value={form.title}
        onChange={handleChange}
        required
        style={{ display: "block", width: "100%", padding: 10, marginBottom: 10 }}
      />

      <textarea
        name="description"
        placeholder="Description"
        value={form.description}
        onChange={handleChange}
        style={{ display: "block", width: "100%", padding: 10, marginBottom: 10, minHeight: 80 }}
      />

      <select
        name="status"
        value={form.status}
        onChange={handleChange}
        style={{ display: "block", width: "100%", padding: 10, marginBottom: 10 }}
      >
        <option value="Pending">Pending</option>
        <option value="In Progress">In Progress</option>
        <option value="Completed">Completed</option>
      </select>

      <input
        type="date"
        name="dueDate"
        value={form.dueDate}
        onChange={handleChange}
        style={{ display: "block", width: "100%", padding: 10, marginBottom: 15 }}
      />

      <button type="submit" className="add-task-btn">
        Save Task
      </button>
      <button
        type="button"
        onClick={onCancel}
        style={{ marginLeft: 10, padding: "10px 16px" }}
      >
        Cancel
      </button>
    </form>
  );
}

export default TaskForm;