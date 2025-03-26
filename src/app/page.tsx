'use client';

import { Fragment, useState } from 'react';

import { generatePack } from '@/lib/utils/generate-pack';
import { cn } from '@/lib/utils/cn';

import { Card, type Character } from '@/components/card';
import { Button } from '@/components/atoms/button';
import { Pack } from '@/components/pack';
import { Heart, HeartCrack, Loader } from 'lucide-react';
import { useUserContext } from '@/lib/context/user';

export default function Home() {
    const { collection, addToCollection } = useUserContext();

    const [cards, setCards] = useState<Character[]>([]);
    const [currentCard, setCurrentCard] = useState(0);
    const [loading, setLoading] = useState(false);

    const handleAddToCollection = (character: Character) => {
        if (!collection.some((char) => char.id === character.id)) {
            addToCollection(character);
        }
        handleNextCard();
    };

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
                    <div className='w-full max-w-2xs flex items-center gap-5'>
                        <Button
                            variant='primary'
                            onClick={handleGeneratePack}
                            className='w-full max-w-2xs'
                        >
                            {loading ? <Loader className='size-4 animate-spin' /> : 'Open'}
                        </Button>
                    </div>
                </Fragment>
            ) : (
                <Fragment>
                    <Card {...cards[currentCard]} remaining={cards.length - currentCard - 1} />
                    <div className='w-full max-w-2xs flex items-center gap-5'>
                        <Button
                            variant='bordered'
                            onClick={handleNextCard}
                            className='w-full max-w-2xs'
                        >
                            <HeartCrack className='size-4' />
                        </Button>
                        <Button
                            variant='primary'
                            onClick={() => handleAddToCollection(cards[currentCard])}
                            className='w-full max-w-2xs'
                        >
                            <Heart className='size-4 fill-zinc-900' />
                        </Button>
                    </div>
                </Fragment>
            )}
        </main>
    );
}