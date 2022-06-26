import WordPopupStore from './WordPopupStore';

class RootStore {
    wordPopupStore: WordPopupStore;

    constructor() {
        this.wordPopupStore = new WordPopupStore();
    }
}

export default RootStore;
