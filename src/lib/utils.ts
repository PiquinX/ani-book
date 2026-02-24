import { EXCLUSION_KEYWORDS, JIKAN_API_BASE_URL } from './consts';
import { AnimeSearchResult } from './definitions';

export const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const parseAnimeListText = (text: string): string[] => {
    const lines = text.split('\n');
    const validTitles: string[] = [];

    for (const line of lines) {
        let isValid = true;
        const lowerLine = line.toLowerCase();

        for (const keyword of EXCLUSION_KEYWORDS) {
            if (lowerLine.includes(keyword)) {
                isValid = false;
                break;
            }
        }

        if (isValid) {
            const trimmed = line.trim();
            if (trimmed.length > 0) {
                validTitles.push(trimmed);
            }
        }
    }

    return validTitles;
};

export const fetchJikanAnime = async (query: string, limit: number = 1): Promise<AnimeSearchResult[]> => {
    try {
        const res = await fetch(`${JIKAN_API_BASE_URL}/anime?q=${encodeURIComponent(query)}&limit=${limit}`);
        if (!res.ok) {
            return [];
        }
        const data = await res.json();

        // Format the output here to decouple API structure from the application
        const formattedResults: AnimeSearchResult[] = (data.data || []).map((anime: any) => ({
            mal_id: anime.mal_id,
            title: anime.title,
            title_english: anime.title_english || null,
            title_japanese: anime.title_japanese || null,
            year: anime.year || null,
            type: anime.type || null,
            images: {
                jpg: {
                    image_url: anime.images?.jpg?.image_url || '',
                    small_image_url: anime.images?.jpg?.small_image_url || '',
                    large_image_url: anime.images?.jpg?.large_image_url || ''
                }
            }
        }));

        return formattedResults;
    } catch (error) {
        console.error('Failed to fetch anime:', error);
        return [];
    }
};
