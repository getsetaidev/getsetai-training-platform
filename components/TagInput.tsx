'use client';

import React, { useState, KeyboardEvent } from 'react';
import { X } from 'lucide-react';

interface TagInputProps {
  tags: string[];
  onTagsChange: (tags: string[]) => void;
  placeholder?: string;
  maxTags?: number;
}

export const TagInput: React.FC<TagInputProps> = ({
  tags,
  onTagsChange,
  placeholder = 'Add a tag...',
  maxTags = 10,
}) => {
  const [input, setInput] = useState('');

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && input.trim()) {
      e.preventDefault();
      if (tags.length < maxTags && !tags.includes(input.trim())) {
        onTagsChange([...tags, input.trim()]);
        setInput('');
      }
    } else if (e.key === 'Backspace' && !input && tags.length > 0) {
      onTagsChange(tags.slice(0, -1));
    }
  };

  const removeTag = (indexToRemove: number) => {
    onTagsChange(tags.filter((_, index) => index !== indexToRemove));
  };

  return (
    <div className="w-full">
      <div className="flex flex-wrap items-center gap-2 p-2 bg-gray-900 border border-gray-700 rounded-lg focus-within:ring-2 focus-within:ring-[#0070F3] focus-within:border-transparent transition-all">
        {tags.map((tag, index) => (
          <span
            key={index}
            className="inline-flex items-center gap-1 px-2 py-1 bg-[#0070F3]/20 border border-[#0070F3]/30 rounded-full text-sm text-blue-300"
          >
            {tag}
            <button
              type="button"
              onClick={() => removeTag(index)}
              className="hover:text-white transition-colors"
            >
              <X size={14} />
            </button>
          </span>
        ))}
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={tags.length < maxTags ? placeholder : `Max ${maxTags} tags`}
          disabled={tags.length >= maxTags}
          className="flex-1 min-w-[120px] bg-transparent border-none outline-none text-white placeholder-gray-500 disabled:opacity-50"
        />
      </div>
      <p className="mt-1 text-xs text-gray-400">
        Press Enter to add tags • {tags.length}/{maxTags} tags
      </p>
    </div>
  );
};
