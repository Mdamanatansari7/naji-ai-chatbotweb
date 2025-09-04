import React, { useRef, useEffect, useState } from 'react';
import type { ChatMessage } from '../types';
import { MessageRole } from '../types';
import { Message } from './Message';
import { ChatInput } from './ChatInput';
import { UserIcon, NajoIcon, MenuIcon, ChevronDownIcon, SpeakerWaveIcon, SpeakerXMarkIcon } from './icons/Icons';

interface ChatViewProps {
  messages: ChatMessage[];
  isLoading: boolean;
  error: string | null;
  sendMessage: (prompt: string) => void;
  toggleSidebar: () => void;
  speakingMessageIndex: number | null;
  onToggleSpeech: (index: number, content: string) => void;
  username: string;
  onOpenProfile: () => void;
  isMuted: boolean;
  onToggleMute: () => void;
}

const WelcomeScreen: React.FC = () => (
  <div className="flex flex-col items-start justify-center h-full text-white animate-slide-in-left">
      <h1 className="text-5xl md:text-6xl font-medium animated-gradient-text">
        Hello, I'm Najo AI
      </h1>
      <h2 className="text-5xl md:text-6xl font-medium text-gray-400 mt-2">How can I help you today?</h2>
  </div>
);

const LoadingIndicator: React.FC = () => (
  <div className="flex items-start space-x-4 animate-slide-in-left">
    <NajoIcon className="w-8 h-8 flex-shrink-0"/>
    <div className="flex items-center space-x-2 pt-2">
        <div className="w-3 h-3 rounded-full loader-dot"></div>
        <div className="w-3 h-3 rounded-full loader-dot"></div>
        <div className="w-3 h-3 rounded-full loader-dot"></div>
    </div>
  </div>
);


export const ChatView: React.FC<ChatViewProps> = ({ 
    messages, 
    isLoading, 
    error, 
    sendMessage, 
    toggleSidebar, 
    speakingMessageIndex, 
    onToggleSpeech, 
    username, 
    onOpenProfile,
    isMuted,
    onToggleMute
}) => {
  const mainScrollRef = useRef<HTMLElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [showScrollButton, setShowScrollButton] = useState(false);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  
  const handleScroll = () => {
    const mainEl = mainScrollRef.current;
    if (mainEl) {
      const isScrolledUp = mainEl.scrollHeight - mainEl.scrollTop > mainEl.clientHeight + 200;
      setShowScrollButton(isScrolledUp);
    }
  };

  useEffect(() => {
    const mainEl = mainScrollRef.current;
    if (mainEl) {
      // Only auto-scroll if user is near the bottom, preventing scroll jumps
      const isNearBottom = mainEl.scrollHeight - mainEl.scrollTop < mainEl.clientHeight + 300;
      if (isNearBottom) {
        scrollToBottom();
      }
    }
  }, [messages, isLoading]);

  return (
    <div className="flex-1 flex flex-col max-h-screen">
      <header className="p-4 flex justify-between items-center text-xl text-gray-300 glass-card rounded-b-xl z-10">
        <div className="flex items-center gap-4">
          <button onClick={toggleSidebar} className="p-2 rounded-full hover:bg-white/10 lg:hidden" aria-label="Toggle sidebar">
            <MenuIcon />
          </button>
          <span>Najo AI</span>
        </div>
        <div className="flex items-center gap-2">
            <button onClick={onToggleMute} className="p-2 rounded-full hover:bg-white/10 transition-colors" aria-label={isMuted ? "Unmute audio" : "Mute audio"}>
                {isMuted ? <SpeakerXMarkIcon /> : <SpeakerWaveIcon />}
            </button>
            <button onClick={onOpenProfile} className="rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white" aria-label="Open profile">
                <UserIcon username={username} />
            </button>
        </div>
      </header>
      <main ref={mainScrollRef} onScroll={handleScroll} className="flex-1 overflow-y-auto px-4 sm:px-6 md:px-8">
        <div className="max-w-4xl mx-auto h-full pt-8">
        {messages.length === 0 && !isLoading ? (
          <WelcomeScreen />
        ) : (
          <div className="flex flex-col space-y-8 pb-8">
            {messages.map((msg, index) => (
              <Message 
                key={index} 
                role={msg.role} 
                content={msg.content}
                isSpeaking={speakingMessageIndex === index}
                onToggleSpeech={() => onToggleSpeech(index, msg.content)}
                username={msg.role === MessageRole.USER ? username : undefined}
                isMuted={isMuted}
              />
            ))}
            {isLoading && messages[messages.length -1]?.content === '' && (
              <LoadingIndicator />
            )}
            {error && <div className="text-red-400 animate-slide-in-left">{error}</div>}
             <div ref={messagesEndRef} />
          </div>
        )}
        </div>
      </main>
      <footer className="px-4 sm:px-6 md:px-8 pb-4">
        <div className="max-w-4xl mx-auto relative">
            {showScrollButton && (
              <button 
                onClick={scrollToBottom}
                className="absolute -top-16 right-0 w-10 h-10 flex items-center justify-center rounded-full glass-card hover:bg-white/20 transition-all duration-300 animate-bounce-in"
                aria-label="Scroll to bottom"
              >
                <ChevronDownIcon />
              </button>
            )}
            <ChatInput onSendMessage={sendMessage} isLoading={isLoading} />
            <p className="text-center text-xs text-gray-500 mt-3">
                Najo AI may display inaccurate info, including about people, so double-check its responses. Your privacy is important.
            </p>
        </div>
      </footer>
    </div>
  );
};