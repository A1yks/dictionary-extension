import { BackgroundMessage, ContentEvents } from 'types/messanging';
import errorHandler from './handlers/error-handler';
import translatedHandler from './handlers/translated-hander';
import wordAddedHandler from './handlers/word-added-handler';
import { EventHandlers } from './types';

const eventHandlers: EventHandlers = {
    [ContentEvents.TRANSLATED]: translatedHandler,
    [ContentEvents.WORD_ADDED]: wordAddedHandler,
};

function eventsHandler(msg: BackgroundMessage) {
    if (msg.error !== undefined) {
        errorHandler(msg.error);
    } else {
        eventHandlers[msg.event](msg.data);
    }
}

export default eventsHandler;
