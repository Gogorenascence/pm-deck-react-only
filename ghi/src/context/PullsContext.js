import { createContext, useState } from "react";

const PullsContext = createContext();

const PullsContextProvider = ({ children }) => {
    const [pulls, setPulls] = useState([]);
    const [pullsList, setPullsList] = useState([]);
    const [pulling, setPulling] = useState(false);

    return (
        <PullsContext.Provider value={{
            pulls,
            setPulls,
            pullsList,
            setPullsList,
            pulling,
            setPulling,
            }}>
            {children}
        </PullsContext.Provider>
    );
};

export { PullsContext, PullsContextProvider };
