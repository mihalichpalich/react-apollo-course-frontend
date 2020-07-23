import React from "react";

import SearchPanel from "../SearchPanel/SearchPanel";

const DirectorsSearch = ({name, handleChange, handleSearch}) => {
    return <SearchPanel
        name={name}
        handleChange={handleChange}
        handleSearch={handleSearch}
        placeholderName="Directors Search"
    />
};

export default DirectorsSearch