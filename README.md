# NEXORA — Developer/Team Collaboration & Agency Platform

> **"Build Together. Ship Together."**

NEXORA is a 2026-level, ultra-polished developer collaboration and software development agency platform. It combines the sleek micro-interactions of Linear, code-stream telemetry of GitHub, visual elegance of Vercel, workspace organization of Notion, and the client portal capabilities of top-tier software studios into a single unified full-stack ecosystem.

---

## 🌟 Key Product Features

### 1. Cinematic Public Platform & Portfolio
- **Cinematic Landing Page**: Floating glassmorphic navbar, hero video mockups, dynamic workflow breakdown, team showcase grid, interactive live demo sandbox concept, and agency vision section.
- **Agency Portfolio Hub (`/projects`)**: Agency-grade showcase gallery with category filtering (`Healthcare SaaS`, `Developer Tool / AI`, `FinTech Platform`), cover visuals, status badges, tech stack pills, team avatars, and direct demo links.
- **Case Study Pages (`/projects/:slug`)**: Premium agency case study layout featuring sticky section navigation, executive overview, problem vs. solution narrative, system architecture specs box, interface screenshot gallery, team roster, and live demo sandbox launcher.
- **SEO & Social Telemetry**: Dynamic document titles, meta descriptions, OpenGraph tags, and Twitter/X card metadata.

### 2. Authentication, RBAC & User Profiles
- **Secure Authentication**: JWT session handling, bcrypt password salt hashing (12 rounds), protected route guards (`ProtectedRoute.tsx`), and persistent local sessions.
- **Role-Based Access Control (RBAC)**: Backend-enforced permissions for `OWNER`, `ADMIN`, `MEMBER`, and `CLIENT` roles.
- **User Profile Management**: Bio, avatar uploading, technical skills pills, GitHub, and LinkedIn link editing.

### 3. Workspace & Team Management
- **Workspace Dashboard (`/dashboard`)**: Linear-style metrics grid displaying active projects, team size, pending sprint tasks, recent activity telemetry feed, and command palette integration (`Cmd+K` / `Ctrl+K`).
- **Team Roster & Role Elevation (`/workspace/team`)**: Invite member modal with 1-click token link generation (`/invite/:token`), role promotion dropdowns (`MEMBER` -> `ADMIN` -> `OWNER`), and active online presence indicators.

### 4. Project & Kanban Task Management
- **Project Workspaces (`/projects/:id`)**: Project overview with build progress indicators, custom cover images, visibility controls (`PRIVATE`, `TEAM_ONLY`, `PUBLIC`), and sub-route navigation.
- **Linear-Style Kanban PM Board (`/projects/:id/tasks`)**: 5-column Kanban board (`BACKLOG`, `TODO`, `IN_PROGRESS`, `REVIEW`, `DONE`), task priority badges (`LOW`, `MEDIUM`, `HIGH`, `URGENT`), assignment dropdowns, and create task modal.
- **Project File Hub (`/projects/:id/files`)**: Categorized file storage (`PDF`, `DOCX`, `ZIP`, `PNG`, `MP4`, `APK`), file size formatting, uploader avatars, and instant preview modal.

### 5. Real-Time Collaboration Gateway (Socket.IO)
- **Live Room Broadcasting**: Socket.IO room subscriptions (`join_workspace`, `join_project`) broadcasting real-time task updates, activity feeds, and presence pings without page refresh.
- **Task Comments & `@mentions`**: Real-time task discussion drawer supporting `@mention` auto-complete suggestions (`@Sahil`, `@Elena`, `@Marcus`), author avatars, and live notification alerts.
- **Notification Dropdown Center**: Topbar notification bell dropdown showing unread counter badge (`2`), mark-all-read triggers, and direct deep-links.

### 6. GitHub Code Stream Integration
- **GitHub OAuth Gateway**: Secure authorization flow storing connections without exposing client secrets.
- **Developer Code Stream (`/projects/:id/code`)**:
  - **Connected Repo Banner**: Repository header showing `nexora/nexora-core-platform`, connection badge, active branch dropdown (`main`, `dev`, `feature/realtime-sync`), stars, forks, and open PR count.
  - **Commits Stream**: Hash copy button (`8f9a2b1`), message, author avatar, additions/deletions stats (`+142 -18`), and timestamp.
  - **Pull Requests View**: PR numbers, branch targets (`feature/kanban-dnd → main`), status badges (`OPEN`, `MERGED`), and comment counters.
  - **Issues & Contributors**: Issue tracker with label pills (`bug`, `priority: high`) and team contribution leaderboard.

### 7. Shareable Client Demo Portals
- **Client Demo Links (`/demo/:token`)**: Owner/Admin modal generating shareable client links with optional passcode protection, expiration date (7, 30, 90 days, Never), and 1-click link copying.
- **Client Presentation Portal**: Distraction-free public portal displaying project overview, key features, screenshot gallery, tech stack, and live demo launcher while strictly hiding internal developer controls.

### 8. Client Portal & Agency Studio Platform
- **Client Portal (`/client`)**: Stakeholder dashboard displaying active client projects, overall build progress (`85%`), sprint milestones, latest deployed release (`v1.4.2-rc3`), and feedback timeline.
- **Client Feedback Gateway (`/client/projects/:id/feedback`)**: Client feedback submission form auto-dispatching team notifications.
- **Agency Studio Hub (`/agency`)**: High-end software studio command center displaying active client accounts, revenue run-rate ($113,000), lead request count, and service catalog (`Web Development`, `Mobile Development`, `AI Solutions`, `SaaS Development`, `UI/UX`, `Automation`).
- **Inbound Lead Pipeline (`/agency/requests`)**: Project lead intake management (`NEW` -> `REVIEWING` -> `PROPOSAL` -> `IN_PROGRESS` -> `COMPLETED`).
- **Proposals & Milestones (`/agency/proposals`)**: Approved proposal contracts, contract deliverables checklist, and milestone roadmaps.

---

## 🏗️ Technology Architecture

```
NEXORA SYSTEM ARCHITECTURE
│
├── client/ (Vite + React 18 + TypeScript + Tailwind CSS)
│   ├── src/components/ (UI Design System, Modals, Navigation)
│   ├── src/pages/      (Public, Workspace, Client Portal, Agency)
│   ├── src/store/      (Zustand Stores: Auth, Workspace, Projects, GitHub, Notifications, Public, Agency)
│   ├── src/services/   (REST API Fetch Client & Socket.IO Client Gateway)
│   └── src/styles/     (Glassmorphic CSS Tokens & Tailwind Config)
│
└── server/ (Node.js + Express + TypeScript + MongoDB + Socket.IO)
    ├── src/config/     (Environment Variables & Database Connection)
    ├── src/models/     (Mongoose Schemas: User, Workspace, Project, Task, File, Activity, Notification, ClientLink, Feedback, Request)
    ├── src/controllers/(Controller Logic with MongoDB + Fallback In-Memory Engine)
    ├── src/middleware/ (Auth JWT Guard, RBAC Authorization, Helmet Security, Global Error Handler)
    ├── src/routes/     (Express Router Matrix mounted under /api/v1)
    └── src/sockets/    (Socket.IO Room Gateway & Telemetry Broadcasts)
```

---

## 🛠️ Tech Stack & Dependencies

- **Frontend**: React 18, TypeScript, Vite, Tailwind CSS, Framer Motion, Lucide React Icons, Zustand, React Router DOM v6, TanStack Query v5.
- **Backend**: Node.js, Express, TypeScript, Mongoose (MongoDB Atlas), Socket.IO, bcryptjs, jsonwebtoken, Helmet, CORS, Morgan, Zod.

---

## ⚙️ Environment Variables

### Server (`server/.env`)
```env
PORT=5000
NODE_ENV=development
CLIENT_URL=http://localhost:5173
APP_URL=http://localhost:5173
MONGO_URI=mongodb://127.0.0.1:27017/nexora
JWT_SECRET=nexora_jwt_super_secret_key_2026
JWT_EXPIRES_IN=7d
GITHUB_CLIENT_ID=mock_github_client_id
GITHUB_CLIENT_SECRET=mock_github_client_secret
```

### Client (`client/.env`)
```env
VITE_API_BASE_URL=http://localhost:5000/api/v1
VITE_SOCKET_URL=http://localhost:5000
VITE_APP_NAME=NEXORA
```

---

## 🚀 Quick Start Guide

### Prerequisites
- Node.js >= 18.0.0
- npm >= 9.0.0

### Installation & Development

```bash
# 1. Install Dependencies in Server
cd server
npm install

# 2. Install Dependencies in Client
cd ../client
npm install

# 3. Start Backend Server (Terminal 1)
cd ../server
npm run dev

# 4. Start Frontend Client (Terminal 2)
cd ../client
npm run dev
```

Open `http://localhost:5173` in your browser to experience NEXORA!

---

## 🧪 Build & Production Verification

```bash
# Verify Client Production Build
cd client
npx tsc --noEmit
npm run build

# Verify Server Production Build
cd ../server
npx tsc --noEmit
npm run build
```

---

## 📄 License & Attribution

Designed and engineered by the **NEXORA Engineering Team**. All rights reserved.
