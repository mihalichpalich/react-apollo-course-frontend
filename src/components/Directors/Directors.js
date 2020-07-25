import React, {useState} from "react";
import Fab from "@material-ui/core/Fab";
import AddIcon from '@material-ui/icons/Add';

import withHocs from './DirectorsHoc';
import DirectorsForm from "../DirectorsForm/DirectorsForm";
import DirectorsTable from "../DirectorsTable/DirectorsTable";

const Directors = ({classes}) => {
    const [directorData, setDirectorData] = useState({
        id: null,
        open: false,
        name: '',
        age: 0
    });

    const handleClickOpen = data => {
        setDirectorData(prevState => ({
            ...prevState,
            ...data,
            open: true
        }))
    };

    const handleChange = name => ({target}) => {
        setDirectorData({
            ...directorData,
            [name]: target.value
        })
    };

    const handleClose = () => {
        setDirectorData({
            name: '',
            age: 0,
            id: null,
            open: false
        })
    };

    return (
        <>
            <DirectorsForm
                handleChange={handleChange}
                selectedValue={
                    {
                        id: directorData.id,
                        name: directorData.name,
                        age: directorData.age
                    }
                }
                open={directorData.open}
                onClose={handleClose}
            />

            <div className={classes.wrapper}>
                <DirectorsTable onOpen={handleClickOpen}/>

                <Fab onClick={() => handleClickOpen(null)} color="primary" aria-label="Add" className={classes.fab}>
                    <AddIcon />
                </Fab>
            </div>
        </>
    )
};

export default withHocs(Directors)