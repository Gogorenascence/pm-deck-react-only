const express = require('express');
const router = express.Router();
const { Card } = require('../models/card');


// Create a new card
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
router.get('/:card_number', async (req, res) => {
    const card_number = req.params.card_number;
    try {
        const card = await Card.findOne({card_number: card_number});
        if (!card) {
            return res.status(404).send();
        }
        card.id = card._id ? (card._id.$oid ? card._id.$oid : card._id) : card.id;
        res.send(card);
    } catch (error) {
        res.status(500).send(error);
    }
});

router.get('/:hero_id/related', async (req, res) => {
    const hero_id = req.params.hero_id;
    try {
        const card = await Card.find({hero_id: hero_id});
        if (!card) {
            return res.status(404).send();
        }
        card.id = card._id ? (card._id.$oid ? card._id.$oid : card._id) : card.id;
        res.send(card);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Update a card by ID
router.patch('/:card_number', async (req, res) => {
    const card_number = req.params.card_number;
    const updates = Object.keys(req.body);
    const allowedUpdates = [
        "name",
        "card_class",
        "hero_id",
        "series_name",
        "seriesNames",
        "card_number",
        "enthusiasm",
        "effect_text",
        "second_effect_text",
        "effectText",
        "secondEffectText",
        "illustrator",
        "picture_url",
        "file_name",
        "card_type",
        "extra_effects",
        "reactions",
        "card_tags",
        "updated_on"
    ]
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update));

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' });
    }

    try {
        const card = await Card.findOne({card_number: card_number});
        if (!card) {
            return res.status(404).send();
        }

        updates.forEach((update) => card[update] = req.body[update]);
        await card.save();
        res.send(card);
    } catch (error) {
        res.status(400).send(error);
    }
});

// Delete a card by ID
router.delete('/:id', async (req, res) => {
    try {
        const card = await Card.findByIdAndDelete(req.params.id);

        if (!card) {
            return res.status(404).send();
        }

        res.send(card);
    } catch (error) {
        res.status(500).send(error);
    }
});

module.exports = router;
