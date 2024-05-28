import { useState, useContext } from "react";
import { SimulatorActionsContext } from "../context/SimulatorActionsContext";
import {
    OppPlayAreaZone,
    OppActivePluckZone,
    OppExtraZone
} from "./OppGameBoardParts/OppSimulatorZones";
// import OppPlayAreaModal from "./OppGameBoardParts/OppPlayAreaModal";
// import OppActivePluckModal from "./OppGameBoardParts/OppActivePluckModal";
import OppMainDiscard from "./OppGameBoardParts/OppMainDiscard";
// import OppMainDiscardModal from "./OppGameBoardParts/OppMainDiscardModal";
import OppPluckDiscard from "./OppGameBoardParts/OppPluckDiscard";
// import OppPluckDiscardModal from "./OppGameBoardParts/OppPluckDiscardModal";


function OppGameBoard({
    opponent,
}) {

    const { handleHoveredCard } = useContext(SimulatorActionsContext)

    const fighter = opponent.playArea.fighter_slot || [];
    const aura = opponent.playArea.aura_slot || [];
    const move = opponent.playArea.move_slot || [];
    const ending = opponent.playArea.ending_slot || [];
    const slot5 = opponent.playArea.slot_5 || [];
    const slot6 = opponent.playArea.slot_6 || [];
    const slot7 = opponent.playArea.slot_7 || [];
    const slot8 = opponent.playArea.slot_8 || [];

    const pluck_slot1 = opponent.activePluck.slot_1 || [];
    const pluck_slot2 = opponent.activePluck.slot_2 || [];
    const pluck_slot3 = opponent.activePluck.slot_3 || [];
    const pluck_slot4 = opponent.activePluck.slot_4 || [];

    const defending = opponent.defending || {}
    const faceDown = opponent.faceDown || {}
    const [showDeckSearchModal, setShowDeckSearchModal] = useState(false)
    const [showDiscardModal, setShowDiscardModal] = useState(false)
    const [showPluckSearchModal, setShowPluckSearchModal] = useState(false)
    const [showPluckDiscardModal, setShowPluckDiscardModal] = useState(false)
    const [showPlayAreaModal, setShowPlayAreaModal] = useState({name: "", zone: null, objectName: ""})
    const [showActivePluckModal, setShowActivePluckModal] = useState({name: "", zone: null, objectName: ""})

    return (
        <div>
            <div className="play-area-opp">
                {/* <SimDeckSearchModal
                    mainDeck={mainDeck}
                    handleHoveredCard={handleHoveredCard}
                    showDeckSearchModal={showDeckSearchModal}
                    setShowDeckSearchModal={setShowDeckSearchModal}
                    selectCard={selectCard}
                    selectedIndex={selectedIndex}
                    fromDiscard={fromDiscard}
                    setFromDiscard={setFromDiscard}
                    addCardFromDeck={addCardFromDeck}
                    addCardFromDiscard={addCardFromDiscard}
                    returnDiscardedCardToDeck={returnDiscardedCardToDeck}
                    mainDiscard={mainDiscard}
                    showDiscardModal={showDiscardModal}
                    setShowDiscardModal={setShowDiscardModal}
                    setFromDeck={setFromDeck}
                    volume={volume}
                />
                <SimPluckSearchModal
                    pluckDeck={pluckDeck}
                    handleHoveredCard={handleHoveredCard}
                    showPluckSearchModal={showPluckSearchModal}
                    setShowPluckSearchModal={setShowPluckSearchModal}
                    addPluckFromDeck={addPluckFromDeck}
                    addPluckFromDiscard={addPluckFromDiscard}
                    returnDiscardedPluckToDeck={returnDiscardedPluckToDeck}
                    pluckDiscard={pluckDiscard}
                    showPluckDiscardModal={showPluckDiscardModal}
                    setShowPluckDiscardModal={setShowPluckDiscardModal}
                    volume={volume}
                />
                <PlayAreaModal
                    playArea={playArea}
                    showPlayAreaModal={showPlayAreaModal}
                    setShowPlayAreaModal={setShowPlayAreaModal}
                    handleHoveredCard={handleHoveredCard}
                />
                <ActivePluckModal
                    activePluck={activePluck}
                    showActivePluckModal={showActivePluckModal}
                    setShowActivePluckModal={setShowActivePluckModal}
                    handleHoveredCard={handleHoveredCard}
                    setShowOwnershipModal={setShowOwnershipModal}
                /> */}

                <div className="flex margin-top-10">
                    <div
                        className={defending.slot_5? "matLabel selected4 pointer":"matLabel pointer"}
                    ><h5 className="margin-bottom-0">{defending.slot_5? "Defending":"Defend"}</h5></div>
                    <div
                        className={defending.slot_6? "matLabel selected4 pointer":"matLabel pointer"}
                    ><h5 className="margin-bottom-0">{defending.slot_6? "Defending":"Defend"}</h5></div>
                    <div
                        className={defending.slot_7? "matLabel selected4 pointer":"matLabel pointer"}
                    ><h5 className="margin-bottom-0">{defending.slot_7? "Defending":"Defend"}</h5></div>
                    <div
                        className={defending.slot_8? "matLabel selected4 pointer":"matLabel pointer"}
                    ><h5 className="margin-bottom-0">{defending.slot_8? "Defending":"Defend"}</h5></div>
                </div>
                <div className="flex">
                    <OppExtraZone
                        objectName={"slot_5"}
                        stringName={"Extra Slot 1"}
                        zoneArray={slot5}
                        setShowPlayAreaModal={setShowPlayAreaModal}
                        handleHoveredCard={handleHoveredCard}
                    />
                    <OppExtraZone
                        objectName={"slot_6"}
                        stringName={"Extra Slot 2"}
                        zoneArray={slot6}
                        setShowPlayAreaModal={setShowPlayAreaModal}
                        handleHoveredCard={handleHoveredCard}
                    />
                    <OppExtraZone
                        objectName={"slot_7"}
                        stringName={"Extra Slot 3"}
                        zoneArray={slot7}
                        setShowPlayAreaModal={setShowPlayAreaModal}
                        handleHoveredCard={handleHoveredCard}
                    />
                    <OppExtraZone
                        objectName={"slot_8"}
                        stringName={"Extra Slot 4"}
                        zoneArray={slot8}
                        setShowPlayAreaModal={setShowPlayAreaModal}
                        handleHoveredCard={handleHoveredCard}
                    />
                </div>

                <div className="margin-top-10 flex">
                    <div className="matLabel"
                        style={{marginLeft: "-160px", marginRight: "20px"}}
                    >
                        <h5 className="margin-bottom-0">Hand</h5>
                    </div>
                    <div
                        className={opponent.defending.fighter_slot? "matLabel selected4 pointer":"matLabel pointer"}
                    ><h5 className="margin-bottom-0">{defending.fighter_slot? "Defending":"Defend"}</h5></div>
                    <div
                        className={opponent.defending.aura_slot? "matLabel selected4 pointer":"matLabel pointer"}
                    ><h5 className="margin-bottom-0">{defending.aura_slot? "Defending":"Defend"}</h5></div>
                    <div
                        className={opponent.defending.move_slot? "matLabel selected4 pointer":"matLabel pointer"}
                    ><h5 className="margin-bottom-0">{defending.move_slot? "Defending":"Defend"}</h5></div>
                    <div
                        className={opponent.defending.ending_slot? "matLabel selected4 pointer":"matLabel pointer"}
                    ><h5 className="margin-bottom-0">{defending.ending_slot? "Defending":"Defend"}</h5></div>
                </div>
                <div className="flex">
                    <div style={{marginLeft: "-160px", marginRight: "20px"}}>
                        <div className="matCard pointer">
                            {opponent.hand.length > 1 ?
                                <div className="matCardOverlay">
                                    <h1 className="fontSize60">{opponent.hand.length}</h1>
                                </div> :null
                            }
                            <img
                                className="builder-card5 pointer glow3"
                                src="https://i.imgur.com/krY25iI.png"
                                alt="deck"/>
                        </div>
                    </div>
                    <OppPlayAreaZone
                        objectName={"fighter_slot"}
                        stringName={"Fighter Slot"}
                        zoneArray={fighter}
                        setShowPlayAreaModal={setShowPlayAreaModal}
                        handleHoveredCard={handleHoveredCard}
                        faceDown={faceDown}
                    />
                    <OppPlayAreaZone
                        objectName={"aura_slot"}
                        stringName={"Aura Slot"}
                        zoneArray={aura}
                        setShowPlayAreaModal={setShowPlayAreaModal}
                        handleHoveredCard={handleHoveredCard}
                        faceDown={faceDown}
                    />
                    <OppPlayAreaZone
                        objectName={"move_slot"}
                        stringName={"Move Slot"}
                        zoneArray={move}
                        setShowPlayAreaModal={setShowPlayAreaModal}
                        handleHoveredCard={handleHoveredCard}
                        faceDown={faceDown}
                    />
                    <OppPlayAreaZone
                        objectName={"ending_slot"}
                        stringName={"Ending Slot"}
                        zoneArray={ending}
                        setShowPlayAreaModal={setShowPlayAreaModal}
                        handleHoveredCard={handleHoveredCard}
                        faceDown={faceDown}
                    />
                    <OppMainDiscard
                        mainDeck={opponent.mainDeck}
                        handleHoveredCard={handleHoveredCard}
                        setShowDeckSearchModal={setShowDeckSearchModal}
                        mainDiscard={opponent.mainDiscard}
                        setShowDiscardModal={setShowDiscardModal}
                    />
                </div>

                <div className="flex">
                    <div className="matLabel margin-top-20"
                        style={{marginLeft: "-160px", marginRight: "20px"}}
                    >
                        <h5 className="margin-bottom-0">Reserve</h5>
                    </div>
                    <div className="matLabel2 margin-top-20"><h5 className="margin-bottom-0">Active Pluck</h5></div>
                </div>
                <div className="flex">
                    <div style={{marginLeft: "-160px", marginRight: "20px"}}>
                        <div className="matCard pointer">
                            {opponent.ownership.length > 1 ?
                                <div className="matCardOverlay">
                                    <h1 className="fontSize60">{opponent.ownership.length}</h1>
                                </div> :null
                            }
                            <img
                                className="builder-card5 pointer glow3"
                                src="https://playmakercards.s3.us-west-1.amazonaws.com/plucks4-1.png"
                                alt="pluck deck"/>
                        </div>
                    </div>
                    <OppActivePluckZone
                        objectName={"slot_1"}
                        stringName={"Active Pluck 1"}
                        zoneArray={pluck_slot1}
                        handleHoveredCard={handleHoveredCard}
                        setShowActivePluckModal={setShowActivePluckModal}
                    />
                    <OppActivePluckZone
                        objectName={"slot_2"}
                        stringName={"Active Pluck 2"}
                        zoneArray={pluck_slot2}
                        handleHoveredCard={handleHoveredCard}
                        setShowActivePluckModal={setShowActivePluckModal}
                    />
                    <OppActivePluckZone
                        objectName={"slot_3"}
                        stringName={"Active Pluck 3"}
                        zoneArray={pluck_slot3}
                        handleHoveredCard={handleHoveredCard}
                        setShowActivePluckModal={setShowActivePluckModal}
                    />
                    <OppActivePluckZone
                        objectName={"slot_4"}
                        stringName={"Active Pluck 4"}
                        zoneArray={pluck_slot4}
                        handleHoveredCard={handleHoveredCard}
                        setShowActivePluckModal={setShowActivePluckModal}
                    />
                    <OppPluckDiscard
                        pluckDeck={opponent.pluckDeck}
                        handleHoveredCard={handleHoveredCard}
                        setShowPluckSearchModal={setShowPluckSearchModal}
                        pluckDiscard={opponent.pluckDiscard}
                        setShowPluckDiscardModal={setShowPluckDiscardModal}
                    />
                </div>
            </div>
        </div>
    );
}

export default OppGameBoard
