import React from 'react';

export const MenuIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
  </svg>
);

export const PlusIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
  </svg>
);

export const HelpIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.79 4 4 0 .863-.27 1.66-.744 2.267l-1.14 1.14a1 1 0 01-1.414 0l-1.14-1.14a1 1 0 00-1.414 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 21a9 9 0 110-18 9 9 0 010 18z" />
  </svg>
);

export const ActivityIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
  </svg>
);

export const SettingsIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);

interface UserIconProps extends React.HTMLAttributes<HTMLDivElement> {
  username: string;
}

export const UserIcon: React.FC<UserIconProps> = ({ username, className, ...props }) => {
  const initial = username ? username.charAt(0).toUpperCase() : '?';
  return (
    <div
      {...props}
      className={`
        w-8 h-8 rounded-full flex items-center justify-center font-bold text-white select-none
        bg-gradient-to-br from-cyan-600 to-green-500
        ${className}
      `}
      aria-label={`User profile for ${username}`}
    >
      {initial}
    </div>
  );
};

export const NajoIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg {...props} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <defs>
      <linearGradient id="najo-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#00C9FF" />
        <stop offset="100%" stopColor="#92FE9D" />
      </linearGradient>
    </defs>
    <path d="M6 4V20L18 4V20" stroke="url(#najo-gradient)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);


export const SendIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-200" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
    <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
  </svg>
);

export const MicIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
  </svg>
);

export const ImageIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
  </svg>
);

export const AppleIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M19.33 12.012c0-2.48-1.55-3.896-3.8-3.924-1.22-.014-2.4.608-3.172 1.543-.728.877-1.325 2.221-1.325 2.221s.884-.336 2.053-.336c1.805 0 2.95.933 3.49 1.838.16.27.306.544.436.822.456.96.68 1.905.68 2.836 0 .1-.002.2-.005.3l-.01.085c0 .065-.008.13-.016.195a4.32 4.32 0 01-3.35 4.14c-1.05.33-2.23.04-3.08-.18-.847-.22-1.92-.56-3.08-.56-.99 0-2.03.24-2.88.54-.87.3-1.74.55-2.58.55-.08 0-.16-.003-.23-.008-.66-.05-1.22-.38-1.57-.88-.35-.5-.44-1.14-.24-1.77.7-2.18 2.07-4.14 3.97-5.46 1.77-1.22 3.12-1.79 4.33-1.79.43 0 .85.06 1.25.18 1.2.35 2.08 1.1 2.08 1.1s-.68-2.28-2.6-3.47c-1.3-.82-2.8-1.12-4.15-1.07-2.4.08-4.55 1.5-5.74 3.65-2.07 3.75-.55 9.25 1.52 12.18 1.05 1.49 2.45 2.29 4.1 2.29 1.02 0 2.01-.36 2.8-.97.77-.59 1.34-1.4 1.77-1.4.43 0 1.05.8 1.85 1.38.83.56 1.8.88 2.9.88 1.6 0 3-.77 4-2.05.07-.09.14-.18.2-.28a.2.2 0 00.04-.08c.03-.05.06-.1.08-.15l.08-.15c.03-.07.06-.13.08-.2.58-1.15.65-2.5.18-3.78zM15.42 6.54c.9-.99 1.48-2.28 1.34-3.54-.9.04-2.12.63-3.03 1.62-.83.9-1.5 2.25-1.36 3.47.98-.02 2.15-.56 3.05-1.55z" />
  </svg>
);

export const AndroidIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M19.2 4.8a1 1 0 00-.8-.4h-12a1 1 0 00-.8.4L3.6 8.4A10.91 10.91 0 003 12.5c0 5.25 3.8 9.5 8.5 9.5s8.5-4.25 8.5-9.5a10.91 10.91 0 00-.6-4.1l-2-3.6zM7.5 14a1.5 1.5 0 110-3 1.5 1.5 0 010 3zm9 0a1.5 1.5 0 110-3 1.5 1.5 0 010 3zM7.1 8h2.3l-1.3-2.3zm8.8 0h-2.3L15.9 5.7z"/>
  </svg>
);

export const SpeakerIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.114 5.636a9 9 0 010 12.728M16.463 8.288a5.25 5.25 0 010 7.424M6.75 8.25l4.72-4.72a.75.75 0 011.28.53v15.88a.75.75 0 01-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.01 9.01 0 012.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75z" />
    </svg>
);

export const XIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6" aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
  </svg>
);

export const ChevronDownIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-6 h-6" aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
  </svg>
);

export const SpeakerWaveIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.114 5.636a9 9 0 010 12.728M16.463 8.288a5.25 5.25 0 010 7.424M6.75 8.25l4.72-4.72a.75.75 0 011.28.53v15.88a.75.75 0 01-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.01 9.01 0 012.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75z" />
    </svg>
);

export const SpeakerXMarkIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 9.75L19.5 12m0 0l2.25 2.25M19.5 12l2.25-2.25M19.5 12l-2.25 2.25m-10.5-6l4.72-4.72a.75.75 0 011.28.53v15.88a.75.75 0 01-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.01 9.01 0 012.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75z" />
    </svg>
);

export const SearchIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
  </svg>
);