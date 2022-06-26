import RootStore from 'popup-scripts/stores/RootStore';
import { createContext, FC, PropsWithChildren, useContext } from 'react';

const store = new RootStore();
const StoreContext = createContext<RootStore | undefined>(undefined);

export function useStore() {
    const context = useContext(StoreContext);

    if (context === undefined) {
        throw new Error('useStore must be used within StoreContextProvider');
    }

    return context;
}

export const useUserStore = () => useStore().userStore;

export const useAuthStore = () => useStore().authStore;

export const useLanguagesStore = () => useStore().languagesStore;

export const useWordsStore = () => useStore().wordsStore;

export const useDictionariesStore = () => useStore().dictionariesStore;

export const StoreContextProvider: FC<PropsWithChildren> = (props) => {
    return <StoreContext.Provider value={store}>{props.children}</StoreContext.Provider>;
};
