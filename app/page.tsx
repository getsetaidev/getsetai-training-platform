'use client';

import Link from 'next/link';
import { useApp } from '@/lib/context/AppContext';
import { Card } from '@/components/ui';
import { Upload, BookOpen, BarChart3, Users, GraduationCap, FileCheck } from 'lucide-react';

export default function Home() {
  const { currentRole } = useApp();

  const adminFeatures = [
    { icon: Upload, title: 'Upload Documents', description: 'Train AI with your compliance materials', href: '/admin/upload' },
    { icon: BookOpen, title: 'Generate Courses', description: 'AI-powered course creation', href: '/admin/generate' },
    { icon: FileCheck, title: 'Review Content', description: 'Approve or regenerate content', href: '/admin/review' },
    { icon: BarChart3, title: 'Analytics', description: 'Track learner performance', href: '/admin/analytics' },
  ];

  const learnerFeatures = [
    { icon: GraduationCap, title: 'My Dashboard', description: 'View your learning progress', href: '/learn/dashboard' },
  ];

  const hrFeatures = [
    { icon: Users, title: 'Compliance Tracking', description: 'Monitor employee training status', href: '/hr/compliance' },
  ];

  const features = currentRole === 'admin' ? adminFeatures : currentRole === 'learner' ? learnerFeatures : hrFeatures;

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-white mb-6">
            Welcome to <span className="text-[#0070F3]">GetSetAI</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            AI-powered compliance training platform. Upload your documents, generate courses automatically, 
            and ensure regulatory compliance across your organization.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <Link key={feature.href} href={feature.href}>
                <Card glass hover className="h-full">
                  <div className="flex flex-col items-center text-center space-y-4">
                    <div className="w-12 h-12 rounded-lg bg-[#0070F3]/20 border border-[#0070F3]/30 flex items-center justify-center">
                      <Icon className="text-[#0070F3]" size={24} />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-2">
                        {feature.title}
                      </h3>
                      <p className="text-sm text-gray-400">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </Card>
              </Link>
            );
          })}
        </div>

        {/* Stats Section */}
        <div className="mt-20 glass-strong rounded-xl p-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-[#0070F3] mb-2">42</div>
              <div className="text-sm text-gray-400">Active Learners</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-[#0070F3] mb-2">2</div>
              <div className="text-sm text-gray-400">Published Modules</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-[#0070F3] mb-2">78%</div>
              <div className="text-sm text-gray-400">Average Score</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-[#0070F3] mb-2">95%</div>
              <div className="text-sm text-gray-400">Compliance Rate</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
