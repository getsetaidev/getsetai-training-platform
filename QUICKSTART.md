# GetSetAI Training Platform - Quick Start Guide

Get up and running with the GetSetAI platform in 5 minutes.

## Prerequisites

- Node.js 20+ installed
- npm or yarn package manager
- Modern web browser (Chrome, Firefox, Edge)

## Installation

```bash
# Navigate to project directory
cd getsetai-training-platform

# Install dependencies
npm install

# Start development server
npm run dev
```

The application will be available at [http://localhost:3000](http://localhost:3000)

## First Steps

### 1. Explore the Platform
- Open your browser to `http://localhost:3000`
- You'll land on the home page with GetSetAI branding

### 2. Switch Roles
Use the **Role dropdown** in the header (top-right) to experience different user perspectives:

#### As Admin
1. Click **Upload** in navigation
2. Drag a file (or click to browse)
3. Add tags like "KYC", "Compliance"
4. Click **Upload & Generate**
5. Follow the flow: Generate → Review → Publish

#### As Learner
1. Click **Dashboard** in navigation
2. View available modules
3. Click a module to start learning
4. Watch video and complete quiz
5. See your score and feedback

#### As HR
1. Click **Compliance** in navigation
2. View employee-module completion matrix
3. Export reports (CSV/PDF)
4. Enable auto-reminders

## Key URLs

| Route | Description |
|-------|-------------|
| `/` | Home page with stats |
| `/admin/upload` | Document upload |
| `/admin/generate` | Course preview |
| `/admin/review` | Content approval |
| `/admin/analytics` | Performance dashboard |
| `/learn/dashboard` | Learner home |
| `/learn/lesson/lesson-1-1` | Sample lesson |
| `/hr/compliance` | Compliance tracking |

## Development Commands

```bash
# Start dev server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Lint code
npm run lint

# Format code
npm run format
```

## Project Structure (Simplified)

```
getsetai-training-platform/
├── app/               # Pages (Next.js App Router)
│   ├── admin/        # Admin portal
│   ├── learn/        # Learner portal
│   ├── hr/           # HR portal
│   └── page.tsx      # Home page
├── components/        # Reusable components
│   ├── ui/           # Buttons, Cards, etc.
│   └── layout/       # Header, navigation
├── lib/              # Utilities & data
│   ├── types.ts      # TypeScript types
│   ├── mockData.ts   # Demo data
│   └── storage.ts    # localStorage utils
└── public/           # Static assets
```

## Mock Data Overview

The app uses pre-populated mock data:

- **3 Modules**: KYC Compliance, Loan Agreement, AML (draft)
- **4 Learners**: With varying progress and scores
- **2 HR Records**: Employee compliance status
- **Analytics**: Summary statistics

All data is stored in `lib/mockData.ts` and can be customized.

## Customization

### Change Theme Colors

Edit `app/globals.css`:

```css
:root {
  --primary: #0070F3;    /* Your brand color */
  --success: #10B981;    /* Success color */
  --error: #EF4444;      /* Error color */
}
```

### Add New Module

Edit `lib/mockData.ts` → `MOCK_MODULES` array:

```typescript
{
  id: 'mod-4',
  title: 'Your Module Title',
  description: 'Description here',
  status: 'published',
  tags: ['Tag1', 'Tag2'],
  lessons: [ /* ... */ ],
  // ...
}
```

### Modify Quiz Questions

Edit lesson quiz in `lib/mockData.ts`:

```typescript
quiz: {
  id: 'quiz-id',
  title: 'Quiz Title',
  passingScore: 70,  // Change threshold
  questions: [
    {
      id: 'q1',
      prompt: 'Your question?',
      options: [
        { id: 'a', text: 'Option 1', correct: true },
        // ...
      ]
    }
  ]
}
```

## Troubleshooting

### Build Errors

```bash
# Clear cache and reinstall
rm -rf .next node_modules
npm install
npm run build
```

### Port Already in Use

```bash
# Use different port
PORT=3001 npm run dev
```

### TypeScript Errors

```bash
# Check types
npx tsc --noEmit
```

## Next Steps

1. **Read Full Documentation**
   - [README.md](./README.md) - Overview & features
   - [ARCHITECTURE.md](./ARCHITECTURE.md) - System design
   - [WORKFLOWS.md](./WORKFLOWS.md) - User journeys

2. **Explore the Code**
   - Start with `app/page.tsx` (home page)
   - Look at `components/ui/` for reusable components
   - Check `lib/mockData.ts` for data structure

3. **Customize for Your Needs**
   - Replace mock data with real API calls
   - Add authentication (NextAuth.js)
   - Connect to database (PostgreSQL/Prisma)

4. **Deploy**
   - Push to GitHub
   - Deploy to Vercel: `vercel --prod`
   - Or use Docker (see README)

## Support

- **Issues**: Create GitHub issue
- **Questions**: Check documentation files
- **Demo Video**: Record screen walkthrough

## License

MIT License

---

**Happy coding!** 🚀

For detailed information, see:
- [README.md](./README.md)
- [ARCHITECTURE.md](./ARCHITECTURE.md)
- [WORKFLOWS.md](./WORKFLOWS.md)
- [PROGRESS.md](./PROGRESS.md)
