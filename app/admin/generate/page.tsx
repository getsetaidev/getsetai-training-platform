'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardTitle, CardContent, Button, Badge } from '@/components/ui';
import { MOCK_MODULES } from '@/lib/mockData';
import { CheckCircle, Circle, Video, FileQuestion, BookOpen } from 'lucide-react';

export default function AdminGeneratePage() {
  const router = useRouter();
  const module = MOCK_MODULES[0];

  const steps = [
    { id: 1, name: 'Upload', status: 'complete' },
    { id: 2, name: 'Generate', status: 'active' },
    { id: 3, name: 'Review', status: 'upcoming' },
    { id: 4, name: 'Publish', status: 'upcoming' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Stepper Sidebar */}
        <div className="lg:w-64 flex-shrink-0">
          <Card glass>
            <h3 className="text-lg font-semibold text-white mb-6">Course Creation</h3>
            <div className="space-y-4">
              {steps.map((step, idx) => (
                <div key={step.id} className="flex items-start space-x-3">
                  <div className="flex-shrink-0 mt-0.5">
                    {step.status === 'complete' ? (
                      <CheckCircle size={20} className="text-green-400" />
                    ) : step.status === 'active' ? (
                      <div className="w-5 h-5 rounded-full bg-[#0070F3] flex items-center justify-center">
                        <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                      </div>
                    ) : (
                      <Circle size={20} className="text-gray-600" />
                    )}
                  </div>
                  <div className="flex-1">
                    <p className={`text-sm font-medium ${
                      step.status === 'active' ? 'text-white' : step.status === 'complete' ? 'text-gray-300' : 'text-gray-500'
                    }`}>
                      {step.name}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Main Content */}
        <div className="flex-1">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-white mb-2">AI-Generated Course Preview</h1>
            <p className="text-gray-400">Review the generated content structure</p>
          </div>

          {/* Module Overview */}
          <Card glass className="mb-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <CardTitle>{module.title}</CardTitle>
                <p className="text-gray-400 mt-2">{module.description}</p>
              </div>
              <Badge variant="info">{module.lessons.length} Lessons</Badge>
            </div>
            <div className="flex flex-wrap gap-2 mt-4">
              {module.tags.map((tag) => (
                <Badge key={tag}>{tag}</Badge>
              ))}
            </div>
          </Card>

          {/* Video Preview */}
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <Card glass>
              <CardTitle className="text-lg mb-4">Video Lesson Preview</CardTitle>
              <div className="bg-gray-900 rounded-lg overflow-hidden mb-4">
                <video className="w-full" controls>
                  <source src="https://www.w3schools.com/html/mov_bbb.mp4" type="video/mp4" />
                </video>
              </div>
              <h4 className="text-white font-medium mb-2">{module.lessons[0]?.title}</h4>
              <p className="text-sm text-gray-400 mb-4">{module.lessons[0]?.description}</p>
              <Button size="sm" variant="outline">Preview Lesson</Button>
            </Card>

            {/* Quiz Preview */}
            <Card glass>
              <CardTitle className="text-lg mb-4">Quiz Preview</CardTitle>
              <div className="space-y-4">
                <div>
                  <p className="text-white font-medium mb-3">Sample Question:</p>
                  <p className="text-gray-300 mb-3">{module.lessons[0]?.quiz.questions[0]?.prompt}</p>
                  <div className="space-y-2">
                    {module.lessons[0]?.quiz.questions[0]?.options.slice(0, 2).map((opt) => (
                      <div key={opt.id} className="flex items-center space-x-2">
                        <input type="radio" name="sample" className="accent-[#0070F3]" />
                        <label className="text-sm text-gray-300">{opt.text}</label>
                      </div>
                    ))}
                  </div>
                </div>
                <Badge variant="info">{module.lessons[0]?.quiz.questions.length} Questions</Badge>
              </div>
            </Card>
          </div>

          {/* Timeline Roadmap */}
          <Card glass>
            <CardTitle className="mb-6">Course Roadmap</CardTitle>
            <div className="relative">
              <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-700" />
              <div className="space-y-6">
                {module.lessons.map((lesson, idx) => (
                  <div key={lesson.id} className="relative pl-12">
                    <div className="absolute left-2.5 w-3 h-3 bg-[#0070F3] rounded-full" />
                    <div>
                      <div className="flex items-center space-x-2 mb-1">
                        {lesson.type === 'video' ? <Video size={16} className="text-gray-400" /> : <BookOpen size={16} className="text-gray-400" />}
                        <h4 className="text-white font-medium">{lesson.title}</h4>
                        <Badge variant="default" className="text-xs">{lesson.duration} min</Badge>
                      </div>
                      <p className="text-sm text-gray-400">{lesson.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Card>

          <div className="flex justify-end space-x-4 mt-8">
            <Button variant="outline" onClick={() => router.push('/admin/upload')}>
              Back
            </Button>
            <Button onClick={() => router.push('/admin/review')}>
              Continue to Review
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
