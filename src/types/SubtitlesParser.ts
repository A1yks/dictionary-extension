import { getStore } from '@content/context/RootStoreContext';
import sendMessage from '@content/messaging/send-message';
import { ICoordinates } from 'content-scripts/stores/types';
import { IContentScript } from './common';
import { BackgroundEvents } from './messanging';

const { wordPopupStore } = getStore();

abstract class SubtitlesParser implements IContentScript {
    abstract execute(): void;

    protected parseSubtitles(subtitlesText: string): string[] | null {
        return subtitlesText.match(/[a-z']+|[^a-z'\n]+|\n/gim);
    }

    protected isWord(word: string) {
        return /[a-z]/i.test(word);
    }

    protected isSpace(space: string) {
        return space.trim() === '';
    }

    protected isBreak(wordBreak: string) {
        return wordBreak === '\n';
    }

    protected openWordPopup(word: string, coords: ICoordinates) {
        wordPopupStore.openPopup(coords);
        this.translateWord(word);
    }

    protected translateWord(word: string) {
        chrome.storage.local.get(['isLoggedIn'], (result) => {
            if (result.isLoggedIn) {
                wordPopupStore.setLoading(true);
                sendMessage({
                    event: BackgroundEvents.TRANSLATE,
                    data: word,
                });
            } else {
                wordPopupStore.setError('Для использования расширения необходимо войти в аккаунт');
            }
        });
    }
}

export default SubtitlesParser;
