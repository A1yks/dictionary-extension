import LanguagesAPI from 'api/LanguagesAPI';
import { makeAutoObservable } from 'mobx';
import Request from 'utils/decorators/Request';
import RootStore from './RootStore';
import { IRequest } from 'types/stores';
import { Language } from 'types/common';

class LanguagesStore implements IRequest {
    error = '';
    loading = false;
    languages: Language[] = [];
    selectedLanguage: Language | null = null;
    // languagesLoaded: boolean = false;

    constructor(private rootStore: RootStore) {
        makeAutoObservable(this, {}, { autoBind: true });
    }

    @Request
    async fetchLanguages() {
        const languages = await LanguagesAPI.getLanguages();

        this.setLanguages(languages);
        // this.setLanguagesLoaded(true);
    }

    @Request
    async addLanguage(langName: string) {
        const addedLang = await LanguagesAPI.addLanguage(langName);
        this.setLanguages([...this.languages, addedLang]);
    }

    @Request
    async deleteLanguage(langId: string) {
        await LanguagesAPI.deleteLanguage(langId);
        this.setLanguages(this.languages.filter((lang) => lang.id !== langId));
    }

    @Request
    async editLanguageName(langId: string, langName: string) {
        const editedLang = await LanguagesAPI.editLanguageName(langId, langName);

        this.setLanguages(
            this.languages.map((lang) => {
                if (lang.id !== langId) return lang;

                return { ...lang, ...editedLang };
            })
        );
    }

    selectLanguage(lang: Language | string) {
        let languageObject: Language | undefined = undefined;

        if (typeof lang === 'string') {
            languageObject = this.languages.find(({ id }) => lang === id);
        } else {
            languageObject = lang;
        }

        if (languageObject !== undefined) {
            this.selectedLanguage = languageObject;
        } else {
            throw new Error('Выбираемого языка не существует');
        }
    }

    setLoading(loading: boolean) {
        this.loading = loading;
    }

    setError(error: string) {
        this.error = error;
    }

    setLanguages(languages: Language[]) {
        this.languages = languages;
    }

    // private setLanguagesLoaded(loaded: boolean) {
    //     this.languagesLoaded = loaded;
    // }
}

export default LanguagesStore;
