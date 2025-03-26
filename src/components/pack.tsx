import { cn } from '@/lib/utils/cn';

export function Pack() {
    return (
        <div
            className={cn(
                'flex flex-col',
                'w-2xs h-112',
                'bg-zinc-900 rounded-xl ring-4 ring-zinc-700',
            )}
        ></div>
    );
}