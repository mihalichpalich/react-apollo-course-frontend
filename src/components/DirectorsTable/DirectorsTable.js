import React, {useState, useEffect} from "react";
import {
    Paper,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    IconButton,
    Menu,
    MenuItem,
    LinearProgress
} from "@material-ui/core";
import MoreIcon from '@material-ui/icons/MoreVert';
import DeleteIcon from '@material-ui/icons/Delete';
import CreateIcon from '@material-ui/icons/Create';
import {useLazyQuery} from '@apollo/client';

import withHocs from './DirectorsTableHoc';
import DirectorsDialog from "../DirectorsDialog/DirectorsDialog";
import {directorsQuery} from "./queries";
import DirectorsSearch from "../DirectorsSearch/DirectorsSearch";
import DirectorsErrorDialogModal from "../DirectorsErrorDialogModal/DirectorsErrorDialogModal";

const DirectorsTable = ({classes, onOpen}) => {
    const [directors, setDirectors] = useState([]);
    const [anchorEl, setAnchorEl] = useState(null);
    const [openDialog, setOpenDialog] = useState(false);
    const [openErrorDialog, setOpenErrorDialog] = useState(false);
    const [itemData, setItemData] = useState({});
    const [name, setName] = useState('');

    const [getDirectors, {loading, data, fetchMore}] = useLazyQuery(directorsQuery);

    useEffect(() => {
        getDirectors({
            variables: {name: ""}
        });

        if (data) {
            setDirectors(data.directors);
        }
    }, [getDirectors, data]);

    const handleChange = event => {
        setName(event.target.value)
    };

    const handleSearch = (e) => {
        if (e.charCode === 13) {
            fetchMore({
                variables: {name},
                updateQuery: (previousResult, {fetchMoreResult}) => fetchMoreResult
            })
        }
    };

    const handleClick = ({currentTarget}, data) => {
        setAnchorEl(currentTarget);
        setItemData(data)
    };

    const handleClose = () => setAnchorEl(null);

    const handleEdit = row => {
        onOpen(itemData);
        handleClose()
    };

    const handleDelete = () => {
        (itemData.movies.length > 0) ? handleErrorDialogOpen() : handleDialogOpen();

        handleClose()
    };

    const handleDialogOpen = () => setOpenDialog(true);
    const handleDialogClose = () => setOpenDialog(false);

    const handleErrorDialogOpen = () => setOpenErrorDialog(true);
    const handleErrorDialogClose = () => setOpenErrorDialog(false);

    return (
        <>
            <Paper>
                <DirectorsSearch name={name} handleChange={handleChange} handleSearch={handleSearch}/>
            </Paper>

            <DirectorsDialog open={openDialog} handleClose={handleDialogClose} id={itemData.id}/>
            <DirectorsErrorDialogModal
                open={openErrorDialog}
                handleClose={handleErrorDialogClose}
                errorText="Directors with movies cannot be removed"
            />

            {loading
                ? <LinearProgress color="primary"/>
                : (
                    <Paper className={classes.root}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Name</TableCell>
                                    <TableCell align="right">Age</TableCell>
                                    <TableCell>Movies</TableCell>
                                    <TableCell></TableCell>
                                </TableRow>
                            </TableHead>

                            <TableBody>
                                {directors.map(director => {
                                    return (
                                        <TableRow key={director.id}>
                                            <TableCell component="th" scope="row">{director.name}</TableCell>
                                            <TableCell align="right">{director.age}</TableCell>
                                            <TableCell>
                                                {
                                                    director.movies.map((movie, key) => (
                                                        <div key={movie.name}>{`${key+1}. `}{movie.name}</div>
                                                    ))
                                                }
                                            </TableCell>
                                            <TableCell align="right">
                                                <>
                                                    <IconButton
                                                        color="inherit"
                                                        onClick={
                                                            (e) => {
                                                                handleClick(e, director)
                                                            }
                                                        }
                                                    >
                                                        <MoreIcon/>
                                                    </IconButton>

                                                    <Menu
                                                        id="simple-menu"
                                                        anchorEl={anchorEl}
                                                        open={Boolean(anchorEl)}
                                                        onClose={handleClose}
                                                    >
                                                        <MenuItem onClick={() => handleEdit(director)}>
                                                            <CreateIcon /> Edit
                                                        </MenuItem>
                                                        <MenuItem onClick={handleDelete}>
                                                            <DeleteIcon/> Delete
                                                        </MenuItem>
                                                    </Menu>
                                                </>
                                            </TableCell>
                                        </TableRow>
                                    )
                                })}
                            </TableBody>
                        </Table>
                    </Paper>
                )
            }
        </>
    )
};

export default withHocs(DirectorsTable)