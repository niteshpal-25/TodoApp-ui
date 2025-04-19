import React, { useState } from "react";
import '../styles/CalenderHoliday.css'

function CalenderHoliday() {
  const [task, setTask] = useState("");
  const [date, setDate] = useState("");
  const [tasks, setTasks] = useState([]);
  const [monthOffset, setMonthOffset] = useState(0); // 0 = current month

  const addTask = (e) => {
    e.preventDefault();
    if (task && date) {
      setTasks([...tasks, { task, date }]);
      setTask("");
      setDate("");
    }
  };

  const getMonthYear = (offset) => {
    const today = new Date();
    const currentMonth = today.getMonth() + offset;
    const year = today.getFullYear() + Math.floor(currentMonth / 12);
    const month = ((currentMonth % 12) + 12) % 12; // Ensures positive month
    const monthName = new Date(year, month).toLocaleString("default", {
      month: "long",
    });
    return `${monthName} ${year}`;
  };

  const goToNextMonth = () => {
    setMonthOffset(monthOffset + 1);
  };

  const goToPreviousMonth = () => {
    setMonthOffset(monthOffset - 1);
  };

  return (
    <div className="app">
      <h2>{getMonthYear(monthOffset)}</h2>
      <div className="controls">
        <button onClick={goToPreviousMonth}>Prev</button>
        <button onClick={goToNextMonth}>Next</button>
      </div>

      <div className="calendar">{generateCalendar(tasks, monthOffset)}</div>
    </div>
  );
}

// Modified to accept monthOffset
const generateCalendar = (tasks, monthOffset) => {
  const today = new Date();
  const currentMonth = today.getMonth() + monthOffset;
  const year = today.getFullYear() + Math.floor(currentMonth / 12);
  const month = ((currentMonth % 12) + 12) % 12; // Always get positive month
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDayOfMonth = new Date(year, month, 1).getDay();

  let calendar = [];

  // Add weekday headers
  const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  calendar.push(
    <div className="weekday-header" key="weekdays">
      {weekdays.map((day, index) => (
        <div className="weekday" key={index}>
          {day}
        </div>
      ))}
    </div>
  );

  // Add empty cells for days before the 1st of the month
  for (let i = 0; i < firstDayOfMonth; i++) {
    calendar.push(<div className="day empty" key={`empty-${i}`}></div>);
  }

  // Add days of the month
  for (let day = 1; day <= daysInMonth; day++) {
    const dateStr = `${year}-${String(month + 1).padStart(2, "0")}-${String(
      day
    ).padStart(2, "0")}`;
    const dayTasks = tasks.filter((t) => t.date === dateStr);

    calendar.push(
      <div className="day" key={day}>
        <div className="date">{day}</div>
        <div className="tasks">
          {dayTasks.length > 0 ? (
            dayTasks.map((t, index) => (
              <div key={index} className="task">
                {t.task}
              </div>
            ))
          ) : (
            <div className="no-tasks">No tasks</div>
          )}
        </div>
      </div>
    );
  }
  return calendar;
};

export default CalenderHoliday;