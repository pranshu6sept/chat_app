
Multi-User Messaging System


Overview
This is a real-time multi-user messaging system built with the following technologies:

Frontend: React (Vite) with Tailwind CSS
Backend: NodeJS with Express
Database: PostgreSQL with Drizzle ORM
Real-Time Communication: Socket.IO
This system allows users to sign up, log in, and participate in real-time messaging with other users. The backend API serves data to the frontend, handles user authentication, and manages database operations.

Features
Real-time Messaging: Messages are instantly sent and received using Socket.IO.
User Authentication: Sign-up and login functionality.
Chat Rooms: Users can create and join chat rooms.
Responsive Design: The UI is responsive and works on various screen sizes.
Getting Started
Prerequisites
Ensure that you have the following installed on your machine:

Node.js (v14.x or higher)
PostgreSQL (v12.x or higher)
Yarn or npm (for package management)

API Endpoints

Authentication:

POST /api/auth/signup: Sign up a new user
POST /api/auth/login: Log in an existing user

Messaging:

GET /api/messages/:roomId: Get all messages for a specific room
POST /api/messages: Send a new message

Chat Rooms:

GET /api/rooms: Get a list of all chat rooms
POST /api/rooms: Create a new chat room

Socket.IO Events
Connection: connect - Triggered when a client connects.
Join Room: join-room - Triggered when a user joins a chat room.
Leave Room: leave-room - Triggered when a user leaves a chat room.
New Message: new-message - Triggered when a new message is sent to the room.
Disconnect: disconnect - Triggered when a client disconnects.

Styling
The project uses Tailwind CSS for styling. Tailwind allows for utility-first CSS that is both flexible and easy to use within the React components.

Drizzle ORM
Drizzle ORM is used for interacting with the PostgreSQL database. It provides a simple and type-safe way to manage database operations in JavaScript/TypeScript.

License
This project is licensed under the MIT License.

