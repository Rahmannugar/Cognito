import { useState, useRef, useEffect, type FormEvent } from 'react';
import { Send, Plus } from 'lucide-react';
import { Avatar } from '@/components/ui/Avatar';
import { MessageBubble } from './MessageBubble';
import { TypingIndicator } from './TypingIndicator';
import { cn } from '@/lib/utils';

interface Message {
    id: string;
    role: 'user' | 'assistant';
    content: string;
    timestamp: string;
}

interface AjibadePanelProps {
    className?: string;
    suggestions?: string[];
}

const AJIBADE_AVATAR =
    'https://lh3.googleusercontent.com/aida-public/AB6AXuDkH0kka7DRgS-jI7Ly3Of2i2wqkEdRvuAbPmhSPvb0UK1bQ8j5N9IKTM_osJ2ZJjMeyr-uKs50xFNFKGocFqESzHXw6y8_U1OVb95PYLYshFSMqAfK_sqprcZRIEm1swDinLba1DP2flEI7gg2gcP_sBmTW36RDuuOh5Zc8PtkfxdunITyPK2Un-ZvNycNDJmBqfa1FKWvAIwOoglokkaoonVbXUzYa_gL8O_eDfMA9cpJwQgf4ks9BbNOIzr-qz-3iHEov1jxzIz9';

const INITIAL_MESSAGES: Message[] = [
    {
        id: '1',
        role: 'assistant',
        content: "Hello! I'm Ajibade, your AI tutor. How can I help you learn today?",
        timestamp: '10:23 AM',
    },
];

export function AjibadePanel({ className, suggestions = [] }: AjibadePanelProps) {
    const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
    const [input, setInput] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const chatRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (chatRef.current) {
            chatRef.current.scrollTop = chatRef.current.scrollHeight;
        }
    }, [messages, isTyping]);

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        if (!input.trim()) return;

        const userMessage: Message = {
            id: Date.now().toString(),
            role: 'user',
            content: input.trim(),
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        };

        setMessages((prev) => [...prev, userMessage]);
        setInput('');
        setIsTyping(true);

        setTimeout(() => {
            setIsTyping(false);
            const aiMessage: Message = {
                id: (Date.now() + 1).toString(),
                role: 'assistant',
                content: "That's a great question! Let me help you understand this concept better.",
                timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            };
            setMessages((prev) => [...prev, aiMessage]);
        }, 1500);
    };

    return (
        <div className={cn('flex flex-col bg-white dark:bg-card-dark border-l border-gray-200 dark:border-gray-700 shadow-xl', className)}>
            <div className="p-6 border-b border-gray-200 dark:border-gray-700 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm flex flex-col items-center justify-center gap-3">
                <Avatar src={AJIBADE_AVATAR} alt="Ajibade" size="lg" ring status="online" />
                <div className="text-center">
                    <h3 className="font-bold text-lg text-gray-900 dark:text-white">Ajibade AI Tutor</h3>
                    <p className="text-xs text-primary font-medium bg-primary/10 px-2 py-0.5 rounded-full inline-block">
                        Online • Ready to help
                    </p>
                </div>
            </div>

            <div ref={chatRef} className="flex-1 overflow-y-auto p-4 space-y-6 chat-scroll bg-gray-50 dark:bg-gray-900/50">
                <div className="flex justify-center">
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">
                        Today
                    </span>
                </div>
                {messages.map((message) => (
                    <MessageBubble
                        key={message.id}
                        role={message.role}
                        content={message.content}
                        timestamp={message.timestamp}
                        avatar={message.role === 'assistant' ? AJIBADE_AVATAR : undefined}
                    />
                ))}
                {isTyping && <TypingIndicator />}
            </div>

            <div className="p-4 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
                {suggestions.length > 0 && (
                    <div className="flex gap-2 mb-3 overflow-x-auto scrollbar-hide">
                        {suggestions.map((suggestion, i) => (
                            <button
                                key={i}
                                onClick={() => setInput(suggestion)}
                                className="whitespace-nowrap px-3 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-medium hover:bg-primary/20 transition-colors border border-primary/20"
                            >
                                {suggestion}
                            </button>
                        ))}
                    </div>
                )}
                <form onSubmit={handleSubmit}>
                    <div className="relative flex items-end gap-2 bg-gray-100 dark:bg-gray-700 p-2 rounded-xl focus-within:ring-2 focus-within:ring-primary/20 transition-all border border-transparent focus-within:border-primary/30">
                        <button
                            type="button"
                            className="p-2 text-gray-400 hover:text-primary transition-colors rounded-full hover:bg-white/50 dark:hover:bg-white/10"
                        >
                            <Plus className="w-5 h-5" />
                        </button>
                        <textarea
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter' && !e.shiftKey) {
                                    e.preventDefault();
                                    handleSubmit(e);
                                }
                            }}
                            className="w-full bg-transparent border-0 p-2 text-sm max-h-32 focus:ring-0 resize-none text-gray-900 dark:text-white placeholder-gray-400"
                            placeholder="Ask a question..."
                            rows={1}
                        />
                        <button
                            type="submit"
                            disabled={!input.trim()}
                            className="p-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors shadow-sm mb-0.5 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <Send className="w-5 h-5" />
                        </button>
                    </div>
                </form>
                <p className="text-[10px] text-center text-gray-400 mt-2">
                    Ajibade can make mistakes. Consider checking important information.
                </p>
            </div>
        </div>
    );
}
