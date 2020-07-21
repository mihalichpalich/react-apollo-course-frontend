import React from "react";
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

import withHocs from './MoviesFormHoc';

const directors = [
    { id: 1, name: 'Quentin Tarantino', age: 55, movies: [ { name: 'Movie 1' }, { name: 'Movie 2' } ] },
    { id: 2, name: 'Guy Ritchie', age: 50, movies: [ { name: 'Movie 1' }, { name: 'Movie 2' } ] }
];

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
    const handleClose = () => onClose();
    const handleSave = () => {
        const {id, name, genre, rate, directorId, watched} = selectedValue;
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
        </Dialog>
    )
};

export default withHocs(MoviesForm)