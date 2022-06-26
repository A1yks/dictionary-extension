import { getStore } from '@content/context/RootStoreContext';
import { ICoordinates } from 'content-scripts/stores/types';
import SubtitlesParser from 'types/SubtitlesParser';

const { wordPopupStore } = getStore();

class Kinopub extends SubtitlesParser {
    observer = new MutationObserver(this.observerCallback.bind(this));
    chosenSubtitlesEl: HTMLElement | null = null;

    execute() {
        this.addFullScreenListener();
        this.observeSubtitles();
    }

    private observeSubtitles() {
        // Wait for the element to appear
        const localObserver = new MutationObserver((mutationList, observer) => {
            const subtitlesEl = document.querySelector('pjsdiv > span');

            if (subtitlesEl === null) return;

            const subtitlesParentEl = subtitlesEl.parentElement;

            if (subtitlesParentEl === null) return;

            this.cancelSubtitlesParentActions(subtitlesParentEl as HTMLElement);
            this.observer.observe(subtitlesParentEl, { childList: true });
            observer.disconnect();
        });

        localObserver.observe(document, { childList: true, subtree: true });
    }

    private observerCallback(mutationList: MutationRecord[]) {
        for (const mutation of mutationList) {
            if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
                const subtitlesEl = mutation.addedNodes[0] as HTMLElement;
                const subtitlesText = this.getSubtitlesText(subtitlesEl.childNodes);

                if (subtitlesText !== null) {
                    const subtitles = this.parseSubtitles(subtitlesText);

                    if (subtitles !== null) {
                        this.insertCustomSubtitles(subtitlesEl, subtitles);
                    }
                }
            }
        }
    }

    private getSubtitlesText(childNodes: NodeListOf<ChildNode>) {
        return [...childNodes].reduce((acc, curr) => {
            if (curr.nodeType === Node.TEXT_NODE) {
                return acc + curr.textContent;
            }

            if (curr instanceof HTMLBRElement) {
                return acc + '\n';
            }

            return acc;
        }, '');
    }

    private insertCustomSubtitles(subtitlesEl: HTMLElement, subtitles: string[]) {
        subtitlesEl.innerHTML = '';
        subtitles.forEach((word) => {
            let elem: Node;

            if (this.isWord(word)) {
                const span = document.createElement('span');

                span.addEventListener('click', (e) => {
                    const coords = this.getSubtitlesElCoords(span, e);
                    this.openWordPopup(word, coords);
                });
                span.classList.add('subtitle-word');
                span.textContent = word;
                elem = span;
            } else if (this.isBreak(word)) {
                elem = document.createElement('br');
            } else if (this.isSpace(word)) {
                elem = document.createTextNode(' ');
            } else {
                elem = document.createTextNode(word);
            }

            subtitlesEl.appendChild(elem);
        });
    }

    private cancelSubtitlesParentActions(subtitlesParentEl: HTMLElement) {
        subtitlesParentEl.addEventListener(
            'mousedown',
            (e) => {
                e.preventDefault();
                e.stopPropagation();
            },
            true
        );
    }

    private getSubtitlesElCoords(subtitlesEl: HTMLElement, e: MouseEvent): ICoordinates {
        if (document.fullscreenElement === null) {
            return { x: e.pageX, y: e.pageY };
        }

        const clientRect = subtitlesEl.getBoundingClientRect();

        return { x: clientRect.left, y: clientRect.top };
    }

    private addFullScreenListener() {
        document.addEventListener('fullscreenchange', () => {
            wordPopupStore.setPortalElement(document.fullscreenElement as HTMLElement);
        });
    }
}

export default new Kinopub();
