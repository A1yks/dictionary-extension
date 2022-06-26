import { CircularProgress, Paper, Typography } from '@mui/material';
import { FC, memo } from 'react';
import styles from './WordListItem.module.scss';
import c from 'classnames';
import { WordListItemProps } from './WordListItem.types';
import WordListItemButtons from './WordListItemButtons';

const WordsListItem: FC<WordListItemProps> = (props) => {
    if (props.loading) {
        return (
            <Paper variant="outlined">
                <div className={styles.loader}>
                    <CircularProgress size="1.5rem" />
                </div>
            </Paper>
        );
    }

    return (
        <Paper className={c(styles.item, props.className)} variant="outlined">
            <div className={styles.firstTranslations}>
                {!props.error && props.wordInfo !== null ? (
                    <>
                        <Typography component="span" className={styles.sourceWord}>
                            {props.wordInfo.source}{' '}
                            {props.showTranscription && props.wordInfo.phonetic?.text && (
                                <Typography component="span" className={styles.transcription}>
                                    [{props.wordInfo.phonetic.text}]
                                </Typography>
                            )}
                        </Typography>
                        {props.showTranslation && (
                            <Typography component="span">
                                {' - '}
                                {props.wordInfo.firstTranslations.join(', ')}
                            </Typography>
                        )}
                    </>
                ) : (
                    <Typography component="span" color="red">
                        {props.error}
                    </Typography>
                )}
            </div>
            <WordListItemButtons wordInfo={props.wordInfo} showActions={!props.error} />
        </Paper>
    );
};

export default memo(WordsListItem);
