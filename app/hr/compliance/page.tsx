'use client';

import React, { useState } from 'react';
import { Card, Button, Badge } from '@/components/ui';
import { MOCK_HR_COMPLIANCE, MOCK_MODULES } from '@/lib/mockData';
import { Download, FileText, CheckCircle, AlertCircle, Bell } from 'lucide-react';

export default function HRCompliancePage() {
  const [reminderEnabled, setReminderEnabled] = useState(false);
  const complianceData = MOCK_HR_COMPLIANCE;
  const modules = MOCK_MODULES.filter(m => m.status === 'published');

  const handleExport = (format: 'csv' | 'pdf') => {
    alert(`Exporting data as ${format.toUpperCase()}...`);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Compliance Tracking</h1>
        <p className="text-gray-400">Monitor employee training completion and compliance status</p>
      </div>

      {/* Actions Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
        <div className="flex gap-4">
          <Button 
            leftIcon={<Download size={16} />}
            onClick={() => handleExport('csv')}
          >
            Export CSV
          </Button>
          <Button 
            variant="outline"
            leftIcon={<FileText size={16} />}
            onClick={() => handleExport('pdf')}
          >
            Export PDF
          </Button>
        </div>
        
        <div className="flex items-center space-x-3">
          <label className="flex items-center space-x-2 cursor-pointer">
            <input
              type="checkbox"
              checked={reminderEnabled}
              onChange={(e) => setReminderEnabled(e.target.checked)}
              className="w-4 h-4 accent-[#0070F3]"
            />
            <span className="text-sm text-gray-300">Auto-reminders</span>
          </label>
          <Button 
            variant="outline" 
            size="sm"
            leftIcon={<Bell size={16} />}
          >
            Send Reminders
          </Button>
        </div>
      </div>

      {/* Compliance Table */}
      <Card glass>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-b border-gray-700">
              <tr>
                <th className="text-left text-sm font-medium text-gray-400 pb-3 pr-4">Employee</th>
                {modules.map((mod) => (
                  <th key={mod.id} className="text-center text-sm font-medium text-gray-400 pb-3 px-2">
                    {mod.title}
                  </th>
                ))}
                <th className="text-center text-sm font-medium text-gray-400 pb-3 pl-4">Overall</th>
              </tr>
            </thead>
            <tbody>
              {complianceData.map((record) => (
                <tr key={record.employeeId} className="border-b border-gray-800 last:border-0">
                  <td className="py-4 pr-4">
                    <div>
                      <p className="text-white font-medium">{record.employeeName}</p>
                      <p className="text-sm text-gray-400">{record.email}</p>
                    </div>
                  </td>
                  {modules.map((mod) => {
                    const status = record.modules[mod.id];
                    return (
                      <td key={mod.id} className="py-4 text-center px-2">
                        {status ? (
                          status.completed ? (
                            <div className="flex flex-col items-center">
                              <CheckCircle size={20} className="text-green-400 mb-1" />
                              {status.score && (
                                <span className="text-xs text-gray-400">{status.score}%</span>
                              )}
                            </div>
                          ) : (
                            <div className="flex flex-col items-center">
                              <AlertCircle size={20} className="text-yellow-400 mb-1" />
                              {status.dueDate && (
                                <span className="text-xs text-gray-400">
                                  Due {new Date(status.dueDate).toLocaleDateString()}
                                </span>
                              )}
                            </div>
                          )
                        ) : (
                          <span className="text-gray-600">-</span>
                        )}
                      </td>
                    );
                  })}
                  <td className="py-4 text-center pl-4">
                    <Badge 
                      variant={
                        record.overallCompliance >= 80 
                          ? 'success' 
                          : record.overallCompliance >= 50 
                          ? 'warning' 
                          : 'error'
                      }
                    >
                      {record.overallCompliance}%
                    </Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        <Card glass>
          <div className="text-center">
            <p className="text-sm text-gray-400 mb-2">Total Employees</p>
            <p className="text-3xl font-bold text-white">{complianceData.length}</p>
          </div>
        </Card>
        <Card glass>
          <div className="text-center">
            <p className="text-sm text-gray-400 mb-2">Fully Compliant</p>
            <p className="text-3xl font-bold text-green-400">
              {complianceData.filter(r => r.overallCompliance === 100).length}
            </p>
          </div>
        </Card>
        <Card glass>
          <div className="text-center">
            <p className="text-sm text-gray-400 mb-2">Need Follow-up</p>
            <p className="text-3xl font-bold text-yellow-400">
              {complianceData.filter(r => r.overallCompliance < 80).length}
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
}
