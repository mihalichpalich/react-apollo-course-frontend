import React from "react";
import {Dialog, DialogTitle, TextField, Button} from "@material-ui/core";
import SaveIcon from '@material-ui/icons/Save';

import withHocs from './DirectorsFormHoc';

const DirectorsForm = ({selectedValue = {}, onClose, classes, open, handleChange, addDirector}) => {
    const handleClose = () => onClose();

    const handleSave = () => {
        const {id, name, age} = selectedValue;
        addDirector({name, age: Number(age)});
        onClose()
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
        </Dialog>
    )
};

export default withHocs(DirectorsForm)