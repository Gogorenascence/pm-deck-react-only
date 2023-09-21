import React from "react";
import { PullsContextProvider } from "./PullsContext";
import { QueryContextProvider } from "./QueryContext";
import { DeckQueryContextProvider } from "./DeckQueryContext";
import { AuthContextProvider } from "./AuthContext";
import { BuilderQueryContextProvider } from "./BuilderQueryContext";

const AppProvider = ({ children }) => {
    return (
        <AuthContextProvider>
            <BuilderQueryContextProvider>
                <PullsContextProvider>
                    <QueryContextProvider>
                        <DeckQueryContextProvider>
                            {children}
                        </DeckQueryContextProvider>
                    </QueryContextProvider>
                </PullsContextProvider>
            </BuilderQueryContextProvider>
        </AuthContextProvider>
    );
};

export default AppProvider;
