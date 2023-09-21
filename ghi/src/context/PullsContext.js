import { createContext, useState } from "react";

const PullsContext = createContext();

const PullsContextProvider = ({ children }) => {
    const [pulls, setPulls] = useState([]);

    return (
        <PullsContext.Provider value={{ pulls, setPulls }}>
            {children}
        </PullsContext.Provider>
    );
};

export { PullsContext, PullsContextProvider };
