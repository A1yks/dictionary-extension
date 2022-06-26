import { SelectChangeEvent } from '@mui/material';
import { useLanguagesStore } from '@popup/context/StoreContext';
import { useEffect, useState } from 'react';
import { Language } from 'types/common';

function useLanguageSelect() {
    const { languages } = useLanguagesStore();
    const [loadingSelectedDictionary, setLoading] = useState(true);
    const [selectedDictionary, setSelectedDictionary] = useState<Language | null>(null);

    function selectDictionaryChangeHandler(e: SelectChangeEvent) {
        const lang = languages.find((lang) => lang.id === e.target.value);

        if (lang !== undefined) {
            setSelectedDictionary(lang);
        }
    }

    useEffect(() => {
        chrome.storage.sync.get(['selectedDictionaryId'], (result) => {
            console.log(result, result.selectedDictionaryId);
            if (!result.selectedDictionaryId) {
                if (languages.length > 0) {
                    setSelectedDictionary(languages[0]);
                }
            } else {
                const lang = languages.find((lang) => lang.id === result.selectedDictionaryId);

                if (lang !== undefined) {
                    setSelectedDictionary(lang);
                }
            }

            setLoading(false);
        });
    }, []);

    useEffect(() => {
        if (selectedDictionary) {
            chrome.storage.sync.set({ selectedDictionaryId: selectedDictionary.id });
        }
    }, [selectedDictionary]);

    return { selectDictionaryChangeHandler, selectedDictionary, loadingSelectedDictionary };
}

export default useLanguageSelect;
