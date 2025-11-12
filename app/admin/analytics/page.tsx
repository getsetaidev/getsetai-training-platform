'use client';

import React from 'react';
import { Card, Button, Badge } from '@/components/ui';
import { MOCK_ANALYTICS, MOCK_LEARNERS } from '@/lib/mockData';
import { Users, TrendingUp, Award, AlertCircle, Download, Bell, RefreshCw } from 'lucide-react';

export default function AdminAnalyticsPage() {
  const analytics = MOCK_ANALYTICS;
  const learners = MOCK_LEARNERS;

  const stats = [
    { icon: Users, label: 'Total Learners', value: analytics.totalLearners, color: 'text-blue-400' },
    { icon: TrendingUp, label: 'Active Learners', value: analytics.activeLearners, color: 'text-green-400' },
    { icon: Award, label: 'Avg Score', value: `${analytics.avgScore}%`, color: 'text-purple-400' },
    { icon: AlertCircle, label: 'Flagged Learners', value: analytics.flaggedLearners, color: 'text-red-400' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Analytics Dashboard</h1>
        <p className="text-gray-400">Monitor learner progress and performance</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.label} glass>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-400 mb-1">{stat.label}</p>
                  <p className={`text-3xl font-bold ${stat.color}`}>{stat.value}</p>
                </div>
                <Icon size={40} className={`${stat.color} opacity-50`} />
              </div>
            </Card>
          );
        })}
      </div>

      {/* Actions */}
      <div className="flex flex-wrap gap-4 mb-8">
        <Button leftIcon={<Download size={16} />}>Export Report</Button>
        <Button variant="outline" leftIcon={<Bell size={16} />}>Notify HR</Button>
        <Button variant="outline" leftIcon={<RefreshCw size={16} />}>Regenerate Module</Button>
      </div>

      {/* Learners Table */}
      <Card glass>
        <h3 className="text-lg font-semibold text-white mb-6">Learner Performance</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-b border-gray-700">
              <tr>
                <th className="text-left text-sm font-medium text-gray-400 pb-3">Name</th>
                <th className="text-left text-sm font-medium text-gray-400 pb-3">Progress</th>
                <th className="text-left text-sm font-medium text-gray-400 pb-3">Avg Score</th>
                <th className="text-left text-sm font-medium text-gray-400 pb-3">Flags</th>
              </tr>
            </thead>
            <tbody>
              {learners.map((learner) => {
                const moduleProgress = Object.values(learner.progress)[0];
                return (
                  <tr key={learner.id} className="border-b border-gray-800 last:border-0">
                    <td className="py-4">
                      <div>
                        <p className="text-white font-medium">{learner.name}</p>
                        <p className="text-sm text-gray-400">{learner.email}</p>
                      </div>
                    </td>
                    <td className="py-4">
                      <Badge variant={moduleProgress?.status === 'completed' ? 'success' : moduleProgress?.status === 'in-progress' ? 'warning' : 'default'}>
                        {moduleProgress?.status || 'Not Started'}
                      </Badge>
                    </td>
                    <td className="py-4">
                      <span className={`font-medium ${
                        (moduleProgress?.overallScore || 0) >= 70 ? 'text-green-400' : 'text-red-400'
                      }`}>
                        {moduleProgress?.overallScore || 0}%
                      </span>
                    </td>
                    <td className="py-4">
                      {learner.flags.length > 0 ? (
                        <Badge variant="error">{learner.flags.length} Flag(s)</Badge>
                      ) : (
                        <span className="text-gray-500">None</span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
