import React, {useState} from "react";
import {Paper, Table, TableHead, TableRow, TableCell, TableBody, IconButton, Menu, MenuItem} from "@material-ui/core";
import MoreIcon from '@material-ui/icons/MoreVert';
import DeleteIcon from '@material-ui/icons/Delete';
import CreateIcon from '@material-ui/icons/Create';

import withHocs from './DirectorsTableHoc';
import DirectorsDialog from "../DirectorsDialog/DirectorsDialog";

const DirectorsTable = ({classes, onOpen, data}) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const [openDialog, setOpenDialog] = useState(false);
    const [tableData, setTableData] = useState({});
    const {directors = []} = data;

    const handleClick = ({currentTarget}, data) => {
        setAnchorEl(currentTarget);
        setTableData(data)
    };

    const handleClose = () => setAnchorEl(null);

    const handleEdit = row => {
        onOpen(tableData);
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
            <DirectorsDialog open={openDialog} handleClose={handleDialogClose} id={tableData.id}/>

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