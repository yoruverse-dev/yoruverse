'use server';

import { appConfig } from '@/config/app';
import { createClient } from '@/lib/db/server';

const { cardAmount } = appConfig.pack;

export async function generatePack() {
    const supabase = await createClient();

    const { data, error } = await supabase.rpc('generate_pack', {
        min_favourites: 50,
        card_amount: cardAmount,
    });

    if (error) {
        console.error('Error fetching characters:', error);
        return [];
    }

    return data;
}