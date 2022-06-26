import { User } from 'types/common';

function loginHandler(user: User) {
    chrome.storage.sync.get(['selectedDictionaryId'], (result) => {
        if (!result.selectedDictionaryId && user.languages.length > 0) {
            chrome.storage.sync.set({ selectedDictionaryId: user.languages[0].id });
        }
    });

    chrome.storage.local.set({ isLoggedIn: !!user });
}

export default loginHandler;
