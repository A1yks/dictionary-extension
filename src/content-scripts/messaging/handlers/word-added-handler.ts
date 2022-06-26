import { getStore } from '@content/context/RootStoreContext';

const { wordPopupStore } = getStore();

function wordAddedHandler() {
    wordPopupStore.setAddingWord(false);
}

export default wordAddedHandler;
