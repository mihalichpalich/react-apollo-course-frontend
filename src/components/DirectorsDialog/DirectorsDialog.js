import React from "react";
import {useMutation} from '@apollo/client';

import DialogModal from "../DialogModal/DialogModal";
import {deleteDirectorMutation} from "./mutations";
import {directorsQuery} from '../DirectorsTable/queries';

const DirectorsDialog = ({id, handleClose, open}) => {
    const [deleteDirector] = useMutation(deleteDirectorMutation);

    const handleDelete = () => {
        deleteDirector({
            variables: {id},
            refetchQueries: [{
                query: directorsQuery,
                variables: {name: ""}
            }]
        });

        handleClose()
    };

    return <DialogModal open={open} handleClose={handleClose} handleDelete={handleDelete}/>
};

export default DirectorsDialog