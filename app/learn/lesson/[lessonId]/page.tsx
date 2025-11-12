'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, Button, Badge } from '@/components/ui';
import { MOCK_MODULES } from '@/lib/mockData';
import { ArrowLeft, CheckCircle2, XCircle, Play, ChevronRight, Clock, Award, AlertCircle } from 'lucide-react';

export default function LessonPage({ params }: { params: { lessonId: string } }) {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState<'video' | 'quiz' | 'result'>('video');
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [score, setScore] = useState(0);

  let lesson = null;
  let moduleName = '';
  for (const mod of MOCK_MODULES) {
    lesson = mod.lessons.find(l => l.id === params.lessonId);
    if (lesson) {
      moduleName = mod.title;
      break;
    }
  }

  if (!lesson && params.lessonId.startsWith('demo-lesson-')) {
    moduleName = 'Demo: Data Privacy & Security';
    lesson = {
      id: params.lessonId,
      title: 'Introduction to Data Privacy',
      description: 'Learn the fundamentals of data privacy and why it matters in modern business.',
      type: 'video' as const,
      contentUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
      duration: 10,
      order: 1,
      quiz: {
        id: 'demo-quiz',
        title: 'Knowledge Check',
        passingScore: 70,
        questions: [
          {
            id: 'q1',
            prompt: 'What does GDPR stand for?',
            options: [
              { id: 'q1-a', text: 'General Data Protection Regulation', correct: true },
              { id: 'q1-b', text: 'Global Data Privacy Rules', correct: false },
              { id: 'q1-c', text: 'Government Data Protection Registry', correct: false },
            ]
          },
          {
            id: 'q2',
            prompt: 'Which is considered personal data under GDPR?',
            options: [
              { id: 'q2-a', text: 'Email addresses', correct: true },
              { id: 'q2-b', text: 'Weather data', correct: false },
              { id: 'q2-c', text: 'Stock prices', correct: false },
            ]
          }
        ]
      }
    };
  }

  if (!lesson) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <Card glass className="text-center py-12">
          <XCircle size={64} className="text-gray-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-white mb-4">Lesson Not Found</h2>
          <p className="text-gray-400 mb-6">The lesson you are looking for does not exist.</p>
          <Button onClick={() => router.push('/learn/dashboard')}>Back to Dashboard</Button>
        </Card>
      </div>
    );
  }

  const handleSubmitQuiz = () => {
    let correct = 0;
    lesson.quiz.questions.forEach((q) => {
      const correctOption = q.options.find(o => o.correct);
      if (answers[q.id] === correctOption?.id) correct++;
    });
    const finalScore = Math.round((correct / lesson.quiz.questions.length) * 100);
    setScore(finalScore);
    setCurrentStep('result');
  };

  const isPassing = score >= lesson.quiz.passingScore;

  if (currentStep === 'video') {
    return (
      <div className="min-h-screen bg-gray-900">
        <div className="bg-gray-800/50 border-b border-gray-700">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between">
              <Button variant="ghost" leftIcon={<ArrowLeft size={18} />} onClick={() => router.back()}>Back to Module</Button>
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2 text-gray-400">
                  <Clock size={16} />
                  <span className="text-sm">{lesson.duration} min</span>
                </div>
                <Badge variant="info">Lesson {lesson.order}</Badge>
              </div>
            </div>
          </div>
        </div>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="mb-6 text-sm text-gray-400">{moduleName} / <span className="text-white">{lesson.title}</span></div>
          <Card glass className="mb-8">
            <div className="mb-6">
              <h1 className="text-3xl font-bold text-white mb-3">{lesson.title}</h1>
              <p className="text-lg text-gray-300">{lesson.description}</p>
            </div>
            <div className="bg-black rounded-xl overflow-hidden mb-6">
              {lesson.type === 'video' ? (
                <video className="w-full aspect-video" controls><source src={lesson.contentUrl} type="video/mp4" /></video>
              ) : (
                <div className="aspect-video flex items-center justify-center bg-gradient-to-br from-gray-800 to-gray-900">
                  <div className="text-center"><Play size={64} className="text-gray-600 mx-auto mb-4" /><p className="text-gray-400">Interactive Slides</p></div>
                </div>
              )}
            </div>
            <div className="flex justify-between items-center pt-6 border-t border-gray-700">
              <p className="text-gray-400">Complete the video to proceed to the quiz</p>
              <Button rightIcon={<ChevronRight size={18} />} onClick={() => setCurrentStep('quiz')} size="lg">Continue to Quiz</Button>
            </div>
          </Card>
          <Card glass>
            <h3 className="text-lg font-semibold text-white mb-4">Learning Objectives</h3>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3"><CheckCircle2 size={20} className="text-green-400 flex-shrink-0 mt-0.5" /><span className="text-gray-300">Understand fundamentals of data privacy regulations</span></li>
              <li className="flex items-start space-x-3"><CheckCircle2 size={20} className="text-green-400 flex-shrink-0 mt-0.5" /><span className="text-gray-300">Identify personal data types and protection requirements</span></li>
              <li className="flex items-start space-x-3"><CheckCircle2 size={20} className="text-green-400 flex-shrink-0 mt-0.5" /><span className="text-gray-300">Apply compliance best practices in daily operations</span></li>
            </ul>
          </Card>
        </div>
      </div>
    );
  }

  if (currentStep === 'quiz') {
    const allAnswered = Object.keys(answers).length === lesson.quiz.questions.length;
    return (
      <div className="min-h-screen bg-gray-900">
        <div className="bg-gray-800/50 border-b border-gray-700">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between">
              <Button variant="ghost" leftIcon={<ArrowLeft size={18} />} onClick={() => setCurrentStep('video')}>Back to Video</Button>
              <Badge variant="warning">Quiz in Progress</Badge>
            </div>
          </div>
        </div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <Card glass className="mb-8">
            <div className="flex items-start justify-between">
              <div><h2 className="text-2xl font-bold text-white mb-2">{lesson.quiz.title}</h2><p className="text-gray-400">Answer all questions to complete this lesson</p></div>
              <div className="text-right"><div className="text-3xl font-bold text-[#0070F3]">{Object.keys(answers).length}/{lesson.quiz.questions.length}</div><p className="text-sm text-gray-400">Answered</p></div>
            </div>
            <div className="mt-6 p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg flex items-start space-x-3">
              <AlertCircle className="text-blue-400 flex-shrink-0 mt-0.5" size={20} />
              <div><p className="text-blue-300 text-sm"><strong>Passing Score:</strong> {lesson.quiz.passingScore}% • <strong>Questions:</strong> {lesson.quiz.questions.length}</p></div>
            </div>
          </Card>
          <div className="space-y-6">
            {lesson.quiz.questions.map((question, idx) => (
              <Card key={question.id} glass>
                <div className="mb-4"><div className="flex items-start space-x-3 mb-3"><div className="w-8 h-8 rounded-full bg-[#0070F3]/20 border-2 border-[#0070F3] flex items-center justify-center flex-shrink-0"><span className="text-[#0070F3] font-bold text-sm">{idx + 1}</span></div><p className="text-lg font-medium text-white pt-0.5">{question.prompt}</p></div></div>
                <div className="space-y-3 ml-11">
                  {question.options.map((option) => (
                    <label key={option.id} className={`flex items-center space-x-3 p-4 rounded-lg cursor-pointer transition-all ${answers[question.id] === option.id ? 'bg-[#0070F3]/20 border-2 border-[#0070F3]' : 'bg-gray-800/50 border-2 border-gray-700 hover:border-gray-600'}`}>
                      <input type="radio" name={question.id} value={option.id} checked={answers[question.id] === option.id} onChange={(e) => setAnswers({ ...answers, [question.id]: e.target.value })} className="accent-[#0070F3] w-5 h-5" />
                      <span className="text-gray-200 flex-1">{option.text}</span>
                    </label>
                  ))}
                </div>
              </Card>
            ))}
          </div>
          <div className="mt-8"><Card glass><div className="flex items-center justify-between"><p className="text-gray-400">{allAnswered ? 'Ready to submit your answers' : `Please answer all ${lesson.quiz.questions.length} questions`}</p><Button onClick={handleSubmitQuiz} disabled={!allAnswered} size="lg" rightIcon={<ChevronRight size={18} />}>Submit Quiz</Button></div></Card></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center px-4">
      <div className="max-w-2xl w-full">
        <Card glass className="text-center">
          <div className="mb-8">
            {isPassing ? (
              <div className="w-24 h-24 rounded-full bg-green-500/20 border-4 border-green-500 flex items-center justify-center mx-auto"><CheckCircle2 size={48} className="text-green-400" /></div>
            ) : (
              <div className="w-24 h-24 rounded-full bg-red-500/20 border-4 border-red-500 flex items-center justify-center mx-auto"><XCircle size={48} className="text-red-400" /></div>
            )}
          </div>
          <div className="mb-6"><div className="text-6xl font-bold text-white mb-2">{score}%</div><p className="text-xl text-gray-300">{isPassing ? '🎉 Congratulations!' : 'Keep Learning'}</p></div>
          <div className={`mb-8 p-6 rounded-xl ${isPassing ? 'bg-green-500/10 border-2 border-green-500/30' : 'bg-red-500/10 border-2 border-red-500/30'}`}>
            {isPassing ? (
              <div><p className="text-lg text-green-300 font-medium mb-2">You have successfully completed this lesson!</p><p className="text-gray-400">Your progress has been saved. Continue to the next lesson.</p></div>
            ) : (
              <div><p className="text-lg text-red-300 font-medium mb-2">Score below {lesson.quiz.passingScore}% passing threshold</p><p className="text-gray-400 mb-4">Review the material and try again to proceed.</p>{score < 70 && (<div className="pt-4 border-t border-red-500/30 flex items-start space-x-3 text-left"><AlertCircle className="text-red-400 flex-shrink-0 mt-0.5" size={20} /><div className="text-sm text-gray-300"><p className="font-medium text-red-400 mb-1">Manager Notification</p><p>Your supervisor has been informed to provide additional support.</p></div></div>)}</div>
            )}
          </div>
          <div className="grid grid-cols-3 gap-4 mb-8">
            <div className="p-4 bg-gray-800/50 rounded-lg"><div className="text-2xl font-bold text-white mb-1">{lesson.quiz.questions.length}</div><div className="text-sm text-gray-400">Questions</div></div>
            <div className="p-4 bg-gray-800/50 rounded-lg"><div className="text-2xl font-bold text-green-400 mb-1">{Math.round((score / 100) * lesson.quiz.questions.length)}</div><div className="text-sm text-gray-400">Correct</div></div>
            <div className="p-4 bg-gray-800/50 rounded-lg"><div className="text-2xl font-bold text-[#0070F3] mb-1">{lesson.quiz.passingScore}%</div><div className="text-sm text-gray-400">Required</div></div>
          </div>
          <div className="flex justify-center space-x-4">
            {!isPassing && (<Button variant="outline" onClick={() => { setAnswers({}); setCurrentStep('video'); }} leftIcon={<ArrowLeft size={18} />}>Review Lesson</Button>)}
            <Button onClick={() => router.push('/learn/dashboard')} leftIcon={isPassing ? <Award size={18} /> : undefined}>{isPassing ? 'Continue Learning' : 'Back to Dashboard'}</Button>
          </div>
        </Card>
      </div>
    </div>
  );
}