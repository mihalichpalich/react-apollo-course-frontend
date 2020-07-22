import React from "react";

import withHocs from './DirectorsDialogHoc';
import DialogModal from "../DialogModal/DialogModal";

const DirectorsDialog = ({id, handleClose, open, deleteDirector}) => {
    const handleDelete = () => {
        deleteDirector(id);
        handleClose()
    };

    return <DialogModal open={open} handleClose={handleClose} handleDelete={handleDelete}/>
};

export default withHocs(DirectorsDialog)