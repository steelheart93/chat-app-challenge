require("dotenv").config();
const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());

const server = http.createServer(app);

// Configuración de Socket.io
const io = new Server(server, {
  cors: {
    origin: "*", // En producción, pon la URL de tu frontend
    methods: ["GET", "POST"],
  },
});

// Conexión a MongoDB (Usa tu string de conexión de Atlas)
mongoose
  .connect(process.env.MONGO_URI || "mongodb://localhost:27017/chatdb")
  .then(() => console.log("DB Conectada"))
  .catch((err) => console.log(err));

// Esquema simple para persistencia
const MessageSchema = new mongoose.Schema({
  user: String,
  text: String,
  room: String,
  time: { type: Date, default: Date.now },
});
const Message = mongoose.model("Message", MessageSchema);

io.on("connection", (socket) => {
  console.log(`Usuario conectado: ${socket.id}`);

  // Unirse a una sala
  socket.on("join_room", async (room) => {
    socket.join(room);
    // Cargar historial de mensajes (últimos 50)
    const history = await Message.find({ room }).sort({ time: 1 }).limit(50);
    socket.emit("load_history", history);
  });

  // Enviar mensaje
  socket.on("send_message", async (data) => {
    const newMessage = new Message(data);
    await newMessage.save();
    // Emitir a todos en la sala (incluyendo al remitente para confirmación visual)
    io.to(data.room).emit("receive_message", data);
  });

  socket.on("disconnect", () => {
    console.log("Usuario desconectado", socket.id);
  });
});

server.listen(3001, () => {
  console.log("Servidor corriendo en puerto 3001");
});
