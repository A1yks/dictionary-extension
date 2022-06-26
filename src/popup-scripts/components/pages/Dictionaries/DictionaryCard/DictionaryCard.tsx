import { FC } from 'react';
import { Button, Card, CardActions, CardContent, Typography } from '@mui/material';
import parentStyles from '../Dictionaries.module.scss';
import styles from './DictionaryCard.module.scss';
import { Link } from 'react-router-dom';
import { DictionaryCardProps } from './DictionaryCard.types';
import { useLanguagesStore } from '@popup/context/StoreContext';
import { DialogNames } from '@popup/components/dialogs/Dialog.types';
import { openDialog } from '@popup/components/UI/CustomDialog/controllers';
import { observer } from 'mobx-react-lite';
import { flushSync } from 'react-dom';

const DictionaryCard: FC<DictionaryCardProps> = (props) => {
    const { selectLanguage } = useLanguagesStore();

    function chooseCurrentLanguage() {
        selectLanguage(props.language);
    }

    function openLearnWordsDialogHandler() {
        flushSync(chooseCurrentLanguage);
        openDialog(DialogNames.LEARN_WORDS_DIALOG);
    }

    return (
        <Card variant="outlined" className={parentStyles.card}>
            <CardContent>
                <Typography component="p" variant="h5">
                    {props.language.name}
                </Typography>
                <div className={styles.wordsInfo}>
                    <Typography component="p" color="blue">
                        Добавлено слов:{' '}
                        <Typography component="span" color="black">
                            {props.language.words.length}
                        </Typography>
                    </Typography>
                    <Typography component="p" color="lime">
                        Выучено слов:{' '}
                        <Typography component="span" color="black">
                            {props.language.wordsLearned}
                        </Typography>
                    </Typography>
                </div>
            </CardContent>
            <CardActions>
                <div className={styles.cardActionsWrapper}>
                    <Link to={`/language/${props.language.id}`} className={styles.btn}>
                        <Button size="small" color="primary" variant="contained" onClick={chooseCurrentLanguage}>
                            Просмотр слов
                        </Button>
                    </Link>
                    <Button className={styles.btn} size="small" color="primary" variant="contained" onClick={openLearnWordsDialogHandler}>
                        Учить слова
                    </Button>
                </div>
            </CardActions>
        </Card>
    );
};

export default observer(DictionaryCard);
