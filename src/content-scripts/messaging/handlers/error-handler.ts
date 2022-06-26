import { getStore } from '@content/context/RootStoreContext';

const { wordPopupStore } = getStore();

function errorHandler(error: string) {
    console.error(error);
    wordPopupStore.setError(error);
    wordPopupStore.setLoading(false);
    wordPopupStore.setAddingWord(false);
}

export default errorHandler;
