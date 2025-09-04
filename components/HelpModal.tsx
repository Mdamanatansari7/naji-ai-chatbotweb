import React from 'react';
import { XIcon, NajoIcon } from './icons/Icons';

interface HelpModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const HelpModal: React.FC<HelpModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div 
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm animate-fade-in" 
        onClick={onClose}
        role="dialog"
        aria-modal="true"
        aria-labelledby="help-title"
    >
      <div 
        className="glass-card rounded-2xl w-full max-w-lg m-4 p-6 shadow-2xl text-text-primary animate-slide-in-up flex flex-col max-h-[90vh]" 
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-4 flex-shrink-0">
          <div className="flex items-center gap-3">
            <NajoIcon className="w-8 h-8"/>
            <h2 id="help-title" className="text-2xl font-bold">Help Center</h2>
          </div>
          <button onClick={onClose} className="p-2 rounded-full hover:bg-white/10" aria-label="Close help">
            <XIcon />
          </button>
        </div>

        <div className="space-y-6 overflow-y-auto pr-2">
          <div>
            <h3 className="font-semibold text-lg mb-2 text-cyan-400">About Najo AI</h3>
            <p className="text-sm text-text-secondary">
              Najo AI is a sleek, conversational AI chat application powered by the Gemini API. It's designed to provide a modern, transparent, and intuitive interface for interacting with a powerful language model.
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg mb-2 text-cyan-400">Key Features</h3>
            <ul className="list-disc list-inside space-y-2 text-sm text-text-secondary">
              <li><strong>Real-time Responses:</strong> Get instant, streamed answers to your prompts.</li>
              <li><strong>Markdown & Code Support:</strong> Responses are beautifully formatted with syntax highlighting for code blocks.</li>
              <li><strong>Text-to-Speech:</strong> Listen to the AI's responses with a single click.</li>
              <li><strong>Customizable Themes:</strong> Switch between light and dark modes to suit your preference.</li>
              <li><strong>Persistent History:</strong> Your conversations are saved locally (until you clear them).</li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-2 text-cyan-400">Tips & Tricks</h3>
            <ul className="list-disc list-inside space-y-2 text-sm text-text-secondary">
                <li>To create a new line in your prompt without sending, press <kbd className="px-2 py-1 text-xs font-semibold text-gray-800 bg-gray-100 border border-gray-200 rounded-lg">Shift</kbd> + <kbd className="px-2 py-1 text-xs font-semibold text-gray-800 bg-gray-100 border border-gray-200 rounded-lg">Enter</kbd>.</li>
                <li>You can review your past prompts in the "Activity" panel, accessible from the sidebar.</li>
                <li>In the "Settings" panel, you can toggle the animated background, switch themes, and clear your chat history.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export { HelpModal };
