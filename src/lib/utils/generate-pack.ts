'use server';

import { appConfig } from '@/config/app';
import { CardProps } from '@/components/card';
import { createClient } from '@/lib/db/server';

const { cardAmount } = appConfig.pack;

export async function generatePack(): Promise<CardProps[]> {
    const supabase = await createClient();

    // get random characters from the database
    const { count } = await supabase
        .from('characters')
        .select('*', { count: 'exact', head: true });

    // get 5 random characters from the database from 1 to count
    if (!count) return [];

    const randomNumbers = new Set<number>();
    while (randomNumbers.size < cardAmount) {
        const randomNumber = Math.floor(Math.random() * count) + 1;
        randomNumbers.add(randomNumber);
    }

    const randomNumbersArray = Array.from(randomNumbers);
    const { data, error } = await supabase
        .from('characters')
        .select('name, media, image, favourites')
        .in('id', randomNumbersArray);

    if (error) {
        console.error('Error fetching characters:', error);
        return [];
    }

    return data;
}