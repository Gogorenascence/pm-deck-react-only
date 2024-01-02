import { createContext, useState, useContext } from "react";
import { equipSound } from "../Sounds/Sounds";


const GameStateContext = createContext();

const GameStateContextProvider = ({ children }) => {
    const [game, setGame] = useState(false)
    const [player, setPlayer] = useState({
        name: "",
        hp: 16,
        mainDeck: [],
        pluckDeck: [],
        hand: [],
        ownership: [],
        mainDiscard: [],
        pluckDiscard: [],
        playArea:"",
        activePluck: "",
        focus: 0,
        enthusiasm: 0,
        mettle: 0,
        secondWind: false,
    })

    const [playerMainDeck, setPlayerMainDeck] = useState({
        name: "",
        cards: [],
    })

    const [playerPluckDeck, setPlayerPluckDeck] = useState({
        name: "",
        cards: [],
    })

    const [playArea, setPlayArea] = useState({
        fighter_slot: [],
        aura_slot: [],
        move_slot: [],
        ending_slot: [],
        slot_5: [],
        slot_6: [],
        slot_7: [],
        slot_8: [],
    })

    const [activePluck, setActivePluck] = useState({
        slot_1: [],
        slot_2: [],
        slot_3: [],
        slot_4: [],
    })

    const [faceDown, setFaceDown] = useState({
        fighter_slot: false,
        aura_slot: false,
        move_slot: false,
        ending_slot: false
    })

    const [defending, setDefending] = useState({
        fighter_slot: false,
        aura_slot: false,
        move_slot: false,
        ending_slot: false,
        slot_5: false,
        slot_6: false,
        slot_7: false,
        slot_8: false,
    })

    const [defendingCard, setDefendingCard] = useState({
        card: "",
        hp: 5,
        block: 0,
        counter: 0,
        endure: 0,
        redirect: 0,
        slot: ""
    })

    const handleDefending = (slot) => {
        if (!defending[slot]) {
            const newDefendingCard = {
                card: "",
                hp: 5,
                block: 0,
                counter: 0,
                endure: 0,
                redirect: 0,
                slot: ""
            }
            if (playArea[slot][0]) {
                const card = playArea[slot][0]
                newDefendingCard["slot"] = slot
                newDefendingCard["card"] = card
                for (let reaction of card.reactions) {
                    if (reaction.name) {
                        const newReaction = reaction.name.toLowerCase()
                        newDefendingCard[newReaction] = reaction.count
                    }
                }
                setDefending({...defending, [slot]: true})
                setDefendingCard(newDefendingCard)
                equipSound(volume*1.5)
                addToLog("System", "system", `${player.name} is defending with "${card.name}"`)
            }
        } else {
            setDefending({...defending, [slot]: false})
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

    const [log, setLog] = useState([])

    const addToLog = (user, role, message) => {
        const newLog = [...log]
        newLog.push({
            user: user,
            role: role,
            message: message
        })
        setLog(newLog)
    }

    const [playingFaceDown, setPlayingFaceDown] = useState(false)

    const [transformRotateX, setTransformRotateX] = useState("45deg")
    const [scale, setScale] = useState(0.75)
    const [position, setPosition] = useState({
    x_pos: 0,
    y_pos: -100,
    })

    const handleChangeTransformRotateX = (event) => {
        setTransformRotateX(`${event.target.value}deg`);
    };

    const handleChangeScale = (change) => {
        if (change === 'increase') {
            if (scale < 1.4) {
                setScale(scale + 0.1);
            }
        } else {
            if (scale > 0.3) {
                setScale(scale - 0.1 );
            }
        }
    }

    const handleChangePosition = (direction) => {
        const MOVE_AMOUNT = 30;
        const y_pos = position.y_pos
        const x_pos = position.x_pos
        if (direction === 'up') {
            setPosition({...position, y_pos: y_pos - MOVE_AMOUNT });
            //this.forceUpdate();
        } else if (direction === 'down') {
            setPosition({...position, y_pos: y_pos + MOVE_AMOUNT });
            //this.forceUpdate();
        } else if (direction === 'left') {
            setPosition({...position, x_pos: x_pos - MOVE_AMOUNT });
            //this.forceUpdate();
        } else if (direction === 'right') {
            setPosition({...position, x_pos: x_pos + MOVE_AMOUNT });
            //this.forceUpdate();
        } else {
            setPosition({...position, x_pos: 0, y_pos: 0 });
            //this.forceUpdate();
        }
    }

    const fieldStyle = {
        transform: transformRotateX && scale && position.x_pos !== undefined && position.y_pos !== undefined ?
            "perspective(1000px) rotateX(" + transformRotateX + ") scale(" + scale + ") translate(" + position.x_pos + "px, " + position.y_pos + "px)"
            : "perspective(1000px) rotateX(45deg) scale(1.0) translate(0px, 0px)",
    }

    const [showExtra, setShowExtra] = useState(true)

    const [volume, setVolume] = useState(0.05)


    return (
        <GameStateContext.Provider value={{
            game,
            setGame,
            player,
            setPlayer,
            playerMainDeck,
            setPlayerMainDeck,
            playerPluckDeck,
            setPlayerPluckDeck,
            playArea,
            setPlayArea,
            activePluck,
            log,
            setLog,
            addToLog,
            setActivePluck,
            transformRotateX,
            setTransformRotateX,
            scale,
            setScale,
            position,
            setPosition,
            showExtra,
            setShowExtra,
            volume,
            setVolume,
            faceDown,
            setFaceDown,
            defending,
            setDefending,
            defendingCard,
            setDefendingCard,
            handleDefending,
            playingFaceDown,
            setPlayingFaceDown,
            handleChangeTransformRotateX,
            handleChangeScale,
            handleChangePosition,
            fieldStyle
            }}>
            {children}
        </GameStateContext.Provider>
    );
};

export { GameStateContext, GameStateContextProvider };
