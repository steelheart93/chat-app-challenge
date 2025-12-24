import React, { useState, useRef, useEffect } from "react";
import { useChat } from "./hooks/useChat";
import "./App.css"; // Aquí irá toda la magia visual

function App() {
  const { messages, username, isJoined, joinRoom, sendMessage } = useChat();

  // Estados locales para inputs
  const [userInput, setUserInput] = useState("");
  const [roomInput, setRoomInput] = useState("General");
  const [messageInput, setMessageInput] = useState("");

  // Auto-scroll al final del chat
  const chatEndRef = useRef(null);
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  if (!isJoined) {
    return (
      <div className="login-container">
        <div className="login-card">
          <h1>Bienvenido al Chat</h1>
          <input
            placeholder="Tu nombre..."
            onChange={(e) => setUserInput(e.target.value)}
          />
          <input
            placeholder="Sala (ej: Devs, Random)..."
            onChange={(e) => setRoomInput(e.target.value)}
            defaultValue="General"
          />
          <button onClick={() => joinRoom(userInput, roomInput)}>
            Ingresar
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="chat-container">
      <div className="chat-header">
        <h2>Sala: {roomInput}</h2>
        <div className="status-dot"></div>
      </div>

      <div className="chat-body">
        {messages.map((msg, index) => {
          const isMe = msg.user === username;
          return (
            <div
              key={index}
              className={`message-row ${isMe ? "my-message" : "other-message"}`}
            >
              <div className="message-content">
                <span className="sender-name">{msg.user}</span>
                <p>{msg.text}</p>
                <span className="time">
                  {new Date(msg.time).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
              </div>
            </div>
          );
        })}
        <div ref={chatEndRef} />
      </div>

      <div className="chat-footer">
        <input
          type="text"
          placeholder="Escribe un mensaje..."
          value={messageInput}
          onChange={(e) => setMessageInput(e.target.value)}
          onKeyPress={(e) =>
            e.key === "Enter" &&
            (sendMessage(messageInput), setMessageInput(""))
          }
        />
        <button
          onClick={() => {
            sendMessage(messageInput);
            setMessageInput("");
          }}
        >
          ➤
        </button>
      </div>
    </div>
  );
}

export default App;
