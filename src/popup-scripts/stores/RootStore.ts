import AuthStore from './AuthStore';
import DictionariesStore from './DictionariesStore';
import LanguagesStore from './LanguagesStore';
import UserStore from './UserStore';
import WordsStore from './WordsStore';

class RootStore {
    userStore: UserStore;
    authStore: AuthStore;
    languagesStore: LanguagesStore;
    wordsStore: WordsStore;
    dictionariesStore: DictionariesStore;

    constructor() {
        this.userStore = new UserStore(this);
        this.authStore = new AuthStore(this);
        this.languagesStore = new LanguagesStore(this);
        this.wordsStore = new WordsStore(this);
        this.dictionariesStore = new DictionariesStore();
    }
}

export default RootStore;
