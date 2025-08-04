<div align=center>
<img src="./client/public/android-chrome-192x192.png" alt="Logo" />
</div>

# Toucan — A Full-Stack Social Media Platform

[![MIT License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![Build](https://github.com/solobarine/toucan/actions/workflows/build.yml/badge.svg)](https://github.com/solobarine/toucan/actions)
[![Powered by Phoenix](https://img.shields.io/badge/backend-Phoenix-orange.svg)](https://phoenixframework.org)
[![Powered by React](https://img.shields.io/badge/frontend-React-blue.svg)](https://reactjs.org)
[![Deployed on Fly.io](https://img.shields.io/badge/deployment-Fly.io-purple)](https://fly.io)

**Toucan** is a modern, full-stack social media application built with React, TypeScript, and Elixir Phoenix. Designed for real-time, highly interactive communication, Toucan enables users to create and engage with posts, hold private one-on-one chats, and personalize their social experience within a seamless and scalable platform.

What sets Toucan apart is its intentional shift away from the aggressive engagement algorithms found in mainstream platforms. Instead of optimizing for virality and endless reach, Toucan focuses on genuine, meaningful interactions within your personal network. It prioritizes closeness over clout, helping users stay connected to their circle without the pressure to go viral or chase metrics.

Toucan empowers users to:

- Share and interact with content in real-time

- Communicate privately through direct chat channels

- Experience a non-invasive, privacy-respecting feed

- Build and explore social circles in a low-noise, user-first environment

By design, Toucan fosters healthier online communities by opting out of hyper-targeted feeds and shifting the focus toward quality over quantity in social interaction. It’s not about being seen by everyone — it’s about being seen by the right people.

## 📸 Screenshots

### Feed View

![Feed](https://i.postimg.cc/YSx60mb5/feed.avif)

### Chat View

![Chat](https://i.postimg.cc/k5CN7yFN/chats.avif)

### User Profile

![Profile](https://i.postimg.cc/MpVbkLRK/profile.avif)

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
- [Oban](https://hexdocs.pm/oban) for background jobs
- PostgreSQL database

## ✨ Features

### 🔐 Authentication

- Sign up, login, and JWT-based token management
- Auto-generated usernames for user convenience
- OAuth integration (Google, GitHub)
- Email Verification (upcoming)

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
- Real-time message delivery
- Typing indicators (in progress)

### 🛎 Notifications

- Real-time in-app notifications when users are liked, followed, or mentioned
- Phoenix PubSub-based channel broadcasting for notification delivery
- Notifications creation via background jobs
- Email Notifications (upcoming)

### 🧑‍🤝‍🧑 Groups (Upcoming)

- Group post sharing
- Real-time group chat channels

### 🎨 Themes

- Light and dark mode toggle
- Stored per user preference

### 📷 Media Uploads

- Upload and associate images with posts and profiles using Waffle
- Support for local uploads in development, S3 in production (upcoming)

### 🚫 User Blocks and Content Reporting

- Report harmful content
- Block users posting harmful content

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

Click [here](./LICENSE.md) to view Toucan's License

<div align=right>
<img src="./client/public/android-chrome-192x192.png" width=80 alt="Logo" />
</div>
