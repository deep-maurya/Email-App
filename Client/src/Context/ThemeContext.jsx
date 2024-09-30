import React, { createContext, useState, useEffect, useContext } from "react";

export const ThemeContext = createContext({
    theme: "dark",
    ToggleTheme: () => {}
});

export const ThemeContextProvider = ({ children }) => {
    const storedTheme = localStorage.getItem("theme") || "light";
    const [theme, setTheme] = useState(storedTheme); 

    const ToggleTheme = () => {
        const newTheme = (theme === "light" ? "dark" : "light");
        setTheme(newTheme);
        localStorage.setItem("theme", newTheme);
    };

    useEffect(() => {
        const html = document.documentElement;
        html.className = theme;
    }, [theme]);

    return (
        <ThemeContext.Provider value={{ theme, ToggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => {
    return useContext(ThemeContext);
};