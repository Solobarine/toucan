# Toucan

Welcome to **Toucan** – the ultimate platform to stay connected with friends, family, and loved ones. Whether you're catching up, sharing moments, or simply staying in touch, **Toucan** is here to make communication easy, fun, and always within reach. Never feel alone, no matter where you are – join chat rooms, send real-time messages, and be a part of the conversation instantly.

With **Toucan**, you'll enjoy seamless, real-time chats that keep you connected to the people who matter most. Our sleek, responsive interface ensures that your communication is smooth and uninterrupted, whether you're on desktop or mobile. Say goodbye to isolation and hello to vibrant conversations that bring people together.

Start chatting today – because with **Toucan**, you're never far from the ones you care about.

## Table of Contents

1. [Features](#features)
2. [Tech Stack](#tech-stack)
3. [Getting Started](#getting-started)
4. [Installation](#installation)
5. [Running the Application](#running-the-application)
6. [API Endpoints](#api-endpoints)
7. [WebSockets and Channels](#websockets-and-channels)
8. [Database Schema](#database-schema)
9. [Environment Variables](#environment-variables)
10. [Contributing](#contributing)
11. [License](#license)

---

## Features

- **Real-time messaging**: Users can join rooms and chat with others in real-time using WebSockets.
- **User authentication**: Secure user authentication with Phoenix.
- **Chat Rooms**: Users can create or join chat rooms.
- **Message broadcasting**: Messages are broadcast to all participants in a chat room.
- **Responsive UI**: The frontend is fully responsive, built with TailwindCSS.
- **API-first architecture**: Backend exposes APIs to be consumed by the React frontend or other clients.

## Tech Stack

- **Backend**: Elixir, Phoenix Framework, WebSockets
- **Frontend**: React, TypeScript, TailwindCSS
- **Database**: PostgreSQL
- **Real-time**: Phoenix Channels & WebSockets
- **Testing**: ExUnit (Elixir), Jest (React)
- **Deployment**: Docker

## Getting Started

To get started with the chat application, follow the steps below.

### Prerequisites

Ensure you have the following installed:

- [Elixir](https://elixir-lang.org/install.html) (1.12+)
- [Phoenix](https://hexdocs.pm/phoenix/installation.html) (1.6+)
- [PostgreSQL](https://www.postgresql.org/download/)
- [Node.js](https://nodejs.org/) (v14+)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

## Installation

Follow these steps to install and set up the application.

### 1. Clone the Repository

```bash
git clone https://github.com/solobarine/toucan.git
cd toucan
```

### 2. Install Elixir Dependencies

```bash
cd backend
mix deps.get
```

### 3. Set Up the Database

Create the database using the Phoenix task:

```bash
mix ecto.create
```

### 4. Run Database Migrations

```bash
mix ecto.migrate
```

### 5. Install Node.js Dependencies (Frontend)

Navigate to the `client` directory to install frontend dependencies:

```bash
cd client
npm install
```

### 6. Compile Assets

```bash
npm run build
```

### 7. Environment Variables

Create a `.env` file in the root of the project with the following environment variables:

```
DATABASE_URL=postgres://username:password@localhost/toucan_dev
SECRET_KEY_BASE=your_secret_key
```

Source the `.env` file before running the server:

```bash
source .env
```

## Running the Application

### Run Phoenix Backend

Start the Phoenix server using the following command:

```bash
mix phx.server
```

The API will now be accessible at `http://localhost:4000`.

### Run React Frontend

In another terminal, navigate to the `client` directory and start the React development server:

```bash
cd client
npm start  # or yarn start
```

The frontend will now be running at `http://localhost:5173`.

## API Endpoints

The following API endpoints are exposed by the backend:

- **POST** `/api/users/sign_in`: User login
- **POST** `/api/users/sign_up`: User registration
- **GET** `/api/rooms`: Get list of chat rooms
- **POST** `/api/rooms`: Create a new chat room
- **GET** `/api/rooms/:id/messages`: Get messages from a room

### Example API Call (Using Curl)

```bash
curl -X POST http://localhost:4000/api/rooms      -H "Authorization: Bearer <token>"      -d '{"name": "General"}'
```

## WebSockets and Channels

Real-time functionality is powered by Phoenix Channels and WebSockets.

### Joining a Chat Room

```elixir
socket "/socket", ChatAppWeb.UserSocket

channel "room:*", ChatAppWeb.RoomChannel
```

## Database Schema

### Users Table

| Column        | Type            |
| ------------- | --------------- |
| id            | ID              |
| first_name    | String          |
| last_name     | String          |
| email         | String          |
| password      | String (Hashed) |
| date_of_birth | Date            |
| inserted_at   | Datetime        |
| updated_at    | Datetime        |

### Rooms Table

| Column      | Type     |
| ----------- | -------- |
| id          | ID       |
| name        | String   |
| inserted_at | Datetime |
| updated_at  | Datetime |

### Messages Table

| Column      | Type     |
| ----------- | -------- |
| id          | ID       |
| room_id     | ID (FK)  |
| user_id     | ID (FK)  |
| body        | String   |
| inserted_at | Datetime |

## Environment Variables

You will need the following environment variables:

- `DATABASE_URL`: Database connection string
- `SECRET_KEY_BASE`: Secret key for signing sessions
- `PORT`: Port for Phoenix server

## Contributing

Contributions are welcome! Please open a pull request with your changes and ensure all tests are passing.

### Running Tests

For backend testing:

```bash
mix test
```

For frontend testing:

```bash
npm test
```

### Code Formatting

Ensure code formatting by running:

```bash
mix format
npm run lint
```

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

