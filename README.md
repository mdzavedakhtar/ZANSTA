<div align="center">

  # ⚡ NEXORA
  ### *The Next-Gen Developer Collaboration & Software Agency Platform*

  [![React](https://img.shields.io/badge/React-18.x-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://reactjs.org/)
  [![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
  [![Node.js](https://img.shields.io/badge/Node.js-18.x-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)](https://nodejs.org/)
  [![Express](https://img.shields.io/badge/Express.js-4.x-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
  [![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
  [![Socket.io](https://img.shields.io/badge/Socket.IO-Realtime-010101?style=for-the-badge&logo=socketdotio&logoColor=white)](https://socket.io/)
  [![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.x-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
  [![License](https://img.shields.io/badge/License-MIT-blue.svg?style=for-the-badge)](LICENSE)

  <p align="center">
    <strong>Build Together. Ship Together. Scale Faster.</strong><br/>
    A full-stack, enterprise-grade collaboration workspace combining the precision of <b>Linear</b>, telemetry of <b>GitHub</b>, visual aesthetics of <b>Vercel</b>, and studio client management into one seamless ecosystem.
  </p>

  [🌐 Live Demo](#-quick-start-guide) • [✨ Key Features](#-key-features-showcase) • [🏗️ Architecture](#-system-architecture) • [🛠️ Tech Stack](#%EF%B8%8F-tech-stack--ecosystem) • [👨‍💻 Author](#-developer--author-portfolio)

</div>

---

## 🌟 Overview & Highlights

**NEXORA** is engineered for high-performing software development teams and agency studios. It bridges the gap between internal developer workflows (Kanban PM, code telemetry, real-time sync) and client-facing portals (project showcases, proposal tracking, and live feedback).

```
╔══════════════════════════════════════════════════════════════════════════════╗
║                          ⚡ NEXORA ECOSYSTEM ⚡                              ║
╠══════════════════════════════════════════════════════════════════════════════╣
║  [ Public Platform ]   ⟶   [ Team Workspace ]   ⟶   [ Client Portal ]   ║
║   • Studio Portfolio        • Linear PM Board        • Progress Metrics   ║
║   • Case Study Gallery      • GitHub Code Stream     • Interactive Demos  ║
║   • Interactive Showcase    • Socket.IO Live Sync    • Milestone Approvals║
╚══════════════════════════════════════════════════════════════════════════════╝
```

---

## ✨ Key Features Showcase

### 🎨 1. Cinematic Portfolio & Public Platform
* **Glassmorphic Hero & Navigation**: Smooth micro-interactions, dark mode aesthetics, dynamic hero workflow breakdown, and team showcase grid.
* **Agency Portfolio Hub (`/projects`)**: Agency-grade project gallery with category filtering (`Healthcare SaaS`, `Developer Tool / AI`, `FinTech Platform`), cover visuals, status badges, tech stack pills, and live demo links.
* **Case Study Engine (`/projects/:slug`)**: In-depth client case study layout with sticky section navigation, executive summary, problem-vs-solution narrative, system architecture breakdown, and screenshot galleries.

### 📊 2. Workspace & Linear-Style PM
* **Workspace Dashboard (`/dashboard`)**: Linear-style metrics overview displaying active projects, team size, pending sprint tasks, and real-time telemetry feed.
* **Kanban PM Board (`/projects/:id/tasks`)**: 5-column Kanban board (`BACKLOG`, `TODO`, `IN_PROGRESS`, `REVIEW`, `DONE`), task priority badges (`LOW`, `MEDIUM`, `HIGH`, `URGENT`), assignment dropdowns, and modal controls.
* **Command Palette (`Cmd+K` / `Ctrl+K`)**: Quick jump navigation across workspaces, projects, tasks, and system actions.

### ⚡ 3. Real-Time Collaboration (Socket.IO)
* **Live Workspace Telemetry**: Socket.IO room broadcasting for task updates, member presence, and activity feeds without manual refresh.
* **Task Comments & `@mentions`**: Live discussion drawers with `@mention` auto-completion, author avatars, and push notifications.
* **Notification Center**: Interactive topbar notification drawer with unread counters and deep-links.

### 🐙 4. GitHub Code Stream Integration
* **Developer Code Telemetry (`/projects/:id/code`)**: Connected repository header showing stars, forks, active branches (`main`, `dev`, `feature/*`), commit hashes (`+142 -18` diffs), pull requests (`OPEN`, `MERGED`), and issue leaderboards.

### 🏢 5. Client Portal & Agency Studio Gateway
* **Client Dashboard (`/client`)**: Dedicated stakeholder portal showing project build progress (`85%`), milestone timelines, latest deployments (`v1.4.2-rc3`), and feedback submission.
* **Shareable Client Demos (`/demo/:token`)**: Passcode-protected, expiration-enabled public demo links for external stakeholders.
* **Agency Command Center (`/agency`)**: Agency lead intake pipeline (`NEW` ➔ `REVIEWING` ➔ `PROPOSAL` ➔ `IN_PROGRESS`), revenue metrics, and proposal contract checklists.

---

## 🏗️ System Architecture

```
NEXORA FULL-STACK ARCHITECTURE
├── client/ (Frontend - React 18 + Vite + TypeScript + Tailwind CSS)
│   ├── src/components/   # UI Design System, Modals, Linear-style Controls
│   ├── src/pages/        # Public Showcase, Workspaces, Client & Agency Hubs
│   ├── src/store/        # Zustand Stores (Auth, Projects, GitHub, Realtime Sync)
│   ├── src/services/     # Axios REST Client & Socket.IO Gateway Connections
│   └── src/styles/       # Tailwind Config & Glassmorphic CSS System
│
└── server/ (Backend - Node.js + Express + TypeScript + MongoDB + Socket.IO)
    ├── src/config/       # MongoDB Atlas & Environment Configuration
    ├── src/models/       # Mongoose Schemas (User, Project, Task, File, Activity, Leads)
    ├── src/controllers/  # Business Logic & Database Controllers
    ├── src/middleware/   # JWT Auth Guard, RBAC Enforcement & Helmet Security
    └── src/sockets/      # Socket.IO Event Handlers & Room Telemetry
```

---

## 🛠️ Tech Stack & Ecosystem

### **Frontend**
| Technology | Description |
|---|---|
| **React 18** | UI Library with concurrent rendering |
| **TypeScript** | Type-safe architecture |
| **Vite** | Lightning-fast build tool & dev server |
| **Tailwind CSS** | Custom glassmorphic styling & utility design system |
| **Framer Motion** | Micro-animations & layout transitions |
| **Zustand** | Lightweight, predictable state management |
| **Lucide Icons** | Modern icon set |

### **Backend**
| Technology | Description |
|---|---|
| **Node.js & Express** | Scalable event-driven REST API server |
| **TypeScript** | Strict end-to-end backend typing |
| **MongoDB & Mongoose** | NoSQL Document database for workspaces & projects |
| **Socket.IO** | Bi-directional real-time WebSocket communication |
| **JWT & Bcrypt** | Token authentication & password hashing (12 rounds) |
| **Helmet & CORS** | Production-ready HTTP security headers |

---

## ⚙️ Environment Configuration

<details>
<summary><b>Click to expand environment file templates</b></summary>

### Backend Setup (`server/.env`)
```env
PORT=5000
NODE_ENV=development
CLIENT_URL=http://localhost:5173
APP_URL=http://localhost:5173
MONGO_URI=mongodb://127.0.0.1:27017/nexora
JWT_SECRET=nexora_jwt_super_secret_key_2026
JWT_EXPIRES_IN=7d
GITHUB_CLIENT_ID=your_github_client_id
GITHUB_CLIENT_SECRET=your_github_client_secret
```

### Frontend Setup (`client/.env`)
```env
VITE_API_BASE_URL=http://localhost:5000/api/v1
VITE_SOCKET_URL=http://localhost:5000
VITE_APP_NAME=NEXORA
```
</details>

---

## 🚀 Quick Start Guide

### Prerequisites
* **Node.js** >= 18.0.0
* **npm** >= 9.0.0
* **MongoDB** (Local or MongoDB Atlas)

### Step-by-Step Installation

```bash
# 1. Clone the repository
git clone https://github.com/mdzavedakhtar/ZANSTA.git
cd ZANSTA

# 2. Install Server Dependencies
cd server
npm install

# 3. Install Client Dependencies
cd ../client
npm install

# 4. Run Backend Development Server (Terminal 1)
cd ../server
npm run dev

# 5. Run Frontend Client (Terminal 2)
cd ../client
npm run dev
```

Visit `http://localhost:5173` to explore **NEXORA** locally!

---

## 🧪 Build & Quality Verification

```bash
# Verify Frontend Type-Check & Production Build
cd client
npx tsc --noEmit
npm run build

# Verify Backend Type-Check & Production Build
cd ../server
npx tsc --noEmit
npm run build
```

---

## 👨‍💻 Developer / Author Portfolio

<div align="center">

  ### **Md Zaved Akhtar**
  *Full-Stack Engineer & Software Architect*

  [![GitHub](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/mdzavedakhtar)
  [![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://linkedin.com)
  [![Portfolio](https://img.shields.io/badge/Portfolio-FF5722?style=for-the-badge&logo=googlechrome&logoColor=white)](https://github.com/mdzavedakhtar)

  *Crafted with passion, clean code principles, and modern web aesthetics.*

</div>

---

## 📄 License

This project is open-source under the [MIT License](LICENSE). Built for developers and agencies worldwide.
