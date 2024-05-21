const mainDeck = {
    name: "",
    cards: [],
    createDeckObject: async function createCardObject(cards) {
        this["cards"] = cards
        return this
    },
    shuffleDeck: async function shuffleDeck() {
        console.log("deck action")
    },
    drawCard: async function drawCard() {
        console.log("deck action")
    },
    addCardToHandFromDeck: async function addCardToHandFromDeck() {
        console.log("deck action")
    },
    addCardToFAMEFromDeck: async function addCardToFAMEFromDeck() {
        console.log("deck action")
    },
    addCardToStringFromDeck: async function addCardToStringFromDeck() {
        console.log("deck action")
    },
    placeCardFromDeck: async function placeCardFromDeck() {
        console.log("deck action")
    },
    discardCardFromDeck: async function discardCardFromDeck() {
        console.log("deck action")
    },
    unfurlCard: async function unfurlCard() {
        console.log("deck action")
    },
}

export default mainDeck
