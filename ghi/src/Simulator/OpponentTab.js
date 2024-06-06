import React, { useState, useEffect } from 'react';


function OpponentTab({
    opponent,
    oppIndex,
    setSelectedOpp,
    setSelectedOppCard
}){

    const handleShow = async(event) => {
        event.preventDefault()
        setSelectedOpp(opponent)
        console.log(opponent)
        document.body.style.overflow = 'hidden';
    };

    const handleShowDefending = async(event) => {
        event.preventDefault()
        if (opponent.defendingCard.card !== null) {
            let newDefendingCard = {...opponent.defendingCard}
            newDefendingCard["owner_id"] = opponent.p_id
            console.log("Opponent", opponent.defendingCard)
            setSelectedOppCard(newDefendingCard)
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
                    className="playerTabTop2 flex-full"
                    onClick={(event) => handleShow(event)}
                    onContextMenu={(event) => handleShow(event)}
                    style={{ backgroundColor: `${ opponent.hp < 5? "#ff0000b7": colors[oppIndex.toString()]}` }}
                >
                    <h5 className="playerTabTitle">{opponent.name}</h5>
                </div>
                <div className="playerTabBottom2 flex-full">
                    <span
                        className='flex-items'
                        onClick={(event) => { opponent.defendingCard.card?
                            handleShowDefending(event):
                            handleShow(event)
                        }}
                        onContextMenu={(event) => { opponent.defendingCard.card?
                            handleShowDefending(event):
                            handleShow(event)
                        }}
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
                        onClick={(event) => handleShow(event)}
                        onContextMenu={(event) => handleShow(event)}
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
        </div>
    )
}

export default OpponentTab;
