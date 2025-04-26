import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComment, faTimes, faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/Chatbot.css";

const Chatbot = () => {
  const [showChatbot, setShowChatbot] = useState(false);
  const [chatMessages, setChatMessages] = useState([
    { sender: "bot", text: "Hello! How can I assist you with your todos today?" },
  ]);
  const [userMessage, setUserMessage] = useState("");
  const [error, setError] = useState("");

  // Handle sending a message
  const handleSendMessage = async () => {
    if (!userMessage.trim()) {
      setError("Please enter a message.");
      return;
    }

    // Add user message to chat
    const newMessages = [...chatMessages, { sender: "user", text: userMessage }];
    setChatMessages(newMessages);
    setUserMessage("");
    setError(""); // Clear previous errors

    // Call backend API
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No authentication token found. Please log in.");
      }

      const response = await fetch("http://127.0.0.1:8080/process_text", {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // Required for JSON payload
        },
        body: JSON.stringify({ token, text: userMessage }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          `Failed to get chatbot response: ${JSON.stringify(errorData.detail)}`
        );
      }

      const data = await response.json();
      let botMessage = data.result;
      if (data.result ===  "Created: Todo...") {
        const d = data.details;
        botMessage =
          `Created a new todo:\n` +
          `•Title: ${d.title}\n` +
          `•Description: ${d.description}\n` +
          `•Status: ${d.status}\n` +
          `•Priority: ${d.priority}`;
      }
      if (data.result ===  "Updated: Todo...") {
        const d = data.details;
        botMessage =
          `Updated todo:\n` +
          `•Title: ${d.title}\n` +
          `•Description: ${d.description}\n` +
          `•Status: ${d.status}\n` +
          `•Priority: ${d.priority}`;
      }
      if (data.result ===  "Deleted: Todo...") {
        const d = data.details;
        botMessage = `Deleted todo: ${d.title}`;
      }
      setChatMessages([...newMessages, { sender: "bot", text: botMessage }]);
    } catch (err) {
      setError(`Error: ${err.message}`);
      setChatMessages([
        ...newMessages,
        { sender: "bot", text: "Sorry, something went wrong. Try again later." },
      ]);
      console.error(err);
    }
  };

  // Handle Enter key press
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  return (
    <div className="chatbot-container">
      {/* Chatbot Toggle Button */}
      <button
        className="chatbot-toggle btn btn-primary rounded-circle d-flex justify-content-center align-items-center"
        onClick={() => setShowChatbot(!showChatbot)}
        title="Chat with Assistant"
      >
        <FontAwesomeIcon icon={showChatbot ? faTimes : faComment} size="lg" />
      </button>

      {/* Chatbot Window */}
      {showChatbot && (
        <div className="chatbot-window card shadow-lg">
          <div className="card-header bg-primary text-white d-flex justify-content-between align-items-center">
            <h5 className="mb-0">Todo Assistant</h5>
            <button
              className="btn btn-sm btn-light"
              onClick={() => setShowChatbot(false)}
            >
              <FontAwesomeIcon icon={faTimes} />
            </button>
          </div>
          <div className="card-body chatbot-messages">
            {error && <p className="text-danger">{error}</p>}
            {chatMessages.map((msg, index) => (
              <div
                key={index}
                className={`message mb-2 ${
                  msg.sender === "user" ? "text-end" : "text-start"
                }`}
              >
                <span
                  className={`d-inline-block p-2 rounded ${
                    msg.sender === "user"
                      ? "bg-primary text-white"
                      : "bg-light text-dark"
                  }`}
                  style={{ whiteSpace: "pre-line" }}
                >
                  {msg.text}
                </span>
              </div>
            ))}
          </div>
          <div className="card-footer">
            <div className="input-group">
              <input
                type="text"
                className="form-control"
                placeholder="Type a message..."
                value={userMessage}
                onChange={(e) => setUserMessage(e.target.value)}
                onKeyPress={handleKeyPress}
              />
              <button className="btn btn-primary" onClick={handleSendMessage}>
                <FontAwesomeIcon icon={faPaperPlane} />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chatbot;