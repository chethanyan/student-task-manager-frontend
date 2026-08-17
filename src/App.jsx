import { BrowserRouter, Routes, Route, Navigate, Outlet } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";
import MyTasks from "./pages/MyTasks";
import CalendarPage from "./pages/Calendar";
import Completed from "./pages/Completed";
import Login from "./pages/Login";
import Register from "./pages/Register";
import "./App.css";

function PrivateLayout() {
  const token = localStorage.getItem("token");
  if (!token) return <Navigate to="/login" />;

  return (
    <div className="app-layout">
      <Sidebar />
      <main className="main-content">
        <Outlet />
      </main>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route element={<PrivateLayout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/tasks" element={<MyTasks />} />
          <Route path="/calendar" element={<CalendarPage />} />
          <Route path="/completed" element={<Completed />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;