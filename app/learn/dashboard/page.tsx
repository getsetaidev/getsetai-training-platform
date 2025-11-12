'use client';

import React from 'react';
import Link from 'next/link';
import { Card, Button, ProgressBar, Badge } from '@/components/ui';
import { MOCK_MODULES, CURRENT_LEARNER } from '@/lib/mockData';
import { User, CheckCircle, Clock, Play } from 'lucide-react';

export default function LearnerDashboardPage() {
  const learner = CURRENT_LEARNER;
  const publishedModules = MOCK_MODULES.filter(m => m.status === 'published');
  
  // Mock progress data
  const progress = {
    'mod-1': { status: 'in-progress', completedLessons: 1, totalLessons: 2, score: 85 },
    'mod-2': { status: 'not-started', completedLessons: 0, totalLessons: 1, score: 0 },
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      {/* Profile Section */}
      <Card glass className="mb-8">
        <div className="flex items-center space-x-4">
          <div className="w-16 h-16 rounded-full bg-[#0070F3]/20 border-2 border-[#0070F3]/30 flex items-center justify-center">
            <User size={32} className="text-[#0070F3]" />
          </div>
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-white">Welcome back, {learner.name}!</h1>
            <p className="text-gray-400">{learner.email}</p>
          </div>
          <Badge variant="success">Active</Badge>
        </div>
      </Card>

      {/* Current Module */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-white mb-4">Continue Learning</h2>
        <Card glass>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-white mb-2">{publishedModules[0]?.title}</h3>
              <p className="text-gray-400 mb-4">{publishedModules[0]?.description}</p>
              <ProgressBar value={50} showLabel size="lg" />
              <p className="text-sm text-gray-400 mt-2">1 of 2 lessons completed</p>
            </div>
            <Link href={`/learn/lesson/${publishedModules[0]?.lessons[1]?.id}`}>
              <Button leftIcon={<Play size={16} />}>
                Continue Lesson
              </Button>
            </Link>
          </div>
        </Card>
      </div>

      {/* All Modules */}
      <div>
        <h2 className="text-xl font-semibold text-white mb-4">My Modules</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {publishedModules.map((module) => {
            const prog = progress[module.id as keyof typeof progress] || { status: 'not-started', completedLessons: 0, totalLessons: module.lessons.length, score: 0 };
            const completionPct = (prog.completedLessons / prog.totalLessons) * 100;
            
            return (
              <Card key={module.id} glass hover>
                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-lg font-semibold text-white">{module.title}</h3>
                  {prog.status === 'in-progress' && <Clock size={20} className="text-yellow-400" />}
                  {prog.status === 'completed' && <CheckCircle size={20} className="text-green-400" />}
                </div>
                <p className="text-sm text-gray-400 mb-4">{module.description}</p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {module.tags.map((tag) => (
                    <Badge key={tag} variant="default">{tag}</Badge>
                  ))}
                </div>

                <ProgressBar value={completionPct} showLabel className="mb-4" />
                
                <div className="flex items-center justify-between text-sm text-gray-400 mb-4">
                  <span>{module.lessons.length} lessons</span>
                  {prog.score > 0 && <span className="text-green-400">Score: {prog.score}%</span>}
                </div>

                <Link href={`/learn/lesson/${module.lessons[0]?.id}`}>
                  <Button variant={prog.status === 'not-started' ? 'primary' : 'outline'} className="w-full">
                    {prog.status === 'not-started' ? 'Start Module' : 'Continue'}
                  </Button>
                </Link>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}
