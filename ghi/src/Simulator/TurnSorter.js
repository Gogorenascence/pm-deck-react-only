const turnSorter = {
    getStringSize: function getStringSize(player) {
        let size = 0
        for (let slot of Object.values(player.playArea)) {
            if (slot.length > 0) {
                size ++
            }
            if (size >= 4) break;
        }
        return size
    },
    getDiceRoll: function getDiceRoll(sides) {
        return Math.floor(Math.random()*sides) + 1
    },
    sortPlayers: function sortByStringSize(players) {
        players.sort((a, b) => {
            const stringSizeA = this.getStringSize(a);
            const stringSizeB = this.getStringSize(b);

            if (stringSizeA !== stringSizeB) {
                return stringSizeA - stringSizeB;
            }

            if (a.enthusiasm !== b.enthusiasm) {
                return b.enthusiasm - a.enthusiasm;
            }

            return this.getDiceRoll(6) - this.getDiceRoll(6);
        })
        return players;
    },
    getPriority: function (player, opponents) {
        const players = [...opponents, player]
        const sortedPlayers = this.sortPlayers(players)
        const playerIndex = sortedPlayers.indexOf(player)
        const orders = {
            0: "First",
            1: "Second",
            2: "Third",
            3: "Last"
        }
        return orders[playerIndex]
    },
    getOppPriority: function (opp, player, opponents) {
        const players = [...opponents, player]
        const sortedPlayers = this.sortPlayers(players)
        const oppIndex = sortedPlayers.indexOf(opp)
        const orders = {
            0: "First",
            1: "Second",
            2: "Third",
            3: "Last"
        }
        return orders[oppIndex]
    }
}

export default turnSorter
