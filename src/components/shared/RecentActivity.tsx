import { Progress } from '@/components/ui/Progress';
import { cn } from '@/lib/utils';

interface SessionItem {
    id: string;
    title: string;
    type: 'Video' | 'PDF' | 'Quiz';
    thumbnail: string;
    progress: number;
    timeAgo: string;
}

interface RecentActivityProps {
    sessions: SessionItem[];
    className?: string;
}

export function RecentActivity({ sessions, className }: RecentActivityProps) {
    return (
        <div className={cn('bg-white dark:bg-card-dark rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-800', className)}>
            <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">Recent Sessions</h3>
                <button className="text-primary hover:bg-primary/5 p-1 rounded-md transition-colors">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <circle cx="4" cy="10" r="2" />
                        <circle cx="10" cy="10" r="2" />
                        <circle cx="16" cy="10" r="2" />
                    </svg>
                </button>
            </div>
            <div className="space-y-4">
                {sessions.map((session) => (
                    <a
                        key={session.id}
                        href="#"
                        className="group flex gap-4 p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-white/5 transition-colors items-start"
                    >
                        <div
                            className="w-20 h-14 rounded-lg bg-cover bg-center shrink-0 shadow-sm group-hover:shadow-md transition-shadow relative overflow-hidden"
                            style={{ backgroundImage: `url("${session.thumbnail}")` }}
                        >
                            <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors" />
                        </div>
                        <div className="flex-1 min-w-0">
                            <h4 className="text-sm font-bold text-gray-900 dark:text-white truncate group-hover:text-primary transition-colors">
                                {session.title}
                            </h4>
                            <p className="text-xs text-gray-500 mt-1">
                                {session.type} • {session.timeAgo}
                            </p>
                            {session.progress > 0 && session.progress < 100 && (
                                <Progress value={session.progress} className="mt-2" />
                            )}
                        </div>
                    </a>
                ))}
            </div>
            <button className="w-full mt-6 py-2 text-sm font-medium text-gray-500 hover:text-primary transition-colors border border-dashed border-gray-300 dark:border-gray-700 rounded-lg hover:border-primary hover:bg-primary/5">
                View Full History
            </button>
        </div>
    );
}
