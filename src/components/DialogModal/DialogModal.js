import React from "react";
import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from "@material-ui/core";
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import BlockIcon from '@material-ui/icons/Block';

const DialogModal = ({open, handleClose, handleDelete}) => (
    <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
    >
        <DialogTitle id="alert-dialog-title">Are you sire that you want to delete element?</DialogTitle>

        <DialogContent>
            <DialogContentText id="alert-dialog-description">
                If you click 'Confirm' this element will be removed from data base.
            </DialogContentText>
        </DialogContent>

        <DialogActions>
            <Button onClick={handleClose} color="primary"><BlockIcon /> Cancel</Button>
            <Button onClick={handleDelete} color="primary" autoFocus><DeleteForeverIcon/> Confirm</Button>
        </DialogActions>
    </Dialog>
);

export default DialogModal