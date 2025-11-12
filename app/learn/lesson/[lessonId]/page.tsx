'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, Button, Badge, ProgressBar } from '@/components/ui';
import { MOCK_MODULES } from '@/lib/mockData';
import { AlertCircle, CheckCircle, XCircle } from 'lucide-react';

export default function LessonPage({ params }: { params: { lessonId: string } }) {
  const router = useRouter();
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);

  // Find lesson
  let lesson = null;
  for (const mod of MOCK_MODULES) {
    lesson = mod.lessons.find(l => l.id === params.lessonId);
    if (lesson) break;
  }

  if (!lesson) {
    return <div className="text-white p-8">Lesson not found</div>;
  }

  const handleSubmit = () => {
    let correct = 0;
    lesson!.quiz.questions.forEach((q) => {
      const correctOption = q.options.find(o => o.correct);
      if (answers[q.id] === correctOption?.id) {
        correct++;
      }
    });
    const finalScore = Math.round((correct / lesson!.quiz.questions.length) * 100);
    setScore(finalScore);
    setSubmitted(true);
  };

  const isPassing = score >= lesson.quiz.passingScore;
  const needsHRAlert = score < 70 && submitted; // Rule: below 70% triggers alert

  if (submitted) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <Card glass className="text-center">
          {isPassing ? (
            <CheckCircle size={64} className="text-green-400 mx-auto mb-6" />
          ) : (
            <XCircle size={64} className="text-red-400 mx-auto mb-6" />
          )}
          <h2 className="text-3xl font-bold text-white mb-4">
            Score: {score}%
          </h2>
          <p className="text-gray-300 mb-6">
            {isPassing 
              ? 'Congratulations! You passed the quiz.' 
              : 'Score below passing threshold. Please review the lesson and try again.'}
          </p>
          
          {needsHRAlert && (
            <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-lg flex items-start space-x-3">
              <AlertCircle className="text-red-400 flex-shrink-0 mt-1" size={20} />
              <div className="text-left">
                <p className="text-red-400 font-medium mb-1">HR Notification Sent</p>
                <p className="text-sm text-gray-300">
                  Due to low performance, your manager has been notified to provide additional support.
                </p>
              </div>
            </div>
          )}

          <div className="flex justify-center space-x-4">
            {!isPassing && (
              <Button variant="outline" onClick={() => { setSubmitted(false); setAnswers({}); }}>
                Retry Quiz
              </Button>
            )}
            <Button onClick={() => router.push('/learn/dashboard')}>
              {isPassing ? 'Back to Dashboard' : 'Review Lesson'}
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Progress Bar */}
      <Card glass className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-gray-400">Lesson Progress</span>
          <Badge variant="info">1 of 2</Badge>
        </div>
        <ProgressBar value={50} showLabel />
      </Card>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Video/Content Side */}
        <div>
          <Card glass className="mb-6">
            <h1 className="text-2xl font-bold text-white mb-4">{lesson.title}</h1>
            <p className="text-gray-400 mb-6">{lesson.description}</p>
            
            {lesson.type === 'video' ? (
              <div className="bg-gray-900 rounded-lg overflow-hidden">
                <video className="w-full" controls>
                  <source src={lesson.contentUrl} type="video/mp4" />
                </video>
              </div>
            ) : (
              <div className="bg-gray-900 rounded-lg p-8 text-center">
                <p className="text-gray-400">Slide content would appear here</p>
              </div>
            )}
          </Card>
        </div>

        {/* Quiz Side */}
        <div>
          <Card glass>
            <h3 className="text-xl font-semibold text-white mb-6">{lesson.quiz.title}</h3>
            <div className="space-y-6">
              {lesson.quiz.questions.map((question, idx) => (
                <div key={question.id}>
                  <p className="text-white font-medium mb-3">
                    {idx + 1}. {question.prompt}
                  </p>
                  <div className="space-y-2">
                    {question.options.map((option) => (
                      <label
                        key={option.id}
                        className="flex items-center space-x-3 p-3 rounded-lg bg-gray-900 cursor-pointer hover:bg-gray-800 transition-colors"
                      >
                        <input
                          type="radio"
                          name={question.id}
                          value={option.id}
                          checked={answers[question.id] === option.id}
                          onChange={(e) => setAnswers({ ...answers, [question.id]: e.target.value })}
                          className="accent-[#0070F3]"
                        />
                        <span className="text-gray-300">{option.text}</span>
                      </label>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 pt-6 border-t border-gray-700">
              <p className="text-sm text-gray-400 mb-4">
                Passing score: {lesson.quiz.passingScore}%
              </p>
              <Button
                onClick={handleSubmit}
                disabled={Object.keys(answers).length !== lesson.quiz.questions.length}
                className="w-full"
              >
                Submit Quiz
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
