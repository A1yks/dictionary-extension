import { FC } from 'react';
import { Grid } from '@mui/material';
import styles from './Dictionaries.module.scss';
import DictionaryCard from '@popup/components/pages/Dictionaries/DictionaryCard';
import { useLanguagesStore } from '@popup/context/StoreContext';
import { observer } from 'mobx-react-lite';
import LearnWordsDialog from '@popup/components/dialogs/LearnWordsDialog';

const Dictionaries: FC = () => {
    const { languages } = useLanguagesStore();

    return (
        <div className={styles.box}>
            <Grid container spacing={4} className={styles.container}>
                {languages.map((language) => (
                    <Grid item key={language.name}>
                        <DictionaryCard key={language.name} language={language} />
                    </Grid>
                ))}
            </Grid>
            <LearnWordsDialog />
        </div>
    );
};

export default observer(Dictionaries);
