import React, {useState} from "react";
import {Paper, Table, TableHead, TableRow, TableCell, TableBody, IconButton, Menu, MenuItem} from "@material-ui/core";
import MoreIcon from '@material-ui/icons/MoreVert';
import DeleteIcon from '@material-ui/icons/Delete';
import CreateIcon from '@material-ui/icons/Create';
import {useQuery} from '@apollo/client';

import withHocs from './DirectorsTableHoc';
import ItemDialog from "../ItemDialog/ItemDialog";
import {directorsQuery} from "./queries";

const DirectorsTable = ({classes, onOpen}) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const [openDialog, setOpenDialog] = useState(false);
    const [itemData, setItemData] = useState({});
    const {loading, error, data = {}} = useQuery(directorsQuery, {
        variables: {name: ""}
    });
    const {directors = []} = data;

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
                                                onClick={(e) => handleClick(e, director)}
                                            >
                                                <MoreIcon/>
                                            </IconButton>

                                            <Menu
                                                id="simple-menu"
                                                anchorEl={anchorEl}
                                                open={Boolean(anchorEl)}
                                                onClose={handleClose}
                                            >
                                                <MenuItem onClick={() => handleEdit(director)}><CreateIcon /> Edit</MenuItem>
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

export default withHocs(DirectorsTable)