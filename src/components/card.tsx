import { calculateStars } from '@/lib/utils/calculate-stars';
import { Star } from 'lucide-react';
import { cn } from '@/lib/utils/cn';
import Image from 'next/image';

export interface CardProps {
    name: string;
    media: string[] | null;
    image: string | null;
    favourites: number | null;
}

export function Card({ name, media, favourites, image }: CardProps) {
    const stars = calculateStars(favourites ?? 0);

    console.log('stars', stars);

    return (
        <div
            className={cn(
                'flex flex-col',
                'w-2xs h-112',
                'bg-zinc-900 rounded-xl ring-4 ring-zinc-700',
            )}
        >
            <figure
                className={cn(
                    'relative',
                    'size-full',
                    'bg-zinc-800'
                )}>
                {image && (
                    <Image
                        src={image}
                        alt={name ?? ''}
                        fill
                        className='object-cover rounded-t-xl'
                    />
                )}
            </figure>
            <footer
                className={cn(
                    'flex flex-col gap-2.5',
                    'p-5'
                )}>
                <p className='font-semibold text-zinc-50'>{name}</p>
                <p className='text-sm truncate text-ellipsis'>{media?.[0]}</p>
                <div className='flex items-center gap-1.5'>
                    {Array.from({ length: stars }, (_, index) => (
                        <Star
                            key={index}
                            className='size-4 text-amber-200 fill-amber-200'
                        />
                    ))}
                </div>
            </footer>
        </div>
    );
}