


// my-express-app/
// ├── node_modules/
// ├── models/
// │   └── player.js
// ├── routes/
// │   └── players.js
// ├── app.js
// ├── package.json
// └── package-lock.json


// Create a Mongoose Model (models/player.js):
const mongoose = require('mongoose');

const playerSchema = new mongoose.Schema({
    name: { type: String, required: true },
    hp: { type: Number, required: true },
    mainDeck: { type: Array, default: [] },
    pluckDeck: { type: Array, default: [] },
    hand: { type: Array, default: [] },
    ownership: { type: Array, default: [] },
    mainDiscard: { type: Array, default: [] },
    pluckDiscard: { type: Array, default: [] },
    playArea: { type: Array, default: [] },
    activePluck: { type: Array, default: [] },
    focus: { type: Number, default: 0 },
    enthusiasm: { type: Number, default: 0 },
    mettle: { type: Number, default: 0 },
    secondWind: { type: Number, default: 0 },
    faceDown: { type: Boolean, default: false },
    defending: { type: Boolean, default: false },
    defendingCard: { type: String, default: "" },
    p_id: { type: String, required: true, unique: true }
});

const Player = mongoose.model('Player', playerSchema);

module.exports = Player;


// CRUD
const express = require('express');
const router = express.Router();
const Player = require('../models/player');

// Create a new player
router.post('/', async (req, res) => {
    const player = new Player(req.body);
    try {
        await player.save();
        res.status(201).send(player);
    } catch (error) {
        res.status(400).send(error);
    }
});

// Get all players
router.get('/', async (req, res) => {
    try {
        const players = await Player.find();
        res.send(players);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Get a player by ID
router.get('/:id', async (req, res) => {
    const _id = req.params.id;
    try {
        const player = await Player.findById(_id);
        if (!player) {
            return res.status(404).send();
        }
        res.send(player);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Update a player by ID
router.patch('/:id', async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['name', 'hp', 'mainDeck', 'pluckDeck', 'hand', 'ownership', 'mainDiscard', 'pluckDiscard', 'playArea', 'activePluck', 'focus', 'enthusiasm', 'mettle', 'secondWind', 'faceDown', 'defending', 'defendingCard'];
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update));

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' });
    }

    try {
        const player = await Player.findById(req.params.id);
        if (!player) {
            return res.status(404).send();
        }

        updates.forEach((update) => player[update] = req.body[update]);
        await player.save();
        res.send(player);
    } catch (error) {
        res.status(400).send(error);
    }
});

// Delete a player by ID
router.delete('/:id', async (req, res) => {
    try {
        const player = await Player.findByIdAndDelete(req.params.id);

        if (!player) {
            return res.status(404).send();
        }

        res.send(player);
    } catch (error) {
        res.status(500).send(error);
    }
});

module.exports = router;

// Set Up Express Application (app.js):

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const playerRouter = require('./routes/players');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Database connection
mongoose.connect("mongodb://localhost:27017/game", { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch((err) => console.log(err));

// Routes
app.use('/players', playerRouter);

// Home route
app.get('/', (req, res) => {
    res.send('Game API is running');
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});









// Integrating Database with WebSockets
// Here’s how you can integrate the database with your WebSocket logic:

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const Player = require('./models/game'); // Import the Player model

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const http = require('http').createServer(app);
const io = require('socket.io')(http, {
    cors: {
        origin: "*",
    },
});

mongoose.connect("mongodb://localhost:27017/game", { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch((err) => console.log(err));

io.on("connection", (socket) => {
    console.log(`New client connected: ${socket.id}`);

    socket.on("findingOpponents", async (playerData) => {
        console.log(`New player: ${playerData.name}`);
        try {
            let player = await Player.findOne({ p_id: playerData.p_id });
            if (!player) {
                player = new Player({ ...playerData, s_id: socket.id });
                await player.save();
                io.emit("message", { user: playerData.name, role: "system", message: `${playerData.name} has joined the game.` });
            }
            const players = await Player.find();
            io.emit("updatePlayers", players);
        } catch (error) {
            console.error(error);
        }
    });

    socket.on("updatePlayer", async (playerData) => {
        try {
            let player = await Player.findOne({ p_id: playerData.p_id });
            if (player) {
                Object.assign(player, playerData, { s_id: socket.id });
                await player.save();
                console.log(`Updating ${playerData.name}'s boardstate`);
            } else {
                console.log("Player is not in the game.");
            }
            const players = await Player.find();
            io.emit("updatePlayers", players);
        } catch (error) {
            console.error(error);
        }
    });

    socket.on("disconnect", async () => {
        try {
            const player = await Player.findOne({ s_id: socket.id });
            if (player) {
                await Player.deleteOne({ s_id: socket.id });
                io.emit("message", { user: player.name, role: "system", message: `${player.name} has left the game.` });
                console.log("Player disconnected:", player.name);
            }
            const players = await Player.find();
            io.emit("updatePlayers", players);
        } catch (error) {
            console.error(error);
        }
    });
});

const PORT = process.env.PORT || 4000;
http.listen(PORT, () => {
    console.log(`Server is up and running on port number ${PORT}`);
});

app.get('/', (req, res) => {
    res.send('Real-time Chat Server is running');
});


// Updating Client-Side Code:
// Ensure your client-side code can handle connections and reconnections appropriately.
// Here's an updated client-side example that handles reconnections:

import { createContext, useContext, useState, useEffect } from "react";
import soundPlayer from "../Sounds/SoundPlayer";
import { AuthContext } from "./AuthContext";
import { GameStateContext } from "./GameStateContext";
import { io } from "socket.io-client";
import helper from "../QueryObjects/Helper";

const MatchMakingContext = createContext();

const MatchMakingContextProvider = ({ children }) => {
    const { account } = useContext(AuthContext);
    const {
        player,
        faceDown,
        defending,
        defendingCard,
        volume,
        addToLog
    } = useContext(GameStateContext);

    const [waiting, setWaiting] = useState(false);
    const [players, setPlayers] = useState([]);
    const [opponents, setOpponents] = useState([]);
    const [watchers, setWatchers] = useState([]);
    const [selectedOpp, setSelectedOpp] = useState(null);
    const [selectedOppCard, setSelectedOppCard] = useState(null);
    const [socket, setSocket] = useState(null);

    const [showOppDiscardModal, setShowOppDiscardModal] = useState(false);
    const [showOppPluckDiscardModal, setShowOppPluckDiscardModal] = useState(false);
    const [showOppPlayAreaModal, setShowOppPlayAreaModal] = useState({name: "", zone: null, objectName: ""});
    const [showOppActivePluckModal, setShowOppActivePluckModal] = useState({name: "", zone: null, objectName: ""});

    const [priority, setPriority] = useState([]);

    const matchMake = async() => {
        const newSocket = io.connect("http://localhost:4000/");
        console.log("Finding opponents");
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
        console.log(playerData);
        setWaiting(true);
        newSocket.emit("findingOpponents", playerData);
        setSocket(newSocket);
    };

    const playerIn = (player) => {
        if (players.find(playerItem => playerItem.p_id === player.p_id)) {
            return true;
        }
    };

    useEffect(() => {
        if (socket) {
            socket.on("updatePlayers", (playersData) => {
                console.log(playersData);
                console.log(socket.id);
                const newPlayers = [];
                const newOpponents = [];
                const newWatchers = [];
                for (let [s_id, playerData] of Object.entries(playersData)) {
                    const playerItem = { ...playerData, s_id };
                    if (playerData.p_id === player.p_id) {
                        newPlayers.push(playerItem);
                    } else if (newOpponents.length < 3) {
                        newOpponents.push(playerItem);
                        if (selectedOpp && selectedOpp.p_id === playerItem.p_id) {
                            setSelectedOpp(playerItem);
                        }
                        setWaiting(false);
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
        }
    }, [player.p_id, socket]);

    useEffect(() => {
        if (socket && playerIn(player)) {
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
                p_id: player.p_id,
                s_id: player.s_id
            };
            socket.emit("updatePlayer", playerData);
        }
    }, [player, faceDown, defending, defendingCard, socket]);

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
            setPriority,
            playerIn,
            waiting
            }}>
            {children}
        </MatchMakingContext.Provider>
    );
};

export { MatchMakingContext, MatchMakingContextProvider };


// Integrating a database with your Express and WebSocket application helps
// manage game state more effectively, which can alleviate resource constraints
// and improve the performance and scalability of your application.
// This approach ensures that player data is stored persistently and managed
// efficiently, reducing the load on your server's memory and handling
// concurrent connections more effectively.



import React, { useEffect, useState } from 'react';

const PlayerProfile = ({ playerId }) => {
    const [player, setPlayer] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPlayer = async () => {
            try {
                const response = await fetch(`http://localhost:8000/players/${playerId}`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setPlayer(data);
                setLoading(false);
            } catch (error) {
                setError(error);
                setLoading(false);
            }
        };

        fetchPlayer();
    }, [playerId]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    return (
        <div>
            <h1>{player.name}</h1>
            <p>HP: {player.hp}</p>
            {/* Add other player fields as needed */}
        </div>
    );
};

export default PlayerProfile;
