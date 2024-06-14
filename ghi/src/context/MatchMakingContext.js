import { createContext, useContext, useState, useEffect, useRef } from "react";
import soundPlayer from "../Sounds/SoundPlayer";
import { AuthContext } from "./AuthContext";
import { GameStateContext } from "./GameStateContext";
import { SimulatorActionsContext } from "./SimulatorActionsContext";
import { io } from "socket.io-client";
import helper from "../QueryObjects/Helper";
import { rollSound } from "../Sounds/Sounds";



const MatchMakingContext = createContext();

const MatchMakingContextProvider = ({ children }) => {
    const { account } = useContext(AuthContext)
    const {
        player,
        setPlayer,
        setPlayerMainDeck,
        setPlayerPluckDeck,
        faceDown,
        defending,
        defendingCard,
        activating,
        volume,
        addToLog
    } = useContext(GameStateContext)
    const { cards } = useContext(SimulatorActionsContext)
    const prevPlayerValues = useRef({})

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
        if (socket !== null) {
        // const roomsResponse = await fetch("https://pm-deck-react-only.onrender.com/games")
            const roomsResponse = await fetch("http://localhost:4000/games")
            const roomsData = await roomsResponse.json()
            // console.log(roomsData)
            setRooms(roomsData)
            setWaiting(true)
        }
    }

    const cardToCardNumber = (playerObject, currPlayerValues) => {
        const convertList = [
            "mainDeck",
            "pluckDeck",
            "hand",
            "ownership",
            "mainDiscard",
            "pluckDiscard",
        ]
        const playAreaConvertList = [
            "fighter_slot",
            "aura_slot",
            "move_slot",
            "ending_slot",
            "slot_5",
            "slot_6",
            "slot_7",
            "slot_8",
        ]
        const activePluckConvertList = [
            "slot_1",
            "slot_2",
            "slot_3",
            "slot_4",
        ]
        for (let key in currPlayerValues) {
            if (convertList.includes(key)){
                playerObject[key] = currPlayerValues[key].map(card => card.card_number)
            } else if ( key === "playArea" ) {
                playerObject["playArea"] = {}
                for (let slot of playAreaConvertList) {
                    playerObject["playArea"][slot] = currPlayerValues[key][slot].map(card => card.card_number)
                }
            } else if ( key === "activePluck" ) {
                playerObject["activePluck"] = {}
                for (let slot of activePluckConvertList) {
                    playerObject["activePluck"][slot] = currPlayerValues[key][slot].map(card => card.card_number)
                }
            } else {
                playerObject[key] = currPlayerValues[key]
            }
        }
    }

    const cardNumberToCard = (newPlayerObject, playerObject) => {
        const convertList = [
            "mainDeck",
            "pluckDeck",
            "hand",
            "ownership",
            "mainDiscard",
            "pluckDiscard",
        ]
        const playAreaConvertList = [
            "fighter_slot",
            "aura_slot",
            "move_slot",
            "ending_slot",
            "slot_5",
            "slot_6",
            "slot_7",
            "slot_8",
        ]
        const activePluckConvertList = [
            "slot_1",
            "slot_2",
            "slot_3",
            "slot_4",
        ]
        for (let key in playerObject) {
            if (convertList.includes(key)){
                newPlayerObject[key] = playerObject[key].map(
                    cardNumber => cards.find(card => card.card_number === cardNumber)
                )
            } else if ( key === "playArea" ) {
                newPlayerObject["playArea"] = {}
                for (let slot of playAreaConvertList) {
                    newPlayerObject["playArea"][slot] = playerObject[key][slot].map(
                        cardNumber => cards.find(card => card.card_number === cardNumber)
                    )
                }
            } else if ( key === "activePluck" ) {
                newPlayerObject["activePluck"] = {}
                for (let slot of activePluckConvertList) {
                    newPlayerObject["activePluck"][slot] = playerObject[key][slot].map(
                        cardNumber => cards.find(card => card.card_number === cardNumber)
                    )
                }
            } else {
                newPlayerObject[key] = playerObject[key]
            }
        }
    }

    const getPlayer = async() => {
        try {
            // const playerResponse = await fetch(`http://localhost:4000/players/${player.p_id}`)
            const playerResponse = await fetch(`http://localhost:4000/players/${player.p_id}`)

            if (playerResponse.status === 404) {
                console.log("Player not found, creating new player")
                const playerData = {}
                const currPlayerValues = {
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
                }

                cardToCardNumber(playerData, currPlayerValues)
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
                    setSavedPlayer(currPlayerValues)
                } else {
                    console.log(response);
                }
            } else if (playerResponse.ok) {
                const playerData = await playerResponse.json();
                console.log("Player found", playerData);
                const newPlayerObject = {}
                cardNumberToCard(newPlayerObject, playerData)
                console.log(newPlayerObject)
                // setPlayer((prevPlayer) => ({
                //     ...prevPlayer,
                //     mainDeck: newPlayerObject.mainDeck,
                //     pluckDeck: newPlayerObject.pluckDeck,
                //     hand: newPlayerObject.hand,
                //     ownership: newPlayerObject.ownership,
                //     playArea: newPlayerObject.playArea,
                //     activePluck: newPlayerObject.activePluck,
                //     mainDiscard: newPlayerObject.mainDiscard,
                //     pluckDiscard: newPlayerObject.pluckDiscard,
                // }));
                // setPlayerMainDeck({name: "Saved Deck", cards: newPlayerObject.mainDeck})
                // setPlayerPluckDeck({name: "Saved Deck", cards: newPlayerObject.pluckDeck})
                setSavedPlayer(newPlayerObject);
            } else {
                console.log("Error fetching player data", playerResponse.status);
            }
        } catch (error) {
            console.error("Error during matchmaking", error);
        }
    }

    const getOpponents = async(room_id) => {
        // const roomsResponse = await fetch("https://pm-deck-react-only.onrender.com/games")
        // console.log(selectedRoom)
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
        // console.log(opponentsList)
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
        if (socket !== null) {
            const playerUpdates = {}
            const currPlayerValues = {
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
            }

            const convertList = [
                "mainDeck",
                "pluckDeck",
                "hand",
                "ownership",
                "mainDiscard",
                "pluckDiscard",
            ]

            const playAreaConvertList = [
                "fighter_slot",
                "aura_slot",
                "move_slot",
                "ending_slot",
                "slot_5",
                "slot_6",
                "slot_7",
                "slot_8",
            ]

            const activePluckConvertList = [
                "slot_1",
                "slot_2",
                "slot_3",
                "slot_4",
            ]

            for (let key in currPlayerValues) {
                if (prevPlayerValues.current[key] !== currPlayerValues[key]) {
                    if (convertList.includes(key)){
                        console.log(currPlayerValues[key])
                        playerUpdates[key] = currPlayerValues[key].map(card => card.card_number)
                    } else if ( key === "playArea" ) {
                        playerUpdates["playArea"] = {}
                        for (let slot of playAreaConvertList) {
                            playerUpdates["playArea"][slot] = currPlayerValues[key][slot].map(card => card.card_number)
                        }
                    } else if ( key === "activePluck" ) {
                        playerUpdates["activePluck"] = {}
                        for (let slot of activePluckConvertList) {
                            playerUpdates["activePluck"][slot] = currPlayerValues[key][slot].map(card => card.card_number)
                        }
                    } else {
                        playerUpdates[key] = currPlayerValues[key]
                    }
                }
            }
            console.log(playerUpdates)
            updatePlayer(playerUpdates)
            prevPlayerValues.current = currPlayerValues
        }
    }, [
        player,
        faceDown,
        defending,
        defendingCard,
        activating,
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
