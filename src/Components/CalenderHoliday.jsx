import React, { useState, useEffect } from "react";
import '../styles/CalenderHoliday.css';

function CalenderHoliday() {
  const [todos, setTodos] = useState([]);
  const [monthOffset, setMonthOffset] = useState(0); // 0 = current month
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch todos from the backend when the component mounts
  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const token = localStorage.getItem('token'); // Replace with your token retrieval method
        if (!token) {
          throw new Error('No authentication token found');
        }

        const response = await fetch("http://127.0.0.1:8000/admin/all_todos", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error(`Failed to fetch todos: ${response.statusText}`);
        }

        const data = await response.json();
        setTodos(data); // Assuming data is an array of { id, title, created_at, ... }
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchTodos();
  }, []);

  const getMonthYear = (offset) => {
    const today = new Date();
    const currentMonth = today.getMonth() + offset;
    const year = today.getFullYear() + Math.floor(currentMonth / 12);
    const month = ((currentMonth % 12) + 12) % 12;
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

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="app">
      <h2>{getMonthYear(monthOffset)}</h2>
      <div className="controls">
        <button onClick={goToPreviousMonth}>Prev</button>
        <button onClick={goToNextMonth}>Next</button>
      </div>
      <div className="calendar">{generateCalendar(todos, monthOffset)}</div>
    </div>
  );
}

const generateCalendar = (todos, monthOffset) => {
  const today = new Date();
  const currentMonth = today.getMonth() + monthOffset;
  const year = today.getFullYear() + Math.floor(currentMonth / 12);
  const month = ((currentMonth % 12) + 12) % 12;
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
    const dateStr = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    // Filter todos for the current day based on created_at
    const dayTodos = todos.filter((todo) => {
      const todoDate = new Date(todo.created_at).toISOString().split('T')[0];
      return todoDate === dateStr;
    });

    calendar.push(
      <div className="day" key={day}>
        <div className="date">{day}</div>
        <div className="tasks">
          {dayTodos.length > 0 ? (
            dayTodos.map((todo, index) => (
              <div key={index} className="task">
                {todo.title}
              </div>
            ))
          ) : (
            <div className="no-tasks">No todos</div>
          )}
        </div>
      </div>
    );
  }
  return calendar;
};

export default CalenderHoliday;