import Portal from 'common-components/Portal';
import { useWordPopupStore } from 'content-scripts/context/RootStoreContext';
import { observer } from 'mobx-react-lite';
import { FC } from 'react';
import WordPopup from './WordPopup';

const App: FC = () => {
    const { portalElement } = useWordPopupStore();

    if (portalElement !== null) {
        return (
            <Portal to={portalElement}>
                <WordPopup />
            </Portal>
        );
    }

    return <WordPopup />;
};

export default observer(App);
