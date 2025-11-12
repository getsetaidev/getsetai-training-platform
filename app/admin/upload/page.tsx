'use client';

import React, { useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { Card, Button, Spinner } from '@/components/ui';
import { TagInput } from '@/components/TagInput';
import { Upload, FileText, CheckCircle } from 'lucide-react';

export default function AdminUploadPage() {
  const router = useRouter();
  const [tags, setTags] = useState<string[]>([]);
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadComplete, setUploadComplete] = useState(false);
  const [dragActive, setDragActive] = useState(false);

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0]);
    }
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file || tags.length === 0) return;
    
    setIsUploading(true);
    
    // Simulate upload process
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsUploading(false);
    setUploadComplete(true);
    
    // Navigate to generate page after 1.5s
    setTimeout(() => {
      router.push('/admin/generate');
    }, 1500);
  };

  if (uploadComplete) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <Card glass className="text-center py-12">
          <CheckCircle size={64} className="text-green-400 mx-auto mb-6" />
          <h2 className="text-2xl font-semibold text-white mb-4">
            Upload Complete!
          </h2>
          <p className="text-gray-400 mb-6">
            Processing your document and generating course content...
          </p>
          <Spinner size="lg" className="mx-auto" />
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Upload Training Documents</h1>
        <p className="text-gray-400">
          Upload compliance documents, SOPs, or training materials to train the AI
        </p>
      </div>

      <Card glass className="mb-6">
        <div
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          className={`relative border-2 border-dashed rounded-lg p-12 text-center transition-all ${
            dragActive
              ? 'border-[#0070F3] bg-[#0070F3]/10'
              : 'border-gray-600 hover:border-gray-500'
          }`}
        >
          <input
            type="file"
            id="file-upload"
            onChange={handleFileChange}
            className="hidden"
            accept=".pdf,.doc,.docx,.txt"
          />
          
          {file ? (
            <div className="flex items-center justify-center space-x-3">
              <FileText size={32} className="text-[#0070F3]" />
              <div className="text-left">
                <p className="text-white font-medium">{file.name}</p>
                <p className="text-sm text-gray-400">
                  {(file.size / 1024 / 1024).toFixed(2)} MB
                </p>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setFile(null)}
              >
                Remove
              </Button>
            </div>
          ) : (
            <label htmlFor="file-upload" className="cursor-pointer">
              <Upload size={48} className="text-gray-400 mx-auto mb-4" />
              <p className="text-white font-medium mb-2">
                Drop your file here or browse
              </p>
              <p className="text-sm text-gray-400">
                Supports PDF, DOC, DOCX, TXT up to 50MB
              </p>
            </label>
          )}
        </div>
      </Card>

      <Card glass className="mb-6">
        <h3 className="text-lg font-semibold text-white mb-4">Add Tags</h3>
        <TagInput
          tags={tags}
          onTagsChange={setTags}
          placeholder="e.g., KYC, Compliance, Legal..."
          maxTags={5}
        />
      </Card>

      <div className="flex items-center justify-end space-x-4">
        <Button
          variant="outline"
          onClick={() => router.push('/')}
        >
          Cancel
        </Button>
        <Button
          onClick={handleUpload}
          disabled={!file || tags.length === 0 || isUploading}
          isLoading={isUploading}
        >
          {isUploading ? 'Uploading...' : 'Upload & Generate'}
        </Button>
      </div>
    </div>
  );
}
