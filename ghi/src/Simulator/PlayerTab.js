import React, { useState, useEffect, useContext, useRef } from 'react';
import { GameStateContext } from '../context/GameStateContext';
import deckQueries from '../QueryObjects/DeckQueries';
import DamageRow from './DamageRow';
import soundPlayer from '../Sounds/SoundPlayer';


function PlayerTab({
    account,
    handleChangeDeck,
    decks,
    setDecks,
    gameStart,
    resetPlayer
}){

    const gameState = useContext(GameStateContext)
    const content = useRef(null)

    const [show, setShow] = useState(false);

    const [roll, setRoll] = useState(0);
    const [addRoll, setAddRoll] = useState(false);
    const [rollString, setRollString] = useState("");

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

    useEffect(() => {
        // const resetInterval = setInterval(() => {
        //     setRoll(0);
        // }, 60000);
        // // Cleanup interval on component unmount
        // return () => clearInterval(resetInterval);

        const timeout = setTimeout(function() {
            setRoll(0)
        }, 60000);

        return () => clearTimeout(timeout);
      }, [roll]); // Empty dependency array means this effect runs once when the component mounts

    const handleShow = async() => {
        setShow(true)
        document.body.style.overflow = 'hidden';
    };

    const handleClose = async() => {
        setShow(false)
        document.body.style.overflow = 'auto';
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

    const handleAddRoll = () => {
        setAddRoll(!addRoll)
    }

    const diceRoll = () => {
        let newRoll = Math.floor(Math.random() *6) + 1
        gameState.addToLog(
            "System",
            "system",
            `${gameState.player.name} rolled a ${newRoll}`
        )
        soundPlayer.rollSound(gameState.volume)
        if (addRoll) {
            setRollString(`Your combined roll: ${roll + newRoll}`)
            setRoll(roll + newRoll)
        } else {
            setRollString(`Your roll: ${newRoll}`)
            setRoll(newRoll)
        }
    }

    return (
        <div>
            <span>
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
                        src='heart.png'
                        title='HP'
                        alt='heart'
                    />
                    <h5 className="playerTabTitle2">{gameState.player.hp}</h5>
                    <img
                        className='logo2'
                        src='mettle.png'
                        title='Mettle'
                        alt='mettle'
                    />
                    <h5 className="playerTabTitle2">{gameState.player.mettle}</h5>
                    <img
                        className='logo2'
                        src='focus3.png'
                        title='Focus'
                        alt='focus'
                    />
                    <h5 className="playerTabTitle2">+{gameState.player.focus}</h5>
                    <img
                        className='logo2'
                        src='enth.png'
                        title='Enthusiasm'
                        alt='enthusiasm'
                    />
                    <h5 className="playerTabTitle2">{gameState.player.enthusiasm}</h5>
                </div>
            </span>
            {show ?
                <div className="small-modal-dark topbar" ref={content}>
                    <div className='flex-column-full margin-bottom-20'>
                        <h2 className="aligned margin-top-0 margin-bottom-30">Player Panel </h2>
                        <div>
                            <h5 className="label margin-top-none">Select a Deck </h5>
                            <select
                                className="builder-input"
                                type="text"
                                placeholder=" Deck"
                                onChange={handleChangeDeck}
                                disabled={gameState.game? true: false}
                                name="Deck">
                                <option value="">Deck</option>
                                {decks.map((deck, index) => (
                                    <option value={deck.id} key={`${index}: ${deck.name}`}>{deck.name}</option>
                                    ))}
                            </select>
                        </div>
                        <div className='margin-10 flex-full'>
                            {/* <button
                                className="front-button"
                                onClick={fillDecks}
                            >
                                Get Deck
                            </button> */}
                            <button
                                className="front-button"
                                onClick={() => {
                                    gameStart()
                                    handleClose()
                                }}
                                disabled={gameState.player.mainDeck.length === 0 || gameState.game? true : false}
                            >
                                Game Start
                            </button>
                            <button
                                className="end-button red margin-left-3"
                                onClick={() => {
                                    resetPlayer()
                                    handleClose()
                                }}
                                disabled={ !gameState.game ? true : false}
                            >
                                Game End
                            </button>
                        </div>
                        <DamageRow/>
                        <span className='margin-top-10'>
                            <h5 className="label margin-0">Dice Roller </h5>
                            <div className="flex-full" style={{width: "370px"}}>
                                <img
                                    className={`logo7 margin-top-10 ${addRoll? null: "half2"}`}
                                    src='addRoll.png'
                                    onClick={() => handleAddRoll()}
                                    title={addRoll? "New Roll": "Adding Rolls"}
                                    alt='addRoll'
                                />
                                <div
                                    className="rollTracker flex-items"
                                    style={{width: "370px"}}
                                >
                                    <p className='m-l-r-5'>
                                        {roll === 0? "Waiting for next roll...": rollString}
                                    </p>
                                </div>
                                <button
                                    onClick={diceRoll}
                                    className="margin-top-5 end-button margin-left-3"
                                    >
                                    Roll
                                </button>
                            </div>
                        </span>
                    </div>

                </div>
            : null}
        </div>
    )
}

export default PlayerTab;


{/* <div className='margin-10 flex-full'>
                            <button className="front-button" onClick={fillDecks}>Get Deck</button>
                            {gameState.player.mainDeck.length > 0 ?
                                <>
                                    <button className="middle-button" onClick={!gameState.game? gameStart: resetPlayer}>{!gameState.game? "Game Start": "Reset Player"}</button>
                                </>:null
                            }
                            <button className="end-button" onClick={checkPlayer}>Player Info</button>
                        </div> */}

                                            {/* <div className={loading && decks.length < 1? "deckSelect2": "hidden2"}>
                        <p>Loading decks...</p>
                    </div> */}
