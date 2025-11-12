# GetSetAI Training Platform - Architecture

## System Overview

GetSetAI is a full-stack training platform built as a Single Page Application (SPA) using Next.js 16's App Router. The architecture follows modern React patterns with TypeScript for type safety and Tailwind CSS for styling.

## Architecture Diagram

```
┌─────────────────────────────────────────────────────────┐
│                    Client (Browser)                      │
│  ┌────────────────────────────────────────────────────┐ │
│  │            React Components (Next.js)               │ │
│  │  ┌──────────┐  ┌──────────┐  ┌─────────────────┐  │ │
│  │  │  Admin   │  │ Learner  │  │      HR         │  │ │
│  │  │  Portal  │  │  Portal  │  │    Portal       │  │ │
│  │  └──────────┘  └──────────┘  └─────────────────┘  │ │
│  │           │           │               │            │ │
│  │           └───────────┴───────────────┘            │ │
│  │                      │                             │ │
│  │           ┌──────────▼──────────┐                  │ │
│  │           │   App Context API   │                  │ │
│  │           │  (Global State)     │                  │ │
│  │           └──────────┬──────────┘                  │ │
│  │                      │                             │ │
│  │           ┌──────────▼──────────┐                  │ │
│  │           │  LocalStorage API   │                  │ │
│  │           │  (Mock Persistence) │                  │ │
│  │           └─────────────────────┘                  │ │
│  └────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────┘
```

## Technology Stack

### Frontend
- **Framework**: Next.js 16.0.1
  - App Router for file-based routing
  - React 19.2.0 with Server Components
  - Automatic code splitting
- **Language**: TypeScript 5
  - Strict type checking
  - Interface-driven development
- **Styling**: Tailwind CSS 4
  - PostCSS for processing
  - Custom theme with CSS variables
  - Responsive design utilities
- **Icons**: Lucide React 0.553.0
  - Tree-shakeable icon library
  - Consistent design system

### State Management
- **React Context API**
  - Global app state (current role, user)
  - Provider wraps entire app
  - Hook-based consumption (`useApp`)

### Data Layer
- **Mock Data** (`lib/mockData.ts`)
  - Comprehensive sample datasets
  - Realistic compliance scenarios
- **LocalStorage** (`lib/storage.ts`)
  - Browser-based persistence
  - Role preferences
  - Quiz attempts tracking
  - Progress state (future)

## Component Architecture

### Component Hierarchy

```
RootLayout (app/layout.tsx)
├── AppProvider (Context)
│   └── Header (Navigation)
│       └── Main Content
│           ├── Home Page
│           ├── Admin Portal
│           │   ├── Upload
│           │   ├── Generate
│           │   ├── Review
│           │   └── Analytics
│           ├── Learner Portal
│           │   ├── Dashboard
│           │   └── Lesson/[id]
│           └── HR Portal
│               └── Compliance
```

### Component Types

#### 1. Page Components (`app/**/*.tsx`)
- Route-level components
- Data fetching (currently mock)
- Layout composition
- User interaction handlers

#### 2. UI Primitives (`components/ui/`)
- Reusable, generic components
- Prop-based customization
- Variant support (colors, sizes)
- Examples: Button, Card, Input, Badge, ProgressBar

#### 3. Feature Components (`components/`)
- Domain-specific logic
- Composition of primitives
- Examples: TagInput, Header

#### 4. Layout Components (`components/layout/`)
- Page structure
- Navigation
- Header with role switcher

## Data Flow

### 1. User Role Management

```
User selects role in Header
    ↓
setCurrentRole() updates Context
    ↓
storage.setCurrentRole() persists to LocalStorage
    ↓
Context re-renders consumers with new role
    ↓
Navigation menu updates based on role
```

### 2. Admin Course Creation Flow

```
1. Upload Document
   ↓ (File + Tags)
2. Mock "AI Processing"
   ↓ (2s delay)
3. Navigate to Generate
   ↓ (Display mock module)
4. Navigate to Review
   ↓ (Approve/Regenerate blocks)
5. Publish
   ↓ (Module marked as published)
6. Navigate to Analytics
```

### 3. Learner Quiz Submission

```
User answers questions
    ↓
Validate all answered
    ↓
Calculate score (correct/total * 100)
    ↓
Check passing threshold (70%)
    ↓
Display feedback:
  - Pass: Congratulations + return to dashboard
  - Fail: Retry option + HR alert banner
    ↓
(Optional) Increment attempts in LocalStorage
```

## Routing Structure

Next.js App Router uses file-system-based routing:

```
/                           → app/page.tsx
/admin/upload               → app/admin/upload/page.tsx
/admin/generate             → app/admin/generate/page.tsx
/admin/review               → app/admin/review/page.tsx
/admin/analytics            → app/admin/analytics/page.tsx
/learn/dashboard            → app/learn/dashboard/page.tsx
/learn/lesson/[lessonId]    → app/learn/lesson/[lessonId]/page.tsx
/hr/compliance              → app/hr/compliance/page.tsx
```

### Dynamic Routes
- `/learn/lesson/[lessonId]` - Dynamic lesson ID parameter
- Future: `/learn/module/[moduleId]`, `/admin/edit/[id]`

## Styling Architecture

### Theme System

**CSS Variables** (`app/globals.css`):
```css
:root {
  --background: #0a0a0a;
  --foreground: #ffffff;
  --primary: #0070F3;
  --success: #10B981;
  --error: #EF4444;
  --warning: #F59E0B;
}
```

**Tailwind Integration**:
```css
@theme inline {
  --color-primary: var(--primary);
  --color-success: var(--success);
  ...
}
```

### Glassmorphism Effects

**Utility Classes**:
```css
.glass {
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.glass-strong {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(16px);
  border: 1px solid rgba(255, 255, 255, 0.15);
}
```

### Responsive Design

Tailwind breakpoints:
- `sm`: 640px
- `md`: 768px
- `lg`: 1024px
- `xl`: 1280px
- `2xl`: 1536px

Example usage:
```tsx
<div className="flex flex-col md:flex-row lg:grid-cols-3">
```

## Type System

### Core Interfaces

**Module**:
```typescript
interface Module {
  id: string;
  title: string;
  description: string;
  lessons: Lesson[];
  status: 'draft' | 'published';
  tags: string[];
  createdAt: string;
  publishedAt?: string;
}
```

**Lesson**:
```typescript
interface Lesson {
  id: string;
  title: string;
  type: 'video' | 'slides';
  contentUrl: string;
  duration: number;
  quiz: Quiz;
  order: number;
}
```

**Quiz**:
```typescript
interface Quiz {
  id: string;
  title: string;
  questions: QuizQuestion[];
  passingScore: number;
}
```

Full type definitions: `lib/types.ts`

## State Management Strategy

### Global State (Context)
- Current user role (admin/learner/hr)
- Current user info (name, email, role)
- Persisted to LocalStorage

### Local State (useState)
- Form inputs
- UI toggles (modals, dropdowns)
- Transient data (file uploads)

### Server State (Future)
- API responses
- Database queries
- Use React Query or SWR

## Performance Considerations

### Code Splitting
- Automatic route-based splitting by Next.js
- Dynamic imports for heavy components
- Lazy loading icons

### Optimization Strategies
1. **Minimize Bundle Size**
   - Tree-shaking (Lucide icons)
   - No unused dependencies
2. **Image Optimization**
   - Use Next.js `<Image>` component (when added)
   - WebP format
3. **Caching**
   - Static assets cached by CDN
   - API responses cached (future)

## Security Architecture

### Current (Mock) Implementation
- No authentication
- Client-side only
- LocalStorage for preferences (non-sensitive)

### Production Requirements
1. **Authentication**
   - NextAuth.js with JWT
   - OAuth providers (Google, Microsoft)
2. **Authorization**
   - Role-based access control (RBAC)
   - API route protection
3. **Data Validation**
   - Zod schemas
   - Server-side validation
4. **API Security**
   - Rate limiting
   - CORS configuration
   - CSRF tokens

## Deployment Architecture

### Vercel (Recommended)
```
User Request
    ↓
Vercel Edge Network (CDN)
    ↓
Next.js Serverless Functions
    ↓
Static Assets / API Routes
    ↓
(Future) Database / External APIs
```

### Docker
```dockerfile
# Build stage
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Production stage
FROM node:20-alpine
WORKDIR /app
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./
EXPOSE 3000
CMD ["npm", "start"]
```

## Future Architecture Enhancements

### Backend API
```
Next.js Frontend → API Routes (Node.js/Python)
                      ↓
                  PostgreSQL Database
                      ↓
                  OpenAI API (Course Generation)
                  SendGrid (Email Notifications)
                  S3/Cloudinary (File Storage)
```

### Microservices (Scale)
- **Auth Service**: User authentication
- **Course Service**: Module CRUD operations
- **Quiz Service**: Quiz generation & grading
- **Analytics Service**: Performance tracking
- **Notification Service**: Email/SMS alerts

### Real-time Features
- WebSockets for live notifications
- Server-Sent Events for progress updates
- Redis for session management

## Error Handling Strategy

### Current
- Try-catch blocks in async functions
- Console logging
- User-facing error messages

### Production
- Global error boundary (React)
- Centralized error logging (Sentry)
- User-friendly error pages
- Retry mechanisms for API calls

## Testing Strategy (Future)

### Unit Tests
- Vitest for component tests
- React Testing Library
- Coverage target: 80%+

### Integration Tests
- Playwright for E2E
- Test user workflows
- CI/CD integration

### Accessibility Tests
- axe-core for a11y
- WCAG AA compliance

## Monitoring & Observability (Future)

- **Performance**: Vercel Analytics, Web Vitals
- **Errors**: Sentry
- **Logs**: DataDog, LogRocket
- **Uptime**: UptimeRobot

---

**Last Updated**: 2025-01-12
