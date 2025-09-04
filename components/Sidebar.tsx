
import React, { useState, useEffect } from 'react';
import { MenuIcon, PlusIcon, HelpIcon, ActivityIcon, SettingsIcon, AppleIcon, AndroidIcon } from './icons/Icons';

interface SidebarProps {
  startNewChat: () => void;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  onOpenSettings: () => void;
  onOpenHelp: () => void;
  onOpenActivity: () => void;
}

type DetectedOS = 'iOS' | 'Android' | 'Other';

const getOS = (): DetectedOS => {
  if (typeof navigator === 'undefined') return 'Other';
  const userAgent = navigator.userAgent || navigator.vendor;
  if (/iPad|iPhone|iPod/.test(userAgent)) {
    return 'iOS';
  }
  if (/android/i.test(userAgent)) {
    return 'Android';
  }
  return 'Other';
};


export const Sidebar: React.FC<SidebarProps> = ({ 
  startNewChat, 
  isOpen, 
  setIsOpen, 
  onOpenSettings,
  onOpenHelp,
  onOpenActivity
}) => {
  const [os, setOs] = useState<DetectedOS>('Other');

  useEffect(() => {
    setOs(getOS());
  }, []);

  const AppLink: React.FC<{ href: string; icon: React.ReactNode; text: string; }> = ({ href, icon, text }) => (
    <a href={href} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center p-2 bg-white text-black rounded-lg hover:bg-gray-200 transition-transform duration-200 transform hover:scale-105">
        {icon}
        <span className="ml-2 font-semibold">{text}</span>
    </a>
  );

  const renderDownloadLinks = () => {
    switch (os) {
      case 'iOS':
        return <AppLink href="#app-store" icon={<AppleIcon />} text="App Store" />;
      case 'Android':
        return <AppLink href="#google-play" icon={<AndroidIcon />} text="Google Play" />;
      case 'Other':
      default:
        return (
          <>
            <AppLink href="#app-store" icon={<AppleIcon />} text="App Store" />
            <AppLink href="#google-play" icon={<AndroidIcon />} text="Google Play" />
          </>
        );
    }
  };


  return (
    <div className={`
      flex flex-col p-4 h-full shadow-lg glass-card
      transition-transform lg:transition-all duration-300 ease-in-out
      fixed lg:relative z-20
      ${isOpen ? 'translate-x-0 w-64' : '-translate-x-full w-64 lg:w-20 lg:translate-x-0'}
    `}>
      <div className="flex items-center mb-8 h-10">
        <button onClick={() => setIsOpen(!isOpen)} className="p-2 rounded-full hover:bg-white/10 transition-colors duration-200">
          <MenuIcon />
        </button>
      </div>

      <button 
        onClick={startNewChat} 
        className="flex items-center justify-start p-3 bg-white/10 rounded-full hover:bg-white/20 transition-all duration-200 w-full mb-6 group"
      >
        <PlusIcon className="transition-transform duration-300 group-hover:rotate-90" />
        <span className={`
          ml-4 text-sm font-medium whitespace-nowrap
          transition-opacity duration-200
          ${isOpen ? 'opacity-100' : 'opacity-0'}
        `}>New chat</span>
      </button>

      <div className={`flex-grow transition-opacity duration-200 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none lg:opacity-0'}`}>
        <h2 className="text-sm text-gray-400 font-semibold mb-2 px-2">Recent</h2>
        <div className="text-gray-400 text-sm px-2">No recent chats</div>
      </div>
      {!isOpen && <div className="flex-grow"></div>}

      {isOpen && (
         <div className="mb-6 p-4 bg-black/20 rounded-lg text-center transition-opacity duration-300 ease-in-out delay-100">
            <h3 className="font-bold text-lg text-white mb-2">Download Najo AI</h3>
            <p className="text-sm text-gray-400 mb-4">Get the best of Najo AI on your phone.</p>
            <div className="flex flex-col space-y-3">
              {renderDownloadLinks()}
            </div>
        </div>
      )}

      <div className="space-y-1">
        {[
          { icon: <HelpIcon />, label: 'Help', action: onOpenHelp },
          { icon: <ActivityIcon />, label: 'Activity', action: onOpenActivity },
          { icon: <SettingsIcon />, label: 'Settings', action: onOpenSettings },
        ].map(({ icon, label, action }) => (
          <button key={label} onClick={action} className="flex items-center p-2 rounded-full hover:bg-white/10 w-full transition-colors duration-200 group text-left">
            {icon}
            <span className={`
              ml-4 text-sm whitespace-nowrap
              transition-opacity duration-200
              ${isOpen ? 'opacity-100' : 'opacity-0'}
            `}>{label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};