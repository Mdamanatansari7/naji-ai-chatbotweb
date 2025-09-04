import React, { useState, useMemo } from 'react';
import type { ChatMessage } from '../types';
import { MessageRole } from '../types';
import { XIcon, SearchIcon } from './icons/Icons';

interface ActivityModalProps {
  isOpen: boolean;
  onClose: () => void;
  messages: ChatMessage[];
}

const ActivityModal: React.FC<ActivityModalProps> = ({ isOpen, onClose, messages }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const userPrompts = useMemo(() => {
    return messages
      .filter(msg => msg.role === MessageRole.USER && msg.content.trim() !== '')
      .reverse();
  }, [messages]);

  const filteredPrompts = useMemo(() => {
    if (!searchTerm.trim()) {
      return userPrompts;
    }
    return userPrompts.filter(prompt =>
      prompt.content.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [userPrompts, searchTerm]);

  if (!isOpen) {
    return null;
  }

  return (
    <div 
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm animate-fade-in" 
        onClick={onClose}
        role="dialog"
        aria-modal="true"
        aria-labelledby="activity-title"
    >
      <div 
        className="glass-card rounded-2xl w-full max-w-lg m-4 p-6 shadow-2xl text-text-primary animate-slide-in-up flex flex-col max-h-[90vh]" 
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-4 flex-shrink-0">
          <h2 id="activity-title" className="text-2xl font-bold">Activity</h2>
          <button onClick={onClose} className="p-2 rounded-full hover:bg-white/10" aria-label="Close activity">
            <XIcon />
          </button>
        </div>

        <div className="relative mb-4 flex-shrink-0">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search prompts..."
            className="w-full bg-black/20 text-text-primary rounded-lg pl-10 pr-4 py-2 border border-transparent focus:outline-none focus:ring-2 focus:ring-cyan-500/50 transition-all duration-200"
            aria-label="Search prompts"
          />
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary">
            <SearchIcon />
          </div>
        </div>

        <div className="overflow-y-auto space-y-3 pr-2">
          {filteredPrompts.length > 0 ? (
            filteredPrompts.map((prompt, index) => (
              <div key={index} className="p-3 bg-white/5 rounded-lg text-sm text-text-secondary">
                {prompt.content}
              </div>
            ))
          ) : (
            <p className="text-center text-text-secondary text-sm py-8">
              {searchTerm ? 'No matching prompts found.' : 'You haven\'t sent any prompts yet.'}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export { ActivityModal };
