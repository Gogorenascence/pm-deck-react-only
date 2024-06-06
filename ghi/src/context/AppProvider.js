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
import { FBDeckQueryContextProvider } from "./FBDeckQueryContext.js";
import { SimulatorObjectsContextProvider } from "./SimulatorObjectsContext.js";
import { MatchMakingContextProvider } from "./MatchMakingContext.js";


const AppProvider = ({ children }) => {
    return (
        <APIContextProvider>
            <FBDeckQueryContextProvider>
                <AuthContextProvider>
                    <AppContextProvider>
                        <BuilderQueryContextProvider>
                            <PullsContextProvider>
                                <QueryContextProvider>
                                    <DeckQueryContextProvider>
                                        <GameStateContextProvider>
                                            <MatchMakingContextProvider>
                                                <SimulatorActionsContextProvider>
                                                    <SimulatorObjectsContextProvider>
                                                        <MainActionsContextProvider>
                                                            <PluckActionsContextProvider>
                                                                <NewsQueryContextProvider>
                                                                    <HowToQueryContextProvider>
                                                                        {children}
                                                                    </HowToQueryContextProvider>
                                                                </NewsQueryContextProvider>
                                                            </PluckActionsContextProvider>
                                                        </MainActionsContextProvider>
                                                    </SimulatorObjectsContextProvider>
                                                </SimulatorActionsContextProvider>
                                            </MatchMakingContextProvider>
                                        </GameStateContextProvider>
                                    </DeckQueryContextProvider>
                                </QueryContextProvider>
                            </PullsContextProvider>
                        </BuilderQueryContextProvider>
                    </AppContextProvider>
                </AuthContextProvider>
            </FBDeckQueryContextProvider>
        </APIContextProvider>
    );
};

export default AppProvider;
