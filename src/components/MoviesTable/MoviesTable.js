import React, {useState} from "react";
import {Paper, Table, TableHead, TableRow, TableCell, TableBody, Checkbox, IconButton, Menu, MenuItem} from "@material-ui/core";
import MoreIcon from '@material-ui/icons/MoreVert';
import DeleteIcon from '@material-ui/icons/Delete';
import CreateIcon from '@material-ui/icons/Create';

import withHocs from './MoviesTableHoc';
import ItemDialog from "../ItemDialog/ItemDialog";

const movies = [
    { id: 1, name: 'Pulp Fiction', genre: 'Crime', rate: 10, director: { name: 'Quentin Tarantino' }, watched: true },
    { id: 2, name: 'Lock, Stock and Two Smoking Barrels', genre: 'Crime-comedy', rate: 9, director: { name: 'Guy Ritchie' }, watched: false },
];

const MoviesTable = ({classes, onOpen}) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const [openDialog, setOpenDialog] = useState(false);
    const [data, setData] = useState({});

    const handleClick = ({currentTarget}, data) => {
        setAnchorEl(currentTarget);
        setData(data)
    };

    const handleClose = () => setAnchorEl(null);

    const handleEdit = () => {
        onOpen(data);
        handleClose()
    };

    const handleDelete = () => {
        handleDialogOpen();
        handleClose()
    };

    const handleDialogOpen = () => setOpenDialog(true);
    const handleDialogClose = () => setOpenDialog(false);

    return (
        <>
            <ItemDialog open={openDialog} handleClose={handleDialogClose} id={data.id}/>

            <Paper className={classes.root}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell>Genre</TableCell>
                            <TableCell align="right">Rate</TableCell>
                            <TableCell>Director</TableCell>
                            <TableCell>Watched</TableCell>
                            <TableCell align="right"></TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {movies.map(movie => {
                            return (
                                <TableRow key={movie.id}>
                                    <TableCell component="th" scope="row">{movie.name}</TableCell>
                                    <TableCell>{movie.genre}</TableCell>
                                    <TableCell align="right">{movie.rate}</TableCell>
                                    <TableCell>{movie.director.name}</TableCell>
                                    <TableCell><Checkbox checked={movie.watched} disabled /></TableCell>
                                    <TableCell align="right">
                                        <>
                                            <IconButton
                                                color="inherit"
                                                onClick={(e) => handleClick(e, movie)}
                                            >
                                                <MoreIcon/>
                                            </IconButton>

                                            <Menu
                                                id="simple-menu"
                                                anchorEl={anchorEl}
                                                open={Boolean(anchorEl)}
                                                onClose={handleClose}
                                            >
                                                <MenuItem onClick={handleEdit}><CreateIcon /> Edit</MenuItem>
                                                <MenuItem onClick={handleDelete}><DeleteIcon/> Delete</MenuItem>
                                            </Menu>
                                        </>
                                    </TableCell>
                                </TableRow>
                            )
                        })}
                    </TableBody>
                </Table>
            </Paper>
        </>
    )
};

export default withHocs(MoviesTable)