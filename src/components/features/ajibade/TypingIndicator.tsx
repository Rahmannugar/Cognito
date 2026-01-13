export function TypingIndicator() {
    return (
        <div className="flex gap-3">
            <div className="w-8 h-8 rounded-full bg-primary/20 shrink-0 flex items-center justify-center self-end mb-1">
                <span className="text-primary font-bold text-sm">A</span>
            </div>
            <div className="bg-white dark:bg-gray-700 border border-gray-100 dark:border-gray-600 p-3 rounded-2xl rounded-bl-none shadow-sm w-16 flex items-center justify-center gap-1">
                <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
            </div>
        </div>
    );
}
