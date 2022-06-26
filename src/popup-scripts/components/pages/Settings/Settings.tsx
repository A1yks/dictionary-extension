import { Container, FormControl, FormControlLabel, Grid, MenuItem, Paper, Select, Switch, Typography } from '@mui/material';
import styles from './Settings.module.scss';
import { useLanguagesStore } from '@popup/context/StoreContext';
import PageLoader from 'common-components/PageLoader';
import { observer } from 'mobx-react-lite';
import { FC } from 'react';
import useDictionarySelect from './hooks/useDictionarySelect';

const Settings: FC = () => {
    const { languages } = useLanguagesStore();
    const { selectedDictionary, selectDictionaryChangeHandler, loadingSelectedDictionary } = useDictionarySelect();

    if (loadingSelectedDictionary) {
        return (
            <div className="page">
                <PageLoader />
            </div>
        );
    }

    return (
        <div className="page">
            <Container className={styles.container}>
                <Grid container direction="column" rowSpacing={1} alignItems="flex-start">
                    <Grid item width="100%">
                        <Paper variant="outlined" className={styles.settingsItem}>
                            <Grid container>
                                <Grid container item alignItems="center">
                                    <Grid item xs={8}>
                                        <Typography component="span" fontSize={16}>
                                            Выберите, куда добавлять слова
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={4}>
                                        <FormControl variant="standard" fullWidth>
                                            <Select value={selectedDictionary?.id} onChange={selectDictionaryChangeHandler} label="Словарь">
                                                {languages.map((lang) => (
                                                    <MenuItem key={lang.id} value={lang.id}>
                                                        {lang.name}
                                                    </MenuItem>
                                                ))}
                                            </Select>
                                        </FormControl>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Paper>
                    </Grid>
                    <Grid item width="100%">
                        <Paper variant="outlined" className={styles.settingsItem}>
                            <Grid container item alignItems="center">
                                <Grid item>
                                    <FormControlLabel control={<Switch defaultChecked />} label="Ставить видео на паузу при просмотре перевода" />
                                </Grid>
                            </Grid>
                        </Paper>
                    </Grid>
                </Grid>
            </Container>
        </div>
    );
};

export default observer(Settings);
