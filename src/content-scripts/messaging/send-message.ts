import { ContentMessage } from 'types/messanging';
import eventsHandler from './events-handler';

function sendMessage(msg: ContentMessage) {
    chrome.runtime.sendMessage(msg, eventsHandler);
}

export default sendMessage;
