import { WordListItemProps } from '../WordListItem.types';

export type WordListItemButtonsProps = {
    showActions?: boolean;
} & Pick<WordListItemProps, 'wordInfo'>;
