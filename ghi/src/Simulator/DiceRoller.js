import React, { useState, useEffect, useContext } from 'react';
import { GameStateContext } from '../context/GameStateContext';
import soundPlayer from '../Sounds/SoundPlayer';


function DiceRoller(){

    const gameState = useContext(GameStateContext)

    const [roll, setRoll] = useState(0);
    const [addRoll, setAddRoll] = useState(false);
    const [rollString, setRollString] = useState("");

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
            <h5 className="label margin-0">Dice Roller </h5>
            <div className="flex-full" style={{width: "370px"}}>
                <img
                    className={`logo7 margin-top-10 pointer ${addRoll? null: "half2"}`}
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
        </div>
    )
}

export default DiceRoller;
