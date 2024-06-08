const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
const cors = require("cors");
const cardRouter = require("./routes/card")

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

mongoose.connect("mongodb+srv://nantahkl:C0XkfjLvkcXR9JeE@cardbasecluster.ryoluyz.mongodb.net/cards", { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch((err) => console.log(err));

const players = {};

// io.on("connection", (socket) => {
//     console.log(`New client connected: ${socket.id}`);

//     socket.on("message", (messageData) => {
//         io.emit("message", messageData );
//     });


//     socket.on("findingOpponents", (playerData) => {
//         console.log(`New player: ${playerData.name}`);

//         // Ensure no more than 4 players are allowed
//         const currPlayers = Object.values(players);
//         if (currPlayers.length < 4 && !currPlayers.find(player => player.p_id === playerData.p_id)) {
//             players[socket.id] = { ...playerData, s_id: socket.id };
//             io.emit("message", { user: playerData.name, role: "system", message: `${playerData.name} has joined the game.` });
//         } else {
//             console.log("No new players allowed or player already exists");
//         }

//         // Emit the updated player list to all clients
//         io.emit("updatePlayers", players);
//         // console.log("Current players:", players);

//         return () => {
//             socket.off("updatePlayers");
//         };
//     });

//     socket.on("updatePlayer", (playerData) => {
//         console.log(socket.id)
//         const currPlayers = Object.values(players);
//         const playerToReplace = currPlayers.find(player => player.p_id === playerData.p_id)
//         if (playerToReplace) {
//             delete players[playerToReplace.s_id]
//             players[socket.id] = {...playerData, s_id: socket.id}
//             console.log(`Updating ${playerData.name}'s boardstate`)
//         } else {
//             console.log("Player is not in the game.")
//         }

//         io.emit("updatePlayers", players)
//         console.log("Current players:", players);

//         return () => {
//             socket.off("updatePlayers");
//         };
//     })

//     socket.on("disconnect", () => {
//         const disconnectedPlayer = players[socket.id];
//         if (disconnectedPlayer) {
//             delete players[socket.id];
//             io.emit("updatePlayers", players);
//             io.emit("message", { user: disconnectedPlayer.name, role: "system", message: `${disconnectedPlayer.name} has left the game.` });
//             console.log("Player disconnected:", disconnectedPlayer.name);
//         }

//         return () => {
//             socket.off("updatePlayers");
//         };
//     });
// });

const PORT = process.env.PORT || 4000;

http.listen(PORT, () => {
    console.log(`Server is up and running on port number ${PORT}`);
});

app.get('/', (req, res) => {
    res.send('Game Server is running');
});

app.use('/cards', cardRouter);
