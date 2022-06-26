import { Container } from '@mui/material';
import WordsListItem from '@content/components/WordsListItem';
import { useWordPopupStore } from 'content-scripts/context/RootStoreContext';
import { observer } from 'mobx-react-lite';
import { FC } from 'react';
import useOnclickOutside from 'react-cool-onclickoutside';

const WordPopup: FC = () => {
    const wordPopupStore = useWordPopupStore();
    const { coordinates, isPopupVisible, wordInfo, loading, error } = wordPopupStore;
    const containerRef = useOnclickOutside(() => {
        wordPopupStore.closePopup();
    });

    if (!isPopupVisible) return null;

    return (
        <Container ref={containerRef} maxWidth="sm" sx={{ position: 'absolute', left: coordinates?.x, top: coordinates?.y, zIndex: 999 }}>
            <WordsListItem wordInfo={wordInfo} loading={loading} showTranscription showTranslation error={error} />
        </Container>
    );
};

export default observer(WordPopup);
