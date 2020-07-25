import React, {useState} from "react";
import {
    Dialog,
    DialogTitle,
    TextField,
    FormControl,
    InputLabel,
    Select,
    OutlinedInput,
    MenuItem,
    FormControlLabel,
    Checkbox,
    Button
} from "@material-ui/core";
import SaveIcon from '@material-ui/icons/Save';
import {useMutation, useQuery} from '@apollo/client';
import {Alert} from "@material-ui/lab";

import withHocs from './MoviesFormHoc';
import {addMovieMutation, updateMovieMutation} from "./mutations";
import {moviesQuery} from "../MoviesTable/queries";
import {directorsQuery} from "./queries";

const MoviesForm = (
    {
        selectedValue = {},
        onClose,
        classes,
        open,
        handleChange,
        handleSelectChange,
        handleCheckboxChange
    }
) => {
    const [showAlert, setShowAlert] = useState(false);
    const [addMovie] = useMutation(addMovieMutation);
    const [updateMovie] = useMutation(updateMovieMutation);
    const {data = {}} = useQuery(directorsQuery, {
        variables: {name: ""}
    });
    const {directors = []} = data;

    const handleClose = () => onClose();

    const handleSave = () => {
        const {id, name, genre, rate, directorId, watched} = selectedValue;

        if (name === '' || genre === '' || directorId === '') {
            setShowAlert(true)
        } else {
            if (id) {
                updateMovie({
                    variables: {id, name, genre, rate: Number(rate), directorId, watched: Boolean(watched)},
                    refetchQueries: [{
                        query: moviesQuery,
                        variables: {name: ""}
                    }]
                });
            } else {
                addMovie({
                    variables: {name, genre, rate: Number(rate), directorId, watched: Boolean(watched)},
                    refetchQueries: [{
                        query: moviesQuery,
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
                    label="Genre"
                    className={classes.textField}
                    value={selectedValue.genre}
                    onChange={handleChange('genre')}
                    margin="normal"
                    variant="outlined"
                />
                <TextField
                    id="outlined-rate"
                    label="Rate"
                    value={selectedValue.rate}
                    onChange={handleChange('rate')}
                    type="number"
                    className={classes.textField}
                    margin="normal"
                    variant="outlined"
                />

                <FormControl variant="outlined" className={classes.formControlSelect}>
                    <InputLabel ref={ref => {let InputLabelRef = ref}} htmlFor="outlined-age-simple">
                        Director
                    </InputLabel>

                    <Select
                        value={selectedValue.directorId}
                        onChange={handleSelectChange}
                        input={<OutlinedInput name="directorId" id="outlined-director" labelWidth={57} />}
                    >
                        {directors.map(director => <MenuItem key={director.id} value={director.id}>{director.name}</MenuItem>)}
                    </Select>
                </FormControl>

                <div className={classes.wrapper}>
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={selectedValue.watched}
                                onChange={handleCheckboxChange('watched')}
                                value="watched"
                            />}
                        label="Watched movie"
                    />

                    <Button onClick={handleSave} variant="contained" color="primary" className={classes.button}>
                        <SaveIcon /> Save
                    </Button>
                </div>
            </form>

            {showAlert && <Alert severity="error">Please note the movie's name and genre and choose the director</Alert>}
        </Dialog>
    )
};

export default withHocs(MoviesForm)