'use client';

import { Fragment, useState } from 'react';

import { generatePack } from '@/lib/utils/generate-pack';
import { cn } from '@/lib/utils/cn';

import { Card, type Character } from '@/components/card';
import { Button } from '@/components/atoms/button';
import { Pack } from '@/components/pack';
import { Loader } from 'lucide-react';

export default function Home() {
    const [cards, setCards] = useState<Character[]>([]);
    const [currentCard, setCurrentCard] = useState(0);
    const [loading, setLoading] = useState(false);

    const handleGeneratePack = async () => {
        setLoading(true);
        try {
            const data = await generatePack();
            setCards(data);
        } catch (error) {
            console.error('Error generating pack:', error);
        } finally {
            setLoading(false);
        }
    };

    const handlePrevCard = () => {
        if (currentCard === 0) {
            return;
        }
        setCurrentCard((prev) => prev - 1);
    };

    const handleNextCard = () => {
        if (currentCard === cards.length - 1) {
            setCards([]);
            setCurrentCard(0);
            return;
        }
        setCurrentCard((prev) => (prev === cards.length - 1 ? 0 : prev + 1));
    };

    return (
        <main className={cn(
            'h-screen flex flex-col items-center justify-center gap-10',
        )}>
            {cards.length === 0 ? (
                <Fragment>
                    <Pack />
                    <Button
                        variant='primary'
                        onClick={handleGeneratePack}
                        className='w-full max-w-2xs'
                    >
                        {loading ? <Loader className='size-4 animate-spin' /> : 'Open Pack'}
                    </Button>
                </Fragment>
            ) : (
                <Fragment>
                    <Card {...cards[currentCard]} />
                    <div className='w-full max-w-2xs flex items-center gap-5'>
                        <Button
                            variant='bordered'
                            onClick={handlePrevCard}
                            className='w-full max-w-2xs'
                        >
                            Previous
                        </Button>
                        <Button
                            variant='primary'
                            onClick={handleNextCard}
                            className='w-full max-w-2xs'
                        >
                            Next
                        </Button>
                    </div>
                </Fragment>
            )}
        </main>
    );
}