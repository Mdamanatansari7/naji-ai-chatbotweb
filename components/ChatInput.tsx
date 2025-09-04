
import React, { useState, useRef, useEffect } from 'react';
import { SendIcon, MicIcon, ImageIcon } from './icons/Icons';

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  isLoading: boolean;
}

export const ChatInput: React.FC<ChatInputProps> = ({ onSendMessage, isLoading }) => {
  const [input, setInput] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  }, [input]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() && !isLoading) {
      onSendMessage(input);
      setInput('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        handleSubmit(e as unknown as React.FormEvent);
    }
  };

  const canSubmit = !isLoading && input.trim();

  return (
    <form onSubmit={handleSubmit} className="relative">
      <textarea
        ref={textareaRef}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Enter a prompt here"
        className="w-full text-gray-200 rounded-2xl py-4 pl-6 pr-36 resize-none focus:outline-none transition-all duration-200 max-h-48 glass-card focus-glow"
        rows={1}
        disabled={isLoading}
        aria-label="Chat input"
      />
      <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center space-x-2">
         <button type="button" className="p-2 rounded-full hover:bg-white/20 disabled:opacity-50 transition-colors" disabled={isLoading} aria-label="Attach image">
          <ImageIcon />
        </button>
        <button type="button" className="p-2 rounded-full hover:bg-white/20 disabled:opacity-50 transition-colors" disabled={isLoading} aria-label="Use microphone">
          <MicIcon />
        </button>
        <button
          type="submit"
          className={`p-2 rounded-full transition-all duration-200 transform button-glow ${canSubmit ? 'bg-gradient-to-r from-cyan-500 to-green-400 hover:scale-110' : 'bg-gray-700 cursor-not-allowed'}`}
          disabled={!canSubmit}
          aria-label="Send message"
        >
          <SendIcon className={`transition-transform duration-200 ${canSubmit ? 'translate-x-0' : '-translate-x-8'}`} />
        </button>
      </div>
    </form>
  );
};