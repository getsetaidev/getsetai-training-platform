'use client';

import React from 'react';
import Link from 'next/link';
import { useApp } from '@/lib/context/AppContext';
import { Menu, User, Settings } from 'lucide-react';

export const Header: React.FC = () => {
  const { currentRole, setCurrentRole, currentUser } = useApp();

  const roleOptions: Array<{ value: 'admin' | 'learner' | 'hr'; label: string }> = [
    { value: 'admin', label: 'Admin' },
    { value: 'learner', label: 'Learner' },
    { value: 'hr', label: 'HR' },
  ];

  return (
    <header className="glass-strong sticky top-0 z-40 border-b border-gray-700/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3">
            <div className="text-2xl font-bold">
              <span className="text-white">GetSet</span>
              <span className="text-[#0070F3]">AI</span>
            </div>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            {currentRole === 'admin' && (
              <>
                <Link
                  href="/admin/upload"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Upload
                </Link>
                <Link
                  href="/admin/generate"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Generate
                </Link>
                <Link
                  href="/admin/review"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Review
                </Link>
                <Link
                  href="/admin/analytics"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Analytics
                </Link>
              </>
            )}
            {currentRole === 'learner' && (
              <>
                <Link
                  href="/learn/dashboard"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Dashboard
                </Link>
              </>
            )}
            {currentRole === 'hr' && (
              <>
                <Link
                  href="/hr/compliance"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Compliance
                </Link>
              </>
            )}
          </nav>

          {/* Right Section */}
          <div className="flex items-center space-x-4">
            {/* Role Switcher */}
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-400">Role:</span>
              <select
                value={currentRole}
                onChange={(e) => setCurrentRole(e.target.value as any)}
                className="bg-gray-800 border border-gray-700 rounded-lg px-3 py-1.5 text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#0070F3] transition-all cursor-pointer"
              >
                {roleOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            {/* User Info */}
            <div className="flex items-center space-x-2 pl-4 border-l border-gray-700">
              <div className="w-8 h-8 rounded-full bg-[#0070F3]/20 border border-[#0070F3]/30 flex items-center justify-center">
                <User size={18} className="text-[#0070F3]" />
              </div>
              <div className="hidden sm:block text-sm">
                <div className="text-white font-medium">{currentUser.name}</div>
                <div className="text-gray-400 text-xs">{currentUser.role}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
