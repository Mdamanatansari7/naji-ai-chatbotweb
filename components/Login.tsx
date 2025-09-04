
import React, { useState } from 'react';
import { NajoIcon } from './icons/Icons';

interface LoginProps {
  onLogin: (username: string) => void;
}

export const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [username, setUsername] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username.trim()) {
      onLogin(username.trim());
    }
  };

  return (
    <div className="flex h-screen w-full items-center justify-center p-4">
      <div className="w-full max-w-sm">
        <form 
          onSubmit={handleSubmit} 
          className="glass-card rounded-2xl p-8 text-center shadow-2xl animate-slide-in-up"
        >
          <div className="flex justify-center mb-6">
            <NajoIcon className="w-16 h-16" />
          </div>
          <h1 className="text-3xl font-bold mb-2 text-text-primary">Welcome to <span className="gradient-text">Najo AI</span></h1>
          <p className="text-text-secondary mb-8">Please enter a username to continue.</p>
          
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter your username"
            className="w-full bg-black/20 text-text-primary rounded-lg px-4 py-3 mb-6 border border-transparent focus:outline-none focus:ring-2 focus:ring-cyan-500/50 transition-all duration-200"
            aria-label="Username"
            required
          />
          
          <button
            type="submit"
            disabled={!username.trim()}
            className="w-full p-3 rounded-lg font-semibold text-white transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:scale-100 bg-gradient-to-r from-cyan-500 to-green-400"
          >
            Start Chatting
          </button>
        </form>
      </div>
    </div>
  );
};
