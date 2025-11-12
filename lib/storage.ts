// LocalStorage utilities for persisting app state

const STORAGE_KEYS = {
  CURRENT_ROLE: 'getsetai_current_role',
  LEARNER_PROGRESS: 'getsetai_learner_progress',
  QUIZ_ATTEMPTS: 'getsetai_quiz_attempts',
  MODULES: 'getsetai_modules',
  CONTENT_BLOCKS: 'getsetai_content_blocks',
} as const;

export const storage = {
  // Generic get/set
  get<T>(key: string, defaultValue: T): T {
    if (typeof window === 'undefined') return defaultValue;
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    } catch {
      return defaultValue;
    }
  },

  set<T>(key: string, value: T): void {
    if (typeof window === 'undefined') return;
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error('Failed to save to localStorage:', error);
    }
  },

  remove(key: string): void {
    if (typeof window === 'undefined') return;
    try {
      window.localStorage.removeItem(key);
    } catch (error) {
      console.error('Failed to remove from localStorage:', error);
    }
  },

  clear(): void {
    if (typeof window === 'undefined') return;
    try {
      window.localStorage.clear();
    } catch (error) {
      console.error('Failed to clear localStorage:', error);
    }
  },

  // App-specific methods
  getCurrentRole(): 'admin' | 'learner' | 'hr' {
    return this.get(STORAGE_KEYS.CURRENT_ROLE, 'admin');
  },

  setCurrentRole(role: 'admin' | 'learner' | 'hr'): void {
    this.set(STORAGE_KEYS.CURRENT_ROLE, role);
  },

  getLearnerProgress(learnerId: string, moduleId: string) {
    const allProgress = this.get<Record<string, any>>(
      STORAGE_KEYS.LEARNER_PROGRESS,
      {}
    );
    return allProgress[`${learnerId}-${moduleId}`] || null;
  },

  setLearnerProgress(
    learnerId: string,
    moduleId: string,
    progress: any
  ): void {
    const allProgress = this.get<Record<string, any>>(
      STORAGE_KEYS.LEARNER_PROGRESS,
      {}
    );
    allProgress[`${learnerId}-${moduleId}`] = progress;
    this.set(STORAGE_KEYS.LEARNER_PROGRESS, allProgress);
  },

  getQuizAttempts(learnerId: string, quizId: string): number {
    const attempts = this.get<Record<string, number>>(
      STORAGE_KEYS.QUIZ_ATTEMPTS,
      {}
    );
    return attempts[`${learnerId}-${quizId}`] || 0;
  },

  incrementQuizAttempts(learnerId: string, quizId: string): void {
    const attempts = this.get<Record<string, number>>(
      STORAGE_KEYS.QUIZ_ATTEMPTS,
      {}
    );
    const key = `${learnerId}-${quizId}`;
    attempts[key] = (attempts[key] || 0) + 1;
    this.set(STORAGE_KEYS.QUIZ_ATTEMPTS, attempts);
  },
};

export default storage;
