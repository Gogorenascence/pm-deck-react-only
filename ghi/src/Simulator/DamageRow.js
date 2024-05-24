import { useState, useContext } from "react";
import { GameStateContext } from "../context/GameStateContext";
import { MainActionsContext } from "../context/MainActionsContext";
import { damageSound, gainSound } from "../Sounds/Sounds";


function DamageRow() {
    const {
        player,
        setPlayer,
        defending,
        setDefending,
        defendingCard,
        setDefendingCard,
        addToLog,
        volume
    } = useContext(GameStateContext)

    const {discardCard} = useContext(MainActionsContext)
    const [damage, setDamage] = useState("")
    const [gain, setGain] = useState(false)
    const [defender, setDefender] = useState("self")

    const handleDamage = (event) => {
        setDamage(event.target.value)
    }

    const handleGain = (event) => {
        setGain(!gain)
    }

    const takeDamage = (event) => {
        if (event.key === "Enter" && !event.shiftKey && /^(-)?\d+$/.test(damage)) {
            event.preventDefault();
            const damageTaken = !gain? parseInt(damage, 10): parseInt(damage, 10) * -1;
            console.log(damageTaken)
            if (defender === "self"){
                setPlayer({...player, hp: player.hp - damageTaken})
                setDamage("")
                if (damageTaken > 0) {
                    damageSound(volume)
                    addToLog("System", "system", `${player.name} took ${damageTaken} damage`)
                } else if (damageTaken < 0) {
                    gainSound(volume*2)
                    addToLog("System", "system", `${player.name} gained ${-damageTaken} HP`)
                }
            } else if (defender === "card" && defendingCard.card.name){
                setDefendingCard({...defendingCard, hp: defendingCard.hp - damageTaken})
                setDamage("")
                if (damageTaken > 0) {
                    damageSound(volume)
                    addToLog("System", "system", `${player.name}'s defending card took ${damageTaken} damage`)
                } else if (damageTaken < 0) {
                    gainSound(volume*2)
                    addToLog("System", "system", `${player.name}'s defending card gained ${-damageTaken} HP`)
                }
                if (damageTaken >= defendingCard.hp) {
                    discardCard(player.playArea[defendingCard.slot][0], 0, defendingCard.slot)
                    addToLog(
                        "System",
                        "system",
                        `${player.name}'s defending card took ${damageTaken} damage and was defeated`
                    )
                    setDefending({...defending, [defendingCard.slot]: false})
                    setDefendingCard({
                        card: "",
                        hp: 5,
                        block: 0,
                        counter: 0,
                        endure: 0,
                        redirect: 0,
                        slot: ""
                    })
                }
            }
        }
    }

    return (
        <div style={{width: "370px"}}>
            <h5 className="label margin-0">Track Damage </h5>
            <div className="flex-full">
                { !gain?
                    <img
                        className='logo7 margin-top-10 pointer'
                        src='damage.png'
                        onClick={() => handleGain()}
                        title='Damage'
                        alt='damage'
                    />:
                    <img
                        className='logo7 margin-top-10 pointer'
                        src='gain.png'
                        onClick={() => handleGain()}
                        title='Gain HP'
                        alt='gain'
                    />
                }
                <input
                    type="number"
                    value={damage}
                    min={0}
                    onChange={handleDamage}
                    placeholder="Damage"
                    className="healthTracker4"
                    onKeyDown={takeDamage}
                ></input>
                <button
                    className={`healthTracker5 middle-button ${defender === "self"?
                    "red": null}`}
                    onClick={()=>setDefender("self")}
                >Self</button>
                <button
                    className={`healthTracker5 end-button ${defender === "card"?
                    "red": null}`}
                    onClick={()=>setDefender("card")}
                >Card</button>
            </div>
        </div>
    );
}

export default DamageRow;
