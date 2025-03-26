import { appConfig } from '@/config/app';

const { two, three, four, five } = appConfig.starsThresholds;

export function calculateStars(favourites: number): 1 | 2 | 3 | 4 | 5 {
    if (favourites >= five) {
        return 5;
    } else if (favourites >= four) {
        return 4;
    } else if (favourites >= three) {
        return 3;
    } else if (favourites >= two) {
        return 2;
    }

    return 1;
}