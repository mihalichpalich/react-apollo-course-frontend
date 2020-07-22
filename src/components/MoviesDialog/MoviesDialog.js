import React from "react";

import withHocs from './MoviesDialogHoc';
import DialogModal from "../DialogModal/DialogModal";

const MoviesDialog = ({id, handleClose, open, deleteMovie}) => {
    const handleDelete = () => {
        deleteMovie(id);
        handleClose()
    };

    return <DialogModal open={open} handleClose={handleClose} handleDelete={handleDelete}/>
};

export default withHocs(MoviesDialog)