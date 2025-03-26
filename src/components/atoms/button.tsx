import { cn } from '@/lib/utils/cn';
import Link from 'next/link';
import { Fragment, PropsWithChildren } from 'react';

type ButtonProps = {
    variant: 'primary' | 'bordered';
    href?: never;
} & React.ButtonHTMLAttributes<HTMLButtonElement>

type LinkButtonProps = {
    variant: 'primary' | 'bordered';
    href: string;
} & React.AnchorHTMLAttributes<HTMLAnchorElement>

export function Button({ variant, className, children, href, ...props }: PropsWithChildren<ButtonProps | LinkButtonProps>) {

    const classNames = cn(
        'flex items-center justify-center gap-2.5',
        'h-9 px-5 rounded-xl font-medium cursor-pointer transition-colors',
        variant === 'primary' && 'bg-indigo-400 hover:bg-indigo-300 text-zinc-900',
        variant === 'bordered' && 'bg-zinc-900 hover:bg-zinc-800 text-zinc-50 border border-zinc-700',
        className
    );

    return (
        <Fragment>
            {
                href ? (
                    <Link
                        className={classNames}
                        href={href}
                        {...props as React.AnchorHTMLAttributes<HTMLAnchorElement>}
                    >
                        {children}
                    </Link>
                ) :
                    <button
                        className={classNames}
                        {...props as React.ButtonHTMLAttributes<HTMLButtonElement>}
                    >
                        {children}
                    </button >
            }
        </Fragment>
    );

}