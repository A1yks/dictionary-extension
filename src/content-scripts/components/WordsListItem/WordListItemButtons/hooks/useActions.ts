import { useWordPopupStore } from '@content/context/RootStoreContext';
import sendMessage from '@content/messaging/send-message';
import { BackgroundEvents } from 'types/messanging';

function useActions() {
    const wordPopupStore = useWordPopupStore();
    const { addingWord, wordInfo } = wordPopupStore;

    function addWordHandler() {
        if (wordInfo === null) return;

        wordPopupStore.setAddingWord(true);
        chrome.storage.sync.get(['selectedDictionaryId'], (result) => {
            const langId = result.selectedDictionaryId;

            if (langId) {
                sendMessage({ event: BackgroundEvents.ADD_WORD, data: { langId, wordInfo } });
            } else {
                wordPopupStore.setAddingWord(false);
                wordPopupStore.setError('Вы не выбрали, куда необходимо сохранять слова, либо не создали ни одного словаря');
            }
        });
    }

    return { addingWord, addWordHandler };
}

export default useActions;
