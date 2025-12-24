import { useEffect, useState } from "react";
import io from "socket.io-client";

// Cambia esto por tu URL de backend desplegado luego
const socket = io.connect("http://localhost:3001");

export const useChat = () => {
  const [messages, setMessages] = useState([]);
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  const [isJoined, setIsJoined] = useState(false);

  useEffect(() => {
    socket.on("receive_message", (data) => {
      setMessages((prev) => [...prev, data]);
    });

    socket.on("load_history", (history) => {
      setMessages(history);
    });

    return () => socket.off();
  }, []);

  const joinRoom = (user, roomName) => {
    if (user && roomName) {
      setUsername(user);
      setRoom(roomName);
      socket.emit("join_room", roomName);
      setIsJoined(true);
    }
  };

  const sendMessage = (text) => {
    if (text.trim()) {
      const messageData = {
        room,
        user: username,
        text,
        time: new Date(),
      };
      socket.emit("send_message", messageData);
    }
  };

  return { messages, username, room, isJoined, joinRoom, sendMessage };
};
