import React, { useState, useEffect } from 'react';


function OpponentTab({
    opponent,
    oppIndex,
    setSelectedOpp,
    setSelectedOppCard
}){

    const handleShow = async() => {
        setSelectedOpp(opponent)
        console.log(opponent)
        document.body.style.overflow = 'hidden';
    };

    const handleShowDefending = async() => {
        if (opponent.defendingCard.card !== "") {
            console.log("Opponent", opponent.defendingCard)
            setSelectedOppCard(opponent.defendingCard)
        }
        document.body.style.overflow = 'hidden';
    };

    const colors = {
        "0": "rgba(3, 131, 78, 0.589)",
        "1": "rgba(82, 95, 194, 0.589)",
        "2": "rgba(101, 56, 131, 0.589)"
    }

    return (
        <div>
            <span className='pointer'>
                <div
                    className="playerTabTop flex-full"
                    onClick={() => handleShow()}
                    style={{ backgroundColor: `${ opponent.hp < 5? "#ff0000b7": colors[oppIndex.toString()]}` }}
                >
                    <h5 className="playerTabTitle">{opponent.name}</h5>
                </div>
                <div className="playerTabBottom flex-full">
                    <span
                        className='flex-items'
                        onClick={() => handleShowDefending()}
                    >
                        <img
                            className='logo7'
                            src='heart.png'
                            title='HP'
                            alt='heart'
                        />
                        <h5 className="playerTabTitle2">{opponent.hp}</h5>
                    </span>
                    <span
                        className='flex-items'
                        onClick={() => handleShow()}
                    >
                        <img
                            className='logo2'
                            src='mettle.png'
                            title='Mettle'
                            alt='mettle'
                        />
                        <h5 className="playerTabTitle2">{opponent.mettle}</h5>
                        <img
                            className='logo2'
                            src='focus3.png'
                            title='Focus'
                            alt='focus'
                        />
                        <h5 className="playerTabTitle2">+{opponent.focus}</h5>
                        <img
                            className='logo2'
                            src='enth.png'
                            title='Enthusiasm'
                            alt='enthusiasm'
                        />
                        <h5 className="playerTabTitle2">{opponent.enthusiasm}</h5>
                    </span>
                </div>
            </span>
            {/* {show ?
                <div className="medium-modal-dark2 topbar" ref={content}>
                    <h2 className="aligned margin-top-0 margin-bottom-30">{opponent.name}</h2>
                    <OppGameBoard
                        opponent={opponent}
                    />
                </div>
            : null} */}
        </div>
    )
}

export default OpponentTab;


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
