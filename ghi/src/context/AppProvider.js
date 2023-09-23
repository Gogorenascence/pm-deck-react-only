import React from "react";
import { PullsContextProvider } from "./PullsContext";
import { QueryContextProvider } from "./QueryContext";
import { DeckQueryContextProvider } from "./DeckQueryContext";
import { AuthContextProvider } from "./AuthContext";
import { BuilderQueryContextProvider } from "./BuilderQueryContext";
import { APIContextProvider } from "./APIContext";

const AppProvider = ({ children }) => {
    return (
        <AuthContextProvider>
            <APIContextProvider>
                <BuilderQueryContextProvider>
                    <PullsContextProvider>
                        <QueryContextProvider>
                            <DeckQueryContextProvider>
                                {children}
                            </DeckQueryContextProvider>
                        </QueryContextProvider>
                    </PullsContextProvider>
                </BuilderQueryContextProvider>
            </APIContextProvider>
        </AuthContextProvider>
    );
};

export default AppProvider;
