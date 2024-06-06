// npm install ws
// Create a file named server.js (or any name you prefer) and set up the WebSocket server:

const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 8080 });

let clients = [];

wss.on('connection', (ws) => {
    console.log('New client connected');
    clients.push(ws);

    ws.on('message', (message) => {
        console.log('Received:', message);
        // Broadcast the message to all connected clients
        clients.forEach(client => {
            if (client !== ws && client.readyState === WebSocket.OPEN) {
                client.send(message);
            }
        });
    });

    ws.on('close', () => {
        console.log('Client disconnected');
        clients = clients.filter(client => client !== ws);
    });
});

console.log('WebSocket server is running on ws://localhost:8080');

// Step 2: Integrate WebSocket Client in React
// In your React app, you need to set up a WebSocket client to connect to the WebSocket server and handle incoming messages.

// Create a WebSocket client:

// In your GameStateContextProvider, set up the WebSocket client and handle communication:

import { createContext, useContext, useState, useEffect } from "react";
import soundPlayer from "../Sounds/SoundPlayer";
import { AuthContext } from "./AuthContext";

const GameStateContext = createContext();

const GameStateContextProvider = ({ children }) => {
    const { account } = useContext(AuthContext);
    const [game, setGame] = useState(false);
    const [prevAccount, setPrevAccount] = useState("");
    const [player, setPlayer] = useState({
        name: account ? account.username : "",
        hp: 16,
        mainDeck: [],
        pluckDeck: [],
        hand: [],
        ownership: [],
        mainDiscard: [],
        pluckDiscard: [],
        playArea: "",
        activePluck: "",
        focus: 0,
        enthusiasm: 0,
        mettle: 0,
        secondWind: false,
    });

    const [playerMainDeck, setPlayerMainDeck] = useState({
        name: "",
        cards: [],
    });

    const [playerPluckDeck, setPlayerPluckDeck] = useState({
        name: "",
        cards: [],
    });

    const [playArea, setPlayArea] = useState({
        fighter_slot: [],
        aura_slot: [],
        move_slot: [],
        ending_slot: [],
        slot_5: [],
        slot_6: [],
        slot_7: [],
        slot_8: [],
    });

    const [activePluck, setActivePluck] = useState({
        slot_1: [],
        slot_2: [],
        slot_3: [],
        slot_4: [],
    });

    const [faceDown, setFaceDown] = useState({
        fighter_slot: false,
        aura_slot: false,
        move_slot: false,
        ending_slot: false
    });

    const [defending, setDefending] = useState({
        fighter_slot: false,
        aura_slot: false,
        move_slot: false,
        ending_slot: false,
        slot_5: false,
        slot_6: false,
        slot_7: false,
        slot_8: false,
    });

    const [defendingCard, setDefendingCard] = useState({
        card: "",
        hp: 5,
        block: 0,
        counter: 0,
        endure: 0,
        redirect: 0,
        slot: ""
    });

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
            };
            newDefending[slot] = true;
            const newDefendingCard = {
                card: "",
                hp: 5,
                block: 0,
                counter: 0,
                endure: 0,
                redirect: 0,
                slot: ""

            };
            if (playArea[slot][0]) {
                const card = playArea[slot][0];
                newDefendingCard["slot"] = slot;
                newDefendingCard["card"] = card;
                for (let reaction of card.reactions) {
                    if (reaction.name) {
                        const newReaction = reaction.name.toLowerCase();
                        newDefendingCard[newReaction] = reaction.count;
                    }
                }
                setDefending(newDefending);
                setDefendingCard(newDefendingCard);
                soundPlayer.equipSound(volume * 1.5);
                addToLog("System", "system", `${player.name} is defending with "${card.name}"`);
            }
        } else {
            setDefending({ ...defending, [slot]: false });
            setDefendingCard({
                card: "",
                hp: 5,
                block: 0,
                counter: 0,
                endure: 0,
                redirect: 0,
                slot: ""
            });
        }
    };

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
    });

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
    };

    const [log, setLog] = useState([]);

    const addToLog = (user, role, message) => {
        const newLog = [...log];
        newLog.push({
            user: user,
            role: role,
            message: message
        });
        setLog(newLog);
    };

    const [playingFaceDown, setPlayingFaceDown] = useState(false);

    const [showExtra, setShowExtra] = useState(true);

    const [transformRotateX, setTransformRotateX] = useState("45deg");
    const [scale, setScale] = useState(0.75);
    const [position, setPosition] = useState({
        x_pos: 0,
        y_pos: -100,
    });

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
                setScale(scale - 0.1);
            }
        }
    };

    const handleChangePosition = (direction) => {
        const MOVE_AMOUNT = 30;
        const x_pos = position.x_pos;
        const y_pos = position.y_pos;
        if (direction === 'up') {
            setPosition({ ...position, y_pos: y_pos - MOVE_AMOUNT });
        } else if (direction === 'down') {
            setPosition({ ...position, y_pos: y_pos + MOVE_AMOUNT });
        } else if (direction === 'left') {
            setPosition({ ...position, x_pos: x_pos - MOVE_AMOUNT });
        } else if (direction === 'right') {
            setPosition({ ...position, x_pos: x_pos + MOVE_AMOUNT });
        } else {
            setPosition({ ...position, x_pos: 0, y_pos: -100 });
        }
    };

    const fieldStyle = {
        transform: transformRotateX && scale && position.x_pos !== undefined && position.y_pos !== undefined
            ? "perspective(1000px) rotateX(" + transformRotateX + ") scale(" + scale + ") translate(" + position.x_pos + "px, " + `${showExtra ? position.y_pos - 100 : position.y_pos + 200}` + "px)"
            : "perspective(1000px) rotateX(45deg) scale(1.0) translate(0px, 100px)",
    };

    const [volume, setVolume] = useState(0.05);

    // WebSocket connection
    useEffect(() => {
        const socket = new WebSocket('ws://localhost:8080');

        socket.onopen = () => {
            console.log('Connected to WebSocket server');
        };

        socket.onmessage = (event) => {
            const message = JSON.parse(event.data);
            if (message.type === 'updateState') {
                // Handle incoming state update
                const { newState } = message;
                // Update the local state with the new state received from the server
                setGame(newState.game);
                setPlayer(newState.player);
                setPlayArea(newState.playArea);
                setActivePluck(newState.activePluck);
                setDefending(newState.defending);
                setDefendingCard(newState.defendingCard);
                setLog(newState.log);
                setPosition(newState.position);
                setTransformRotateX(newState.transformRotateX);
                setScale(newState.scale);
                setVolume(newState.volume);
                setShowExtra(newState.showExtra);
            }
        };

        socket.onclose = () => {
            console.log('Disconnected from WebSocket server');
        };

        socket.onerror = (error) => {
            console.error('WebSocket error:', error);
        };

        return () => {
            socket.close();
        };
    }, []);

    const sendUpdate = (newState) => {
        const socket = new WebSocket('ws://localhost:8080');
        socket.onopen = () => {
            socket.send(JSON.stringify({ type: 'updateState', newState }));
        };
    };

    // Whenever a state changes, send the new state to the server
    useEffect(() => {
        const newState = {
            game,
            player,
            playArea,
            activePluck,
            defending,
            defendingCard,
            log,
            position,
            transformRotateX,
            scale,
            volume,
            showExtra,
        };
        sendUpdate(newState);
    }, [
        game,
        player,
        playArea,
        activePluck,
        defending,
        defendingCard,
        log,
        position,
        transformRotateX,
        scale,
        volume,
        showExtra,
    ]);

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
            fieldStyle
        }}>
            {children}
        </GameStateContext.Provider>
    );
};

export { GameStateContext, GameStateContextProvider };

// Run the WebSocket server:
// node server.js



const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const http = require("http").createServer(app);
const io = require("socket.io")(http, {
    cors: {
        origin: "*",
    },
});

const rooms = {}; // Store rooms and their players

io.on("connection", (socket) => {
    console.log(`New client connected: ${socket.id}`);

    socket.on("joinRoom", (room, playerData) => {
        if (!rooms[room]) {
            rooms[room] = [];
        }

        if (rooms[room].length < 4) {
            socket.join(room);
            rooms[room].push({ ...playerData, s_id: socket.id });
            io.to(room).emit("message", { user: playerData.name, role: "system", message: `${playerData.name} has joined the room.` });
            io.to(room).emit("updatePlayers", rooms[room]);
        } else {
            socket.emit("roomFull", room);
        }
    });

    socket.on("leaveRoom", (room) => {
        if (rooms[room]) {
            rooms[room] = rooms[room].filter(player => player.s_id !== socket.id);
            socket.leave(room);
            io.to(room).emit("updatePlayers", rooms[room]);
        }
    });

    socket.on("message", (room, messageData) => {
        io.to(room).emit("message", messageData);
    });

    socket.on("disconnect", () => {
        for (const room of Object.keys(rooms)) {
            rooms[room] = rooms[room].filter(player => player.s_id !== socket.id);
            io.to(room).emit("updatePlayers", rooms[room]);
        }
        console.log(`Client disconnected: ${socket.id}`);
    });
});

const PORT = process.env.PORT || 4000;

http.listen(PORT, () => {
    console.log(`Server is up and running on port number ${PORT}`);
});

app.get('/', (req, res) => {
    res.send('Real-time Chat Server is running');
});


import { createContext, useContext, useState, useEffect } from "react";
import { io } from "socket.io-client";
import { AuthContext } from "./AuthContext";
import { GameStateContext } from "./GameStateContext";

const MatchMakingContext = createContext();

const MatchMakingContextProvider = ({ children }) => {
    const { account } = useContext(AuthContext);
    const {
        player,
        faceDown,
        defending,
        defendingCard,
        volume
    } = useContext(GameStateContext);

    const socket = io("http://localhost:4000");

    const [players, setPlayers] = useState([]);
    const [opponents, setOpponents] = useState([]);
    const [watchers, setWatchers] = useState([]);
    const [selectedOpp, setSelectedOpp] = useState(null);
    const [selectedOppCard, setSelectedOppCard] = useState(null);
    const [log, setLog] = useState([]);
    const [room, setRoom] = useState(null);

    const [showOppDiscardModal, setShowOppDiscardModal] = useState(false);
    const [showOppPluckDiscardModal, setShowOppPluckDiscardModal] = useState(false);
    const [showOppPlayAreaModal, setShowOppPlayAreaModal] = useState({ name: "", zone: null, objectName: "" });
    const [showOppActivePluckModal, setShowOppActivePluckModal] = useState({ name: "", zone: null, objectName: "" });

    const [priority, setPriority] = useState("");

    const joinRoom = (roomName) => {
        setRoom(roomName);
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
        socket.emit("joinRoom", roomName, playerData);
    };

    const leaveRoom = () => {
        if (room) {
            socket.emit("leaveRoom", room);
            setRoom(null);
            setPlayers([]);
            setOpponents([]);
            setWatchers([]);
        }
    };

    const addToLog = (user, role, message) => {
        const messageData = {
            user: user,
            role: role,
            message: message
        };
        socket.emit("message", room, messageData);
    };

    useEffect(() => {
        const handleMessage = (messageData) => {
            setLog(prevLog => {
                const isDuplicate = prevLog.some(
                    logItem => logItem.user === messageData.user &&
                               logItem.role === messageData.role &&
                               logItem.message === messageData.message
                );
                if (isDuplicate) return prevLog;
                return [...prevLog, messageData];
            });
        };

        socket.on("message", handleMessage);

        return () => {
            socket.off("message", handleMessage);
        };
    }, [room]);

    useEffect(() => {
        const handleUpdatePlayers = (playersData) => {
            const newPlayers = [];
            const newOpponents = [];
            const newWatchers = [];
            for (let playerData of playersData) {
                const playerItem = { ...playerData };
                if (playerData.p_id === player.p_id) {
                    newPlayers.push(playerItem);
                } else if (newOpponents.length < 3) {
                    newOpponents.push(playerItem);
                } else {
                    newWatchers.push(playerItem);
                }
            }
            setPlayers(newPlayers);
            setOpponents(newOpponents);
            setWatchers(newWatchers);
        };

        socket.on("updatePlayers", handleUpdatePlayers);

        return () => {
            socket.off("updatePlayers", handleUpdatePlayers);
        };
    }, [player.p_id, room]);

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
            joinRoom,
            leaveRoom,
            priority,
            log,
            addToLog
        }}>
            {children}
        </MatchMakingContext.Provider>
    );
};

export { MatchMakingContext, MatchMakingContextProvider };
