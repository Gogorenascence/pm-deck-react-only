import React, { useState, useEffect, useRef } from 'react';
import OppGameBoard from './OppGameBoard';


function OpponentTab({
    opponent,
    oppIndex
}){
    const content = useRef(null)

    const [show, setShow] = useState(false);

    useEffect(() => {

    }, []);
    // Empty dependency array means this effect runs once when the component mounts

    const handleShow = async() => {
        setShow(true)
        console.log(opponent)
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
                <div className="playerTabBottom flex-full"
                onClick={() => handleShow()}
                >
                    <img
                        className='logo7'
                        src='heart.png'
                        title='HP'
                        alt='heart'
                    />
                    <h5 className="playerTabTitle2">{opponent.hp}</h5>
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
                </div>
            </span>
            {show ?
                <div className="medium-modal-dark2 topbar" ref={content}>
                    <h2 className="aligned margin-top-0 margin-bottom-30">{opponent.name}</h2>
                    <OppGameBoard
                        opponent={opponent}
                    />
                </div>
            : null}
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
