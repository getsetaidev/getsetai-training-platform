# GetSetAI Training Platform 🚀

> AI-powered compliance training and course generation platform

![GetSetAI](https://img.shields.io/badge/GetSetAI-Training-0070F3?style=for-the-badge)
![Next.js](https://img.shields.io/badge/Next.js-16-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript)
![Tailwind](https://img.shields.io/badge/Tailwind-4-38bdf8?style=for-the-badge&logo=tailwind-css)

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Design System](#design-system)
- [Deployment](#deployment)

## 🎯 Overview

GetSetAI automates compliance training by converting documents into structured, interactive courses. Built with Next.js 16 and TypeScript, it features a modern dark theme with glassmorphism effects and serves three user roles: Admin, Learner, and HR.

## ✨ Features

### For Administrators
- 📤 **Document Upload**: Drag-and-drop for PDF, DOC, DOCX, TXT files
- 🤖 **AI Course Generation**: Auto-create lessons, videos, and quizzes
- ✅ **Content Review**: Approve/regenerate AI content before publishing
- 📊 **Analytics Dashboard**: Track learner performance and flags
- 🔔 **Automated Alerts**: Notify HR of low-performing learners

### For Learners
- 🎓 **Personal Dashboard**: Progress tracking across modules
- 🎬 **Interactive Lessons**: Video/slide content with quizzes
- ⚡ **Real-time Feedback**: Instant scoring and adaptive responses
- 📈 **Progress Tracking**: Visual completion indicators

### For HR
- 📋 **Compliance Matrix**: Employee-module completion grid
- 📥 **Export Reports**: CSV/PDF downloads
- ⏰ **Auto-reminders**: Configure scheduled notifications
- 🚩 **Performance Flags**: Identify struggling employees

## 🛠 Tech Stack

| Category | Technology |
|----------|------------|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript 5 |
| Styling | Tailwind CSS 4 |
| Icons | Lucide React |
| State | React Context API |
| Storage | LocalStorage (mock) |
| Linting | Biome |

## 📦 Installation

```bash
# Clone repository
cd getsetai-training-platform

# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

## 🚀 Usage

### Quick Start

1. **Switch Roles**: Use the header dropdown to toggle between Admin, Learner, and HR views
2. **Admin Flow**: Upload → Generate → Review → Publish
3. **Learner Flow**: Dashboard → Lesson → Quiz → Feedback
4. **HR Flow**: View compliance matrix → Export reports

### Admin: Create Training Module

```
1. /admin/upload → Drag document + add tags → Upload
2. /admin/generate → Review AI preview → Continue
3. /admin/review → Approve blocks → Publish
4. /admin/analytics → Monitor learner progress
```

### Learner: Complete Lesson

```
1. /learn/dashboard → Select module
2. /learn/lesson/[id] → Watch video + take quiz
3. Submit → View score + feedback
4. Pass (≥70%) → Dashboard | Fail (<70%) → Retry + HR alert
```

### HR: Track Compliance

```
1. /hr/compliance → View employee-module matrix
2. Export CSV/PDF reports
3. Enable auto-reminders
```

## 📁 Project Structure

```
getsetai-training-platform/
├── app/
│   ├── admin/          # Admin portal (upload, generate, review, analytics)
│   ├── learn/          # Learner portal (dashboard, lessons)
│   ├── hr/             # HR portal (compliance tracking)
│   ├── layout.tsx      # Root layout + header
│   ├── page.tsx        # Home page
│   └── globals.css     # Theme + styles
├── components/
│   ├── ui/             # Button, Card, Input, Badge, ProgressBar, Modal, Spinner
│   ├── layout/         # Header
│   └── TagInput.tsx    # Tag management
├── lib/
│   ├── types.ts        # TypeScript interfaces
│   ├── mockData.ts     # Demo data
│   ├── storage.ts      # LocalStorage utils
│   └── context/        # App state (AppContext.tsx)
└── public/             # Static assets
```

## 🎨 Design System

### Color Palette
```css
Primary:   #0070F3 (Electric Blue)
Success:   #10B981 (Green)
Error:     #EF4444 (Red)
Warning:   #F59E0B (Yellow)
Background: #0a0a0a (Near Black)
Surface:   #1f2937, #374151 (Dark Grays)
Text:      #ffffff (White), #9ca3af (Gray)
```

### Glassmorphism
- `.glass` — Subtle frosted effect (5% white opacity, 10px blur)
- `.glass-strong` — Prominent effect (10% white opacity, 16px blur)

### Typography
- **Font**: Inter (weights: 400, 500, 600, 700)
- **Scale**: Tailwind default (sm → 5xl)

### Components
- **Buttons**: 5 variants (primary, secondary, outline, ghost, danger)
- **Cards**: Glassmorphism support, hover effects
- **Badges**: 5 variants (default, success, warning, error, info)
- **ProgressBar**: 3 sizes, optional label
- **Inputs**: Label, error state, focus ring

## 🌐 Deployment

### Vercel (Recommended)

```bash
npm i -g vercel
vercel
```

### Docker

```dockerfile
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

### Environment Variables (Production)

```env
NEXT_PUBLIC_API_URL=https://api.getsetai.com
DATABASE_URL=postgresql://...
OPENAI_API_KEY=sk-...
SMTP_HOST=smtp.sendgrid.net
```

## 📊 Mock Data

The app uses comprehensive mock data:
- **Modules**: 3 modules (2 published, 1 draft)
- **Learners**: 4 learners with varying progress
- **Content Blocks**: Pre-generated slides, videos, quizzes
- **HR Records**: 3 employees with compliance status

## 🔒 Security Notes

- Mock implementation uses localStorage (not production-ready)
- No authentication implemented (add NextAuth.js)
- No server-side validation (add API routes)
- No rate limiting (add middleware)

## 🚧 Future Enhancements

- [ ] Backend API (Node.js/Python)
- [ ] OpenAI integration
- [ ] Authentication (NextAuth.js)
- [ ] Database (PostgreSQL + Prisma)
- [ ] Email notifications (Resend)
- [ ] Charts (Recharts/Chart.js)
- [ ] Mobile app (React Native)
- [ ] i18n support
- [ ] WCAG AA compliance

## 📄 License

MIT License

## 📧 Contact

For questions: admin@getsetai.com

---

**Built with ❤️ using Next.js, TypeScript, and Tailwind CSS**
