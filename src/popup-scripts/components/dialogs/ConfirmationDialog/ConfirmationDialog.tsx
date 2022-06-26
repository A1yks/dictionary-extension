import { LoadingButton } from '@mui/lab';
import { Button, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import { CustomDialog } from '@popup/components/UI/CustomDialog';
import { closeDialog } from '@popup/components/UI/CustomDialog/controllers';
import { FC } from 'react';
import { ConfirmationDialogProps } from './ConfirmationDialog.types';

const ConfirmationDialog: FC<ConfirmationDialogProps> = (props) => {
    function closeHandler() {
        if (props.onClose) props.onClose();

        closeDialog(props.id);
    }

    return (
        <CustomDialog id={props.id} onClose={props.onClose}>
            <DialogTitle>{props.title || 'Подтвердите действие'}</DialogTitle>
            <DialogContent>
                <DialogContentText>{props.content}</DialogContentText>
            </DialogContent>
            <DialogActions>
                <LoadingButton loading={props.loading} onClick={props.onConfirm}>
                    Да
                </LoadingButton>
                <Button onClick={closeHandler} disabled={props.loading}>
                    Нет
                </Button>
            </DialogActions>
        </CustomDialog>
    );
};

export default ConfirmationDialog;
