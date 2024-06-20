const express = require('express');
const router = express.Router();
const { Player } = require('../models/game');

// Create a new player
router.post('/', async (req, res) => {
    const player = new Player(req.body);
    try {
        await player.save();
        res.status(201).send(player);
    } catch (error) {
        res.status(400).send(error);
    }
});

// Get all players
router.get('/', async (req, res) => {
    try {
        const players = await Player.find();
        const processed_players = [...players].map((player) => {
            player.id = player._id ? (player._id.$oid ? player._id.$oid : player._id) : player.id;
            return player;
        })
        res.send(processed_players);
    } catch (error) {
        console.error(error)
        res.status(500).send(error);
    }
});

// Get a player by ID
router.get('/:p_id', async (req, res) => {
    const p_id = req.params.p_id;
    try {
        const player = await Player.findOne({p_id: p_id});
        if (!player) {
            return res.status(404).send();
        }
        player.id = player._id ? (player._id.$oid ? player._id.$oid : player._id) : player.id;
        res.send(player);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Update a player by ID
router.patch('/:p_id', async (req, res) => {
    const p_id = req.params.p_id;
    const updates = Object.keys(req.body);
    const allowedUpdates = [
        'hp',
        'mainDeck',
        'pluckDeck',
        'hand',
        'ownership',
        'mainDiscard',
        'pluckDiscard',
        'playArea',
        'activePluck',
        'focus',
        'enthusiasm',
        'mettle',
        'secondWind',
        'faceDown',
        'defending',
        'defendingCard',
        'activating',
        'g_id'
    ];
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update));

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' });
    }

    try {
        const player = await Player.findOne({p_id: p_id});
        if (!player) {
            return res.status(404).send();
        }

        updates.forEach((update) => player[update] = req.body[update]);
        await player.save();
        res.send(player);
    } catch (error) {
        res.status(400).send(error);
    }
});

// Delete a player by ID
router.delete('/:id', async (req, res) => {
    try {
        const player = await Player.findByIdAndDelete(req.params.id);

        if (!player) {
            return res.status(404).send();
        }

        res.send(player);
    } catch (error) {
        res.status(500).send(error);
    }
});

module.exports = router;
