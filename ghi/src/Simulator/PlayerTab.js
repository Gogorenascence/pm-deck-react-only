import React, { useState, useEffect, useContext, useRef } from 'react';
import { GameStateContext } from '../context/GameStateContext';
import deckQueries from '../QueryObjects/DeckQueries';


function PlayerTab({
    account,
    handleChangeDeck,
    decks,
    setDecks,
    loading,
    fillDecks,
    gameStart,
    checkPlayer,
    resetPlayer
}){

    const gameState = useContext(GameStateContext)
    const content = useRef(null)

    const [show, setShow] = useState(false);

    const getDecks = async() => {
        let deckList = []
        const starterDeckIDs = [
            "FIL3xs1syUA0eygAn4vluhaW",
            "B0xE2Cw5GZA4nPf1JfL2s26o",
            "UB99lNIJkpUO8GinVngNpqLN",
            "3pDYioaTWQ63SNuYdorKOLme"
        ]
        if (account) {
            const accountDeckData = await deckQueries.getQueriedDecksData({account_id: account.id});
            if (accountDeckData) {
                deckList = [...deckList, ...accountDeckData]
            }
            console.log("Account decks added.")
            if (account.favorited_decks) {
                for (let deckID of account.favorited_decks) {
                    const deckData = await deckQueries.getDeckDataById(deckID);
                    const present = deckList.find(deck => deck.id === deckID)
                    if (deckData && !present) {
                        deckList.push(deckData)
                    }
                }
            }
            console.log("Favorited decks added.")
            for (let deckID of starterDeckIDs) {
                const deckData = await deckQueries.getDeckDataById(deckID);
                const present = deckList.find(deck => deck.id === deckID)
                if (deckData && !present) {
                    deckList.push(deckData)
                }
            }
            console.log("Starter decks added.")

        } else {
            for (let deckID of starterDeckIDs) {
                const deckData = await deckQueries.getDeckDataById(deckID);
                deckList.push(deckData)
            }
        }
        const sortedDecks = deckList.sort((a, b) => a.name.localeCompare(b.name))
        setDecks(sortedDecks)
    }

    useEffect(() => {
        if (account !== gameState.prevAccount) {
            getDecks();
            gameState.setPrevAccount(account)
        }
    }, [account])

    const handleClose = async() => {
        setShow(false)
        document.body.style.overflow = 'auto';
    };
    const handleShow = async() => {
        setShow(true)
        document.body.style.overflow = 'hidden';
    };

    useOutsideAlerter(content)

    function useOutsideAlerter(ref) {
        useEffect(() => {
          // Function for click event
            function handleOutsideClick(event) {
                if (ref.current && !ref.current.contains(event.target)
                    && !event.target.closest(".playerTabBottom")
                    && !event.target.closest(".playerTabTop")
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
        <div>
            <div className='tabContainer'>
                <div
                    className="playerTabTop flex-full"
                    onClick={() => handleShow()}
                    style={gameState.player.hp < 5?{ backgroundColor: "#ff0000b7"}: null}
                >
                    <h5 className="playerTabTitle">{gameState.player.name}</h5>
                </div>
                <div className="playerTabBottom flex-full" onClick={() => handleShow()}>
                    <img
                        className='logo7'
                        style={{zIndex: "-1"}}
                        src='heart.png'
                        alt='heart'
                    />
                    <h5 className="playerTabTitle2">{gameState.player.hp}</h5>
                    <img
                        className='logo7'
                        style={{zIndex: "-1"}}
                        src='focus3.png'
                        alt='focus'
                    />
                    <h5 className="playerTabTitle2">+{gameState.player.focus}</h5>
                    <img
                        className='logo2'
                        style={{zIndex: "-1"}}
                        src='enth.png'
                        alt='enthusiasm'
                    />
                    <h5 className="playerTabTitle2">{gameState.player.enthusiasm}</h5>
                </div>
            </div>
            {show ?
                <div className="small-modal-dark topbar" ref={content}>
                    <div>
                        <h5 className="label">Select a Deck </h5>
                        <select
                            className="builder-input"
                            type="text"
                            placeholder=" Deck"
                            onChange={handleChangeDeck}
                            name="Deck">
                            <option value="">Deck</option>
                            {decks.map((deck, index) => (
                                <option value={deck.id} key={`${index}: ${deck.name}`}>{deck.name}</option>
                                ))}
                        </select>
                        <div className='margin-10 flex-full'>
                            <button className="front-button" onClick={fillDecks}>Get Deck</button>
                            {gameState.player.mainDeck.length > 0 ?
                                <>
                                    <button className="middle-button" onClick={!gameState.game? gameStart: resetPlayer}>{!gameState.game? "Game Start": "Reset Player"}</button>
                                </>:null
                            }
                            <button className="end-button" onClick={checkPlayer}>Player Info</button>
                        </div>
                    </div>
                    <div className={loading && decks.length < 1? "deckSelect2": "hidden2"}>
                        <p>Loading decks...</p>
                    </div>
                </div>
            : null}
        </div>
    )
}

export default PlayerTab;
