import React from "react";
import {Button, Dialog, DialogActions, DialogContent, DialogContentText} from "@material-ui/core";
import BlockIcon from '@material-ui/icons/Block';

const DirectorsErrorDialogModal = ({open, handleClose, errorText}) => (
    <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
    >
        <DialogContent>
            <DialogContentText id="alert-dialog-description">
                {errorText}
            </DialogContentText>
        </DialogContent>

        <DialogActions>
            <Button onClick={handleClose} color="primary"><BlockIcon /> Cancel</Button>
        </DialogActions>
    </Dialog>
);

export default DirectorsErrorDialogModal