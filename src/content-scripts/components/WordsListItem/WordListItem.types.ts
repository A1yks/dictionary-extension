import { WordInfo, Word } from 'types/common';

export type WordListItemProps = {
    wordInfo: WordInfo | Word | null;
    loading?: boolean;
    showTranslation?: boolean;
    className?: string;
    showTranscription?: boolean;
    error?: string;
};
