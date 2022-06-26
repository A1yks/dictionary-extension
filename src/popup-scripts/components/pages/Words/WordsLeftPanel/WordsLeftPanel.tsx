import { Button, Typography } from '@mui/material';
import { FC } from 'react';
import styles from './WordsLeftPanel.module.scss';
import getEnding from './utils/getEnding';
import useLeftPanel from './hooks/useLeftPanel';
import { observer } from 'mobx-react-lite';

const WordsLeftPanel: FC = () => {
    const { selectedLanguage, wordsToLearn, learnWords } = useLeftPanel();

    return (
        <div className={styles.wordsLeftPanel}>
            <Typography component="h1" variant="h5">
                {selectedLanguage.name}
            </Typography>
            <div className={styles.wordsInfo}>
                <Typography component="p">Всего слов: {selectedLanguage.words.length}</Typography>
                <Typography component="p">
                    Сегодня необходимо повторить {wordsToLearn.length} {getEnding(wordsToLearn.length)}
                </Typography>
            </div>
            <div className={styles.buttonsWrapper}>
                <Button variant="contained" onClick={learnWords}>
                    Учить слова
                </Button>
            </div>
        </div>
    );
};

export default observer(WordsLeftPanel);
