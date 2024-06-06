import { useEffect, useContext, useRef, useState } from "react";
import { GameStateContext } from "../context/GameStateContext";
import { MatchMakingContext } from "../context/MatchMakingContext";
import { SimulatorActionsContext } from "../context/SimulatorActionsContext";
import { MainActionsContext } from "../context/MainActionsContext";
import { PluckActionsContext } from "../context/PluckActionsContext";
import GameBoard from "./GameBoard";
import PositionSlider from "./PositionSlider";
import CardInfoPanel from "./CardInfoPanel";
import LogChatPanel from "./LogChatPanel";
import { AuthContext } from "../context/AuthContext";
import PlayerTab from "./PlayerTab";
import OpponentTab from "./OpponentTab";
import OppGameBoard from "./OppGameBoard";
import OppDefendingCard from "./OppGameBoardParts/OppDefendingCard";
import OppPlayAreaModal from "./OppGameBoardParts/OppPlayAreaModal";
import OppActivePluckModal from "./OppGameBoardParts/OppActivePluckModal";
import OppMainDiscardModal from "./OppGameBoardParts/OppMainDiscardModal";
import OppPluckDiscardModal from "./OppGameBoardParts/OppPluckDiscardModal";
import turnSorter from "./TurnSorter";


function SimulatorPage(props) {
    document.body.classList.add("dark")
    const {
        player,
        setPlayer,
        playerMainDeck,
        playerPluckDeck,
        playArea,
        activePluck,
        handleChangeTransformRotateX,
        handleChangeScale,
        handleChangePosition,
        fieldStyle,
        showExtra,
        setShowExtra,
        volume,
        playingFaceDown,
        setPlayingFaceDown,
    } = useContext(GameStateContext)

    const {
        opponents,
        selectedOpp,
        setSelectedOpp,
        selectedOppCard,
        setSelectedOppCard,
        showOppPlayAreaModal,
        setShowOppPlayAreaModal,
        showOppActivePluckModal,
        setShowOppActivePluckModal,
        showOppDiscardModal,
        setShowOppDiscardModal,
        showOppPluckDiscardModal,
        setShowOppPluckDiscardModal,
        matchMake,
        playerIn,
        waiting
    } = useContext(MatchMakingContext)

    const {
        decks,
        setDecks,
        setCards,
        hand,
        ownership,
        discard,
        pluckDiscard,
        hoveredCard,
        selectedIndex,
        selectedPluckIndex,
        prompt,
        setPrompt,
        fromDeck,
        setFromDeck,
        fromDiscard,
        setFromDiscard,
        showCardMenu,
        showPluckMenu,
        setShowPluckMenu,
        shuffling,
        shufflingPluck,
        handleChangeDeck,
        gameStart,
        checkPlayer,
        resetPlayer,
        handleHoveredCard
    } = useContext(SimulatorActionsContext)

    const {
        shuffleMainDeck,
        drawCard,
        addCardFromDeck,
        addCardFromDiscard,
        swapCardInPlay,
        swapping,
        discardFromDeck,
        handleShowCardMenu,
        selectCard,
        handleCardFromHand,
        handlePlaceCardFromHand,
        playCard,
        discardCard,
        discardCardFromHand,
        topDeckCard,
        bottomDeckCard,
        returnDiscardedCardToDeck
    } = useContext(MainActionsContext)

    const {
        shufflePluckDeck,
        drawPluck,
        addPluckFromDeck,
        addPluckFromDiscard,
        discardFromPluckDeck,
        selectPluck,
        playPluck,
        discardPluck,
        discardPluckFromOwnership,
        returnPluckToDeck,
        returnDiscardedPluckToDeck
    } = useContext(PluckActionsContext)

    const {
        pre_processed_cards,
        card_types,
        card_tags,
        extra_effects,
        reactions
    } = props

    const {account} = useContext(AuthContext)

    const content = useRef(null)

    const getCards = () => {
        const processedCards = []
        for (let card of pre_processed_cards) {
            const cardData = {...card}
            cardData["seriesNames"] = cardData.series_name.split("//")
            cardData["effectText"] = cardData.effect_text.split("//")
            if (cardData.second_effect_text){
                cardData["secondEffectText"] = cardData.second_effect_text.split("//")
            }
            const card_type = card_types.find(card_type => card?.card_type[0] === card_type?.type_number)
            cardData["card_type"] = [card_type]

            const extra_effects_list = []
            for (let extra_effect of extra_effects) {
                if (card.extra_effects.includes(extra_effect.effect_number) ) {
                    extra_effects_list.push(extra_effect)
                }
            }
            cardData["extra_effects"] = extra_effects_list

            const reaction_counts = {}
            for (let reaction_number of card.reactions) {
                const reaction = reactions.find(reaction => reaction.reaction_number === reaction_number)
                !reaction_counts[reaction.name]?
                reaction_counts[reaction.name] = {
                    info: reaction,
                    count: 1,

                }:
                reaction_counts[reaction.name]["count"]++
            }
            const reactions_list = Object.values(reaction_counts)
            cardData["reactions"] = reactions_list

            const card_tags_list = []
            for (let card_tag of card_tags) {
                if (card.card_tags.includes(card_tag.tag_number) ) {
                    card_tags_list.push(card_tag)
                }
            }
            cardData["card_tags"] = card_tags_list

            processedCards.push(cardData)
        }
        setCards(processedCards)
    }

    const getSelectedOppData = () => {
        if (selectedOpp) {
            const selectedOppData = opponents.find(opp => opp.p_id === selectedOpp.p_id)
            setSelectedOpp(selectedOppData)
        }
        if (selectedOppCard) {
            const oppData = opponents.find(opp => opp.p_id === selectedOppCard.owner_id)
            let newDefendingCard = {...oppData.defendingCard}
            console.log(oppData)
            newDefendingCard["owner_id"] = oppData.p_id
            setSelectedOppCard(newDefendingCard)
        }
    }

    useEffect(() => {
        getCards();
        document.title = "Simulator - PM CardBase"
        return () => {
            document.title = "PlayMaker CardBase"
        };
    // eslint-disable-next-line
    },[account]);

    useEffect(() => {
        if (selectedIndex === null && selectedPluckIndex === null) {
            setPrompt({message: "", action: ""})
        }
    }, [showCardMenu, showPluckMenu])

    useEffect(() => {
        setPlayer((prevPlayer) => ({
            ...prevPlayer,
            name: account? account.username: "WindFall",
            mainDeck: playerMainDeck.cards,
            pluckDeck: playerPluckDeck.cards,
            hand: hand,
            ownership: ownership,
            playArea: playArea,
            activePluck: activePluck,
            mainDiscard: discard,
            pluckDiscard: pluckDiscard
        }));
    }, [account, playerMainDeck, playerPluckDeck, hand, ownership, playArea, activePluck, discard, pluckDiscard]);

    useEffect(() => {
        getSelectedOppData()
    }, [opponents])

    const handleClose = async() => {
        setSelectedOpp(null)
        setSelectedOppCard(null)
        document.body.style.overflow = 'auto';
    };

    useOutsideAlerter(content)

    function useOutsideAlerter(ref) {
        useEffect(() => {
          // Function for click event
            function handleOutsideClick(event) {
                if (ref.current && !ref.current.contains(event.target)
                    && !event.target.closest(".playerTabBottom2")
                    && !event.target.closest(".playerTabTop2")
                    ) {
                    handleClose();
                }
            }
          // Adding click event listener
            document.addEventListener("click", handleOutsideClick);
                return () => document.removeEventListener("click", handleOutsideClick);
        }, [ref]);
    }

    return (
        <div className="flex-content simulator">
            {selectedOpp || selectedOppCard?
                <>
                    {selectedOpp?
                        <div className="medium-modal-dark2 topbar" ref={content}>
                            <h2 className="aligned margin-top-0 margin-bottom-10">
                                {selectedOpp.name}
                            </h2>
                            {/* <h3 className="aligned margin-top-0 margin-bottom-30">
                                Priority: {turnSorter.getOppPriority(
                                    selectedOpp,
                                    player,
                                    opponents
                                )}
                            </h3> */}
                            <OppGameBoard
                                opponent={selectedOpp}
                            />
                        </div>: null
                    }
                    {selectedOppCard?
                        <div className="small-modal-dark topbar flex-content" ref={content}>
                            <span>
                                <h2 className="aligned margin-top-0 margin-bottom-10">{selectedOppCard.owner}</h2>
                                <h3 className="aligned margin-top-0 margin-bottom-30">Defending Card</h3>
                                <OppDefendingCard
                                    opponentCard={selectedOppCard}
                                    />
                            </span>
                        </div>: null
                    }
                    {selectedOpp?
                        <>
                            <OppPlayAreaModal
                                player={selectedOpp.name}
                                playArea={selectedOpp.playArea}
                                showOppPlayAreaModal={showOppPlayAreaModal}
                                setShowOppPlayAreaModal={setShowOppPlayAreaModal}
                                handleHoveredCard={handleHoveredCard}
                            />
                            <OppActivePluckModal
                                player={selectedOpp.name}
                                activePluck={activePluck}
                                showOppActivePluckModal={showOppActivePluckModal}
                                setShowOppActivePluckModal={setShowOppActivePluckModal}
                                handleHoveredCard={handleHoveredCard}
                            />
                            <OppMainDiscardModal
                                player={selectedOpp.name}
                                mainDiscard={selectedOpp.mainDiscard}
                                handleHoveredCard={handleHoveredCard}
                                showOppDiscardModal={showOppDiscardModal}
                                setShowOppDiscardModal={setShowOppDiscardModal}
                            />
                            <OppPluckDiscardModal
                                player={selectedOpp.name}
                                pluckDiscard={selectedOpp.pluckDiscard}
                                handleHoveredCard={handleHoveredCard}
                                showOppPluckDiscardModal={showOppPluckDiscardModal}
                                setShowOppPluckDiscardModal={setShowOppPluckDiscardModal}
                            />
                        </>
                    :null}
                </>
            : null}
            <CardInfoPanel hoveredCard={hoveredCard}/>
            <div className={prompt.message? "promptBar pointer": "noPromptBar"}
                onClick={() => setPrompt({message: "", action: ""})}
            >
                <h1 className={prompt.message? null: "hidden2"}>{prompt.message}</h1>
            </div>
            <div className="cd-inner">
                <div className="flex-items space-around playersRow">
                    <span className="flex space-around" style={{minWidth: "75%"}}>
                        <div>
                            <PlayerTab
                                account={account}
                                handleChangeDeck={handleChangeDeck}
                                decks={decks}
                                setDecks={setDecks}
                                gameStart={gameStart}
                                checkPlayer={checkPlayer}
                                resetPlayer={resetPlayer}
                                matchMake={matchMake}
                            />
                            <p className="aligned">{waiting? "Waiting for opponents...": null}</p>
                        </div>
                        {playerIn(player) && opponents.map((opponent, index) => {
                            return (
                                <div key={index}>
                                    <OpponentTab
                                        opponent={opponent}
                                        oppIndex={index}
                                        setSelectedOpp={setSelectedOpp}
                                        setSelectedOppCard={setSelectedOppCard}
                                    />
                                </div>
                            )})
                        }
                    </span>
                </div>
                <div>
                    <GameBoard
                        playArea={player.playArea}
                        activePluck={player.activePluck}
                        drawCard={drawCard}
                        addCardFromDeck={addCardFromDeck}
                        addCardFromDiscard={addCardFromDiscard}
                        drawPluck={drawPluck}
                        addPluckFromDeck={addPluckFromDeck}
                        addPluckFromDiscard={addPluckFromDiscard}
                        returnPluckToDeck={returnPluckToDeck}
                        mainDeck={player.mainDeck}
                        pluckDeck={player.pluckDeck}
                        ownership={player.ownership}
                        showPluckMenu={showPluckMenu}
                        setShowPluckMenu={setShowPluckMenu}
                        fromDeck={fromDeck}
                        setFromDeck={setFromDeck}
                        fromDiscard={fromDiscard}
                        setFromDiscard={setFromDiscard}
                        playCard={playCard}
                        playPluck={playPluck}
                        fieldStyle={fieldStyle}
                        mainDiscard={player.mainDiscard}
                        discardCard={discardCard}
                        discardFromDeck={discardFromDeck}
                        returnDiscardedCardToDeck={returnDiscardedCardToDeck}
                        pluckDiscard={player.pluckDiscard}
                        discardPluck={discardPluck}
                        discardPluckFromOwnership={discardPluckFromOwnership}
                        discardFromPluckDeck={discardFromPluckDeck}
                        returnDiscardedPluckToDeck={returnDiscardedPluckToDeck}
                        handleHoveredCard={handleHoveredCard}
                        selectCard={selectCard}
                        selectedIndex={selectedIndex}
                        selectPluck={selectPluck}
                        selectedPluckIndex={selectedPluckIndex}
                        shuffleMainDeck={shuffleMainDeck}
                        shufflePluckDeck={shufflePluckDeck}
                        showExtra={showExtra}
                        setShowExtra={setShowExtra}
                        volume={volume}
                        shuffling={shuffling}
                        shufflingPluck={shufflingPluck}
                        />

                    {player.hand.length > 0 || player.ownership.length > 0?
                        <>
                            <div className="card-pool-fill-hand">
                                {player.hand.map((card, index) => {
                                    return (
                                        <div className="in-hand"
                                            style={{display: "flex", justifyContent: "center"}}
                                            key={`${index}${card.name}`}
                                        >
                                            <div>
                                                <div className={showCardMenu === index? "card-menu": "hidden2"}>
                                                    <div className="card-menu-item"
                                                        onClick={() => {
                                                            setPlayingFaceDown(false)
                                                            handleCardFromHand(index)
                                                        }}
                                                    ><p>{selectedIndex === index && !playingFaceDown? "Cancel" : "Play Face-Up"}</p></div>
                                                    <div className="card-menu-item"
                                                        onClick={() => {
                                                            setPlayingFaceDown(true)
                                                            handleCardFromHand(index)
                                                        }}
                                                    ><p>{selectedIndex === index && playingFaceDown? "Cancel" : "Play Face-Down"}</p></div>
                                                    <div className="card-menu-item"
                                                        onClick={() => handlePlaceCardFromHand(index)}
                                                    ><p>Place</p></div>
                                                    <div className="card-menu-item"
                                                        onClick={() => discardCardFromHand(index)}
                                                    ><p>Discard</p></div>
                                                    <div className="card-menu-item"
                                                        onClick={() => topDeckCard(index)}
                                                    ><p>Decktop</p></div>
                                                    <div className="card-menu-item"
                                                        onClick={() => bottomDeckCard(index)}
                                                    ><p>Deckbottom</p></div>
                                                </div>
                                                <img
                                                    onClick={(event) => {!swapping.cardToSwap? handleShowCardMenu(index, event):swapCardInPlay(index)}}
                                                    onContextMenu={(event) => handleShowCardMenu(index, event)}
                                                    onMouseEnter={() => handleHoveredCard(card)}
                                                    onDoubleClick={() => {
                                                        setPlayingFaceDown(false)
                                                        handleCardFromHand(index)
                                                    }}
                                                    className={
                                                        showCardMenu === index || selectedIndex === index && !fromDeck && !fromDiscard?
                                                        "selected3 builder-card-hand pointer"
                                                    :
                                                        "builder-card-hand pointer"
                                                    }
                                                    src={card.picture_url ? card.picture_url : "https://i.imgur.com/krY25iI.png"}
                                                    alt={card.name}/>
                                                </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </>: null
                    }
                </div>

            </div>
            <div className="rightSimSide">
                <LogChatPanel/>
            </div>
            <div className="rightSimSide2">
                <PositionSlider
                    handleChangePosition={handleChangePosition}
                    handleChangeScale={handleChangeScale}
                    handleChangeTransformRotateX={handleChangeTransformRotateX}
                    volume={volume}
                />
            </div>
        </div>
    );
}

export default SimulatorPage;
