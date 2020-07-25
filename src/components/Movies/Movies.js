import React, {useState} from "react";
import Fab from "@material-ui/core/Fab";
import AddIcon from '@material-ui/icons/Add';

import withHocs from './MoviesHoc';
import MoviesForm from "../MoviesForm/MoviesForm";
import MoviesTable from "../MoviesTable/MoviesTable";

const Movies = ({classes}) => {
    const [movieData, setMovieData] = useState({
        id: '',
        open: false,
        name: '',
        genre: '',
        watched: false,
        rate: 0,
        directorId: ''
    });

    const handleClickOpen = (data = {}) => {
        setMovieData(prevState => ({
            ...prevState,
            ...data,
            open: true,
            directorId: data.director ? data.director.id : ''
        }))
    };

    const handleChange = name => ({target}) => {
        setMovieData({
            ...movieData,
            [name]: target.value
        })
    };

    const handleSelectChange = ({target}) => {
        setMovieData({
            ...movieData,
            [target.name]: target.value
        })
    };

    const handleCheckboxChange = name => {
        return ({ target }) => {
            setMovieData({
                ...movieData,
                [name]: target.checked
            })
        }
    };

    const handleClose = () => {
        setMovieData({
            name: '',
            genre: '',
            watched: false,
            rate: 0,
            directorId: '',
            open: false,
            id: null
        })
    };

    return (
        <>
            <MoviesForm
                handleChange={handleChange}
                handleSelectChange={handleSelectChange}
                handleCheckboxChange={handleCheckboxChange}
                selectedValue={
                    {
                        id: movieData.id,
                        name: movieData.name,
                        genre: movieData.genre,
                        watched: movieData.watched,
                        rate: movieData.rate,
                        directorId: movieData.directorId
                    }
                }
                open={movieData.open}
                onClose={handleClose}
            />

            <div className={classes.wrapper}>
                <MoviesTable onOpen={handleClickOpen} onClose={handleClose}/>

                <Fab onClick={() => handleClickOpen()} color="primary" aria-label="Add" className={classes.fab}>
                    <AddIcon />
                </Fab>
            </div>
        </>
    )
};

export default withHocs(Movies)