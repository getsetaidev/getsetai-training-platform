import type {
  Module,
  Learner,
  ContentBlock,
  AnalyticsSummary,
  HRComplianceRecord,
  UploadedDocument,
  AdminReview,
} from './types';

export const MOCK_MODULES: Module[] = [
  {
    id: 'mod-1',
    title: 'KYC Compliance Fundamentals',
    description: 'Complete guide to Know Your Customer regulations and best practices',
    status: 'published',
    tags: ['KYC', 'Compliance', 'Legal'],
    createdAt: '2025-01-05T10:00:00Z',
    publishedAt: '2025-01-06T14:30:00Z',
    lessons: [
      {
        id: 'lesson-1-1',
        title: 'Introduction to KYC',
        description: 'Understanding the fundamentals of KYC regulations',
        type: 'video',
        contentUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
        duration: 8,
        order: 1,
        quiz: {
          id: 'quiz-1-1',
          title: 'KYC Fundamentals Quiz',
          passingScore: 70,
          questions: [
            {
              id: 'q1',
              prompt: 'What does KYC stand for?',
              options: [
                { id: 'q1-a', text: 'Know Your Customer', correct: true },
                { id: 'q1-b', text: 'Keep Your Cash', correct: false },
                { id: 'q1-c', text: 'Know Your Company', correct: false },
                { id: 'q1-d', text: 'Key Your Code', correct: false },
              ],
            },
            {
              id: 'q2',
              prompt: 'Which document is typically required for KYC verification?',
              options: [
                { id: 'q2-a', text: 'Government-issued ID', correct: true },
                { id: 'q2-b', text: 'Library card', correct: false },
                { id: 'q2-c', text: 'Gym membership', correct: false },
                { id: 'q2-d', text: 'Store loyalty card', correct: false },
              ],
            },
            {
              id: 'q3',
              prompt: 'Why is KYC important for financial institutions?',
              options: [
                { id: 'q3-a', text: 'Prevents money laundering and fraud', correct: true },
                { id: 'q3-b', text: 'Increases paperwork', correct: false },
                { id: 'q3-c', text: 'Makes banking slower', correct: false },
                { id: 'q3-d', text: 'None of the above', correct: false },
              ],
            },
          ],
        },
      },
      {
        id: 'lesson-1-2',
        title: 'Document Verification Process',
        description: 'Step-by-step guide to verifying customer documents',
        type: 'slides',
        contentUrl: '/slides/kyc-verification',
        duration: 12,
        order: 2,
        quiz: {
          id: 'quiz-1-2',
          title: 'Document Verification Quiz',
          passingScore: 70,
          questions: [
            {
              id: 'q1',
              prompt: 'What is the first step in document verification?',
              options: [
                { id: 'q1-a', text: 'Check document authenticity', correct: true },
                { id: 'q1-b', text: 'File the document', correct: false },
                { id: 'q1-c', text: 'Send to customer', correct: false },
                { id: 'q1-d', text: 'Ignore it', correct: false },
              ],
            },
          ],
        },
      },
    ],
  },
  {
    id: 'mod-2',
    title: 'Loan Agreement Compliance',
    description: 'Understanding loan documentation and regulatory requirements',
    status: 'published',
    tags: ['Loans', 'Compliance', 'Legal'],
    createdAt: '2025-01-08T09:00:00Z',
    publishedAt: '2025-01-09T11:00:00Z',
    lessons: [
      {
        id: 'lesson-2-1',
        title: 'Loan Agreement Basics',
        description: 'Core components of a compliant loan agreement',
        type: 'video',
        contentUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
        duration: 10,
        order: 1,
        quiz: {
          id: 'quiz-2-1',
          title: 'Loan Basics Quiz',
          passingScore: 70,
          questions: [
            {
              id: 'q1',
              prompt: 'What must be disclosed in a loan agreement?',
              options: [
                { id: 'q1-a', text: 'Interest rate and terms', correct: true },
                { id: 'q1-b', text: 'Bank profits', correct: false },
                { id: 'q1-c', text: 'Employee salaries', correct: false },
                { id: 'q1-d', text: 'None of the above', correct: false },
              ],
            },
          ],
        },
      },
    ],
  },
  {
    id: 'mod-3',
    title: 'Anti-Money Laundering (AML)',
    description: 'Comprehensive AML training for financial professionals',
    status: 'draft',
    tags: ['AML', 'Compliance', 'Risk Management'],
    createdAt: '2025-01-10T13:00:00Z',
    lessons: [],
  },
];

export const MOCK_LEARNERS: Learner[] = [
  {
    id: 'learner-1',
    name: 'Sarah Johnson',
    email: 'sarah.j@company.com',
    progress: {
      'mod-1': {
        moduleId: 'mod-1',
        completedLessons: ['lesson-1-1'],
        inProgressLessonId: 'lesson-1-2',
        overallScore: 85,
        lastAccessedAt: '2025-01-12T09:30:00Z',
        status: 'in-progress',
      },
      'mod-2': {
        moduleId: 'mod-2',
        completedLessons: [],
        overallScore: 0,
        lastAccessedAt: '2025-01-10T14:00:00Z',
        status: 'not-started',
      },
    },
    flags: [],
  },
  {
    id: 'learner-2',
    name: 'Michael Chen',
    email: 'michael.c@company.com',
    progress: {
      'mod-1': {
        moduleId: 'mod-1',
        completedLessons: ['lesson-1-1', 'lesson-1-2'],
        overallScore: 92,
        lastAccessedAt: '2025-01-11T16:00:00Z',
        status: 'completed',
      },
    },
    flags: [],
  },
  {
    id: 'learner-3',
    name: 'Emily Rodriguez',
    email: 'emily.r@company.com',
    progress: {
      'mod-1': {
        moduleId: 'mod-1',
        completedLessons: ['lesson-1-1'],
        inProgressLessonId: 'lesson-1-2',
        overallScore: 55,
        lastAccessedAt: '2025-01-12T10:15:00Z',
        status: 'in-progress',
      },
    },
    flags: [
      {
        type: 'low-performance',
        moduleId: 'mod-1',
        lessonId: 'lesson-1-1',
        triggeredAt: '2025-01-12T10:20:00Z',
        notifiedHR: false,
      },
    ],
  },
  {
    id: 'learner-4',
    name: 'David Park',
    email: 'david.p@company.com',
    progress: {
      'mod-1': {
        moduleId: 'mod-1',
        completedLessons: [],
        overallScore: 45,
        lastAccessedAt: '2025-01-09T11:00:00Z',
        status: 'in-progress',
      },
    },
    flags: [
      {
        type: 'multiple-failures',
        moduleId: 'mod-1',
        lessonId: 'lesson-1-1',
        triggeredAt: '2025-01-11T14:00:00Z',
        notifiedHR: true,
      },
    ],
  },
];

export const MOCK_CONTENT_BLOCKS: Record<string, ContentBlock[]> = {
  'mod-1': [
    {
      id: 'block-1',
      moduleId: 'mod-1',
      type: 'slides',
      title: 'KYC Module 1: Introduction Slides',
      meta: '25 slides generated',
      status: 'approved',
      generatedAt: '2025-01-05T11:00:00Z',
    },
    {
      id: 'block-2',
      moduleId: 'mod-1',
      type: 'video',
      title: 'KYC Training Video',
      meta: '8 min video',
      status: 'approved',
      generatedAt: '2025-01-05T11:30:00Z',
    },
    {
      id: 'block-3',
      moduleId: 'mod-1',
      type: 'quiz',
      title: 'KYC Fundamentals Quiz',
      meta: '3 questions',
      status: 'approved',
      generatedAt: '2025-01-05T12:00:00Z',
    },
  ],
};

export const MOCK_ADMIN_REVIEWS: Record<string, AdminReview> = {
  'mod-1': {
    moduleId: 'mod-1',
    contentBlocks: MOCK_CONTENT_BLOCKS['mod-1'],
    notes: 'All content approved for publication. High quality generation.',
    reviewedBy: 'Admin User',
    reviewedAt: '2025-01-06T09:00:00Z',
  },
};

export const MOCK_ANALYTICS: AnalyticsSummary = {
  totalLearners: 42,
  activeLearners: 38,
  avgCompletionRate: 67.5,
  avgScore: 78.3,
  modulesPublished: 2,
  flaggedLearners: 2,
};

export const MOCK_HR_COMPLIANCE: HRComplianceRecord[] = [
  {
    employeeId: 'emp-001',
    employeeName: 'Sarah Johnson',
    email: 'sarah.j@company.com',
    overallCompliance: 50,
    modules: {
      'mod-1': {
        moduleId: 'mod-1',
        moduleName: 'KYC Compliance Fundamentals',
        completed: false,
        required: true,
        dueDate: '2025-02-01',
      },
      'mod-2': {
        moduleId: 'mod-2',
        moduleName: 'Loan Agreement Compliance',
        completed: false,
        required: true,
        dueDate: '2025-02-15',
      },
    },
  },
  {
    employeeId: 'emp-002',
    employeeName: 'Michael Chen',
    email: 'michael.c@company.com',
    overallCompliance: 100,
    modules: {
      'mod-1': {
        moduleId: 'mod-1',
        moduleName: 'KYC Compliance Fundamentals',
        completed: true,
        completedAt: '2025-01-11T16:00:00Z',
        score: 92,
        required: true,
      },
      'mod-2': {
        moduleId: 'mod-2',
        moduleName: 'Loan Agreement Compliance',
        completed: true,
        completedAt: '2025-01-10T14:30:00Z',
        score: 88,
        required: true,
      },
    },
  },
  {
    employeeId: 'emp-003',
    employeeName: 'Emily Rodriguez',
    email: 'emily.r@company.com',
    overallCompliance: 50,
    modules: {
      'mod-1': {
        moduleId: 'mod-1',
        moduleName: 'KYC Compliance Fundamentals',
        completed: false,
        required: true,
        dueDate: '2025-02-01',
      },
      'mod-2': {
        moduleId: 'mod-2',
        moduleName: 'Loan Agreement Compliance',
        completed: true,
        completedAt: '2025-01-09T10:00:00Z',
        score: 76,
        required: true,
      },
    },
  },
];

export const MOCK_UPLOADS: UploadedDocument[] = [
  {
    id: 'upload-1',
    filename: 'kyc-policy-2025.pdf',
    size: 2456789,
    tags: ['KYC', 'Policy', 'Legal'],
    uploadedAt: '2025-01-05T09:00:00Z',
    processed: true,
  },
  {
    id: 'upload-2',
    filename: 'loan-compliance-guide.pdf',
    size: 3892456,
    tags: ['Loans', 'Compliance'],
    uploadedAt: '2025-01-08T08:30:00Z',
    processed: true,
  },
];

// Current user for demo
export const CURRENT_USER = {
  id: 'user-admin-1',
  name: 'Admin User',
  email: 'admin@getsetai.com',
  role: 'admin' as const,
};

export const CURRENT_LEARNER = {
  id: 'learner-1',
  name: 'Sarah Johnson',
  email: 'sarah.j@company.com',
  role: 'learner' as const,
};
