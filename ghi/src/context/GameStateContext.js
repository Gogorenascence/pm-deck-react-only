import { createContext, useState } from "react";


const GameStateContext = createContext();

const GameStateContextProvider = ({ children }) => {
    const [player, setPlayer] = useState({
        name: "WindFall",
        HP: 16,
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

    const [transformRotateX, setTransformRotateX] = useState("45deg")
    const [scale, setScale] = useState(0.75)
    const [position, setPosition] = useState({
    x_pos: 0,
    y_pos: -100,
    })

    const [showExtra, setShowExtra] = useState(true)

    const [volume, setVolume] = useState(0.05)

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

    return (
        <GameStateContext.Provider value={{
            player,
            setPlayer,
            playerMainDeck,
            setPlayerMainDeck,
            playerPluckDeck,
            setPlayerPluckDeck,
            playArea,
            setPlayArea,
            activePluck,
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
            log,
            setLog,
            addToLog
            }}>
            {children}
        </GameStateContext.Provider>
    );
};

export { GameStateContext, GameStateContextProvider };
