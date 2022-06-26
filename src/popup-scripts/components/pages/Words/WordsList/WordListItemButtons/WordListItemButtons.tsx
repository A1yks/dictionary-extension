import { CircularProgress, IconButton, Tooltip } from '@mui/material';
import { FC, memo } from 'react';
import { WordListItemProps } from '../WordsListItem/WordListItem.types';
import useAudio from './hooks/useAudio';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import InfoIcon from '@mui/icons-material/Info';
import useDialogs from './hooks/useDialogs';
import styles from './WordListItemButtons.module.scss';

const WordListItemButtons: FC<Pick<WordListItemProps, 'wordInfo' | 'showActions'>> = (props) => {
    const { openWordFullInfoDialogHandler } = useDialogs(props.wordInfo);
    const { playWord, audioLoading } = useAudio(props.wordInfo?.phonetic?.audio);

    return (
        <div className={styles.buttons}>
            {props.wordInfo?.phonetic?.audio && (
                <Tooltip title="Прослушать произношение">
                    <IconButton onClick={playWord} disabled={audioLoading}>
                        {audioLoading ? <CircularProgress size={24} color="inherit" /> : <VolumeUpIcon />}
                    </IconButton>
                </Tooltip>
            )}
            {props.showActions && (
                <Tooltip title="Показать полную информацию о слове">
                    <IconButton onClick={openWordFullInfoDialogHandler}>
                        <InfoIcon />
                    </IconButton>
                </Tooltip>
            )}
        </div>
    );
};

export default memo(WordListItemButtons);
