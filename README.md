<div align=center>
<img src="./client/public/android-chrome-192x192.png" alt="Logo" />
</div>

# Toucan — A Full-Stack Social Media Platform

[![MIT License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![Build](https://github.com/solobarine/toucan/actions/workflows/build.yml/badge.svg)](https://github.com/solobarine/toucan/actions)
[![Powered by Phoenix](https://img.shields.io/badge/backend-Phoenix-orange.svg)](https://phoenixframework.org)
[![Powered by React](https://img.shields.io/badge/frontend-React-blue.svg)](https://reactjs.org)
[![Deployed on Fly.io](https://img.shields.io/badge/deployment-Fly.io-purple)](https://fly.io)

**Toucan** is a modern, full-stack social media application built using **React**, **TypeScript**, and **Elixir Phoenix**. Designed to deliver real-time, highly interactive social experiences, Toucan enables users to create and engage with content, communicate privately, and personalize their experience in a seamless, scalable environment.

Toucan aims to serve as a foundation for a privacy-respecting, feature-rich social media experience tailored for real-time user interaction.

## 📸 Screenshots

| Feed View                     | Chat View                     | Post Creation                               |
| ----------------------------- | ----------------------------- | ------------------------------------------- |
| ![Feed](screenshots/feed.png) | ![Chat](screenshots/chat.png) | ![Create Post](screenshots/create-post.png) |

## 🧰 Tech Stack

### 🖥 Frontend

- [React](https://react.dev/) with [TypeScript](https://www.typescriptlang.org/)
- Tailwind CSS (customizable themes)
- Redux Toolkit for state management
- Vite (based on your setup)

### 🔧 Backend

- [Elixir Phoenix](https://www.phoenixframework.org/) (API + Channels)
- [Ecto](https://hexdocs.pm/ecto/) for data layer
- [Guardian](https://hexdocs.pm/guardian/) for JWT authentication
- [Waffle](https://hexdocs.pm/waffle/) for media uploads (local + S3)
- PostgreSQL database

## ✨ Features

### 🔐 Authentication

- Sign up, login, and JWT-based token management
- Auto-generated usernames for user convenience
- OAuth integration in progress (Google, Apple)

### 📝 Posts

- Create, edit, and delete posts with media attachments
- Like, comment, and repost functionality

### 🧵 Feed

- Personalized feed sorted by:
  - Engagement (likes, comments, reposts)
  - Recency
  - Friend/follower relationship

### 💬 Real-time Messaging

- One-to-one private chat built from scratch using Phoenix Channels
- Real-time message delivery with typing indicators (in progress)

### 🛎 Notifications

- Real-time in-app notifications when users are liked, followed, or mentioned
- Phoenix PubSub-based channel broadcasting for notification delivery

### 🧑‍🤝‍🧑 Groups (Upcoming)

- Group post sharing
- Real-time group chat channels

### 🎨 Themes

- Light and dark mode toggle
- Stored per user preference

### 📷 Media Uploads

- Upload and associate images with posts and profiles using Waffle
- Support for local uploads in development, S3 in production

### 🔍 Search (Planned)

- User and post search functionality using Postgres full-text search

---

## 🧪 Testing

- Backend tested with **ExUnit**

---

## 🚀 Getting Started

### Backend (Phoenix API)

```bash
# Install dependencies
mix deps.get

# Setup the database
mix ecto.setup

# Start the server
mix phx.server
```

### Client (React)

```bash
# Install dependencies
npm install

# Start the development server
npm run dev
```

## 📊 Monitoring & Observability (Planned)

- Integration with Prometheus and Grafana for system metrics
- Real-time event logging with Kafka + Phoenix Microservices architecture

## 📬 Contact

- Email: solobarine@gmail.com

- LinkedIn: [Solomon Akpuru](https://linkedin.com/in/solomon-akpuru)

- Website: [Portfolio Website](https://solobarine.netlify.app)

## 🌟 Star This Project

If you find Toucan inspiring or useful, feel free to star the repository to support its development!

## 📄 License

MIT © Solomon Akpuru

<div align=right>
<img src="./client/public/android-chrome-192x192.png" width=80 alt="Logo" />
</div>
