# 💬 Real-Time Chat Application | Full Stack Challenge

![Status](https://img.shields.io/badge/Status-Completed-success)
![Stack](https://img.shields.io/badge/Stack-MERN-blue)

Una aplicación de chat en tiempo real desarrollada desde cero como parte de una prueba técnica. El objetivo principal fue construir una solución robusta, escalable y estéticamente agradable **sin depender de librerías de componentes de UI (como Bootstrap, MUI o Tailwind)**, demostrando dominio puro de CSS y arquitectura en React.

🔗 **[VER DEMO EN VIVO AQUÍ](PON_AQUI_TU_LINK_DE_VERCEL_O_NETLIFY)**

## 🚀 Características Principales

- **Arquitectura Limpia:** Separación de lógica y vista mediante **Custom Hooks** (`useChat`).
- **Comunicación en Tiempo Real:** Implementación de WebSockets bidireccionales con **Socket.io**.
- **Persistencia de Datos:** Historial de mensajes almacenado en **MongoDB Atlas**.
- **Diseño UI/UX Personalizado:**
  - Estilo "Glassmorphism" moderno.
  - Diseño totalmente **Responsivo** (Mobile First approach).
  - Feedback visual inmediato (carga de mensajes, estado de conexión).
- **Multisala:** Los usuarios pueden crear o unirse a diferentes salas temáticas dinámicamente.

## 🛠️ Stack Tecnológico

### Frontend
- **React (Vite):** Para un renderizado rápido y eficiente.
- **CSS3 Puro:** Uso de variables CSS (`:root`), Flexbox y Media Queries para el diseño responsivo sin frameworks.
- **Socket.io-client:** Para la gestión de eventos en tiempo real.

### Backend
- **Node.js & Express:** Servidor REST y manejo de conexiones.
- **Socket.io:** Gestión de eventos de WebSocket (`join_room`, `send_message`, `typing`).
- **MongoDB & Mongoose:** Base de datos NoSQL para almacenamiento flexible de historiales de chat.

## 📂 Estructura del Proyecto

El repositorio está organizado como un monorepo simple:

```bash
/
├── client/         # Frontend React Application
│   ├── src/
│   │   ├── hooks/  # Lógica de negocio (useChat.js)
│   │   └── ...
├── server/         # Backend Node/Express API
│   ├── models/     # Esquemas de Mongoose
│   └── index.js    # Entry point y configuración de Sockets
└── README.md

```

## 🔧 Instalación y Ejecución Local

Sigue estos pasos para correr el proyecto en tu máquina local.

### Prerrequisitos

* Node.js (v14 o superior)
* Una instancia de MongoDB (Local o Atlas)

### 1. Configuración del Backend

```bash
cd server
npm install

```

Crea un archivo `.env` en la carpeta `server` con tu string de conexión:

```env
MONGO_URI=mongodb+srv://<usuario>:<password>@cluster.mongodb.net/chatdb
PORT=3001

```

Ejecuta el servidor:

```bash
npm start
# El servidor correrá en http://localhost:3001

```

### 2. Configuración del Frontend

Abre una nueva terminal:

```bash
cd client
npm install

```

*Nota: Asegúrate de que las variables de entorno o la configuración de Socket apunten al puerto 3001.*

Ejecuta el cliente:

```bash
npm run dev
# Abre el navegador en la URL que indique Vite (usualmente http://localhost:5173)

```

## 💡 Decisiones de Diseño (Highlight Técnico)

1. **Custom Hook (`useChat`):**
Para evitar ensuciar los componentes visuales con lógica de WebSockets, abstraje toda la conexión, emisión y recepción de eventos en un hook personalizado. Esto hace que el componente `App.jsx` sea puramente presentacional, desacoplado y fácil de mantener.
2. **CSS vs Librerías:**
Para cumplir estrictamente con el requerimiento de "no usar librerías de UI", construí un sistema de diseño propio basado en variables CSS y módulos. Esto demuestra capacidad para manipular el DOM y los estilos sin depender de herramientas como Bootstrap, garantizando un código más ligero y control total sobre el renderizado.
3. **Persistencia Eficiente:**
Al entrar a una sala, el backend recupera los últimos 50 mensajes para optimizar la carga inicial (evitando latencia innecesaria), delegando la carga histórica masiva a futuras implementaciones de paginación si el proyecto escalara.

## 📝 Próximos Pasos (Mejoras Futuras)

Si tuviera más tiempo para iterar sobre este MVP, añadiría:

* [ ] Indicador de "Escribiendo..." (Typing indicator).
* [ ] Autenticación simple (aunque el reto pedía sin registro, para persistencia de perfil).
* [ ] Notificaciones Push.
* [ ] Soporte para envío de imágenes y emojis.

---

**Desarrollado por Stiven Muñoz Murillo** - *Full Stack Developer*