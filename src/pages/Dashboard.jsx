function Dashboard() {
  return (
    <div className="dashboard">

      <div className="dashboard-header">
        <div>
          <h1>Dashboard</h1>
          <p>Here’s an overview of your tasks.</p>
        </div>

        <button className="add-task-btn">
          + Add Task
        </button>
      </div>

      <div className="stats-container">

        <div className="stat-card">
          <p>Total Tasks</p>
          <h2>8</h2>
        </div>

        <div className="stat-card">
          <p>Pending</p>
          <h2>3</h2>
        </div>

        <div className="stat-card">
          <p>In Progress</p>
          <h2>2</h2>
        </div>

        <div className="stat-card">
          <p>Completed</p>
          <h2>3</h2>
        </div>

      </div>

    </div>
  );
}

export default Dashboard;