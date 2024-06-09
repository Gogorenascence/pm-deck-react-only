// npm install mongoose


// Step 2: Create Mongoose Models
// Define your models to represent the data structure in the database. Here’s an example for a Player model.

// models/Player.js
const mongoose = require("mongoose");

const playerSchema = new mongoose.Schema({
    name: String,
    hp: Number,
    mainDeck: Array,
    pluckDeck: Array,
    hand: Array,
    ownership: Array,
    mainDiscard: Array,
    pluckDiscard: Array,
    playArea: Array,
    activePluck: Array,
    focus: Number,
    enthusiasm: Number,
    mettle: Number,
    secondWind: Number,
    faceDown: Array,
    defending: Boolean,
    defendingCard: Object,
    p_id: String,
    s_id: String
});

const Player = mongoose.model("Player", playerSchema);

module.exports = Player;


// Step 3: Set Up the API Server
// Create your Express server and define API routes for creating, updating, and retrieving players.

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");

const Player = require("./models/game");

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

mongoose.connect("mongodb://localhost:27017/game", { useNewUrlParser: true, useUnifiedTopology: true });

const http = require("http").createServer(app);
const io = require("socket.io")(http, {
    cors: {
        origin: "*",
    },
});

const players = {};

// API routes
app.post("/players", async (req, res) => {
    try {
        const player = new Player(req.body);
        await player.save();
        res.status(201).send(player);
    } catch (error) {
        res.status(400).send(error);
    }
});

app.put("/players/:id", async (req, res) => {
    try {
        const player = await Player.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!player) {
            return res.status(404).send();
        }
        res.send(player);
    } catch (error) {
        res.status(400).send(error);
    }
});

app.get("/players/:id", async (req, res) => {
    try {
        const player = await Player.findById(req.params.id);
        if (!player) {
            return res.status(404).send();
        }
        res.send(player);
    } catch (error) {
        res.status(500).send(error);
    }
});

// WebSocket connection
io.on("connection", (socket) => {
    console.log(`New client connected: ${socket.id}`);

    socket.on("message", (messageData) => {
        io.emit("message", messageData);
    });

    socket.on("findingOpponents", async (playerData) => {
        console.log(`New player: ${playerData.name}`);

        // Ensure no more than 4 players are allowed
        const currPlayers = Object.values(players);
        if (currPlayers.length < 4 && !currPlayers.find(player => player.p_id === playerData.p_id)) {
            players[socket.id] = { ...playerData, s_id: socket.id };
            const player = new Player({ ...playerData, s_id: socket.id });
            await player.save();
            io.emit("message", { user: playerData.name, role: "system", message: `${playerData.name} has joined the game.` });
        } else {
            console.log("No new players allowed or player already exists");
        }

        // Emit the updated player list to all clients
        io.emit("updatePlayers", players);
    });

    socket.on("updatePlayer", async (playerData) => {
        const currPlayers = Object.values(players);
        const playerToReplace = currPlayers.find(player => player.p_id === playerData.p_id);
        if (playerToReplace) {
            delete players[playerToReplace.s_id];
            players[socket.id] = { ...playerData, s_id: socket.id };
            await Player.findByIdAndUpdate(playerToReplace._id, { ...playerData, s_id: socket.id });
            console.log(`Updating ${playerData.name}'s board state`);
        } else {
            console.log("Player is not in the game.");
        }

        io.emit("updatePlayers", players);
    });

    socket.on("disconnect", async () => {
        const disconnectedPlayer = players[socket.id];
        if (disconnectedPlayer) {
            delete players[socket.id];
            await Player.findByIdAndDelete(disconnectedPlayer._id);
            io.emit("updatePlayers", players);
            io.emit("message", { user: disconnectedPlayer.name, role: "system", message: `${disconnectedPlayer.name} has left the game.` });
            console.log("Player disconnected:", disconnectedPlayer.name);
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

// Step 4: Integrate with Client
// Update your client code to call these API endpoints to create, update, and retrieve player data.

// Here's an example of how you might modify the matchMake function to interact with the API:
const matchMake = async () => {
    try {
        const response = await fetch("http://localhost:4000/players", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
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
            })
        });

        if (response.ok) {
            const newSocket = io.connect("http://localhost:4000/");
            console.log("Finding opponents");
            setWaiting(true);
            newSocket.emit("findingOpponents", await response.json());
            setSocket(newSocket);
        } else {
            console.log("Failed to create player");
        }
    } catch (error) {
        console.error("Error creating player:", error);
    }
};


// Mongoose Models: Define models to represent your data structure.
// API Server: Create Express routes to handle creating, updating, and retrieving data.
// WebSockets: Use WebSockets for real-time communication, updating the game state as needed.
// Client Integration: Update the client code to interact with the API and use WebSockets for real-time updates.
