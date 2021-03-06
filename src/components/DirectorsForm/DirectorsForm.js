import React, {useState} from "react";
import {Dialog, DialogTitle, TextField, Button} from "@material-ui/core";
import SaveIcon from '@material-ui/icons/Save';
import {useMutation} from '@apollo/client';
import {Alert} from "@material-ui/lab";

import withHocs from './DirectorsFormHoc';
import {addDirectorMutation, updateDirectorMutation} from "./mutations";
import {directorsQuery} from "../DirectorsTable/queries";

const DirectorsForm = ({selectedValue = {}, onClose, classes, open, handleChange}) => {
    const [alert, setAlert] = useState({
        showAlert: false,
        alertMessage: ""
    });
    const [addDirector] = useMutation(addDirectorMutation);
    const [updateDirector] = useMutation(updateDirectorMutation);

    const handleClose = () => onClose();

    const handleSave = () => {
        const {id, name, age} = selectedValue;

        setAlert({
            showAlert: false,
            alertMessage: ""
        });

        if (name !== '' && Number.parseInt(age) > 0) {
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

            setAlert({
                showAlert: false,
                alertMessage: ""
            });
            onClose()
        } else if (name === '') {
            setAlert({
                showAlert: true,
                alertMessage: "Director's name should not be empty"
            })
        } else if (Number.parseInt(age) <= 0 || !Number.parseInt(age)) {
            setAlert({
                showAlert: true,
                alertMessage: "Director's age should be a positive number"
            })
        }
    };

    return (
        <Dialog onClose={handleClose} open={open} aria-labelledby="simple-dialog-title">
            <DialogTitle className={classes.title} id="simple-dialog-title">Director information</DialogTitle>

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

            {alert.showAlert && <Alert severity="error">{alert.alertMessage}</Alert>}
        </Dialog>
    )
};

export default withHocs(DirectorsForm)