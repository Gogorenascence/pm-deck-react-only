const express = require('express');
const router = express.Router();
const { Card } = require('../models/card');

// Create a new player
router.post('/', async (req, res) => {
    const card = new Card(req.body);
    try {
        await card.save();
        res.status(201).send(card);
    } catch (error) {
        res.status(400).send(error);
    }
});

// Get all cards
router.get('/', async (req, res) => {
    try {
        const cards = await Card.find();
        const processed_cards = [...cards].map((card) => {
            card.id = card._id ? (card._id.$oid ? card._id.$oid : card._id) : card.id;
            return card;
        })
        res.send(processed_cards);
    } catch (error) {
        console.error(error)
        res.status(500).send(error);
    }
});

// Get a card by ID
router.get('/:id', async (req, res) => {
    const _id = req.params.id;
    try {
        const card = await Card.findById(_id);
        if (!card) {
            return res.status(404).send();
        }
        res.send(player);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Update a player by ID
// router.patch('/:id', async (req, res) => {
//     const updates = Object.keys(req.body);
//     const allowedUpdates = ['name', 'hp', 'mainDeck', 'pluckDeck', 'hand', 'ownership', 'mainDiscard', 'pluckDiscard', 'playArea', 'activePluck', 'focus', 'enthusiasm', 'mettle', 'secondWind', 'faceDown', 'defending', 'defendingCard'];
//     const isValidOperation = updates.every((update) => allowedUpdates.includes(update));

//     if (!isValidOperation) {
//         return res.status(400).send({ error: 'Invalid updates!' });
//     }

//     try {
//         const player = await Player.findById(req.params.id);
//         if (!player) {
//             return res.status(404).send();
//         }

//         updates.forEach((update) => player[update] = req.body[update]);
//         await player.save();
//         res.send(player);
//     } catch (error) {
//         res.status(400).send(error);
//     }
// });

// // Delete a player by ID
// router.delete('/:id', async (req, res) => {
//     try {
//         const player = await Player.findByIdAndDelete(req.params.id);

//         if (!player) {
//             return res.status(404).send();
//         }

//         res.send(player);
//     } catch (error) {
//         res.status(500).send(error);
//     }
// });

module.exports = router;


// const getCards = async() =>{
//     try {
//         const response = await fetch(`http://localhost:4000/cards`);
//         if (!response.ok) {
//             throw new Error('Network response was not ok');
//         }
//         const data = await response.json();
//         console.log(data);

//         if (data.length == 0 ) {
//             setNoCards(true)
//         }
//         const sortedCards = [...data].sort(sortMethods[sortState].method);

//         const typedCards = []
//         for (let card of sortedCards){
//             if (card.card_type[0] === 1001) {
//                 card["cardType"] = "Fighter"
//             }
//             else if (card.card_type[0] === 1002) {
//                 card["cardType"] = "Aura"
//             }
//             else if (card.card_type[0] === 1003) {
//                 card["cardType"] = "Move"
//             }
//             else if (card.card_type[0] === 1004) {
//                 card["cardType"] = "Ending"
//             }
//             else if (card.card_type[0] === 1005) {
//                 card["cardType"] = "Any Type"
//             }
//             else if (card.card_type[0] === 1006) {
//                 card["cardType"] = "Item"
//             }
//             else if (card.card_type[0] === 1007) {
//                 card["cardType"] = "Event"
//             }
//             else if (card.card_type[0] === 1008) {
//                 card["cardType"] = "Comeback"
//             }

//             card["effectText"] = card.effect_text.split("//")

//             if (card.second_effect_text){
//                 card["secondEffectText"] = card.second_effect_text.split("//")
//             }

//             typedCards.push(card)
//         }
//         setCards(typedCards);
//     } catch (error) {
//         console.error("error")
//     }
// };
