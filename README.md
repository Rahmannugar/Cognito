# Cognito

An AI-powered educational platform for self-directed learners, featuring interactive learning modes, an AI tutor named Ajibade, and progress tracking.

![Dashboard Preview](stitch_ajibade_youtube_tutor_interface/ajibade_student_dashboard/screen.png)

## Features

- **YouTube Tutor** - Turn any video into an interactive lesson with real-time quizzes
- **PDF Tutor** - Upload documents for AI-powered summaries and explanations
- **Teach Me Anything** - Step-by-step explanations on any topic
- **Quiz Mode** - Test your knowledge with timed quizzes and instant feedback
- **Ajibade AI Tutor** - Your personal AI learning assistant
- **Theme System** - Light, Dark, and Night Vision modes

## Tech Stack

- React 19 + TypeScript
- Vite 5
- Tailwind CSS 3.4 + tailwindcss-animate
- Framer Motion 11
- Zustand (state management)
- Zod (validation)
- React Router 6
- Lucide React (icons)

## Getting Started

```bash
# Install dependencies
npm install --legacy-peer-deps

# Start development server
npm run dev

# Build for production
npm run build
```

## Project Structure

```
src/
├── components/
│   ├── ui/           # Atomic components (Button, Card, Input, etc.)
│   ├── layout/       # Header, AppLayout, BottomSheet
│   ├── features/     # Feature-specific components
│   └── shared/       # Reusable shared components
├── contexts/         # React contexts
├── hooks/            # Custom hooks
├── lib/              # Utilities and constants
├── pages/            # Route pages
├── types/            # TypeScript types
└── styles/           # Global styles
```

## Routes

| Path | Description |
|------|-------------|
| `/` | Dashboard |
| `/youtube` | YouTube Tutor |
| `/pdf` | PDF Tutor |
| `/teach-me` | Teach Me Anything |
| `/quiz` | Quiz Mode |
| `/login` | Login |

## License

MIT
