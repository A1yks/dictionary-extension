import { WordInfo } from 'types/common';
import { BackgroundEvents, BackgroundMessage } from 'types/messanging';

export type EventHandlers = {
    [key in BackgroundEvents]: (data?: any) => BackgroundMessage | Promise<BackgroundMessage> | void | Promise<void>;
};

export interface IAddWordData {
    langId: string;
    wordInfo: WordInfo;
}
