import { useState } from "react";
import "./Taskform.css";

function TaskForm({ onSubmit, onCancel, initialData }) {
  const [form, setForm] = useState({
    title: initialData?.title || "",
    description: initialData?.description || "",
    status: initialData?.status || "Pending",
    dueDate: initialData?.dueDate || "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <h3>{initialData ? "Edit Task" : "Add New Task"}</h3>

      <div className="field">
        <label htmlFor="title">Title</label>
        <input
          id="title"
          name="title"
          placeholder="e.g. Finish assignment 3"
          value={form.title}
          onChange={handleChange}
          required
        />
      </div>

      <div className="field">
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          name="description"
          placeholder="Add any extra details..."
          value={form.description}
          onChange={handleChange}
        />
      </div>

      <div className="field">
        <label htmlFor="status">Status</label>
        <select
          id="status"
          name="status"
          value={form.status}
          onChange={handleChange}
        >
          <option value="Pending">Pending</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>
      </div>

      <div className="field">
        <label htmlFor="dueDate">Due date</label>
        <input
          id="dueDate"
          type="date"
          name="dueDate"
          value={form.dueDate}
          onChange={handleChange}
        />
      </div>

      <div className="task-form-actions">
        <button type="submit" className="btn-save">
          {initialData ? "Update Task" : "Save Task"}
        </button>
        <button type="button" className="btn-cancel" onClick={onCancel}>
          Cancel
        </button>
      </div>
    </form>
  );
}

export default TaskForm;
