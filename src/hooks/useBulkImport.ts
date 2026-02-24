import { useState } from 'react';
import { parseAnimeListText, fetchJikanAnime, sleep, hasJapaneseCharacters } from '@/lib/utils';
import { FETCH_DELAY_MS } from '@/lib/consts';
import { saveBulkAnimes } from '@/lib/actions/animeActions';

export function useBulkImport(sessionEmail: string | null | undefined, onSuccess: () => void) {
    const [file, setFile] = useState<File | null>(null);
    const [isProcessing, setIsProcessing] = useState(false);
    const [progress, setProgress] = useState(0);
    const [total, setTotal] = useState(0);
    const [errorMSG, setErrorMSG] = useState<string | null>(null);
    const [isReviewing, setIsReviewing] = useState(false);
    const [parsedTitles, setParsedTitles] = useState<{ id: number; title: string; selected: boolean; isNative: boolean }[]>([]);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setFile(e.target.files[0]);
            setErrorMSG(null);
            setIsReviewing(false);
            setParsedTitles([]);
        }
    };

    const toggleTitleSelection = (id: number) => {
        setParsedTitles(prev => prev.map(item =>
            item.id === id ? { ...item, selected: !item.selected } : item
        ));
    };

    const toggleAllSelections = () => {
        const allSelected = parsedTitles.every(t => t.selected);
        setParsedTitles(prev => prev.map(t => ({ ...t, selected: !allSelected })));
    };

    const updateParsedTitle = (id: number, newTitle: string) => {
        setParsedTitles(prev => prev.map(item =>
            item.id === id ? { ...item, title: newTitle } : item
        ));
    };

    const parseFile = async () => {
        if (!file) {
            setErrorMSG('Please select a file to upload.');
            return;
        }

        setIsProcessing(true);
        setErrorMSG(null);
        setProgress(0);
        setTotal(0);

        try {
            const text = await file.text();
            const validTitles = parseAnimeListText(text);

            setTotal(validTitles.length);

            if (validTitles.length === 0) {
                setErrorMSG('No valid titles found in the file.');
                setIsProcessing(false);
                return;
            }

            setParsedTitles(validTitles.map((title, index) => ({
                id: index,
                title,
                selected: true,
                isNative: hasJapaneseCharacters(title)
            })));
            setIsReviewing(true);
        } catch (err) {
            console.error(err);
            setErrorMSG('An error occurred while parsing the file.');
        } finally {
            setIsProcessing(false);
        }
    };

    const startImport = async () => {
        setIsProcessing(true);
        setErrorMSG(null);

        const selectedTitles = parsedTitles.filter(t => t.selected);
        setTotal(selectedTitles.length);
        setProgress(0);

        if (selectedTitles.length === 0) {
            setErrorMSG('No titles selected for import.');
            setIsProcessing(false);
            return;
        }

        try {
            const newAnimesList: any[] = [];

            for (let i = 0; i < selectedTitles.length; i++) {
                const { title, isNative } = selectedTitles[i];

                try {
                    const results = await fetchJikanAnime(title, 1);
                    if (results && results.length > 0) {
                        const anime = results[0];
                        let chosenTitle = anime.title_english || anime.title;

                        if (isNative) {
                            chosenTitle = anime.title_japanese || title;
                        }

                        const poster = anime.images?.jpg?.large_image_url || anime.images?.jpg?.image_url;

                        newAnimesList.push({
                            title: chosenTitle,
                            poster: poster,
                            rate: [{ rate: 0, value: 'Season 1' }],
                            description: '',
                            isFinished: false
                        });
                    }
                } catch (fetchError) {
                    console.error(`Error fetching ${title}:`, fetchError);
                }

                setProgress(i + 1);
                await sleep(FETCH_DELAY_MS);
            }

            if (newAnimesList.length > 0) {
                const res = await saveBulkAnimes(newAnimesList);

                if (!res.success) {
                    setErrorMSG(res.errorMessage || 'Failed to save to database.');
                } else {
                    onSuccess();
                }
            } else {
                setErrorMSG('No anime could be fetched successfully.');
            }

        } catch (err) {
            console.error(err);
            setErrorMSG('An error occurred while processing the file.');
        } finally {
            setIsProcessing(false);
        }
    };

    return {
        file,
        isProcessing,
        progress,
        total,
        errorMSG,
        isReviewing,
        parsedTitles,
        handleFileChange,
        toggleTitleSelection,
        toggleAllSelections,
        updateParsedTitle,
        parseFile,
        startImport
    };
}
