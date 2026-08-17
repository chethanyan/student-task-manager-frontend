import { useMemo, useState } from "react";
import { useTasks } from "../hooks/useTasks";
import "./Dashboard.css";
import "./Calendar.css";

const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

function toDateKey(date) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

function Calendar() {
  const { tasks, loading, error } = useTasks();
  const [cursor, setCursor] = useState(() => {
    const now = new Date();
    return new Date(now.getFullYear(), now.getMonth(), 1);
  });
  const [selectedDate, setSelectedDate] = useState(null);

  const tasksByDate = useMemo(() => {
    const map = {};
    tasks.forEach((t) => {
      if (!t.dueDate) return;
      const key = t.dueDate.slice(0, 10);
      if (!map[key]) map[key] = [];
      map[key].push(t);
    });
    return map;
  }, [tasks]);

  const year = cursor.getFullYear();
  const month = cursor.getMonth();
  const startWeekday = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const cells = [];
  for (let i = 0; i < startWeekday; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(new Date(year, month, d));

  const todayKey = toDateKey(new Date());
  const monthLabel = cursor.toLocaleString("default", {
    month: "long",
    year: "numeric",
  });

  const goPrev = () => setCursor(new Date(year, month - 1, 1));
  const goNext = () => setCursor(new Date(year, month + 1, 1));
  const goToday = () => {
    const now = new Date();
    setCursor(new Date(now.getFullYear(), now.getMonth(), 1));
    setSelectedDate(toDateKey(now));
  };

  const selectedTasks = selectedDate ? tasksByDate[selectedDate] || [] : [];

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <div>
          <h1>Calendar</h1>
          <p className="subtitle">See what's due, day by day.</p>
        </div>
      </div>

      {error && <p style={{ color: "#dc2626", marginBottom: 20 }}>{error}</p>}

      <div className="calendar-toolbar">
        <button className="calendar-nav-btn" onClick={goPrev}>
          ‹ Prev
        </button>
        <h3>{monthLabel}</h3>
        <button className="calendar-nav-btn" onClick={goNext}>
          Next ›
        </button>
        <button className="calendar-nav-btn calendar-today-btn" onClick={goToday}>
          Today
        </button>
      </div>

      {loading ? (
        <p className="subtitle">Loading tasks...</p>
      ) : (
        <div className="calendar-grid">
          {WEEKDAYS.map((w) => (
            <div key={w} className="calendar-weekday">
              {w}
            </div>
          ))}
          {cells.map((date, i) => {
            if (!date) {
              return <div key={`empty-${i}`} className="calendar-cell empty" />;
            }
            const key = toDateKey(date);
            const dayTasks = tasksByDate[key] || [];
            const isToday = key === todayKey;
            const isSelected = key === selectedDate;
            return (
              <button
                key={key}
                className={`calendar-cell${isToday ? " today" : ""}${
                  isSelected ? " selected" : ""
                }`}
                onClick={() => setSelectedDate(key === selectedDate ? null : key)}
              >
                <span className="cell-date">{date.getDate()}</span>
                {dayTasks.slice(0, 2).map((t) => (
                  <span key={t.id} className="cell-task">
                    {t.title}
                  </span>
                ))}
                {dayTasks.length > 2 && (
                  <span className="cell-more">+{dayTasks.length - 2} more</span>
                )}
              </button>
            );
          })}
        </div>
      )}

      {selectedDate && (
        <div className="calendar-agenda">
          <h3>Tasks due {selectedDate}</h3>
          {selectedTasks.length === 0 ? (
            <p className="subtitle">Nothing due this day.</p>
          ) : (
            <ul>
              {selectedTasks.map((t) => (
                <li key={t.id}>
                  <strong>{t.title}</strong> — {t.status}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}

export default Calendar;