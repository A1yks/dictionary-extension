import WordsAPI from 'api/WordsAPI';
import { WordInfo } from 'types/common';
import { BackgroundMessage, ContentEvents } from 'types/messanging';
import HandleErrors from '../function-wrappers/handle-errors';

async function translateHandler(word: string): Promise<BackgroundMessage<WordInfo>> {
    const wordInfo = await WordsAPI.translateWord(word);

    return { event: ContentEvents.TRANSLATED, data: wordInfo };
}

export default HandleErrors(translateHandler);
