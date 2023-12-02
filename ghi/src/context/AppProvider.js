import React from "react";
import { PullsContextProvider } from "./PullsContext";
import { QueryContextProvider } from "./QueryContext";
import { DeckQueryContextProvider } from "./DeckQueryContext";
import { BuilderQueryContextProvider } from "./BuilderQueryContext";
import { GameStateContextProvider } from "./GameStateContext";
import { APIContextProvider } from "./APIContext";

const AppProvider = ({ children }) => {
    return (
        <APIContextProvider>
            <BuilderQueryContextProvider>
                <PullsContextProvider>
                    <QueryContextProvider>
                        <DeckQueryContextProvider>
                            <GameStateContextProvider>
                                {children}
                            </GameStateContextProvider>
                        </DeckQueryContextProvider>
                    </QueryContextProvider>
                </PullsContextProvider>
            </BuilderQueryContextProvider>
        </APIContextProvider>
    );
};

export default AppProvider;
