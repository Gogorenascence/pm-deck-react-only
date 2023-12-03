// import { useState, useEffect, useContext } from "react";
// import { GameStateContext } from "../context/GameStateContext";
// import GameBoard from "./GameBoard";
// import PositionSlider from "./PositionSlider";
// import CardInfoPanel from "./CardInfoPanel";
// import LogChatPanel from "./LogChatPanel";
// import {
//     specialSound,
//     destroySound,
//     shuffleSound,
//     summonSound,
//     drawSound,
//     soundLoop,
//     gainSound,
//     activateSound,
//     discardSound,
//     menuSound,
//     startSound,
//     equipSound,
//     flipSound
// } from "../Sounds/Sounds";


// function SimulatorPage(props) {
//     document.body.classList.add("dark")
//     const {
//         player,
//         setPlayer,
//         playerMainDeck,
//         setPlayerMainDeck,
//         playerPluckDeck,
//         setPlayerPluckDeck,
//         playArea,
//         setPlayArea,
//         activePluck,
//         setActivePluck,
//         transformRotateX,
//         setTransformRotateX,
//         scale,
//         setScale,
//         position,
//         setPosition,
//         showExtra,
//         setShowExtra,
//         volume,
//         setVolume,
//         log,
//         setLog,
//         addToLog
//     } = useContext(GameStateContext)

//     const [selectedMainDeck, setSelectedMainDeck] = useState({
//         name: "",
//         cards: []
//     })
//     const [selectedPluckDeck, setSelectedPluckDeck] = useState({
//         name: "",
//         cards: []
//     })
//     const [cards, setCards] = useState([])
//     const [hand, setHand] = useState(player.hand)
//     const [ownership, setOwnership] = useState(player.ownership)
//     const [discard, setDiscard] = useState(player.mainDiscard)
//     const [pluckDiscard, setPluckDiscard] = useState(player.pluckDiscard)
//     const [selectedIndex, setSelectedIndex] = useState(null)
//     const [selectedPluckIndex, setSelectedPluckIndex] = useState(null)
//     const [hoveredCard, setHoveredCard] = useState("")
//     const [prompt, setPrompt] = useState({
//         message: "",
//         action: "",
//     })
//     const [fromDeck, setFromDeck] = useState(false)
//     const [fromDiscard, setFromDiscard] = useState(false)
//     const [showCardMenu, setShowCardMenu] = useState(null)
//     const [showPluckMenu, setShowPluckMenu] = useState(null)
//     const [loading, setLoading] = useState(false)
//     const [placing, setPlacing] = useState(true)
//     const [shuffling, setShuffling] = useState(false)
//     const [shufflingPluck, setShufflingPluck] = useState(false)

//     const {
//         decks,
//         pre_processed_cards,
//         card_types,
//         card_tags,
//         extra_effects,
//         reactions
//     } = props

//     const getCards = () => {
//         const processedCards = []
//         for (let card of pre_processed_cards) {
//             const cardData = {...card}
//             cardData["seriesNames"] = cardData.series_name.split("//")
//             cardData["effectText"] = cardData.effect_text.split("//")
//             if (cardData.second_effect_text){
//                 cardData["secondEffectText"] = cardData.second_effect_text.split("//")
//             }
//             const card_type = card_types.find(card_type => card?.card_type[0] === card_type?.type_number)
//             cardData["card_type"] = [card_type]

//             const extra_effects_list = []
//             for (let extra_effect of extra_effects) {
//                 if (card.extra_effects.includes(extra_effect.effect_number) ) {
//                     extra_effects_list.push(extra_effect)
//                 }
//             }
//             cardData["extra_effects"] = extra_effects_list

//             const reaction_counts = {}
//             for (let reaction_number of card.reactions) {
//                 const reaction = reactions.find(reaction => reaction.reaction_number === reaction_number)
//                 !reaction_counts[reaction.name]?
//                 reaction_counts[reaction.name] = {
//                     info: reaction,
//                     count: 1,

//                 }:
//                 reaction_counts[reaction.name]["count"]++
//             }
//             const reactions_list = Object.values(reaction_counts)
//             cardData["reactions"] = reactions_list

//             const card_tags_list = []
//             for (let card_tag of card_tags) {
//                 if (card.card_tags.includes(card_tag.tag_number) ) {
//                     card_tags_list.push(card_tag)
//                 }
//             }
//             cardData["card_tags"] = card_tags_list

//             processedCards.push(cardData)
//         }
//         setCards(processedCards)
//         console.log(processedCards)
//     }
