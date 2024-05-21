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

// const queryList = {
//     "name": "Joe",
//     "address": "12102 Jump Tr.",
//     "phoneNumber": 12345676890,
//     "Job": "Forklift safety instructor",
//     "number of sisters": 3
// }

// let reactionQuery = query(reactionsCollectionRef);

// for (const [key, value] of Object.entries(queryList)) {
//     reactionQuery = where(reactionQuery, key, "==", value);
// }

// Catch nonexistant decks


import mainDeckCard from './path/to/mainDeckCard';

// Example card object
const newCard = {
    name: "Dragon Knight",
    card_class: "Warrior",
    hero_id: "12345",
    series_name: "Dragons",
    seriesNames: ["Dragons", "Knights"],
    card_number: "001",
    enthusiasm: "High",
    effectText: ["Attack Boost", "Defense Boost"],
    secondEffectText: ["Fire Resistance"],
    picture_url: "http://example.com/dragon_knight.jpg",
    card_type: "Monster",
    extra_effects: ["Flying"],
    reactions: ["Counterattack"],
    card_tags: ["Dragon", "Knight"],
    hp: 10,
    defending: true,
    turned: true,
    faceDown: false,
    resolved_main: true,
    resolved_extra: true
};

// Update mainDeckCard with newCard values
mainDeckCard.createCardObject(newCard);

// Check the updated mainDeckCard
console.log(mainDeckCard);


// Card.js

// Object-oriented programming (OOP) can be integrated with React to manage state and behavior in a more structured way, particularly through the use of classes. While React hooks and functional components are now the recommended way to manage state and side effects in React, there are still scenarios where OOP principles and class components can be useful.

// Here, I'll provide a structured approach to managing the mainDeckCard object and interacting with it within a React component using OOP principles.

// Define the Card Class
// First, let's define a Card class that encapsulates the properties and methods related to a card.

class Card {
    constructor(card) {
        this.name = card.name || "";
        this.card_class = card.card_class || "";
        this.hero_id = card.hero_id || "";
        this.series_name = card.series_name || "";
        this.seriesNames = card.seriesNames || [];
        this.card_number = card.card_number || "";
        this.enthusiasm = card.enthusiasm || "";
        this.effectText = card.effectText || [];
        this.secondEffectText = card.secondEffectText || [];
        this.picture_url = card.picture_url || "";
        this.card_type = card.card_type || "";
        this.extra_effects = card.extra_effects || [];
        this.reactions = card.reactions || [];
        this.card_tags = card.card_tags || [];
        this.hp = card.hp || 5;
        this.defending = card.defending || false;
        this.turned = card.turned || false;
        this.faceDown = card.faceDown || false;
        this.resolved_main = card.resolved_main || false;
        this.resolved_extra = card.resolved_extra || false;
    }

    createCardObject(card) {
        for (const key in card) {
            if (card.hasOwnProperty(key) && this.hasOwnProperty(key)) {
                this[key] = card[key];
            }
        }
    }

    objectsAreEqual(obj1, obj2) {
        const obj1Keys = Object.keys(obj1);
        for (const key of obj1Keys) {
            if (obj1[key] !== obj2[key]) {
                return false;
            }
        }
        return true;
    }
}

export default Card;

// Using the Card Class in a React Component
// Next, let's use the Card class in a React component. We'll use a class component to demonstrate the integration of OOP within React.


// CardComponent.js
import React, { Component } from 'react';
import Card from './Card';

class CardComponent extends Component {
    constructor(props) {
        super(props);

        // Initialize state with an instance of the Card class
        this.state = {
            card: new Card({
                name: "Dragon Knight",
                card_class: "Warrior",
                hero_id: "12345",
                series_name: "Dragons",
                seriesNames: ["Dragons", "Knights"],
                card_number: "001",
                enthusiasm: "High",
                effectText: ["Attack Boost", "Defense Boost"],
                secondEffectText: ["Fire Resistance"],
                picture_url: "http://example.com/dragon_knight.jpg",
                card_type: "Monster",
                extra_effects: ["Flying"],
                reactions: ["Counterattack"],
                card_tags: ["Dragon", "Knight"],
                hp: 10,
                defending: true,
                turned: true,
                faceDown: false,
                resolved_main: true,
                resolved_extra: true
            })
        };
    }

    updateCard = (newCardData) => {
        const updatedCard = new Card(this.state.card);
        updatedCard.createCardObject(newCardData);

        this.setState({ card: updatedCard });
    };

    render() {
        const { card } = this.state;

        return (
            <div>
                <h1>{card.name}</h1>
                <p>Class: {card.card_class}</p>
                <p>HP: {card.hp}</p>
                <p>Effect Text: {card.effectText.join(', ')}</p>
                {/* Add more card details as needed */}
                <button onClick={() => this.updateCard({ hp: card.hp + 1 })}>
                    Increase HP
                </button>
            </div>
        );
    }
}

export default CardComponent;

// Explanation
// Card Class:

// Encapsulates all the properties and methods related to a card.
// Provides methods like createCardObject and objectsAreEqual for manipulating and comparing card objects.
// CardComponent React Component:

// Uses a class component to manage state with an instance of the Card class.
// Initializes state with a new Card object.
// Includes a method updateCard to update the card state using the createCardObject method of the Card class.
// Renders card details and provides a button to update card properties (e.g., increasing HP).
// Integrating with Functional Components and Hooks
// While the above example uses class components to demonstrate OOP principles, you can also integrate this with functional components using React hooks for state management. Here's a brief example:
// CardComponentFunctional.js
import React, { useState } from 'react';
import Card from './Card';

const CardComponentFunctional = () => {
    const [card, setCard] = useState(new Card({
        name: "Dragon Knight",
        card_class: "Warrior",
        hero_id: "12345",
        series_name: "Dragons",
        seriesNames: ["Dragons", "Knights"],
        card_number: "001",
        enthusiasm: "High",
        effectText: ["Attack Boost", "Defense Boost"],
        secondEffectText: ["Fire Resistance"],
        picture_url: "http://example.com/dragon_knight.jpg",
        card_type: "Monster",
        extra_effects: ["Flying"],
        reactions: ["Counterattack"],
        card_tags: ["Dragon", "Knight"],
        hp: 10,
        defending: true,
        turned: true,
        faceDown: false,
        resolved_main: true,
        resolved_extra: true
    }));

    const updateCard = (newCardData) => {
        const updatedCard = new Card(card);
        updatedCard.createCardObject(newCardData);
        setCard(updatedCard);
    };

    return (
        <div>
            <h1>{card.name}</h1>
            <p>Class: {card.card_class}</p>
            <p>HP: {card.hp}</p>
            <p>Effect Text: {card.effectText.join(', ')}</p>
            {/* Add more card details as needed */}
            <button onClick={() => updateCard({ hp: card.hp + 1 })}>
                Increase HP
            </button>
        </div>
    );
};

export default CardComponentFunctional;


import { createContext, useState, useContext } from "react";
import { GameStateContext } from "./GameStateContext";
import {
    specialSound,
    destroySound,
    shuffleSound,
    summonSound,
    drawSound,
    gainSound,
    activateSound,
    discardSound,
    menuSound,
    startSound,
    equipSound,
    flipSound
} from "../Sounds/Sounds";


const SimulatorActionsContext = createContext();

const SimulatorActionsContextProvider = ({ children }) => {
    const {
        setGame,
        player,
        playerMainDeck,
        setPlayerMainDeck,
        playerPluckDeck,
        setPlayerPluckDeck,
        setPlayArea,
        setActivePluck,
        volume,
        setVolume,
        addToLog,
        defendingCard
    } = useContext(GameStateContext)

    const [selectedMainDeck, setSelectedMainDeck] = useState({
        name: "",
        cards: []
    })
    const [selectedPluckDeck, setSelectedPluckDeck] = useState({
        name: "",
        cards: []
    })
    const [decks, setDecks] = useState([])
    const [cards, setCards] = useState([])
    const [hand, setHand] = useState(player.hand)
    const [ownership, setOwnership] = useState(player.ownership)
    const [discard, setDiscard] = useState(player.mainDiscard)
    const [pluckDiscard, setPluckDiscard] = useState(player.pluckDiscard)
    const [selectedIndex, setSelectedIndex] = useState(null)
    const [selectedPluckIndex, setSelectedPluckIndex] = useState(null)
    const [hoveredCard, setHoveredCard] = useState("")
    const [prompt, setPrompt] = useState({
        message: "",
        action: "",
    })
    const [fromDeck, setFromDeck] = useState(false)
    const [fromDiscard, setFromDiscard] = useState(false)
    const [showCardMenu, setShowCardMenu] = useState(null)
    const [showPluckMenu, setShowPluckMenu] = useState(null)
    const [loading, setLoading] = useState(false)
    const [placing, setPlacing] = useState(true)
    const [shuffling, setShuffling] = useState(false)
    const [shufflingPluck, setShufflingPluck] = useState(false)

    const handleChangeDeck = (event) => {
        const deckID = event.target.value
        const deckFound = decks.find(deck => deck.id === deckID)
        console.log(deckID)
        setSelectedMainDeck({
            name: deckFound.name,
            cards: deckFound.cards
        });
        setSelectedPluckDeck({
            name: deckFound.name,
            cards: deckFound.pluck
        })
    };

        const getMainDeckObject = async(deck) => {
        const mainDeckObject = []
        for (let card of deck) {
            const newCardObj = await mainDeckCard.createCardObject(card)
            mainDeckObject.push({...newCardObj})
        }
        return mainDeckObject
    }

    const getPluckDeckObject = async(deck) => {
        const pluckDeckObject = []
        for (let card of deck) {
            const newCardObj = await pluckDeckCard.createCardObject(card)
            pluckDeckObject.push({...newCardObj})
        }
        return pluckDeckObject
    }

    const fillDecks = async(event) => {
        if (selectedMainDeck.cards.length > 0) {
            const filledMainDeck = selectedMainDeck.cards.map(cardNumber =>
                cards.find(card => card.card_number === cardNumber)
            );
            const mainDeckObject = await getMainDeckObject(filledMainDeck)
            const filledPluckDeck = selectedPluckDeck.cards.map(cardNumber =>
                cards.find(card => card.card_number === cardNumber)
            );
            const pluckDeckObject = await getPluckDeckObject(filledPluckDeck)
            setPlayerMainDeck({name: selectedMainDeck.name, cards: mainDeckObject})
            setPlayerPluckDeck({name: selectedPluckDeck.name, cards: pluckDeckObject})
            equipSound(volume)
            addToLog("System", "system", `${selectedMainDeck.name} selected`)
        } else {
            addToLog("System", "system", "No deck selected")
        }
    }
