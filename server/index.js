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

const players = {};

io.on("connection", (socket) => {
    console.log(`New client connected: ${socket.id}`);

    socket.on("message", (messageData) => {
        io.emit("message", messageData );
    });

    socket.on("newPlayer", (playerData) => {
        console.log(`New player joined: ${playerData.p_id}`);
        players[playerData.p_id] = { ...playerData, socketId: socket.id };
        io.emit("newPlayer", players[playerData.p_id]);
        console.log("Current players:", players);
    });

    socket.on("updatePlayerData", (playerData) => {
        if (players[playerData.p_id]) {
            console.log(`Updating player data for: ${playerData.p_id}`);
            players[playerData.p_id] = { ...players[playerData.p_id], ...playerData };
        }
        console.log("players", players)
    });

    socket.on("requestPlayerData", (requestedId) => {
        if (players[requestedId]) {
            socket.emit("receivePlayerData", players[requestedId]);
        }
    });

    socket.on("disconnect", () => {
        console.log(`Client disconnected: ${socket.id}`);
        delete players[socket.id];
        io.emit("playerDisconnected", { id: socket.id });
    });
});

const PORT = process.env.PORT || 4000;

http.listen(PORT, () => {
    console.log(`Server is up and running on port number ${PORT}`);
});

app.get('/', (req, res) => {
    res.send('Real-time Chat Server is running');
});
