import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, Bell, GraduationCap } from 'lucide-react';
import { Avatar } from '@/components/ui/Avatar';
import { ThemeToggle } from '@/components/shared/ThemeToggle';
import { Input } from '@/components/ui/Input';
import { cn } from '@/lib/utils';
import { MOCK_USER } from '@/lib/constants';

const navLinks = [
    { href: '/', label: 'Dashboard' },
    { href: '/classes', label: 'My Classes' },
    { href: '/community', label: 'Community' },
    { href: '/settings', label: 'Settings' },
];

export function Header() {
    const location = useLocation();
    const [hasNotifications] = useState(true);

    return (
        <header className="sticky top-0 z-50 w-full bg-white/80 dark:bg-background-dark/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800">
            <div className="max-w-[1440px] mx-auto px-6 py-4 flex items-center justify-between">
                <div className="flex items-center gap-10">
                    <Link to="/" className="flex items-center gap-3">
                        <div className="w-8 h-8 text-primary bg-primary/10 rounded-lg flex items-center justify-center">
                            <GraduationCap className="w-5 h-5" />
                        </div>
                        <h2 className="text-gray-900 dark:text-white text-xl font-bold tracking-tight">
                            Cognito
                        </h2>
                    </Link>

                    <nav className="hidden md:flex items-center gap-8">
                        {navLinks.map((link) => {
                            const isActive = location.pathname === link.href;
                            return (
                                <Link
                                    key={link.href}
                                    to={link.href}
                                    className={cn(
                                        'text-sm font-medium transition-colors',
                                        isActive
                                            ? 'text-primary font-semibold'
                                            : 'text-gray-700 dark:text-gray-300 hover:text-primary'
                                    )}
                                >
                                    {link.label}
                                </Link>
                            );
                        })}
                    </nav>
                </div>

                <div className="flex items-center gap-6">
                    <div className="hidden lg:block w-64">
                        <Input
                            placeholder="Search topics..."
                            icon={<Search className="w-5 h-5" />}
                            className="bg-gray-100 dark:bg-white/5"
                        />
                    </div>

                    <ThemeToggle />

                    <button className="relative p-2 text-gray-700 dark:text-white hover:bg-gray-100 dark:hover:bg-white/10 rounded-full transition-colors">
                        <Bell className="w-5 h-5" />
                        {hasNotifications && (
                            <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white dark:border-background-dark" />
                        )}
                    </button>

                    <Avatar
                        src={MOCK_USER.avatar}
                        alt={MOCK_USER.name}
                        size="sm"
                        className="cursor-pointer"
                    />
                </div>
            </div>
        </header>
    );
}
