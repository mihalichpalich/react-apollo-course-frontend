import React from "react";

import SearchPanel from "../SearchPanel/SearchPanel";

const MoviesSearch = ({name, handleChange, handleSearch}) => {
    return <SearchPanel
        name={name}
        handleChange={handleChange}
        handleSearch={handleSearch}
        placeholderName="Movies Search"
    />
};

export default MoviesSearch