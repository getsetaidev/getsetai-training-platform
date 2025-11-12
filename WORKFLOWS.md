# GetSetAI Training Platform - Workflows

Complete user journeys and system workflows for the GetSetAI platform.

## Table of Contents

1. [Admin Workflows](#admin-workflows)
2. [Learner Workflows](#learner-workflows)
3. [HR Workflows](#hr-workflows)
4. [System Workflows](#system-workflows)

---

## Admin Workflows

### 1. Document Upload & Course Generation

**Goal**: Upload a compliance document and generate a training module

**Prerequisites**: 
- User has Admin role selected
- Compliance document ready (PDF, DOC, DOCX, TXT)

**Steps**:

1. **Navigate to Upload**
   - Click "Upload" in the header navigation
   - Or navigate directly to `/admin/upload`

2. **Upload Document**
   - **Option A**: Drag and drop file onto the drop zone
   - **Option B**: Click the drop zone to open file picker
   - Supported formats: PDF, DOC, DOCX, TXT (max 50MB)
   - File name and size display after selection

3. **Add Tags**
   - Click in the tag input field
   - Type tag name (e.g., "KYC", "Compliance", "Legal")
   - Press `Enter` to add tag
   - Press `Backspace` to remove last tag
   - Maximum 5 tags allowed
   - Tags appear as blue pills with × button

4. **Initiate Upload**
   - Click "Upload & Generate" button
   - Button disabled if:
     - No file selected
     - No tags added
   - Loading state shows spinner + "Uploading..." text

5. **Processing**
   - Upload completes after ~2 seconds
   - Success screen shows:
     - Green checkmark icon
     - "Upload Complete!" message
     - "Processing your document..." text
     - Spinner animation
   - Auto-redirects to Generate page after 1.5 seconds

6. **Review Generated Course**
   - Lands on `/admin/generate`
   - See [Course Preview & Editing](#2-course-preview--editing)

**Error Handling**:
- File too large: Alert shown
- Network error: Retry option
- Invalid file type: Error message

---

### 2. Course Preview & Editing

**Goal**: Review AI-generated course structure before publishing

**Context**: Arrives after document upload or navigates to `/admin/generate`

**UI Layout**:
- **Left Sidebar**: Stepper showing progress (Upload → Generate → Review → Publish)
- **Main Area**: Course preview with multiple sections

**Sections**:

#### A. Module Overview Card
- **Title**: Auto-generated (e.g., "KYC Compliance Fundamentals")
- **Description**: Summary of module content
- **Badge**: Number of lessons
- **Tags**: Visual pills showing categorization

#### B. Video Lesson Preview
- **Video Player**: Embedded HTML5 video with controls
- **Title**: Lesson name (e.g., "Introduction to KYC")
- **Description**: Brief summary
- **Button**: "Preview Lesson" (outline variant)

#### C. Quiz Preview
- **Sample Question**: First question from the quiz
- **Options**: First 2 answer choices displayed
- **Badge**: Total question count (e.g., "3 Questions")

#### D. Course Roadmap (Timeline)
- **Vertical timeline** with connecting line
- Each lesson shows:
  - Icon (Video or BookOpen)
  - Title
  - Duration badge (e.g., "8 min")
  - Description
- Blue dots mark each item

**Actions**:
- **Back Button**: Returns to Upload page
- **Continue to Review Button**: Proceeds to Review screen

**Navigation Flow**:
```
← Back to /admin/upload
→ Continue to /admin/review
```

---

### 3. Content Review & Approval

**Goal**: Approve or regenerate AI-generated content blocks

**Prerequisites**: Course has been generated

**UI Sections**:

#### A. Content Blocks List
Each block shows:
- **Title**: e.g., "KYC Module 1: Introduction Slides"
- **Meta**: e.g., "25 slides generated", "8 min video"
- **Status**: Pending (default) | Approved | Regenerate
- **Actions**: Two toggle buttons

**Approve/Regenerate Toggles**:
- **Approve Button**:
  - Inactive: Gray background, gray text
  - Active: Green background (green-500/20), green text, green border
  - Icon: CheckCircle
- **Regenerate Button**:
  - Inactive: Gray background, gray text
  - Active: Yellow background (yellow-500/20), yellow text, yellow border
  - Icon: RefreshCw

**Interaction**:
- Click either button to toggle status
- Only one can be active per block
- All blocks must be Approved or Regenerated (no Pending)

#### B. Admin Notes
- **Text Area**: Multi-line input for review notes
- **Placeholder**: "Add notes about the review process..."
- **Optional field**

**Actions**:
- **Back to Generate**: Returns to preview page
- **Publish Module**: 
  - Disabled if any block is "Pending"
  - Enabled when all blocks Approved/Regenerated
  - Navigates to Analytics dashboard on success

**Validation**:
```javascript
publishDisabled = blocks.some(b => b.status === 'pending')
```

---

### 4. Analytics Dashboard

**Goal**: Monitor learner performance and identify issues

**UI Sections**:

#### A. Summary Statistics (Grid of 4 Cards)
1. **Total Learners**
   - Value: Number (e.g., 42)
   - Icon: Users (blue)
2. **Active Learners**
   - Value: Number (e.g., 38)
   - Icon: TrendingUp (green)
3. **Avg Score**
   - Value: Percentage (e.g., 78.3%)
   - Icon: Award (purple)
4. **Flagged Learners**
   - Value: Number (e.g., 2)
   - Icon: AlertCircle (red)

#### B. Action Buttons
- **Export Report**: Download analytics data
- **Notify HR**: Send alerts to HR
- **Regenerate Module**: Recreate course content

#### C. Learner Performance Table
Columns:
- **Name**: Full name + email
- **Progress**: Badge (not-started | in-progress | completed)
  - Not Started: Gray
  - In Progress: Yellow
  - Completed: Green
- **Avg Score**: Percentage with color coding
  - ≥70%: Green
  - <70%: Red
- **Flags**: Badge showing count or "None"
  - Has flags: Red badge with count
  - No flags: Gray text

**Sorting** (Future):
- Click column headers to sort
- Ascending/descending toggles

**Filtering** (Future):
- Filter by progress status
- Filter by score range
- Search by name

---

## Learner Workflows

### 1. Viewing Dashboard

**Goal**: See assigned modules and current progress

**Navigation**: Header → "Dashboard" or direct to `/learn/dashboard`

**UI Sections**:

#### A. Profile Card
- **Avatar**: Circular icon with user initials
- **Name**: e.g., "Welcome back, Sarah Johnson!"
- **Email**: User email address
- **Badge**: "Active" status

#### B. Continue Learning (Current Module)
- **Card**: Large glass card with highlighted module
- **Title**: Module name
- **Description**: Brief summary
- **Progress Bar**: Visual indicator (e.g., 50%)
- **Text**: "1 of 2 lessons completed"
- **CTA**: "Continue Lesson" button with Play icon

#### C. My Modules (Grid View)
Each module card shows:
- **Title**: Module name
- **Status Icon**:
  - In Progress: Clock icon (yellow)
  - Completed: CheckCircle icon (green)
- **Description**: Summary text
- **Tags**: Category pills
- **Progress Bar**: Completion percentage
- **Stats**: "X lessons" + Score (if > 0)
- **Button**: "Start Module" or "Continue"

**Interactions**:
- Click module card: Navigate to first incomplete lesson
- Click "Continue Lesson": Go to specific lesson

---

### 2. Taking a Lesson

**Goal**: Complete a video/slide lesson and pass the quiz

**Navigation**: Click module from dashboard

**UI Layout** (Split View):

#### Left Side: Content
- **Header**: Lesson Progress card
  - Text: "Lesson Progress"
  - Badge: "1 of 2" (current/total)
  - Progress bar
- **Lesson Card**:
  - Title: Lesson name
  - Description: Summary
  - **Video Player** (if type='video'):
    - HTML5 video with controls
    - Play, pause, volume, fullscreen
  - **Slides** (if type='slides'):
    - Placeholder: "Slide content would appear here"

#### Right Side: Quiz
- **Title**: Quiz name (e.g., "KYC Fundamentals Quiz")
- **Questions**: Numbered list
  - Question text
  - Radio button options
  - Hover effect on option cards
- **Footer**:
  - Passing score display (e.g., "Passing score: 70%")
  - Submit button

**Quiz Interaction**:
1. Learner selects one option per question
2. Options highlighted on hover
3. Submit button enabled when all answered
4. Click "Submit Quiz"

**Submission Flow**:
```
1. Validate all questions answered
2. Calculate score: (correct / total) × 100
3. Check if score ≥ passing threshold (70%)
4. Navigate to feedback screen
```

---

### 3. Viewing Feedback

**Goal**: See quiz results and next steps

**Context**: After submitting quiz

**Pass Scenario (Score ≥ 70%)**:
- **Icon**: Green CheckCircle (large, 64px)
- **Title**: "Score: [X]%"
- **Message**: "Congratulations! You passed the quiz."
- **Button**: "Back to Dashboard" (primary blue)

**Fail Scenario (Score < 70%)**:
- **Icon**: Red XCircle (large, 64px)
- **Title**: "Score: [X]%"
- **Message**: "Score below passing threshold. Please review the lesson and try again."
- **Buttons**:
  - "Retry Quiz" (outline): Resets quiz
  - "Review Lesson" (primary): Returns to lesson

**HR Alert Banner (Score < 70%)**:
- **Background**: Red transparent (red-500/10)
- **Border**: Red (red-500/30)
- **Icon**: AlertCircle (red)
- **Title**: "HR Notification Sent"
- **Text**: "Due to low performance, your manager has been notified to provide additional support."

**Retry Logic**:
- Click "Retry Quiz": Clears answers, returns to quiz
- Attempts tracked in localStorage (future)

---

## HR Workflows

### 1. Compliance Tracking

**Goal**: Monitor employee training completion across modules

**Navigation**: Header → "Compliance" or `/hr/compliance`

**UI Sections**:

#### A. Actions Bar
- **Left**: Export buttons
  - "Export CSV": Download CSV file
  - "Export PDF": Download PDF report
- **Right**: Reminder controls
  - Checkbox: "Auto-reminders"
  - Button: "Send Reminders"

#### B. Compliance Matrix (Table)
**Columns**:
- **Employee**: Name + email
- **Module 1, Module 2, ...**: One column per published module
- **Overall**: Compliance percentage

**Cell Content**:
- **Completed**: 
  - Green CheckCircle icon
  - Score percentage (if available)
- **Incomplete**:
  - Yellow AlertCircle icon
  - Due date (if set)
- **Not Assigned**: Gray dash (−)

**Overall Badge**:
- ≥80%: Green badge ("success")
- 50-79%: Yellow badge ("warning")
- <50%: Red badge ("error")

#### C. Summary Stats (3 Cards)
1. **Total Employees**: Count of all records
2. **Fully Compliant**: Count where overall = 100%
3. **Need Follow-up**: Count where overall < 80%

**Export Functionality**:
```
Export CSV: Generates compliance_report_YYYY-MM-DD.csv
Export PDF: Generates compliance_report_YYYY-MM-DD.pdf
```

**Reminder Flow**:
1. Enable "Auto-reminders" checkbox
2. System schedules daily checks (future)
3. Manual: Click "Send Reminders"
4. Alert shown: "Reminders sent to [X] employees"

---

## System Workflows

### 1. Role Switching

**Goal**: Allow demo users to experience different roles

**Trigger**: User selects role from header dropdown

**Flow**:
```
1. User clicks role dropdown in header
2. Dropdown shows: Admin | Learner | HR
3. User selects new role
4. Context updates:
   - setCurrentRole(newRole)
   - storage.setCurrentRole(newRole)
   - currentUser updates based on role
5. Navigation menu re-renders:
   - Admin: Upload, Generate, Review, Analytics
   - Learner: Dashboard
   - HR: Compliance
6. Page content updates if needed
```

**Persistence**:
- Role saved to localStorage
- Restored on page refresh
- Key: `getsetai_current_role`

---

### 2. Mock AI Processing

**Goal**: Simulate document processing and course generation

**Trigger**: Admin uploads document

**Steps**:
```
1. User uploads file + tags
2. setIsUploading(true)
3. Simulate API call:
   await new Promise(resolve => setTimeout(resolve, 2000))
4. setIsUploading(false)
5. setUploadComplete(true)
6. Show success screen (1.5s)
7. Navigate to /admin/generate
```

**Data Flow**:
- File not actually uploaded (client-side only)
- Mock module data pulled from MOCK_MODULES
- Tags stored temporarily (not persisted)

---

### 3. Quiz Grading

**Goal**: Calculate score and determine pass/fail

**Trigger**: Learner submits quiz

**Algorithm**:
```javascript
let correct = 0;
lesson.quiz.questions.forEach((q) => {
  const correctOption = q.options.find(o => o.correct);
  if (answers[q.id] === correctOption?.id) {
    correct++;
  }
});
const score = Math.round((correct / lesson.quiz.questions.length) * 100);
```

**Thresholds**:
- **Passing**: score ≥ 70%
- **HR Alert**: score < 70%

**Actions**:
- Pass: Show success, navigate to dashboard
- Fail: Show retry option + HR alert banner

---

### 4. LocalStorage Persistence

**Goal**: Persist user preferences across sessions

**Stored Data**:
```javascript
{
  "getsetai_current_role": "admin" | "learner" | "hr",
  "getsetai_learner_progress": {
    "[learnerId]-[moduleId]": { ... }
  },
  "getsetai_quiz_attempts": {
    "[learnerId]-[quizId]": attemptCount
  }
}
```

**Operations**:
- **Get**: `storage.get(key, defaultValue)`
- **Set**: `storage.set(key, value)`
- **Remove**: `storage.remove(key)`
- **Clear**: `storage.clear()`

**Error Handling**:
- Try-catch blocks
- Falls back to default values
- Console warnings logged

---

## Error Scenarios

### Upload Failures
- **File too large**: Alert + clear file
- **Invalid format**: Error message below input
- **Network error**: Retry button shown

### Navigation Errors
- **Invalid lesson ID**: "Lesson not found" message
- **Missing data**: Redirect to home

### Quiz Errors
- **Incomplete answers**: Submit button disabled
- **Calculation error**: Default to 0% score

---

**Last Updated**: 2025-01-12
