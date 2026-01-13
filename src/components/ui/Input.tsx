import { forwardRef, type InputHTMLAttributes, type ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
    icon?: ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
    ({ className, label, error, icon, id, ...props }, ref) => {
        const inputId = id || label?.toLowerCase().replace(/\s/g, '-');

        return (
            <div className="flex flex-col gap-1.5">
                {label && (
                    <label htmlFor={inputId} className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        {label}
                    </label>
                )}
                <div className="relative">
                    {icon && (
                        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-primary/70">
                            {icon}
                        </div>
                    )}
                    <input
                        ref={ref}
                        id={inputId}
                        className={cn(
                            'w-full h-11 px-4 rounded-xl bg-gray-100 dark:bg-white/5',
                            'border-none text-sm text-gray-900 dark:text-white',
                            'placeholder-gray-400 dark:placeholder-gray-500',
                            'focus:ring-2 focus:ring-primary/50 focus:outline-none',
                            'transition-all duration-200',
                            icon && 'pl-10',
                            error && 'ring-2 ring-error/50',
                            className
                        )}
                        {...props}
                    />
                </div>
                {error && <p className="text-xs text-error font-medium">{error}</p>}
            </div>
        );
    }
);

Input.displayName = 'Input';
