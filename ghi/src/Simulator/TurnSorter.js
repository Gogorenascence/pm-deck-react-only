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
    }
}

export default turnSorter
