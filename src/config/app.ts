import { z } from 'zod';

const appConfigSchema = z.object({
    starsThresholds: z.object({
        two: z.number().int().positive(),
        three: z.number().int().positive(),
        four: z.number().int().positive(),
        five: z.number().int().positive()
    }),
    pack: z.object({
        cardAmount: z.number().int().positive(),
    }),
});

export type AppConfig = z.infer<typeof appConfigSchema>;

export const appConfig: AppConfig = appConfigSchema.parse({
    starsThresholds: {
        two: 100,
        three: 500,
        four: 1000,
        five: 5000
    },
    pack: {
        cardAmount: 5,
    }
});