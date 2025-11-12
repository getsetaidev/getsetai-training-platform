'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Card, CardTitle, Button, Badge, ProgressBar } from '@/components/ui';
import { MOCK_MODULES } from '@/lib/mockData';
import { ArrowLeft, Play, CheckCircle, Clock, Video, BookOpen } from 'lucide-react';

export default function ModuleViewPage({ params }: { params: { moduleId: string } }) {
  const router = useRouter();
  const module = MOCK_MODULES.find(m => m.id === params.moduleId);

  if (!module) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <Card glass className="text-center py-12">
          <h2 className="text-2xl font-bold text-white mb-4">Module Not Found</h2>
          <p className="text-gray-400 mb-6">The module you're looking for doesn't exist.</p>
          <Button onClick={() => router.push('/learn/dashboard')}>
            Back to Dashboard
          </Button>
        </Card>
      </div>
    );
  }

  // Mock progress (in real app, fetch from API/state)
  const completedLessons = module.id === 'mod-1' ? ['lesson-1-1'] : [];
  const progress = (completedLessons.length / module.lessons.length) * 100;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Back Button */}
      <Button
        variant="ghost"
        leftIcon={<ArrowLeft size={16} />}
        onClick={() => router.push('/learn/dashboard')}
        className="mb-6"
      >
        Back to Dashboard
      </Button>

      {/* Module Header */}
      <Card glass className="mb-8">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-6">
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-white mb-3">{module.title}</h1>
            <p className="text-gray-300 text-lg mb-4">{module.description}</p>
            <div className="flex flex-wrap gap-2">
              {module.tags.map((tag) => (
                <Badge key={tag} variant="info">{tag}</Badge>
              ))}
            </div>
          </div>
          <div className="text-center md:text-right">
            <div className="text-4xl font-bold text-[#0070F3] mb-2">
              {Math.round(progress)}%
            </div>
            <p className="text-gray-400 text-sm">Complete</p>
          </div>
        </div>

        <ProgressBar value={progress} showLabel size="lg" />
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          <div className="text-center p-4 bg-gray-900 rounded-lg">
            <div className="text-2xl font-bold text-white mb-1">{module.lessons.length}</div>
            <div className="text-sm text-gray-400">Total Lessons</div>
          </div>
          <div className="text-center p-4 bg-gray-900 rounded-lg">
            <div className="text-2xl font-bold text-green-400 mb-1">{completedLessons.length}</div>
            <div className="text-sm text-gray-400">Completed</div>
          </div>
          <div className="text-center p-4 bg-gray-900 rounded-lg">
            <div className="text-2xl font-bold text-yellow-400 mb-1">
              {module.lessons.reduce((acc, l) => acc + l.duration, 0)} min
            </div>
            <div className="text-sm text-gray-400">Total Duration</div>
          </div>
        </div>
      </Card>

      {/* Lessons List */}
      <div>
        <h2 className="text-2xl font-semibold text-white mb-4">Lessons</h2>
        <div className="space-y-4">
          {module.lessons.map((lesson, index) => {
            const isCompleted = completedLessons.includes(lesson.id);
            const isLocked = index > 0 && !completedLessons.includes(module.lessons[index - 1].id);

            return (
              <Card key={lesson.id} glass className={isLocked ? 'opacity-60' : ''}>
                <div className="flex flex-col md:flex-row md:items-center gap-4">
                  {/* Lesson Number & Icon */}
                  <div className="flex items-center space-x-4">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                      isCompleted 
                        ? 'bg-green-500/20 border-2 border-green-500' 
                        : isLocked
                        ? 'bg-gray-700 border-2 border-gray-600'
                        : 'bg-[#0070F3]/20 border-2 border-[#0070F3]'
                    }`}>
                      {isCompleted ? (
                        <CheckCircle size={24} className="text-green-400" />
                      ) : isLocked ? (
                        <span className="text-gray-500 font-bold">{index + 1}</span>
                      ) : (
                        <span className="text-[#0070F3] font-bold">{index + 1}</span>
                      )}
                    </div>
                    {lesson.type === 'video' ? (
                      <Video size={24} className="text-gray-400" />
                    ) : (
                      <BookOpen size={24} className="text-gray-400" />
                    )}
                  </div>

                  {/* Lesson Info */}
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-white mb-1">{lesson.title}</h3>
                    <p className="text-sm text-gray-400 mb-2">{lesson.description}</p>
                    <div className="flex items-center space-x-4 text-xs text-gray-500">
                      <span>{lesson.duration} minutes</span>
                      <span>•</span>
                      <span>{lesson.quiz.questions.length} quiz questions</span>
                      <span>•</span>
                      <span>Passing: {lesson.quiz.passingScore}%</span>
                    </div>
                  </div>

                  {/* Action Button */}
                  <div>
                    {isLocked ? (
                      <Button variant="outline" disabled className="w-full md:w-auto">
                        Locked
                      </Button>
                    ) : (
                      <Link href={`/learn/lesson/${lesson.id}`}>
                        <Button 
                          variant={isCompleted ? 'outline' : 'primary'}
                          leftIcon={<Play size={16} />}
                          className="w-full md:w-auto"
                        >
                          {isCompleted ? 'Review' : 'Start Lesson'}
                        </Button>
                      </Link>
                    )}
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Certificate Section (Future) */}
      {progress === 100 && (
        <Card glass className="mt-8 text-center py-8">
          <CheckCircle size={64} className="text-green-400 mx-auto mb-4" />
          <h3 className="text-2xl font-bold text-white mb-2">Module Completed! 🎉</h3>
          <p className="text-gray-400 mb-6">
            Congratulations on completing {module.title}
          </p>
          <Button variant="outline">
            Download Certificate
          </Button>
        </Card>
      )}
    </div>
  );
}
