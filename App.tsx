
import React, { useState, useCallback, useEffect } from 'react';
import { Sidebar } from './components/Sidebar';
import { ChatView } from './components/ChatView';
import { SettingsModal } from './components/SettingsModal';
import { Login } from './components/Login';
import { ProfileModal } from './components/ProfileModal';
import { HelpModal } from './components/HelpModal';
import { ActivityModal } from './components/ActivityModal';
import { runChatStream } from './services/geminiService';
import type { ChatMessage, Theme, User } from './types';
import { MessageRole } from './types';

const stripMarkdownForSpeech = (text: string): string => {
  // Replace markdown for better speech flow
  return text
    .replace(/\*\*(.*?)\*\*/g, '$1') // Bold
    .replace(/```([\s\S]*?)```/g, '. Code block follows: $1') // Announce code blocks
    .replace(/`([^`]+)`/g, '$1') // Inline code
    .replace(/(\r\n|\n|\r)/gm, " ") // Replace newlines with spaces for continuous speech
    .replace(/(\* | - )/g, ". "); // List items
};

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(window.innerWidth >= 1024);
  const [speakingMessageIndex, setSpeakingMessageIndex] = useState<number | null>(null);
  
  // Modals and Settings State
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isHelpOpen, setIsHelpOpen] = useState(false);
  const [isActivityOpen, setIsActivityOpen] = useState(false);
  const [isMuted, setIsMuted] = useState<boolean>(() => localStorage.getItem('isMuted') === 'true');

  const [theme, setTheme] = useState<Theme>(() => (localStorage.getItem('theme') as Theme) || 'dark');
  const [showBubbles, setShowBubbles] = useState<boolean>(() => localStorage.getItem('showBubbles') !== 'false');

  const handleLogin = (username: string) => {
    const newUser: User = { username, lastLogin: new Date().toISOString() };
    setUser(newUser);
    localStorage.setItem('user', JSON.stringify(newUser));
  };
  
  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('user');
    // Clear chat history on logout for privacy/clean state
    setMessages([]);
    setError(null);
    setSpeakingMessageIndex(null);
    window.speechSynthesis.cancel();
  };

  useEffect(() => {
    const body = document.body;
    if (theme === 'light') {
      document.documentElement.classList.add('theme-light');
    } else {
      document.documentElement.classList.remove('theme-light');
    }
    
    if (showBubbles) {
      body.classList.remove('bubbles-disabled');
    } else {
      body.classList.add('bubbles-disabled');
    }

    localStorage.setItem('theme', theme);
    localStorage.setItem('showBubbles', String(showBubbles));
    localStorage.setItem('isMuted', String(isMuted));
  }, [theme, showBubbles, isMuted]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024) {
        setIsSidebarOpen(false);
      } else {
        setIsSidebarOpen(true);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleToggleMute = () => {
    const newMutedState = !isMuted;
    setIsMuted(newMutedState);
    if (newMutedState) {
        window.speechSynthesis.cancel();
        setSpeakingMessageIndex(null);
    }
  };

  const handleToggleSpeech = useCallback((index: number, content: string) => {
    if (isMuted) return;

    if (!('speechSynthesis' in window)) {
      setError("Sorry, your browser doesn't support text-to-speech.");
      return;
    }

    const wasSpeakingThisMessage = speakingMessageIndex === index;
    window.speechSynthesis.cancel();

    if (wasSpeakingThisMessage) {
      setSpeakingMessageIndex(null);
      return;
    }

    const cleanedContent = stripMarkdownForSpeech(content);
    const utterance = new SpeechSynthesisUtterance(cleanedContent);

    utterance.onend = () => {
      setSpeakingMessageIndex(null);
    };
    utterance.onerror = (event) => {
      console.error('SpeechSynthesisUtterance.onerror', event);
      setError(`An error occurred during speech synthesis: ${event.error}`);
      setSpeakingMessageIndex(null);
    };

    setSpeakingMessageIndex(index);
    window.speechSynthesis.speak(utterance);
  }, [speakingMessageIndex, isMuted]);

  const sendMessage = useCallback(async (prompt: string) => {
    if (!prompt || isLoading) return;

    window.speechSynthesis.cancel();
    setSpeakingMessageIndex(null);
    setIsLoading(true);
    setError(null);
    const userMessage: ChatMessage = { role: MessageRole.USER, content: prompt };
    
    setMessages(prev => [...prev, userMessage, { role: MessageRole.MODEL, content: '' }]);

    try {
      const stream = runChatStream(prompt);
      
      for await (const chunk of stream) {
        setMessages(prev => {
          const newMessages = [...prev];
          newMessages[newMessages.length - 1].content += chunk;
          return newMessages;
        });
      }

    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred.';
      setError(`Failed to get response from AI. ${errorMessage}`);
      setMessages(prev => {
        const newMessages = [...prev];
        newMessages[newMessages.length - 1].content = `Sorry, I encountered an error: ${errorMessage}`;
        return newMessages;
      });
    } finally {
      setIsLoading(false);
    }
  }, [isLoading]);
  
  const startNewChat = () => {
    setMessages([]);
    setError(null);
    window.speechSynthesis.cancel();
    setSpeakingMessageIndex(null);
    if (window.innerWidth < 1024) {
      setIsSidebarOpen(false);
    }
  }
  
  const handleClearHistory = () => {
    if (window.confirm("Are you sure you want to clear the entire chat history? This action cannot be undone.")) {
      startNewChat();
    }
  };

  if (!user) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <div className="flex h-screen w-full text-gray-200 font-sans overflow-hidden">
      <Sidebar 
        isOpen={isSidebarOpen} 
        setIsOpen={setIsSidebarOpen} 
        startNewChat={startNewChat}
        onOpenSettings={() => setIsSettingsOpen(true)}
        onOpenHelp={() => setIsHelpOpen(true)}
        onOpenActivity={() => setIsActivityOpen(true)}
      />
      {isSidebarOpen && <div onClick={() => setIsSidebarOpen(false)} className="fixed inset-0 bg-black/60 z-10 lg:hidden" aria-hidden="true"></div>}
      <div className="flex-1 flex flex-col">
        <ChatView 
          messages={messages} 
          isLoading={isLoading} 
          error={error} 
          sendMessage={sendMessage}
          toggleSidebar={() => setIsSidebarOpen(prev => !prev)}
          speakingMessageIndex={speakingMessageIndex}
          onToggleSpeech={handleToggleSpeech}
          username={user.username}
          onOpenProfile={() => setIsProfileOpen(true)}
          isMuted={isMuted}
          onToggleMute={handleToggleMute}
        />
      </div>
      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        theme={theme}
        onThemeChange={setTheme}
        showBubbles={showBubbles}
        onShowBubblesChange={setShowBubbles}
        onClearHistory={handleClearHistory}
      />
      <ProfileModal
        isOpen={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
        user={user}
        onLogout={handleLogout}
      />
      <HelpModal isOpen={isHelpOpen} onClose={() => setIsHelpOpen(false)} />
      <ActivityModal 
        isOpen={isActivityOpen} 
        onClose={() => setIsActivityOpen(false)} 
        messages={messages} 
      />
    </div>
  );
};

export default App;