import React, { createContext, useState, useEffect } from 'react';
import { getLoggedUser, isLogged } from '../services/API/ApiUserSession';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        async function fetchData() {
            if (await isLogged()) {
                setUser(await getLoggedUser());
            }
        }

        fetchData();
    }, []);

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
};
