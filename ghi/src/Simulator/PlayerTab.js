import React, { useState, useEffect, useContext, useRef } from 'react';
import { GameStateContext } from '../context/GameStateContext';
import deckQueries from '../QueryObjects/DeckQueries';
import DamageRow from './DamageRow';
import DefendingCard from './DefendingCard';
import DiceRoller from './DiceRoller';
import soundPlayer from '../Sounds/SoundPlayer';
import turnSorter from './TurnSorter';


function PlayerTab({
    account,
    handleChangeDeck,
    decks,
    setDecks,
    gameStart,
    resetPlayer,
    matchMake
}){

    const gameState = useContext(GameStateContext)
    const content = useRef(null)

    const [show, setShow] = useState(null);
    const [flip, setFlip] = useState(null)

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
            // console.log("Account decks added.")
            if (account.favorited_decks) {
                for (let deckID of account.favorited_decks) {
                    const deckData = await deckQueries.getDeckDataById(deckID);
                    const present = deckList.find(deck => deck.id === deckID)
                    if (deckData && !present) {
                        deckList.push(deckData)
                    }
                }
            }
            // console.log("Favorited decks added.")
            for (let deckID of starterDeckIDs) {
                const deckData = await deckQueries.getDeckDataById(deckID);
                const present = deckList.find(deck => deck.id === deckID)
                if (deckData && !present) {
                    deckList.push(deckData)
                }
            }
            // console.log("Starter decks added.")

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

    const handleShow = async(event, section) => {
        event.preventDefault()
        setShow(section)
        document.body.style.overflow = 'hidden';
    };

    const handleClose = async() => {
        setShow(null)
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

    const handleProp = (prop, gain) => {
        const newPlayer = {...gameState.player}
        if (gain) {
            newPlayer[prop] ++
        } else if (newPlayer[prop] > 0) {
            newPlayer[prop] --
        }
        gameState.setPlayer(newPlayer)
    }

    const handleSecondWind = () => {
        const newPlayer = {...gameState.player}
        newPlayer["secondWind"] = !newPlayer["secondWind"]
        if (newPlayer["secondWind"] === true) {
            soundPlayer.startSound(gameState.volume)
        }
        gameState.setPlayer(newPlayer)
    }

    const handleFocus = (gain) => {
        const newPlayer = {...gameState.player}
        if (gain) {
            newPlayer.focus ++
        } else {
            newPlayer.focus --
        }
        gameState.setPlayer(newPlayer)
    }

    const coinFlip = () => {
        let newFlip = Math.floor(Math.random() *2)
        console.log(newFlip)
        soundPlayer.coinSound(gameState.volume)
        newFlip === 0? setFlip("heads"): setFlip("tails")
        gameState.addToLog(
            "System",
            "system",
            `${gameState.player.name}'s coin landed on ${newFlip === 0? "heads": "tails"}`
        )
    }

    const handleEnthusiasm = (event) => {
        event.target.value?
            gameState.setPlayer({...gameState.player, enthusiasm: event.target.value}):
            gameState.setPlayer({...gameState.player, enthusiasm: 0 })
    }

    useEffect(() => {
        const timeout = setTimeout(function() {
            setFlip(null)
        }, 60000);

        return () => clearTimeout(timeout);
    }, [flip]);

    return (
        <div>
            <span className='pointer'>
                <div
                    className="playerTabTop flex-full"
                    onClick={(event) => handleShow(event, "player")}
                    onContextMenu={(event) => handleShow(event, "player")}
                    style={gameState.player.hp < 5 || gameState.player.secondWind?{ backgroundColor: "#ff0000b7"}: null}
                >
                    <h5 className="playerTabTitle">{gameState.player.name}</h5>
                </div>
                <div className="playerTabBottom flex-full">
                    <span
                        className='flex-items'
                        onClick={(event) => handleShow(event, "health")}
                        onContextMenu={(event) => handleShow(event, "health")}
                    >
                        <img
                            className='logo7'
                            src='heart.png'
                            title='HP'
                            alt='heart'
                        />
                        <h5 className="playerTabTitle2">{gameState.player.hp}</h5>
                    </span>
                    <span
                        className='flex-items'
                        onClick={(event) => handleShow(event, "mettle")}
                        onContextMenu={(event) => handleShow(event, "mettle")}
                    >
                        <img
                            className='logo2'
                            src='mettle.png'
                            title='Mettle'
                            alt='mettle'
                            />
                        <h5 className="playerTabTitle2">{gameState.player.mettle}</h5>
                    </span>
                    <span
                        className='flex-items'
                        onClick={(event) => handleShow(event, "focus")}
                        onContextMenu={(event) => handleShow(event, "focus")}
                    >
                        <img
                            className='logo2'
                            src='focus3.png'
                            title='Focus'
                            alt='focus'
                        />
                        <h5 className="playerTabTitle2">
                            {gameState.player.focus > -1?
                                `+${gameState.player.focus}`
                                : gameState.player.focus}
                        </h5>
                    </span>
                    <span
                        className='flex-items'
                        onClick={(event) => handleShow(event, "enth")}
                        onContextMenu={(event) => handleShow(event, "enth")}
                    >
                        <img
                            className='logo2'
                            src='enth.png'
                            title='Enthusiasm'
                            alt='enthusiasm'
                        />
                        <h5 className="playerTabTitle2">{gameState.player.enthusiasm}</h5>
                    </span>
                </div>
            </span>
            {show && show === "player"?
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
                                className='middle-button margin-left-3'
                                onClick={matchMake}
                            >
                                Find opponents
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
                                <DiceRoller/>
                        </span>
                    </div>
                </div>
            : null}
            {show && show === "health"?
                <div className="small-modal-dark topbar" ref={content}>
                    <div className='flex-column-full margin-bottom-10'>
                        <h2 className="aligned margin-top-0 margin-bottom-30">Player and Card Health </h2>
                        <DamageRow/>
                        <DefendingCard/>
                    </div>
                </div>
            : null}
            {show && show === "mettle"?
                <div className="small-modal-dark topbar" ref={content}>
                    <div className='flex-column-full margin-bottom-10'>
                    <h2 className="aligned margin-top-0">Mettle and Second Wind </h2>
                        <div
                            className='flex-items between-space margin-top-20'
                            style={{width: "370px"}}
                        >
                            <span>
                                <h5 className="label margin-0">Mettle </h5>
                                <div className="flex-items between-space" style={{width: "100px"}}>
                                    <img
                                        className='logo7 margin-top-10 pointer'
                                        src='gain.png'
                                        onClick={() => handleProp("mettle", true)}
                                        title='Gain Mettle'
                                        alt='gain'
                                        />
                                    <h5 className="label margin-0">{gameState.player.mettle}</h5>
                                    <img
                                        className='logo7 margin-top-10 pointer'
                                        src='damage.png'
                                        onClick={() => handleProp("mettle", false)}
                                        title='Lose Mettle'
                                        alt='damage'
                                        />
                                </div>
                            </span>
                            <span className='aligned'>
                                <h5 className="label margin-0">Second Wind</h5>
                                <div className="flex-items between-space" style={{width: "120px"}}>
                                    <button
                                        className='margin-top-5'
                                        onClick={handleSecondWind}
                                        style={{width: "100%"}}
                                    >
                                        {gameState.player.secondWind? "Deactivate": "Activate"}
                                    </button>
                                </div>
                            </span>
                        </div>
                    </div>
                </div>
            : null}
            {show && show === "focus"?
                <div className="small-modal-dark topbar" ref={content}>
                    <div className='flex-column-full margin-bottom-10'>
                        <h2 className="aligned margin-top-0">Focus and Luck </h2>
                        <div
                            className='flex-items between-space margin-top-10'
                            style={{width: "370px"}}
                        >
                            <span>
                                <h5 className="label margin-0">Focus </h5>
                                <div className="flex-items between-space" style={{width: "100px"}}>
                                    <img
                                        className='logo7 margin-top-10 pointer'
                                        src='gain.png'
                                        onClick={() => handleFocus(true)}
                                        title='Gain HP'
                                        alt='gain'
                                        />
                                    <h5 className="label margin-0">{gameState.player.focus}</h5>
                                    <img
                                        className='logo7 margin-top-10 pointer'
                                        src='damage.png'
                                        onClick={() => handleFocus(false)}
                                        title='Damage'
                                        alt='damage'
                                        />
                                </div>
                            </span>
                            {/* <button>Random Foe</button> */}

                        </div>
                        <span className=' margin-top-10'>
                            <DiceRoller/>
                        </span>
                        <span>
                            <h5 className="label margin-top-10 margin-left-none">Coin Flip </h5>
                            <div className="flex-full" style={{width: "370px"}}>
                                <div
                                    className="rollTracker flex-items"
                                    style={{width: "370px"}}
                                >
                                    <p className='m-l-r-5'>
                                        { flip === null? "Waiting for next coin flip...": `Coin landed on ${flip}`}
                                    </p>
                                </div>
                                <button
                                    onClick={coinFlip}
                                    className="margin-top-5 end-button margin-left-3"
                                >
                                    Flip
                                </button>
                            </div>
                        </span>
                    </div>
                </div>
            : null}
            {show && show === "enth"?
                <div className="small-modal-dark topbar" ref={content}>
                    <div className='flex-column-full margin-bottom-10'>
                    <h2 className="aligned margin-top-0">Enthusiasm</h2>
                        <div
                            className='flex-items between-space margin-top-20'
                            style={{width: "370px"}}
                        >
                            <span>
                                <h5 className="label margin-0">Enthusiasm</h5>
                                <div className="flex-items between-space" style={{width: "100px"}}>
                                    <input
                                        type="number"
                                        value={gameState.player.enthusiasm}
                                        min={0}
                                        onChange={handleEnthusiasm}
                                        placeholder="Damage"
                                        className="healthTracker4"
                                    ></input>
                                </div>
                            </span>
                            <span className='aligned'>
                                <h5 className="label margin-0">Priority</h5>
                                <div
                                    className="rollTracker flex-items"
                                    style={{width: "150px"}}
                                >
                                    <p className='m-l-r-5'>
                                        {turnSorter.getPriority(
                                            gameState.player,
                                            gameState.opponents
                                        )}
                                    </p>
                                </div>
                            </span>
                        </div>
                    </div>
                </div>
            : null}
        </div>
    )
}

export default PlayerTab;
