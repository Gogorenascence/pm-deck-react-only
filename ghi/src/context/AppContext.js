import { createContext, useState, useEffect } from "react";


const AppContext = createContext();

const AppContextProvider = ({ children }) => {
    const [isDark, setIsDark] = useState(() => {
        const savedDarkMode = localStorage.getItem("darkMode");
        return savedDarkMode ? JSON.parse(savedDarkMode) : false;
    });

    const [position, setPosition] = useState({ x: 0, y: 0 });

    const handleMouseMove = (event) => {
        setPosition({
            x: event.clientX,
            y: event.clientY,
        });
    }

    useEffect(() => {
        window.addEventListener("mousemove", handleMouseMove);
        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
        };
    }, []);


    return (
        <AppContext.Provider value={{
            isDark,
            setIsDark,
            position,
            setPosition,
            }}>
            {children}
        </AppContext.Provider>
    );
};

export { AppContext, AppContextProvider };
