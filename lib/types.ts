// Core data types for GetSetAI Training Platform

export interface QuizOption {
  id: string;
  text: string;
  correct: boolean;
}

export interface QuizQuestion {
  id: string;
  prompt: string;
  options: QuizOption[];
}

export interface Quiz {
  id: string;
  title: string;
  questions: QuizQuestion[];
  passingScore: number; // percentage
}

export interface Lesson {
  id: string;
  title: string;
  description: string;
  type: 'video' | 'slides';
  contentUrl: string;
  duration: number; // minutes
  quiz: Quiz;
  order: number;
}

export interface Module {
  id: string;
  title: string;
  description: string;
  lessons: Lesson[];
  status: 'draft' | 'published';
  tags: string[];
  createdAt: string;
  publishedAt?: string;
}

export interface LearnerProgress {
  learnerId: string;
  moduleId: string;
  lessonId: string;
  completed: boolean;
  score?: number;
  attempts: number;
  lastAttemptAt: string;
}

export interface Learner {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  progress: Record<string, ModuleProgress>; // moduleId -> progress
  flags: PerformanceFlag[];
}

export interface ModuleProgress {
  moduleId: string;
  completedLessons: string[];
  inProgressLessonId?: string;
  overallScore: number;
  lastAccessedAt: string;
  status: 'not-started' | 'in-progress' | 'completed';
}

export interface PerformanceFlag {
  type: 'low-performance' | 'multiple-failures' | 'incomplete';
  moduleId: string;
  lessonId?: string;
  triggeredAt: string;
  notifiedHR: boolean;
}

export interface ContentBlock {
  id: string;
  moduleId: string;
  type: 'slides' | 'video' | 'quiz';
  title: string;
  meta: string; // e.g., "20 slides", "5 min video"
  status: 'pending' | 'approved' | 'regenerate';
  generatedAt: string;
}

export interface AdminReview {
  moduleId: string;
  contentBlocks: ContentBlock[];
  notes: string;
  reviewedBy?: string;
  reviewedAt?: string;
}

export interface UploadedDocument {
  id: string;
  filename: string;
  size: number;
  tags: string[];
  uploadedAt: string;
  processed: boolean;
}

export interface AnalyticsSummary {
  totalLearners: number;
  activeLearners: number;
  avgCompletionRate: number;
  avgScore: number;
  modulesPublished: number;
  flaggedLearners: number;
}

export interface HRComplianceRecord {
  employeeId: string;
  employeeName: string;
  email: string;
  modules: Record<string, ComplianceStatus>; // moduleId -> status
  overallCompliance: number; // percentage
}

export interface ComplianceStatus {
  moduleId: string;
  moduleName: string;
  completed: boolean;
  completedAt?: string;
  score?: number;
  required: boolean;
  dueDate?: string;
}

export type UserRole = 'admin' | 'learner' | 'hr';

export interface AppState {
  currentRole: UserRole;
  currentUser: {
    id: string;
    name: string;
    email: string;
    role: UserRole;
  };
}
