import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

export const userContext = createContext({
    userData: {
        name: "",
        email: "",
        profile: ""
    }, 
    logout: () => {},
    setUserData: () => {}
});

export const UserContextProvider = ({ children }) => {
    const [userData, setUserData] = useState({
        name: "",
        email: "",
        profile: ""
    });

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const res = await axios.get('https://email-app-ppki.onrender.com/auth/me', {
                    withCredentials: true,
                });
                if (res.data.message !== 'Unauthorized') {
                    setUserData({
                        name: res.data.name,
                        email: res.data.email,
                        profile: res.data.profile
                    });
                }
            } catch (err) {
                console.error('Error fetching user:', err);
            }
        };
        fetchUserData();
    }, []);

    const logout = async () => {
        try {
            await axios.get('https://email-app-ppki.onrender.com/logout', { withCredentials: true });
            setUserData({
                name: "",
                email: "",
                profile: ""
            });
            window.location.href = '/';
        } catch (error) {
            console.error("Logout failed", error);
        }
    };

    return (
        <userContext.Provider value={{ userData, setUserData, logout }}>
            {children}
        </userContext.Provider>
    );
};

export const useUserData = () => {
    return useContext(userContext);
};
