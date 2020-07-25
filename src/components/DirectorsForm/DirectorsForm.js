import React, {useState} from "react";
import {Dialog, DialogTitle, TextField, Button} from "@material-ui/core";
import SaveIcon from '@material-ui/icons/Save';
import {useMutation} from '@apollo/client';
import {Alert} from "@material-ui/lab";

import withHocs from './DirectorsFormHoc';
import {addDirectorMutation, updateDirectorMutation} from "./mutations";
import {directorsQuery} from "../DirectorsTable/queries";

const DirectorsForm = ({selectedValue = {}, onClose, classes, open, handleChange}) => {
    const [showAlert, setShowAlert] = useState(false);
    const [addDirector] = useMutation(addDirectorMutation);
    const [updateDirector] = useMutation(updateDirectorMutation);

    const handleClose = () => onClose();

    const handleSave = () => {
        const {id, name, age} = selectedValue;

        if (name === '') {
            setShowAlert(true)
        } else {
            if (id) {
                updateDirector({
                    variables: {
                        id,
                        name,
                        age: Number(age)
                    },
                    refetchQueries: [{
                        query: directorsQuery,
                        variables: {name: ""}
                    }]
                })
            } else {
                addDirector({
                    variables: {
                        name,
                        age: Number(age)
                    },
                    refetchQueries: [{
                        query: directorsQuery,
                        variables: {name: ""}
                    }]
                });
            }

            setShowAlert(false);
            onClose()
        }
    };

    return (
        <Dialog onClose={handleClose} open={open} aria-labelledby="simple-dialog-title">
            <DialogTitle className={classes.title} id="simple-dialog-title">Movie information</DialogTitle>

            <form action="/" className={classes.container} noValidate autoComplete="off">
                <TextField
                    id="outlined-name"
                    label="Name"
                    className={classes.textField}
                    value={selectedValue.name}
                    onChange={handleChange('name')}
                    margin="normal"
                    variant="outlined"
                />
                <TextField
                    id="outlined-genre"
                    label="Age"
                    className={classes.textField}
                    value={selectedValue.age}
                    onChange={handleChange('age')}
                    margin="normal"
                    variant="outlined"
                />

                <div className={classes.wrapper}>
                    <Button onClick={handleSave} variant="contained" color="primary" className={classes.button}>
                        <SaveIcon /> Save
                    </Button>
                </div>
            </form>

            {showAlert && <Alert severity="error">Director's name should not be empty</Alert>}
        </Dialog>
    )
};

export default withHocs(DirectorsForm)