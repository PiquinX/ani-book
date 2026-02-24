import { EXCLUSION_KEYWORDS, JIKAN_API_BASE_URL } from './consts';
import { AnimeSearchResult } from './definitions';

export const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const hasJapaneseCharacters = (text: string): boolean => {
    // Regex matches Hiragana, Katakana, and Kanji blocks
    const jpRegex = /[\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FAF]/;
    return jpRegex.test(text);
};

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

import { animeIsFinishedOptions, animeIsFinishedOptionsFilter, sortOptions } from "./consts"
import { AnimeFilters, AnimesListType, AnimeToShowType } from "./definitions"

export const getRate = (rate: string): number => {
    if (rate === 'S+') return 100
    if (rate === 'S') return 93
    if (rate === 'A') return 88
    if (rate === 'B') return 83
    if (rate === 'C') return 78
    if (rate === 'D') return 70
    if (rate === 'E') return 50
    if (rate === 'F') return 45
    if (rate === 'DONT WATCH') return 10
    return 1
}

export const getTier = (rate: number): string => {
    if (rate >= 95) return 'S+'
    if (rate >= 90) return 'S'
    if (rate >= 85) return 'A'
    if (rate >= 80) return 'B'
    if (rate >= 75) return 'C'
    if (rate >= 65) return 'D'
    if (rate >= 55) return 'E'
    if (rate >= 45) return 'F'
    if (rate < 45) return 'DONT WATCH'
    return ''
}

export const rateColor = (rate: number): string => {
    if (rate === 100) return 'green-100 text-[#40ff00]'
    if (rate >= 95) return 'green-95 text-[#40ff00]'
    if (rate >= 90) return 'text-[#40ff00]'
    if (rate >= 85) return 'text-[#7fed09]'
    if (rate >= 80) return 'text-[#9dde10]'
    if (rate >= 75) return 'text-[#cdde10]'
    if (rate >= 65) return 'text-[#e0b909]'
    if (rate >= 55) return 'text-[#e09109]'
    if (rate >= 45) return 'text-[#e05809]'
    if (rate < 45) return 'text-[#e01e09]'
    return ''
}

export const filterAnimes = (animes: AnimeToShowType[], filters: AnimeFilters) => {

    if (filters.search) {
        animes = animes.filter(anime => filters.search && anime.title.toUpperCase().includes(filters.search.toUpperCase()))
    }

    if ((filters.maxSeasons != null && filters.minSeasons != null) && filters.minSeasons < filters.maxSeasons) {
        animes = animes.filter(anime => filters.maxSeasons && filters.minSeasons && (anime.seasons <= filters.maxSeasons && anime.seasons >= filters.minSeasons))
    }

    if (filters.rate) {
        animes = animes.filter(anime => getTier(anime.averageRate) === filters.rate)
    }

    if (filters.isFinished != animeIsFinishedOptionsFilter.default) {

        if (filters.isFinished === animeIsFinishedOptions.finished) {
            animes = animes.filter(anime => anime.isFinished)
        } else {
            animes = animes.filter(anime => !anime.isFinished)
        }

    }

    return animes
}

export const sortAnimes = (animes: AnimeToShowType[], sortBy: string | null) => {
    if (sortBy === sortOptions.dateNewToOld) {
        animes = animes.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    } else if (sortBy === sortOptions.dateOldToNew) {
        animes = animes.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
    } else if (sortBy === sortOptions.rateHighToLow) {
        animes = animes.sort((a, b) => b.averageRate - a.averageRate);
    } else if (sortBy === sortOptions.rateLowToHigh) {
        animes = animes.sort((a, b) => a.averageRate - b.averageRate);
    } else if (sortBy === sortOptions.seasonsHighToLow) {
        animes = animes.sort((a, b) => b.seasons - a.seasons);
    } else if (sortBy === sortOptions.seasonsLowToHigh) {
        animes = animes.sort((a, b) => a.seasons - b.seasons);
    }

    return animes;
};
