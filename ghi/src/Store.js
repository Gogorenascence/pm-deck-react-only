import React, { createContext, useReducer } from "react";

const initialState = {
    token: null,
    currentAccount: { id: null, email: null, username: null },
};

export const Context = createContext(initialState);

export const Store = ({ children }) => {
    const [state, dispatch] = useReducer((state, action) => {
        switch (action.type) {
            case "login":
                return { ...state, token: (state.token = true) };

            case "logout":
                return { ...state, token: (state.token = false) };

            case "update_current":
                return { ...state, currentAccount: action.payload };

            default:
                return state;
        }
    }, initialState);

    return (
        <Context.Provider value={[state, dispatch]}>
            {children}
        </Context.Provider>
    );
};
