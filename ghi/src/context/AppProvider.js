import React from "react";
import { PullsContextProvider } from "./PullsContext.js";
import { QueryContextProvider } from "./QueryContext.js";
import { DeckQueryContextProvider } from "./DeckQueryContext.js";
import { BuilderQueryContextProvider } from "./BuilderQueryContext.js";
import { GameStateContextProvider } from "./GameStateContext.js";
import { SimulatorActionsContextProvider } from "./SimulatorActionsContext.js";
import { MainActionsContextProvider } from "./MainActionsContext.js";
import { PluckActionsContextProvider } from "./PluckActionsContext.js";
import { AppContextProvider } from "./AppContext.js";
import { APIContextProvider } from "./APIContext.js";
import { NewsQueryContextProvider } from "./NewsQueryContext.js";
import { HowToQueryContextProvider } from "./HowToQueryContext.js";
import { AuthContextProvider } from "./AuthContext.js";


const AppProvider = ({ children }) => {
    return (
        <APIContextProvider>
            <AuthContextProvider>
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
                                                        <HowToQueryContextProvider>
                                                            {children}
                                                        </HowToQueryContextProvider>
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
            </AuthContextProvider>
        </APIContextProvider>
    );
};

export default AppProvider;
