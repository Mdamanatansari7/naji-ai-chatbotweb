
import React, { useState, useEffect } from 'react';
import type { User } from '../types';
import { XIcon } from './icons/Icons';

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: User;
  onLogout: () => void;
}

const ProfileModal: React.FC<ProfileModalProps> = ({ isOpen, onClose, user, onLogout }) => {
  const [ipAddress, setIpAddress] = useState<string>('Fetching...');

  useEffect(() => {
    if (isOpen) {
      setIpAddress('Fetching...'); // Reset on open
      fetch('https://api.ipify.org?format=json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => setIpAddress(data.ip))
        .catch(() => setIpAddress('Unavailable'));
    }
  }, [isOpen]);

  if (!isOpen) {
    return null;
  }

  const formattedDate = new Date(user.lastLogin).toLocaleString();

  return (
    <div 
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm animate-fade-in" 
        onClick={onClose}
        role="dialog"
        aria-modal="true"
        aria-labelledby="profile-title"
    >
      <div 
        className="glass-card rounded-2xl w-full max-w-md m-4 p-6 shadow-2xl text-text-primary animate-slide-in-up" 
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-6">
          <h2 id="profile-title" className="text-2xl font-bold">Profile</h2>
          <button onClick={onClose} className="p-2 rounded-full hover:bg-white/10" aria-label="Close profile">
            <XIcon />
          </button>
        </div>

        <div className="space-y-4 text-sm">
          <div className="flex justify-between">
            <span className="font-medium text-text-secondary">Username:</span>
            <span className="font-mono">{user.username}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium text-text-secondary">Public IP Address:</span>
            <span className="font-mono">{ipAddress}</span>
          </div>
           <div className="flex justify-between">
            <span className="font-medium text-text-secondary">Last Login:</span>
            <span className="font-mono">{formattedDate}</span>
          </div>
        </div>

        <button
          onClick={onLogout}
          className="mt-8 w-full text-left py-3 px-4 rounded-lg bg-red-500/20 text-red-300 hover:bg-red-500/40 hover:text-red-200 transition-colors duration-200"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export { ProfileModal };
