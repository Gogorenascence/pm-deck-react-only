import { createContext, useContext, useState, useEffect } from "react";
import soundPlayer from "../Sounds/SoundPlayer";
import { AuthContext } from "./AuthContext";
import { GameStateContext } from "./GameStateContext";
import { io } from "socket.io-client";
import helper from "../QueryObjects/Helper";


const MatchMakingContext = createContext();


const MatchMakingContextProvider = ({ children }) => {
    const { account } = useContext(AuthContext)
    const {
        player,
        faceDown,
        defending,
        defendingCard,
        volume,
        addToLog
    } = useContext(GameStateContext)

    const socket = io.connect("http://localhost:4000/");

    const [waiting, setWaiting] = useState(false)
    const [players, setPlayers] = useState([])
    const [opponents, setOpponents] = useState([])
    const [watchers, setWatchers] = useState([])
    const [selectedOpp, setSelectedOpp] = useState(null)
    const [selectedOppCard, setSelectedOppCard] = useState(null)

    const [showOppDiscardModal, setShowOppDiscardModal] = useState(false)
    const [showOppPluckDiscardModal, setShowOppPluckDiscardModal] = useState(false)
    const [showOppPlayAreaModal, setShowOppPlayAreaModal] = useState({name: "", zone: null, objectName: ""})
    const [showOppActivePluckModal, setShowOppActivePluckModal] = useState({name: "", zone: null, objectName: ""})

    const [priority, setPriority] = useState("")

    const matchMake = async() => {
        console.log("Finding opponents")
        const playerData = {
            name: player.name,
            hp: player.hp,
            mainDeck: player.mainDeck,
            pluckDeck: player.pluckDeck,
            hand: player.hand,
            ownership: player.ownership,
            mainDiscard: player.mainDiscard,
            pluckDiscard: player.pluckDiscard,
            playArea: player.playArea,
            activePluck: player.activePluck,
            focus: player.focus,
            enthusiasm: player.enthusiasm,
            mettle: player.mettle,
            secondWind: player.secondWind,
            faceDown: faceDown,
            defending: defending,
            defendingCard: defendingCard,
            p_id: player.p_id
        };
        console.log(playerData)
        setWaiting(true)
        socket.emit("findingOpponents", playerData)
    }

    const playerIn = (player) => {
        if (players.find(playerItem => playerItem.p_id === player.p_id)) {
            return true
        }
    }

    useEffect(() => {
        socket.on("updatePlayers", (playersData) => {
            console.log(playersData);
            const newPlayers = [];
            const newOpponents = [];
            const newWatchers = [];
            for (let [s_id, playerData] of Object.entries(playersData)) {
                const playerItem = { ...playerData, s_id };
                if (playerData.p_id === player.p_id) {
                    newPlayers.push(playerItem);
                } else if (newOpponents.length < 3) {
                    newOpponents.push(playerItem);
                    setWaiting(false)
                } else {
                    newWatchers.push(playerItem);
                }
            }
            setPlayers(newPlayers);
            setOpponents(newOpponents);
            setWatchers(newWatchers);
        });

        return () => {
            socket.off("updatePlayers");
        };
    }, [player.p_id]);

    return (
        <MatchMakingContext.Provider value={{
            opponents,
            setOpponents,
            selectedOpp,
            setSelectedOpp,
            selectedOppCard,
            setSelectedOppCard,
            showOppPlayAreaModal,
            setShowOppPlayAreaModal,
            showOppActivePluckModal,
            setShowOppActivePluckModal,
            showOppDiscardModal,
            setShowOppDiscardModal,
            showOppPluckDiscardModal,
            setShowOppPluckDiscardModal,
            players,
            setPlayers,
            matchMake,
            priority,
            playerIn,
            waiting
            }}>
            {children}
        </MatchMakingContext.Provider>
    );
};

export { MatchMakingContext, MatchMakingContextProvider };
