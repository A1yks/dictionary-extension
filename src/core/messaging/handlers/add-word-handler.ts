import WordsAPI from 'api/WordsAPI';
import { WordInfo } from 'types/common';
import { BackgroundMessage, ContentEvents } from 'types/messanging';
import HandleErrors from '../function-wrappers/handle-errors';
import { IAddWordData } from '../types';

async function addWordHandler({ langId, wordInfo }: IAddWordData): Promise<BackgroundMessage<WordInfo>> {
    const word = await WordsAPI.addWord(langId, wordInfo);

    return { event: ContentEvents.WORD_ADDED, data: word };
}

export default HandleErrors(addWordHandler);
