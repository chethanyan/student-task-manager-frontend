import './Sidebar.css';
import { NavLink, useNavigate } from "react-router-dom";

const NAV_ITEMS = [
  { label: "Dashboard", icon: "📊", to: "/" },
  { label: "My Tasks", icon: "🗒️", to: "/tasks" },
  { label: "Calendar", icon: "📅", to: "/calendar" },
  { label: "Completed", icon: "✅", to: "/completed" },
];

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
      <div className="sidebar-brand">
        <span className="brand-icon">🧭</span>
        <h1>TaskFlow</h1>
      </div>

      <nav className="sidebar-nav">
        {NAV_ITEMS.map((item) => (
          <NavLink
            key={item.label}
            to={item.to}
            end={item.to === "/"}
            className={({ isActive }) => `nav-item${isActive ? " active" : ""}`}
          >
            <span className="nav-icon">{item.icon}</span>
            {item.label}
          </NavLink>
        ))}
      </nav>

      <div className="sidebar-footer">
        <button className="nav-item" onClick={handleLogout}>
          <span className="nav-icon">🚪</span>
          Logout
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;