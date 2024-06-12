const players = {};

module.exports = (io) => {
    io.on("connection", (socket) => {
        console.log(`New client connected: ${socket.id}`);

        socket.on("message", (messageData) => {
            io.emit("message", messageData );
        });

        socket.on("updateRoom", (direction) => {
            io.emit("updateRooms", direction)
            console.log("update")
            return () => {
                socket.off("updateRooms");
            };
        })

        socket.on("gameStart", (room_id) => {
            io.emit("startingGame", room_id)
            return () => {
                socket.off("startingGame");
            };
        })

        socket.on("updatePlayer", (p_id) => {
            io.emit("updateOpponent", p_id)
            console.log("updating opponents")
            return () => {
                socket.off("updateOpponent");
            };
        })

        socket.on("disconnect", () => {
            console.log(socket)
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
