import { createContext, useState, useContext } from "react";
import { equipSound } from "../Sounds/Sounds";


const PlayerContext = createContext();

const PlayerContextProvider = ({ children }) => {
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
        <PlayerContext.Provider value={{
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
            handleChangeTransformRotateX,
            handleChangeScale,
            handleChangePosition,
            fieldStyle
            }}>
            {children}
        </PlayerContext.Provider>
    );
};

export { PlayerContext, PlayerContextProvider };
