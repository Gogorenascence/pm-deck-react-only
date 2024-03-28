import { createContext, useState } from "react";

const PullsContext = createContext();

const PullsContextProvider = ({ children }) => {
    const [boosterSetPulled, setBoosterSetPulled] = useState("")
    const [pulls, setPulls] = useState([]);
    const [pullsList, setPullsList] = useState([]);
    const [pulling, setPulling] = useState(false);

    return (
        <PullsContext.Provider value={{
            boosterSetPulled,
            setBoosterSetPulled,
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
