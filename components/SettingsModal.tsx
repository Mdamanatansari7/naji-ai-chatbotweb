import React from 'react';
import type { Theme } from '../types';
import { XIcon } from './icons/Icons';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  theme: Theme;
  onThemeChange: (theme: Theme) => void;
  showBubbles: boolean;
  onShowBubblesChange: (show: boolean) => void;
  onClearHistory: () => void;
}

const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen,
  onClose,
  theme,
  onThemeChange,
  showBubbles,
  onShowBubblesChange,
  onClearHistory
}) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div 
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm animate-fade-in" 
        onClick={onClose}
        role="dialog"
        aria-modal="true"
        aria-labelledby="settings-title"
    >
      <div 
        className="glass-card rounded-2xl w-full max-w-md m-4 p-6 shadow-2xl text-text-primary animate-slide-in-up" 
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-6">
          <h2 id="settings-title" className="text-2xl font-bold">Settings</h2>
          <button onClick={onClose} className="p-2 rounded-full hover:bg-white/10" aria-label="Close settings">
            <XIcon />
          </button>
        </div>

        <div className="space-y-6">
          {/* Theme Setting */}
          <div>
            <label className="block text-sm font-medium text-text-secondary mb-2">Theme</label>
            <div className="flex items-center space-x-2 p-1 rounded-full bg-black/20">
              <button 
                onClick={() => onThemeChange('light')}
                className={`w-full py-2 px-4 rounded-full text-sm font-semibold transition-all duration-300 theme-option ${theme === 'light' ? 'active' : ''}`}
              >
                Light
              </button>
              <button 
                onClick={() => onThemeChange('dark')}
                className={`w-full py-2 px-4 rounded-full text-sm font-semibold transition-all duration-300 theme-option ${theme === 'dark' ? 'active' : ''}`}
              >
                Dark
              </button>
            </div>
          </div>
          
          {/* Animated Background Setting */}
          <div className="flex justify-between items-center">
            <label htmlFor="bubbles-toggle" className="text-sm font-medium text-text-secondary">Animated Background</label>
            <button
                id="bubbles-toggle"
                role="switch"
                aria-checked={showBubbles}
                onClick={() => onShowBubblesChange(!showBubbles)}
                className="relative inline-flex items-center h-7 w-12 rounded-full transition-colors duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 toggle-switch"
            >
                <span className="sr-only">Toggle Animated Background</span>
                <span className="inline-block w-5 h-5 bg-white rounded-full shadow-md transform transition-transform duration-300 ease-in-out toggle-knob"></span>
            </button>
          </div>

          {/* Clear History Setting */}
           <div>
            <label className="block text-sm font-medium text-text-secondary mb-2">Data</label>
            <button 
                onClick={onClearHistory}
                className="w-full text-left py-3 px-4 rounded-lg bg-red-500/20 text-red-300 hover:bg-red-500/40 hover:text-red-200 transition-colors duration-200"
            >
                Clear Chat History
            </button>
           </div>
        </div>
      </div>
    </div>
  );
};

export { SettingsModal };
