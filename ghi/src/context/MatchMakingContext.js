import { createContext, useContext, useState, useEffect } from "react";
import soundPlayer from "../Sounds/SoundPlayer";
import { AuthContext } from "./AuthContext";
import { GameStateContext } from "./GameStateContext";
import { io } from "socket.io-client";
import helper from "../QueryObjects/Helper";
import { rollSound } from "../Sounds/Sounds";


const MatchMakingContext = createContext();

const MatchMakingContextProvider = ({ children }) => {
    const { account } = useContext(AuthContext)
    const {
        player,
        faceDown,
        defending,
        defendingCard,
        activating,
        volume,
        addToLog
    } = useContext(GameStateContext)

    const [waiting, setWaiting] = useState(false)
    const [rooms, setRooms] = useState([])
    const [selectedRoom, setSelectedRoom] = useState(null)
    const [room, setRoom] = useState("")

    const [players, setPlayers] = useState([])
    const [opponents, setOpponents] = useState([])
    const [watchers, setWatchers] = useState([])
    const [selectedOpp, setSelectedOpp] = useState(null)
    const [selectedOppCard, setSelectedOppCard] = useState(null)
    const [socket, setSocket] = useState(null);

    const [showOppDiscardModal, setShowOppDiscardModal] = useState(false)
    const [showOppPluckDiscardModal, setShowOppPluckDiscardModal] = useState(false)
    const [showOppPlayAreaModal, setShowOppPlayAreaModal] = useState({name: "", zone: null, objectName: ""})
    const [showOppActivePluckModal, setShowOppActivePluckModal] = useState({name: "", zone: null, objectName: ""})

    const [priority, setPriority] = useState([])
    const [savedPlayer, setSavedPlayer] = useState("")

    const matchMake = async() => {
        // const newSocket = io.connect("https://pm-deck-react-only.onrender.com/")
        const newSocket = io.connect("http://localhost:4000/")
        console.log("Finding a room")
        setSocket(newSocket)
        getPlayer()
    }

    const getRooms = async() => {
        // const roomsResponse = await fetch("https://pm-deck-react-only.onrender.com/games")
        const roomsResponse = await fetch("http://localhost:4000/games")
        const roomsData = await roomsResponse.json()
        console.log(roomsData)
        setRooms(roomsData)
    }

    const getPlayer = async() => {
        try {
            // const playerResponse = await fetch(`http://localhost:4000/players/${player.p_id}`)
            const playerResponse = await fetch(`http://localhost:4000/players/${player.p_id}`)

            if (playerResponse.status === 404) {
                console.log("Player not found, creating new player")
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
                    activating: activating,
                    p_id: player.p_id,
                    g_id: player.g_id
                };
                console.log(playerData)

                const playerUrl = "http://localhost:4000/players/";
                const fetchConfig = {
                    method: "POST",
                    body: JSON.stringify(playerData),
                    headers: {
                        "Content-Type": "application/json",
                    },
                };

                const response = await fetch(playerUrl, fetchConfig);
                if (response.ok) {
                    const playerResponse = await fetch(`http://localhost:4000/players/${player.p_id}`)
                    const playerData = await playerResponse.json()
                    setSavedPlayer(playerData)
                } else {
                    console.log(response);
                }
            } else if (playerResponse.ok) {
                const playerData = await playerResponse.json();
                console.log("Player found", playerData);
                setSavedPlayer(playerData);
            } else {
                console.log("Error fetching player data", playerResponse.status);
            }
            setWaiting(true)
        } catch (error) {
            console.error("Error during matchmaking", error);
        }
    }

    const getOpponents = async(room_id) => {
        // const roomsResponse = await fetch("https://pm-deck-react-only.onrender.com/games")
        console.log(selectedRoom)
        const opponentsList = []
        const roomResponse = await fetch(`http://localhost:4000/games/${room_id}`)
        try {
            const roomData = await roomResponse.json()
            console.log(roomData)
            for (let p_id of roomData.players) {
                const playerResponse = await fetch(`http://localhost:4000/players/${p_id}`)
                try {
                    const playerData = await playerResponse.json()
                    if (p_id !== savedPlayer.p_id) {
                        opponentsList.push(playerData)
                    }
                } catch (error) {
                    console.error("Error finding player", error);
                }
            }
        } catch (error) {
            console.error("Error finding game", error);
        }
        console.log(opponentsList)
        setOpponents(opponentsList)
    }

    const getOpponentData = async(p_id) => {
        const playerResponse = await fetch(`http://localhost:4000/players/${p_id}`)
            try {
                const playerData = await playerResponse.json()
                if (playerData.g_id === savedPlayer.g_id) {
                    setOpponents(prevOpp => {
                        const newOpp = prevOpp.map(opp =>
                            opp.p_id === p_id? playerData: opp
                        )
                        return newOpp
                })}
            } catch (error) {
                console.error("Error finding player", error);
            }

    }

    const updatePlayer = async(update) => {
        console.log(update)
        const playerUrl = `http://localhost:4000/players/${savedPlayer.p_id}`;
        const fetchConfig = {
            method: "PATCH",
            body: JSON.stringify(update),
            headers: {
                "Content-Type": "application/json",
            },
        };
        const response = await fetch(playerUrl, fetchConfig);
        if (response.ok) {
            getPlayer()
            // socket.emit("updatePlayer", savedPlayer.p_id)
        } else {
            console.log(response);
        }
    }

    const playerIn = (player) => {
        if (players.find(playerItem => playerItem.p_id === player.p_id)) {
            return true
        }
    }

    useEffect(() => {
        if (socket !== null ) {
            const playerData = {
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
                activating: activating,
            };
            console.log(playerData)
            updatePlayer(playerData)
        }
    }, [
        player,
        faceDown,
        defending,
        defendingCard,
        activating,
        socket
    ])

    return (
        <MatchMakingContext.Provider value={{
            opponents,
            setOpponents,
            getOpponents,
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
            setPriority,
            playerIn,
            waiting,
            setWaiting,
            savedPlayer,
            setSavedPlayer,
            getPlayer,
            updatePlayer,
            rooms,
            setRooms,
            selectedRoom,
            setSelectedRoom,
            room,
            setRoom,
            getRooms,
            socket,
            }}>
            {children}
        </MatchMakingContext.Provider>
    );
};

export { MatchMakingContext, MatchMakingContextProvider };
