import { BackgroundEvents, ContentMessage } from 'types/messanging';
import addWordHandler from './handlers/add-word-handler';
import loginHandler from './handlers/login-handler';
import logoutHandler from './handlers/logout-handler';
import translateHandler from './handlers/translate-handler';
import { EventHandlers } from './types';

const eventHandlers: EventHandlers = {
    [BackgroundEvents.LOGIN]: loginHandler,
    [BackgroundEvents.LOGOUT]: logoutHandler,
    [BackgroundEvents.TRANSLATE]: translateHandler,
    [BackgroundEvents.ADD_WORD]: addWordHandler,
};

chrome.runtime.onMessage.addListener((msg: ContentMessage, sender, sendResponse) => {
    Promise.resolve(eventHandlers[msg.event](msg.data)).then(sendResponse);

    return true;
});
