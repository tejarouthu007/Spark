import React, { useState, useEffect, createContext } from 'react'

export const AppContext = createContext();

export const AppContextProvider = (props) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [currentPage, setCurrentPage] = useState("");

    const value = {
        isLoggedIn, setIsLoggedIn,
        currentPage, setCurrentPage
    };
    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}
