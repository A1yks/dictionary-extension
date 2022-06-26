import { getStore } from '@content/context/RootStoreContext';
import { WordInfo } from 'types/common';

const { wordPopupStore } = getStore();

function translatedHandler(wordInfo: WordInfo) {
    wordPopupStore.loadWord(wordInfo);
}

export default translatedHandler;
