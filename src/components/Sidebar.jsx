import './Sidebar.css';
import { useNavigate } from "react-router-dom";

function Sidebar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    localStorage.removeItem("userId");
    navigate("/login");
  };

  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <h2>TaskFlow</h2>
      </div>

      <nav className="sidebar-menu">
        <button className="menu-item active">Dashboard</button>
        <button className="menu-item">My Tasks</button>
        <button className="menu-item">Calendar</button>
        <button className="menu-item">Completed</button>
      </nav>

      <div className="sidebar-bottom">
        <button className="menu-item" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;