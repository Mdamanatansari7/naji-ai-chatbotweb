
export enum MessageRole {
  USER = 'user',
  MODEL = 'model',
}

export interface ChatMessage {
  role: MessageRole;
  content: string;
}

export type Theme = 'light' | 'dark';

export interface User {
  username: string;
  lastLogin: string;
}
