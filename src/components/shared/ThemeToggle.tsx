import { Sun, Moon, Eye } from 'lucide-react';
import { useTheme } from '@/hooks/useTheme';
import { cn } from '@/lib/utils';

export function ThemeToggle() {
    const { theme, toggleTheme } = useTheme();

    const icons = {
        light: Sun,
        dark: Moon,
        'night-vision': Eye,
    };

    const Icon = icons[theme];

    return (
        <button
            onClick={toggleTheme}
            className={cn(
                'p-2 rounded-lg transition-colors',
                'text-gray-600 dark:text-gray-300',
                'hover:bg-gray-100 dark:hover:bg-white/10',
                'focus:outline-none focus:ring-2 focus:ring-primary/50'
            )}
            aria-label={`Switch to ${theme === 'light' ? 'dark' : theme === 'dark' ? 'night vision' : 'light'} mode`}
        >
            <Icon className="w-5 h-5" />
        </button>
    );
}
