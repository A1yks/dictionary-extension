import { makeAutoObservable, observable } from 'mobx';
import { WordInfo } from 'types/common';
import { ICoordinates } from './types';

class WordPopupStore {
    addingWord = false;
    loading = false;
    isPopupVisible = false;
    coordinates: ICoordinates | null = null;
    wordInfo: WordInfo | null = null;
    portalElement: HTMLElement | null = null;
    error = '';

    constructor() {
        makeAutoObservable(this, { coordinates: observable.ref });
    }

    openPopup(coordinates: ICoordinates) {
        this.setCoords(coordinates);
        this.isPopupVisible = true;
    }

    setCoords(coordinates: ICoordinates) {
        this.coordinates = coordinates;
    }

    closePopup() {
        this.setLoading(false);
        this.setError('');
        this.coordinates = null;
        this.wordInfo = null;
        this.isPopupVisible = false;
    }

    loadWord(wordInfo: WordInfo) {
        this.wordInfo = wordInfo;
        this.setLoading(false);
        this.setError('');
    }

    setPortalElement(elem: HTMLElement | null) {
        this.portalElement = elem;
    }

    setLoading(loading: boolean) {
        this.loading = loading;
    }

    setError(error: string) {
        this.error = error;
    }

    setAddingWord(addingWord: boolean) {
        this.addingWord = addingWord;
    }
}

export default WordPopupStore;
