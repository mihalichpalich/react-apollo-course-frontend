import React, {useState} from 'react';
import {AppBar, Tabs, Tab, Typography} from "@material-ui/core";
import MovieCreationIcon from '@material-ui/icons/MovieCreation';
import CameraIcon from '@material-ui/icons/Camera';
import SwipeableViews from "react-swipeable-views";


import withHocs from './TabsHoc';
import Movies from "../Movies/Movies";
import Directors from "../Directors/Directors";

const TabContainer = ({ children, dir }) => (
    <Typography component="div" dir={dir} style={{ padding: 8 * 3 }}>
        {children}
    </Typography>
);

const SimpleTabs = ({classes, theme}) => {
    const [directorsFetch, setDirectorsFetch] = useState(false);
    const [moviesFetch, setMoviesFetch] = useState(false);
    const [value, setValue] = useState(0);

    const handleChange = (event, value) => setValue(value);
    const handleChangeIndex = index => setValue(index);

    const handleFetchDirectors = () => {
        setDirectorsFetch(true);
        setMoviesFetch(false);
    };

    const handleFetchMovies = () => {
        setMoviesFetch(true);
        setDirectorsFetch(false);
    };

    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Tabs variant='fullWidth' value={value} onChange={handleChange}>
                    <Tab label="Movies" icon={<CameraIcon />} onClick={() => handleFetchMovies()}/>
                    <Tab label="Directors" icon={<MovieCreationIcon />} onClick={() => handleFetchDirectors()}/>
                </Tabs>
            </AppBar>
            <SwipeableViews
                axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                index={value}
                onChangeIndex={handleChangeIndex}
            >
                <TabContainer dir={theme.direction}><Movies fetchMovies={moviesFetch}/></TabContainer>
                <TabContainer dir={theme.direction}><Directors fetchDirectors={directorsFetch}/></TabContainer>
            </SwipeableViews>
        </div>
    )
};

export default withHocs(SimpleTabs)