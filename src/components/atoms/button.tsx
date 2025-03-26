import { cn } from '@/lib/utils/cn';
import { PropsWithChildren } from 'react';

type ButtonProps = {
    variant: 'primary' | 'bordered';
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export function Button({ variant, className, children, ...props }: PropsWithChildren<ButtonProps>) {
    return (
        <button
            className={cn(
                'flex items-center justify-center gap-2.5',
                'h-9 px-5 rounded-xl font-medium cursor-pointer transition-colors',
                variant === 'primary' && 'bg-indigo-400 hover:bg-indigo-300 text-zinc-900',
                variant === 'bordered' && 'bg-zinc-900 hover:bg-zinc-800 text-zinc-50 border border-zinc-700',
                className
            )}
            {...props}
        >
            {children}
        </button>
    );

}