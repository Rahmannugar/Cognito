export const THEME = {
  LIGHT: 'light',
  DARK: 'dark',
  NIGHT_VISION: 'night-vision',
} as const;

export type Theme = (typeof THEME)[keyof typeof THEME];

export const BREAKPOINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1440,
} as const;

export const LEARNING_MODES = {
  YOUTUBE: 'youtube',
  PDF: 'pdf',
  TEACH_ME: 'teach-me',
} as const;

export type LearningMode = (typeof LEARNING_MODES)[keyof typeof LEARNING_MODES];

export const APP_CONFIG = {
  name: 'Cognito',
  description: 'AI-powered educational platform for self-directed learners',
  maxMessageLength: 500,
  chatScrollBehavior: 'smooth' as ScrollBehavior,
} as const;

export const MOCK_USER = {
  id: '550e8400-e29b-41d4-a716-446655440000',
  name: 'Alex',
  email: 'alex@example.com',
  avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAiTUnDm4p2IU6CpVMJnnPcbxFTLX0Ayre7AoEn0VStjfAB1TRCNhb_IHBqqyLE6g-ezNhYIZVzwYLFWXLRBp5EJuA__WTG3l19JybfB4qV8WGL9HBVFpHL0e3gnZhN5Mw6-ObciTopWm3SlOB3ke4HyqS7QwNqr-Zz7czYgvrPZ2ohsYFVfkywBiwFmyDyW1u2S4kAArKK2DK5sirKhCAzNGIqUfZGkA4f62JQ8vRCGjUUvG_VTdSFz0acIgbVNPxrjbwht0e9Sv8Z',
  preferences: {
    theme: 'light' as const,
    difficulty: 'intermediate' as const,
  },
};
