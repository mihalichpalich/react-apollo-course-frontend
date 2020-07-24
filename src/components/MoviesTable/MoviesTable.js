import React, {useState} from "react";
import {Paper, Table, TableHead, TableRow, TableCell, TableBody, Checkbox, IconButton, Menu, MenuItem} from "@material-ui/core";
import MoreIcon from '@material-ui/icons/MoreVert';
import DeleteIcon from '@material-ui/icons/Delete';
import CreateIcon from '@material-ui/icons/Create';
import {useQuery} from '@apollo/client';

import withHocs from './MoviesTableHoc';
import ItemDialog from "../ItemDialog/ItemDialog";
import {moviesQuery} from "./queries";

const MoviesTable = ({classes, onOpen}) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const [openDialog, setOpenDialog] = useState(false);
    const [itemData, setItemData] = useState({});
    const {loading, error, data = {}} = useQuery(moviesQuery, {
        variables: {name: ""}
    });
    const {movies = []} = data;

    const handleClick = ({currentTarget}, data) => {
        setAnchorEl(currentTarget);
        setItemData(data)
    };

    const handleClose = () => setAnchorEl(null);

    const handleEdit = () => {
        onOpen(itemData);
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
            <ItemDialog open={openDialog} handleClose={handleDialogClose} id={itemData.id}/>

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