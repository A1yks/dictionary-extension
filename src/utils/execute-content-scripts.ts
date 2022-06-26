import contentScripts from '../content-scripts/websites';
import { IContentScript } from 'types/common';
import injectReact from 'content-scripts/common/inject-react';
import '@content/messaging/events-handler';

contentScripts.forEach((script: IContentScript) => {
    script.execute();
});

injectReact();
