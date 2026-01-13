import { useState } from 'react';
import { ChevronRight, Check, Lock, Lightbulb, Book, Code, LogOut, Settings, User } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/Button';
import { Progress } from '@/components/ui/Progress';
import { cn } from '@/lib/utils';

const LESSON_OUTLINE = [
    { id: '1', title: '1. Introduction to Syntax', completed: true },
    {
        id: '2',
        title: '2. Understanding Variables',
        active: true,
        progress: 45,
        subtopics: [
            { id: '2.1', title: '2.1 What is a variable?' },
            { id: '2.2', title: '2.2 Core Concepts', active: true },
            { id: '2.3', title: '2.3 Assignment Operators' },
        ],
    },
    { id: '3', title: '3. Data Types', locked: true },
    { id: '4', title: '4. Control Flow', locked: true },
];

export default function TeachMe() {
    const [sidebarOpen] = useState(true);

    return (
        <div className="h-screen flex bg-background-light dark:bg-background-dark overflow-hidden">
            <aside
                className={cn(
                    'w-[300px] h-full flex flex-col border-r border-gray-200 dark:border-gray-800',
                    'bg-gray-50 dark:bg-gray-900 shrink-0 transition-all duration-300 relative z-20',
                    !sidebarOpen && 'w-0 overflow-hidden'
                )}
            >
                <div className="h-16 flex items-center justify-between px-6 border-b border-gray-100 dark:border-gray-800">
                    <h2 className="font-bold text-lg tracking-tight">
                        Cognito <span className="text-primary font-normal">Teach Me</span>
                    </h2>
                    <button className="p-1.5 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-500 transition-colors">
                        <ChevronRight className="w-5 h-5 rotate-180" />
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto custom-scrollbar p-4 flex flex-col gap-6">
                    <div>
                        <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3 px-2">
                            Current Module
                        </h3>
                        <div className="flex flex-col gap-1">
                            {LESSON_OUTLINE.map((item) => (
                                <div key={item.id}>
                                    {item.completed && (
                                        <div className="px-3 py-2.5 rounded-lg flex items-center gap-3 text-gray-500 dark:text-gray-400 bg-green-50/50 dark:bg-green-900/10">
                                            <Check className="w-5 h-5 text-green-500" />
                                            <span className="text-sm font-medium line-through decoration-gray-300">{item.title}</span>
                                        </div>
                                    )}
                                    {item.active && (
                                        <div className="px-3 py-3 rounded-lg flex flex-col gap-2 bg-white dark:bg-gray-800 shadow-sm ring-1 ring-gray-200 dark:ring-gray-700 relative overflow-hidden">
                                            <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary" />
                                            <div className="flex items-start gap-3">
                                                <svg className="w-5 h-5 text-primary mt-0.5" fill="currentColor" viewBox="0 0 24 24">
                                                    <path d="M8 5v14l11-7z" />
                                                </svg>
                                                <div className="flex flex-col">
                                                    <span className="text-sm font-bold text-gray-900 dark:text-white">{item.title}</span>
                                                    <span className="text-xs text-primary mt-1 font-medium">In Progress • {item.progress}%</span>
                                                    {item.subtopics && (
                                                        <div className="mt-3 flex flex-col gap-2 pl-1 border-l-2 border-gray-100 dark:border-gray-700 ml-1">
                                                            {item.subtopics.map((sub) => (
                                                                <button
                                                                    key={sub.id}
                                                                    className={cn(
                                                                        'text-left pl-3 text-xs font-medium transition-colors flex items-center gap-1',
                                                                        sub.active
                                                                            ? 'text-primary font-bold'
                                                                            : 'text-gray-500 hover:text-primary'
                                                                    )}
                                                                >
                                                                    {sub.title}
                                                                    {sub.active && <span className="w-1.5 h-1.5 rounded-full bg-primary ml-1" />}
                                                                </button>
                                                            ))}
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                    {item.locked && (
                                        <div className="px-3 py-2.5 rounded-lg flex items-center gap-3 text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors cursor-pointer">
                                            <Lock className="w-5 h-5" />
                                            <span className="text-sm font-medium">{item.title}</span>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>

                    <div>
                        <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3 px-2">Resources</h3>
                        <div className="flex flex-col gap-1">
                            <button className="px-3 py-2 rounded-lg flex items-center gap-3 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-sm font-medium">
                                <Book className="w-4 h-4" /> Documentation
                            </button>
                            <button className="px-3 py-2 rounded-lg flex items-center gap-3 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-sm font-medium">
                                <Code className="w-4 h-4" /> Code Snippets
                            </button>
                        </div>
                    </div>
                </div>

                <div className="p-4 border-t border-gray-200 dark:border-gray-800">
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-semibold text-gray-500">Course Progress</span>
                        <span className="text-xs font-bold text-primary">25%</span>
                    </div>
                    <Progress value={25} />
                </div>
            </aside>

            <main className="flex-1 relative bg-background-light dark:bg-background-dark bg-[size:20px_20px] bg-grid-pattern dark:bg-grid-pattern-dark flex flex-col overflow-hidden">
                <header className="absolute top-0 right-0 left-0 p-6 flex justify-end items-center pointer-events-none z-10">
                    <div className="flex items-center gap-3 pointer-events-auto bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-1.5 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
                        <button className="w-9 h-9 flex items-center justify-center rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300 transition-colors">
                            <Settings className="w-5 h-5" />
                        </button>
                        <button className="w-9 h-9 flex items-center justify-center rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300 transition-colors">
                            <User className="w-5 h-5" />
                        </button>
                        <div className="w-px h-5 bg-gray-200 dark:bg-gray-600 mx-1" />
                        <Link to="/">
                            <button className="px-3 h-9 flex items-center gap-2 rounded-lg bg-red-50 hover:bg-red-100 text-red-600 dark:bg-red-900/20 dark:text-red-400 dark:hover:bg-red-900/30 transition-colors text-sm font-semibold">
                                <LogOut className="w-4 h-4" /> Exit Mode
                            </button>
                        </Link>
                    </div>
                </header>

                <div className="flex-1 overflow-y-auto p-8 pt-20 md:px-20 lg:px-32 max-w-7xl mx-auto w-full">
                    <div className="flex items-center gap-2 text-sm text-gray-400 mb-6">
                        <span>Python Basics</span>
                        <ChevronRight className="w-4 h-4" />
                        <span>Variables</span>
                        <ChevronRight className="w-4 h-4" />
                        <span className="text-primary font-medium">Core Concepts</span>
                    </div>

                    <div className="mb-10">
                        <h1 className="text-4xl md:text-5xl font-black tracking-tight text-gray-900 dark:text-white mb-4">
                            Understanding Variables
                        </h1>
                        <p className="text-xl text-gray-500 dark:text-gray-400 font-light max-w-3xl leading-relaxed">
                            A variable is like a container that stores data values. In Python, variables are created when you assign a value to it, acting as a label for that data location.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-12">
                        <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-soft border border-gray-100 dark:border-gray-700">
                            <div className="w-10 h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center mb-4">
                                <Lightbulb className="w-5 h-5" />
                            </div>
                            <h3 className="text-lg font-bold mb-2">The Concept</h3>
                            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                                Think of a variable as a labeled box. You can put things in the box (assignment) and look inside the box to see what&apos;s there (retrieval). The name on the box is the variable name.
                            </p>
                        </div>

                        <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-soft border border-gray-100 dark:border-gray-700 flex flex-col">
                            <div className="flex-1 bg-gray-50 dark:bg-gray-900/50 rounded-xl mb-4 border border-dashed border-gray-200 dark:border-gray-700 flex items-center justify-center p-6 relative">
                                <div className="relative z-10 bg-white dark:bg-gray-800 px-4 py-2 rounded-lg shadow-sm border border-gray-200 dark:border-gray-600 flex items-center gap-3">
                                    <span className="font-mono text-purple-600 dark:text-purple-400">score</span>
                                    <ChevronRight className="w-4 h-4 text-gray-400" />
                                    <span className="font-mono text-blue-600 dark:text-blue-400 font-bold">10</span>
                                </div>
                            </div>
                            <p className="text-sm text-gray-500 text-center">
                                Visual representation of <code className="bg-gray-100 dark:bg-gray-700 px-1.5 py-0.5 rounded text-primary text-xs">score = 10</code>
                            </p>
                        </div>
                    </div>

                    <div className="mb-32">
                        <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 overflow-hidden shadow-sm">
                            <div className="bg-gray-50 dark:bg-gray-900/50 px-6 py-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
                                <div className="flex items-center gap-3">
                                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-white text-xs font-bold">1</span>
                                    <h3 className="font-bold text-gray-900 dark:text-white">Interactive Exercise</h3>
                                </div>
                                <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded">Practice</span>
                            </div>
                            <div className="p-6 md:p-8 flex flex-col md:flex-row gap-8 items-start">
                                <div className="flex-1">
                                    <p className="text-gray-700 dark:text-gray-300 mb-6 font-medium">
                                        Drag the integer block into the correct variable container named <code className="text-primary">player_lives</code> to initialize the game state.
                                    </p>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="h-24 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-900/30">
                                            <span className="text-xs text-gray-400 mb-2 font-mono">player_lives</span>
                                            <div className="w-12 h-12 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800" />
                                        </div>
                                        <div className="h-24 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-900/30 opacity-50">
                                            <span className="text-xs text-gray-400 mb-2 font-mono">game_over</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="w-full md:w-64 flex flex-col gap-3 bg-gray-50 dark:bg-gray-900/50 p-4 rounded-xl">
                                    <p className="text-xs font-bold text-gray-400 uppercase mb-1">Available Values</p>
                                    <div className="p-3 bg-white dark:bg-gray-800 shadow-sm border border-gray-200 dark:border-gray-600 rounded-lg cursor-grab flex items-center justify-between group hover:border-primary/50 transition-colors">
                                        <div className="flex items-center gap-3">
                                            <span className="text-blue-500 font-bold">123</span>
                                            <span className="font-mono font-bold text-gray-800 dark:text-white">3</span>
                                        </div>
                                        <svg className="w-5 h-5 text-gray-300 group-hover:text-primary" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M11 18c0 1.1-.9 2-2 2s-2-.9-2-2 .9-2 2-2 2 .9 2 2zm-2-8c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0-6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm6 4c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" />
                                        </svg>
                                    </div>
                                    <div className="p-3 bg-white dark:bg-gray-800 shadow-sm border border-gray-200 dark:border-gray-600 rounded-lg cursor-grab flex items-center justify-between group hover:border-primary/50 transition-colors">
                                        <div className="flex items-center gap-3">
                                            <span className="text-green-500 font-bold">abc</span>
                                            <span className="font-mono font-bold text-gray-800 dark:text-white">&quot;Start&quot;</span>
                                        </div>
                                        <svg className="w-5 h-5 text-gray-300 group-hover:text-primary" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M11 18c0 1.1-.9 2-2 2s-2-.9-2-2 .9-2 2-2 2 .9 2 2zm-2-8c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0-6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm6 4c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" />
                                        </svg>
                                    </div>
                                </div>
                            </div>
                            <div className="px-6 py-4 bg-gray-50 dark:bg-gray-900/50 border-t border-gray-200 dark:border-gray-700 flex justify-end">
                                <Button>
                                    Check Answer <ChevronRight className="w-4 h-4" />
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <div className="fixed bottom-8 right-8 z-50 group">
                <div className="absolute bottom-full right-1/2 translate-x-1/2 mb-3 w-max px-3 py-1.5 bg-gray-900 text-white text-xs font-medium rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-lg">
                    Ask Ajibade for help
                    <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-1 border-4 border-transparent border-t-gray-900" />
                </div>
                <button className="relative w-20 h-20 rounded-full bg-white dark:bg-gray-800 shadow-xl hover:shadow-2xl transition-all flex items-center justify-center border-4 border-white dark:border-gray-800 group-hover:scale-105 active:scale-95">
                    <div className="absolute inset-0 rounded-full border-2 border-primary/20 animate-pulse" />
                    <div className="w-full h-full rounded-full overflow-hidden relative bg-gradient-to-br from-primary to-purple-800">
                        <div className="absolute inset-0 flex items-center justify-center text-white text-3xl font-black">A</div>
                    </div>
                    <div className="absolute top-0 right-0 h-6 w-6 bg-red-500 border-4 border-white dark:border-gray-800 rounded-full flex items-center justify-center transform translate-x-1 -translate-y-1 shadow-sm">
                        <span className="w-2 h-2 bg-white rounded-full" />
                    </div>
                </button>
            </div>
        </div>
    );
}
