import { createContext, useContext, useState, useEffect } from "react";
import soundPlayer from "../Sounds/SoundPlayer";
import { AuthContext } from "./AuthContext";
import helper from "../QueryObjects/Helper";
import { io } from "socket.io-client";


const GameStateContext = createContext();


const GameStateContextProvider = ({ children }) => {
    const { account } = useContext(AuthContext)

    // const socket = io.connect("http://localhost:4000/");

    const [game, setGame] = useState(false)
    const [prevAccount, setPrevAccount] = useState("")
    const [player, setPlayer] = useState({
        name: account? account.username: "WindFall",
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
        p_id: account? account.id: "Temp p_id" ,
        g_id: null
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
            const newDefending = {
                fighter_slot: false,
                aura_slot: false,
                move_slot: false,
                ending_slot: false,
                slot_5: false,
                slot_6: false,
                slot_7: false,
                slot_8: false,
            }
            newDefending[slot] = true
            const newDefendingCard = {
                card: "",
                hp: 5,
                block: 0,
                counter: 0,
                endure: 0,
                redirect: 0,
                slot: "",
                owner: player.name
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
                setDefending(newDefending)
                setDefendingCard(newDefendingCard)
                soundPlayer.equipSound(volume*1.5)
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
                slot: "",
                owner: player.name
            })
        }
    }

    const [activating, setActivating] = useState({
        fighter_slot: false,
        aura_slot: false,
        move_slot: false,
        ending_slot: false,
        slot_5: false,
        slot_6: false,
        slot_7: false,
        slot_8: false,
        slot_1: false,
        slot_2: false,
        slot_3: false,
        slot_4: false,
    })

    const handleActivating = (zone) => {
        setActivating(prevActivating => {
            const newActivating = {
                ...prevActivating,
                fighter_slot: false,
                aura_slot: false,
                move_slot: false,
                ending_slot: false,
                slot_5: false,
                slot_6: false,
                slot_7: false,
                slot_8: false,
                slot_1: false,
                slot_2: false,
                slot_3: false,
                slot_4: false,
            };
            newActivating[zone] = true;
            setTimeout(() => {
                setActivating(prevActivating => ({
                    ...prevActivating,
                    [zone]: false,
                }));
            }, 1000);
            return newActivating;
        });
    }

    const [log, setLog] = useState([])

    const addToLog = (user, role, message, card) => {
        const newLog = [...log]
        newLog.push({
            user: user,
            role: role,
            message: message,
            card: card
        })
        setLog(newLog)
    }

    const [playingFaceDown, setPlayingFaceDown] = useState(false)

    const [showExtra, setShowExtra] = useState(true)

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
            if (scale < 3) {
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
        const x_pos = position.x_pos
        const y_pos = position.y_pos
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
            setPosition({...position, x_pos: 0, y_pos: -100});
            //this.forceUpdate();
        }
    }

    const fieldStyle = {
        transform: transformRotateX && scale && position.x_pos !== undefined && position.y_pos !== undefined ?
            "perspective(1000px) rotateX(" + transformRotateX + ") scale(" + scale + ") translate(" + position.x_pos + "px, " + `${ showExtra? position.y_pos - 100: position.y_pos + 200}` + "px)"
            : "perspective(1000px) rotateX(45deg) scale(1.0) translate(0px, 100px)",
    }

    const [volume, setVolume] = useState(0.05)

    return (
        <GameStateContext.Provider value={{
            game,
            setGame,
            prevAccount,
            setPrevAccount,
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
            activating,
            handleActivating,
            playingFaceDown,
            setPlayingFaceDown,
            handleChangeTransformRotateX,
            handleChangeScale,
            handleChangePosition,
            fieldStyle,
            }}>
            {children}
        </GameStateContext.Provider>
    );
};

export { GameStateContext, GameStateContextProvider };
