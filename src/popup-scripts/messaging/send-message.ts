import { PopupMessage } from 'types/messanging';

function sendMessage(msg: PopupMessage) {
    chrome.runtime.sendMessage(msg);
}

export default sendMessage;
