import RootStore from 'content-scripts/stores/RootStore';
import { createContext, FC, PropsWithChildren, useContext } from 'react';

const store = new RootStore();
export const StoreContext = createContext<RootStore | undefined>(undefined);

export const getStore = () => store;

export function useStore() {
    const context = useContext(StoreContext);

    if (context === undefined) {
        throw new Error('useStore must be used within StoreContextProvider');
    }

    return context;
}

export const useWordPopupStore = () => useStore().wordPopupStore;

export const StoreContextProvider: FC<PropsWithChildren> = (props) => {
    return <StoreContext.Provider value={store}>{props.children}</StoreContext.Provider>;
};
