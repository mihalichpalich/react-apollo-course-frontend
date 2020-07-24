import React from "react";
import {useMutation} from '@apollo/client';

import DialogModal from "../DialogModal/DialogModal";
import {deleteMovieMutation} from "./mutations";
import {moviesQuery} from "../MoviesTable/queries";

const MoviesDialog = ({id, handleClose, open}) => {
    const [deleteMovie] = useMutation(deleteMovieMutation);

    const handleDelete = () => {
        deleteMovie({
            variables: {id},
            refetchQueries: [{
                query: moviesQuery,
                variables: {name: ""}
            }]
        });
        handleClose()
    };

    return <DialogModal open={open} handleClose={handleClose} handleDelete={handleDelete}/>
};

export default MoviesDialog