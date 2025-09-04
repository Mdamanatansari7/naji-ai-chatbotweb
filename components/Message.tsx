
import React, { useEffect, useRef } from 'react';
import type { MessageRole } from '../types';
import { UserIcon, NajoIcon, SpeakerIcon } from './icons/Icons';

// TypeScript definition for highlight.js on the window object
declare global {
  interface Window {
    hljs: any;
  }
}
interface MessageProps {
  role: MessageRole;
  content: string;
  isSpeaking: boolean;
  onToggleSpeech: () => void;
  isMuted: boolean;
  username?: string;
}

// Converts markdown to HTML, with special handling for code blocks
const formatContent = (text: string) => {
  const html = text
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') // Bold
    .replace(/```(\w*)\n?([\s\S]*?)```/g, (match, lang, code) => {
      // Escape HTML entities inside the code block to prevent them from being rendered as HTML
      const escapedCode = code
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
      const languageClass = lang ? `language-${lang}` : '';
      return `<pre><code class="hljs ${languageClass}">${escapedCode}</code></pre>`;
    });

  return { __html: html };
};


export const Message: React.FC<MessageProps> = ({ role, content, isSpeaking, onToggleSpeech, isMuted, username }) => {
  const isUser = role === 'user';
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (contentRef.current) {
      const codeBlocks = contentRef.current.querySelectorAll('pre code');
      codeBlocks.forEach((block) => {
        if (window.hljs) {
            window.hljs.highlightElement(block as HTMLElement);
        }
      });
    }
  }, [content]);
  
  // Don't render empty messages, which are used as placeholders while streaming
  if (!content.trim()) {
    return null;
  }

  return (
    <div className={`
      flex items-start space-x-4
      ${isUser ? 'justify-end animate-slide-in-right' : 'animate-slide-in-left'}
    `}>
      {!isUser && (
        <div className="flex-shrink-0">
          <NajoIcon className="w-8 h-8" />
        </div>
      )}

      <div className={`
        flex-1 px-5 py-3 rounded-2xl max-w-2xl glass-card relative group
        ${isUser ? 'bg-white/20 rounded-br-none' : 'bg-white/10 rounded-bl-none'}
      `}>
        <p className="font-bold text-gray-300 mb-2">{isUser ? username : 'Najo AI'}</p>
        <div 
          ref={contentRef}
          className="text-gray-200 whitespace-pre-wrap prose prose-invert prose-sm max-w-none"
          dangerouslySetInnerHTML={formatContent(content)} 
        />
        {!isUser && (
            <button 
                onClick={onToggleSpeech}
                disabled={isMuted}
                className={`absolute top-2 right-2 p-1.5 rounded-full text-gray-400 bg-white/5 hover:bg-white/10 hover:text-white transition-all duration-200 opacity-0 group-hover:opacity-100 focus:opacity-100 ${isSpeaking ? 'opacity-100 !text-cyan-400' : ''} ${isMuted ? '!opacity-25 cursor-not-allowed' : ''}`}
                aria-label={isMuted ? "Audio is muted" : (isSpeaking ? "Stop speech" : "Read aloud")}
            >
                <SpeakerIcon className="w-4 h-4" />
            </button>
        )}
      </div>

       {isUser && (
        <div className="flex-shrink-0">
           <UserIcon username={username || 'User'} />
        </div>
      )}
    </div>
  );
};