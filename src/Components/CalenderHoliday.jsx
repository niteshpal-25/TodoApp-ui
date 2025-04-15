import React, { useState } from "react";
import '../styles/CalenderHoliday.css'

function CalenderHoliday() {
  const [task, setTask] = useState("");
  const [date, setDate] = useState("");
  // const [tasks, setTasks] = useState([]);
  const [tasks, setTasks] = useState([
    { task: "Buy groceries", date: "2025-04-15" },
    { task: "Doctor appointment", date: "2025-04-18" },
    { task: "Team meeting", date: "2025-04-20" },
    { task: "Yoga class", date: "2025-04-22" },
    { task: "Pay electricity bill", date: "2025-04-25" },
    { task: "Weekend trip", date: "2025-04-27" },
    { task: "Friend’s birthday", date: "2025-04-30" },
    { task: "Submit project report", date: "2025-02-05" },
    { task: "Parent-teacher meeting", date: "2025-02-08" },
    { task: "Dinner with friends", date: "2025-02-12" },
    { task: "Valentine's Day", date: "2025-02-14" },
    { task: "Monthly review meeting", date: "2025-02-20" },
    { task: "Car service appointment", date: "2025-02-23" },
    { task: "Book club session", date: "2025-02-28" },
    { task: "Team building event", date: "2025-03-03" },
    { task: "Dentist appointment", date: "2025-03-07" },
    { task: "Buy new laptop", date: "2025-03-10" },
    { task: "Friend’s wedding", date: "2025-03-15" },
    { task: "Pay rent", date: "2025-03-01" },
    { task: "Client presentation", date: "2025-03-21" },
    { task: "Go hiking", date: "2025-03-30" },
  ]);
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

  let calendar = [];
  for (let day = 1; day <= daysInMonth; day++) {
    const dateStr = `${year}-${String(month + 1).padStart(2, "0")}-${String(
      day
    ).padStart(2, "0")}`;
    const dayTasks = tasks.filter((t) => t.date === dateStr);

    calendar.push(
      <div className="day" key={day}>
        <div className="date">{day}</div>
        <div className="tasks">
          {dayTasks.map((t, index) => (
            <div key={index} className="task">
              {t.task}
            </div>
          ))}
        </div>
      </div>
    );
  }
  return calendar;
};

export default CalenderHoliday;