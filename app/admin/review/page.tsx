'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, Button, TextArea, Badge } from '@/components/ui';
import { MOCK_CONTENT_BLOCKS } from '@/lib/mockData';
import { CheckCircle, RefreshCw } from 'lucide-react';

export default function AdminReviewPage() {
  const router = useRouter();
  const [blocks, setBlocks] = useState(MOCK_CONTENT_BLOCKS['mod-1']);
  const [notes, setNotes] = useState('');

  const handleToggle = (blockId: string, status: 'approved' | 'regenerate') => {
    setBlocks(blocks.map(b => b.id === blockId ? { ...b, status } : b));
  };

  const handlePublish = () => {
    router.push('/admin/analytics');
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Review & Approve Content</h1>
        <p className="text-gray-400">Review AI-generated content before publishing</p>
      </div>

      <Card glass className="mb-6">
        <h3 className="text-lg font-semibold text-white mb-6">Content Blocks</h3>
        <div className="space-y-4">
          {blocks.map((block) => (
            <div key={block.id} className="flex items-center justify-between p-4 bg-gray-900 rounded-lg">
              <div className="flex-1">
                <h4 className="text-white font-medium">{block.title}</h4>
                <p className="text-sm text-gray-400 mt-1">{block.meta}</p>
              </div>
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => handleToggle(block.id, 'approved')}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                    block.status === 'approved' 
                      ? 'bg-green-500/20 text-green-400 border border-green-500/30' 
                      : 'bg-gray-800 text-gray-400 border border-gray-700 hover:bg-gray-700'
                  }`}
                >
                  <CheckCircle size={16} />
                  <span className="text-sm">Approve</span>
                </button>
                <button
                  onClick={() => handleToggle(block.id, 'regenerate')}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                    block.status === 'regenerate' 
                      ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30' 
                      : 'bg-gray-800 text-gray-400 border border-gray-700 hover:bg-gray-700'
                  }`}
                >
                  <RefreshCw size={16} />
                  <span className="text-sm">Regenerate</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </Card>

      <Card glass className="mb-6">
        <h3 className="text-lg font-semibold text-white mb-4">Admin Notes</h3>
        <TextArea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Add notes about the review process..."
          rows={4}
        />
      </Card>

      <div className="flex justify-between">
        <Button variant="outline" onClick={() => router.push('/admin/generate')}>
          Back to Generate
        </Button>
        <Button onClick={handlePublish} disabled={blocks.some(b => b.status === 'pending')}>
          Publish Module
        </Button>
      </div>
    </div>
  );
}
