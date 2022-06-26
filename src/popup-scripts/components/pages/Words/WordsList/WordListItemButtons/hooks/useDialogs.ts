import { DialogNames } from '@popup/components/dialogs/Dialog.types';
import { openDialog } from '@popup/components/UI/CustomDialog/controllers';
import { useWordsStore } from '@popup/context/StoreContext';
import { useCallback } from 'react';
import { flushSync } from 'react-dom';
import { Word, WordInfo } from 'types/common';

function useDialogs(word: Word | WordInfo | null) {
    const { setWordInfo } = useWordsStore();

    const openWordFullInfoDialogHandler = useCallback(() => {
        if (word !== null) {
            flushSync(() => setWordInfo(word));
            openDialog(DialogNames.SHOW_WORD_FULL_INFO_DIALOG);
        }
    }, [setWordInfo, word]);

    return { openWordFullInfoDialogHandler };
}

export default useDialogs;
