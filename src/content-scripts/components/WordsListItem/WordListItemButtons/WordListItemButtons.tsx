import { CircularProgress, IconButton, Tooltip } from '@mui/material';
import { FC } from 'react';
import useAudio from './hooks/useAudio';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import InfoIcon from '@mui/icons-material/Info';
import AddIcon from '@mui/icons-material/Add';
import styles from './WordListItemButtons.module.scss';
import { WordListItemButtonsProps } from './WordListItemButtons.types';
import useActions from './hooks/useActions';
import { observer } from 'mobx-react-lite';

const WordListItemButtons: FC<WordListItemButtonsProps> = (props) => {
    const { addingWord, addWordHandler } = useActions();
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
                <>
                    <Tooltip title="Показать полную информацию о слове">
                        <IconButton>
                            <InfoIcon />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Добавить слово">
                        <IconButton onClick={addWordHandler} disabled={addingWord}>
                            {addingWord ? <CircularProgress size={24} color="inherit" /> : <AddIcon />}
                        </IconButton>
                    </Tooltip>
                </>
            )}
        </div>
    );
};

export default observer(WordListItemButtons);
