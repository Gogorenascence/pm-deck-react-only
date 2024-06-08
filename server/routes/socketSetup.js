const express = require('express');
const router = express.Router();
const Card = require('../models/card');

// Create a new player
router.post('/cards', async (req, res) => {
    const card = new Card(req.body);
    try {
        await card.save();
        res.status(201).send(card);
    } catch (error) {
        res.status(400).send(error);
    }
});

// Get all cards
router.get('/cards', async (req, res) => {
    try {
        const cards = await Card.find();
        res.send(cards);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Get a card by ID
router.get('/cards/:id', async (req, res) => {
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
