const mainDeckCard = {
    name: "",
    card_class: "",
    hero_id: "",
    series_name: "",
    seriesNames: [],
    card_number: "",
    enthusiasm: "",
    effectText: [],
    secondEffectText: [],
    picture_url: "",
    card_type: "",
    extra_effects: [],
    reactions: [],
    card_tags: [],
    hp: 5,
    defending: false,
    turned: false,
    faceDown: false,
    resolved_main: false,
    resolved_extra: false,
    mainEffect: "",
    extraEffect: "",
    createCardObject: async function createCardObject(card) {
        const preCard = {...card}
        preCard["seriesNames"] = preCard.series_name.split("//")
        preCard["card_type"] = preCard.card_type[0]
        preCard["effectText"] = preCard.effect_text.split("//")
        preCard["secondEffectText"] = preCard.second_effext_text?
            preCard.second_effext_text.split("//"): []
        for (let [key, value] of Object.entries(preCard)) {
            this[key] = value
        }
        return this
    },
    takeDamage: async function takeDamage(amount) {
        this["hp"] = this.hp - amount
    },
    healSelf: async function healSelf(amount) {
        this["hp"] = this.hp + amount
    },
    defend: async function defend(player) {
        if (!player.defendingCard) {
            player["defendingCard"] = this
        }
    },
    turnCard: async function turnCard() {
        this["turned"] = true
    },
    flipCard: async function flipCard() {
        this["faceDown"] = true
    },
    resolveMainEffect: async function resolveMainEffect() {
        this["resolved_main"] = true
    },
    resolveExtraEffect: async function resolveExtraEffect() {
        this["resolved_extra"] = true
    },
    returnCardFromHandToDeck: async function returnCardFromHandToDeck() {
        console.log("card action")
    },
    returnCardFromStringToDeck: async function returnCardFromStringToDeck() {
        console.log("card action")
    },
    returnPlacedCardToDeck: async function returnPlacedCardToDeck() {
        console.log("card action")
    },
    discardCardFromHand: async function discardCardFromHand() {
        console.log("card action")
    },
    discardCardFromString: async function discardCardFromString() {
        console.log("card action")
    },
    discardPlacedCard: async function discardPlacedCard() {
        console.log("card action")
    },
}

export default mainDeckCard
