const pluckDeckCard = {
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
    turnCard: async function turnCard() {
        this["turned"] = true
    },
    flipCard: async function flipCard() {
        this["faceDown"] = true
    },
    resolveMainEffect: async function resolveMainEffect() {
        this["resolved_pluck"] = true
    },
    resolveExtraEffect: async function resolveExtraEffect() {
        this["resolved_extra"] = true
    },
    returnPluckFromReserveToDeck: async function returnPluckFromReserveToDeck() {
        console.log("card action")
    },
    returnPluckFromActiveToDeck: async function returnPluckFromActiveToDeck() {
        console.log("card action")
    },
    returnPlacedPluckToDeck: async function returnPlacedPluckToDeck() {
        console.log("card action")
    },
    discardPluckFromReserve: async function discardPluckFromReserve() {
        console.log("card action")
    },
    discardPlacedPluck: async function discardPlacedPluck() {
        console.log("card action")
    },
}

export default pluckDeckCard
