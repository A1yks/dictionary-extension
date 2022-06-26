import WordsAPI from 'api/WordsAPI';
import { makeAutoObservable, runInAction } from 'mobx';
import Request from 'utils/decorators/Request';
import RootStore from './RootStore';
import { LearnFeedbacks, WordInfo, Word } from 'types/common';
import { IRequest } from 'types/stores';

class WordsStore implements IRequest {
    error = '';
    loading = false;
    wordInfo: WordInfo | null = null;
    showTranslation = true;

    constructor(private rootStore: RootStore) {
        makeAutoObservable(this, {}, { autoBind: true });
    }

    get words() {
        return this.language?.words || null;
    }

    get wordsToLearn() {
        const currTime = Math.trunc(Date.now() / 1000);

        return this.language?.words.filter((w) => currTime >= w.repeatAt) || [];
    }

    @Request
    async learnWord(word: Word, feedback: LearnFeedbacks) {
        const { repeatAt } = await WordsAPI.learnWord(word.id, feedback);

        runInAction(() => {
            word.repeatAt = repeatAt;
        });
    }

    setWordInfo(wordInfo: WordInfo) {
        this.wordInfo = wordInfo;
    }

    setShowTranslation(show: boolean) {
        this.showTranslation = show;
    }

    setLoading(loading: boolean) {
        this.loading = loading;
    }

    setError(error: string) {
        this.error = error;
    }

    private get language() {
        return this.rootStore.languagesStore.selectedLanguage;
    }
}

export default WordsStore;
