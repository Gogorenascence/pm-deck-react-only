const players = {};

module.exports = (io) => {
    io.on("connection", (socket) => {
        console.log(`New client connected: ${socket.id}`);

        socket.on("message", (messageData) => {
            io.emit("message", messageData );
        });

        socket.on("findingOpponents", (playerData) => {
            console.log(`New player: ${playerData.name}`);

            // Ensure no more than 4 players are allowed
            const currPlayers = Object.values(players);
            if (currPlayers.length < 4 && !currPlayers.find(player => player.p_id === playerData.p_id)) {
                players[socket.id] = { ...playerData, s_id: socket.id };
                io.emit("message", { user: playerData.name, role: "system", message: `${playerData.name} has joined the game.` });
            } else {
                console.log("No new players allowed or player already exists");
            }

            // Emit the updated player list to all clients
            io.emit("updatePlayers", players);
            // console.log("Current players:", players);

            return () => {
                socket.off("updatePlayers");
            };
        });

        socket.on("updatePlayer", (playerData) => {
            console.log(socket.id)
            const currPlayers = Object.values(players);
            const playerToReplace = currPlayers.find(player => player.p_id === playerData.p_id)
            if (playerToReplace) {
                delete players[playerToReplace.s_id]
                players[socket.id] = {...playerData, s_id: socket.id}
                console.log(`Updating ${playerData.name}'s boardstate`)
            } else {
                console.log("Player is not in the game.")
            }

            io.emit("updatePlayers", players)
            console.log("Current players:", players);

            return () => {
                socket.off("updatePlayers");
            };
        })

        socket.on("disconnect", () => {
            const disconnectedPlayer = players[socket.id];
            if (disconnectedPlayer) {
                delete players[socket.id];
                io.emit("updatePlayers", players);
                io.emit("message", { user: disconnectedPlayer.name, role: "system", message: `${disconnectedPlayer.name} has left the game.` });
                console.log("Player disconnected:", disconnectedPlayer.name);
            }

            return () => {
                socket.off("updatePlayers");
            };
        });
    });
};