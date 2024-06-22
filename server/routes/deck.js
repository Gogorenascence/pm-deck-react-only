const express = require('express');
const router = express.Router();
const { Deck } = require('../models/deck');

// Create a new deck
router.post('/', async (req, res) => {
    const deck = new Deck(req.body);
    try {
        await deck.save();
        res.status(201).send(deck);
    } catch (error) {
        res.status(400).send(error);
    }
});

// Get all decks
router.get('/', async (req, res) => {
    try {
        const decks = await Deck.find();
        const processed_decks = [...decks].map((deck) => {
            deck.id = deck._id ? (deck._id.$oid ? deck._id.$oid : deck._id) : deck.id;
            return deck;
        })
        res.send(processed_decks);
    } catch (error) {
        console.error(error)
        res.status(500).send(error);
    }
});

// Get a deck by ID
router.get('/:id', async (req, res) => {
    const _id = req.params.id;
    try {
        const deck = await Deck.findById(_id);
        if (!deck) {
            return res.status(404).send();
        }
        res.send(deck);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Update a deck by ID
router.patch('/:id', async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = [
        "name",
        "account_id",
        "description",
        "strategies",
        "cards",
        "pluck",
        "views",
        "updated_on",
        "cover_card",
        "card_names",
        "series_names",
        "private",
        "creator"
    ];
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update));

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' });
    }

    try {
        const deck = await Deck.findById(req.params.id);
        if (!deck) {
            return res.status(404).send();
        }

        updates.forEach((update) => deck[update] = req.body[update]);
        await deck.save();
        res.send(deck);
    } catch (error) {
        res.status(400).send(error);
    }
});

// Delete a deck by ID
router.delete('/:id', async (req, res) => {
    try {
        const deck = await Deck.findByIdAndDelete(req.params.id);

        if (!deck) {
            return res.status(404).send();
        }

        res.send(deck);
    } catch (error) {
        res.status(500).send(error);
    }
});

module.exports = router;
