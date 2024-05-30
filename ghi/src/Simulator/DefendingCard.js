import { useState, useContext } from "react";
import { GameStateContext } from "../context/GameStateContext";
import { damageSound, gainSound } from "../Sounds/Sounds";


function DefendingCard() {
    const {
        defendingCard,
        setDefendingCard,
    } = useContext(GameStateContext)

    const handleGainToken = (token) => {
        const newDefendingCard = {...defendingCard}
        if (token === "hp") {
            if (newDefendingCard.hp < 8) {
                newDefendingCard.hp ++
            }
        }
        else {
            newDefendingCard[token] ++
        }
        console.log(newDefendingCard)
        setDefendingCard(newDefendingCard)
    }

    const handleLoseToken = (token) => {
        const newDefendingCard = {...defendingCard}
        if (newDefendingCard[token] > 0) {
            newDefendingCard[token] --
        }
        setDefendingCard(newDefendingCard)
    }

    return (
        <div style={{width: "370px"}}>
            {defendingCard.card?
                <div className='margin-top-10'>
                    <h5 className="label margin-0">Defending Card </h5>
                    <div className="flex-items between-space" style={{width: "370px"}}>
                        <img
                            className="panel-card2 margin-top-10"
                            // title={`${card.name}\n${preprocessText(card.effect_text)}\n${card.second_effect_text ? preprocessText(card.second_effect_text) : ""}`}
                            src={defendingCard.card ? defendingCard.card.picture_url : "https://i.imgur.com/krY25iI.png"}
                            alt={defendingCard.card.name}/>
                        <div>
                            <div className="flex-items between-space" style={{width: "60px"}}>
                                <h4 className="label margin-0">HP: </h4>
                                <h4 className="label margin-0">{defendingCard.hp}</h4>
                            </div>
                            <br/>
                            <h5 className="label margin-0">Block </h5>
                            <div className="flex-items between-space" style={{width: "100px"}}>
                                <img
                                    className='logo7 margin-top-10 pointer'
                                    src='gain.png'
                                    onClick={() => handleGainToken("block")}
                                    title='Gain HP'
                                    alt='gain'
                                    />
                                <h5 className="label margin-0">{defendingCard.block}</h5>
                                <img
                                    className='logo7 margin-top-10 pointer'
                                    src='damage.png'
                                    onClick={() => handleLoseToken("block")}
                                    title='Damage'
                                    alt='damage'
                                    />
                            </div>
                            <h5 className="label margin-0">Counter </h5>
                            <div className="flex-items between-space" style={{width: "100px"}}>
                                <img
                                    className='logo7 margin-top-10 pointer'
                                    src='gain.png'
                                    onClick={() => handleGainToken("counter")}
                                    title='Gain HP'
                                    alt='gain'
                                    />
                                <h5 className="label margin-0">{defendingCard.counter}</h5>
                                <img
                                    className='logo7 margin-top-10 pointer'
                                    src='damage.png'
                                    onClick={() => handleLoseToken("counter")}
                                    title='Damage'
                                    alt='damage'
                                    />
                            </div>
                            <h5 className="label margin-0">Endure </h5>
                            <div className="flex-items between-space" style={{width: "100px"}}>
                                <img
                                    className='logo7 margin-top-10 pointer'
                                    src='gain.png'
                                    onClick={() => handleGainToken("endure")}
                                    title='Gain HP'
                                    alt='gain'
                                    />
                                <h5 className="label margin-0">{defendingCard.endure}</h5>
                                <img
                                    className='logo7 margin-top-10 pointer'
                                    src='damage.png'
                                    onClick={() => handleLoseToken("endure")}
                                    title='Damage'
                                    alt='damage'
                                    />
                            </div>
                            <h5 className="label margin-0">Redirect </h5>
                            <div className="flex-items between-space" style={{width: "100px"}}>
                                <img
                                    className='logo7 margin-top-10 pointer'
                                    src='gain.png'
                                    onClick={() => handleGainToken("redirect")}
                                    title='Gain HP'
                                    alt='gain'
                                    />
                                <h5 className="label margin-0">{defendingCard.redirect}</h5>
                                <img
                                    className='logo7 margin-top-10 pointer'
                                    src='damage.png'
                                    onClick={() => handleLoseToken("redirect")}
                                    title='Damage'
                                    alt='damage'
                                    />
                            </div>
                        </div>
                    </div>
                </div>
            :null}
        </div>
    );
}

export default DefendingCard;
