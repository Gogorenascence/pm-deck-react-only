import { createContext, useState } from "react";


const FBDeckQueryContext = createContext();

const FBDeckQueryContextProvider = ({ children }) => {

    const [deckQuery, setDeckQuery] = useState({
        name: ["","", false],
        creator: ["","", false],
        card_series_names: ["","", false],
        private: [false, "==", true]
    });
    const [deckSortState, setDeckSortState] = useState("none");
    const [queryChanged, setQueryChanged] = useState(false)

    return (
        <FBDeckQueryContext.Provider value={{
            deckQuery,
            setDeckQuery,
            deckSortState,
            setDeckSortState,
            queryChanged,
            setQueryChanged
            }}>
            {children}
        </FBDeckQueryContext.Provider>
    );
};

export { FBDeckQueryContext, FBDeckQueryContextProvider };
