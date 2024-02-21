import React from "react";
import { PullsContextProvider } from "./PullsContext";
import { QueryContextProvider } from "./QueryContext";
import { DeckQueryContextProvider } from "./DeckQueryContext";
import { BuilderQueryContextProvider } from "./BuilderQueryContext";
import { GameStateContextProvider } from "./GameStateContext";
import { SimulatorActionsContextProvider } from "./SimulatorActionsContext";
import { MainActionsContextProvider } from "./MainActionsContext";
import { PluckActionsContextProvider } from "./PluckActionsContext";
import { AppContextProvider } from "./AppContext";
import { APIContextProvider } from "./APIContext";
import { NewsQueryContextProvider } from "./NewsQueryContext";

const AppProvider = ({ children }) => {
    return (
        <APIContextProvider>
            <AppContextProvider>
                <BuilderQueryContextProvider>
                    <PullsContextProvider>
                        <QueryContextProvider>
                            <DeckQueryContextProvider>
                                <GameStateContextProvider>
                                    <SimulatorActionsContextProvider>
                                        <MainActionsContextProvider>
                                            <PluckActionsContextProvider>
                                                <NewsQueryContextProvider>
                                                    {children}
                                                </NewsQueryContextProvider>
                                            </PluckActionsContextProvider>
                                        </MainActionsContextProvider>
                                    </SimulatorActionsContextProvider>
                                </GameStateContextProvider>
                            </DeckQueryContextProvider>
                        </QueryContextProvider>
                    </PullsContextProvider>
                </BuilderQueryContextProvider>
            </AppContextProvider>
        </APIContextProvider>
    );
};

export default AppProvider;
