import { makeAutoObservable } from 'mobx';

class DictionariesStore {
    workingLanguageId = '';

    constructor() {
        makeAutoObservable(this, {}, { autoBind: true });
    }

    setWorkingLanguageId(langId: string) {
        this.workingLanguageId = langId;
    }
}

export default DictionariesStore;
