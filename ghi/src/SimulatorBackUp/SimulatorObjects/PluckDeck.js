const pluckDeck = {
    name: "",
    cards: [],
    createDeckObject: async function createCardObject(cards) {
        this["cards"] = cards
        return this
    },
    shuffleDeck: async function shuffleDeck() {
        console.log("deck action")
    },
    drawPluck: async function drawPluck() {
        console.log("deck action")
    },
    addPluckToReserveFromDeck: async function addPluckToReserveFromDeck() {
        console.log("deck action")
    },
    addPluckToActivePluckFromDeck: async function addPluckToActivePluckFromDeck() {
        console.log("deck action")
    },
    placePluckFromDeck: async function placePluckFromDeck() {
        console.log("deck action")
    },
    discardPluckFromDeck: async function discardPluckFromDeck() {
        console.log("deck action")
    },
    unfurlPluck: async function unfurlPluck() {
        console.log("deck action")
    },
}

export default pluckDeck
