import { calculateStars } from '@/lib/utils/calculate-stars';
import { Star } from 'lucide-react';
import { cn } from '@/lib/utils/cn';
import Image from 'next/image';
import { Tables } from '@/lib/types/supabase';

export type Character = Tables<'characters'>

export function Card({ name, media, favourites, image, remaining }: Character & { remaining: number }) {
    const stars = calculateStars(favourites ?? 0);

    return (
        <section className='relative'>
            <div
                className={cn(
                    'flex flex-col z-10',
                    'w-2xs h-112 overflow-hidden',
                    'bg-zinc-900 rounded-xl ring ring-zinc-700',
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
                            key={image}
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
            <div>
                {Array.from({ length: remaining }).map((_, index) => (
                    <span
                        key={index}
                        className='absolute -z-1 top-0 w-2xs h-112 bg-zinc-900/60 rounded-xl ring ring-zinc-700/60'
                        style={{
                            right: `${index * 5}px`,
                            transform: `translateX(${remaining * 5}px)`,
                        }}
                    />
                ))}
            </div>
        </section>
    );
}