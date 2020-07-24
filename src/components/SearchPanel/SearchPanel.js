import React from "react";
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';

import withHocs from './SearchPanelHoc';

const SearchPanel = ({classes, name, handleChange, handleSearch, placeholderName}) => (
    <div className={classes.search}>
        <div className={classes.searchIcon}>
            <SearchIcon />
        </div>

        <InputBase
            onChange={handleChange}
            onKeyPress={(e) => handleSearch(e)}
            value={name}
            placeholder={placeholderName}
            classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
            }}
        />
    </div>
);

export default withHocs(SearchPanel)