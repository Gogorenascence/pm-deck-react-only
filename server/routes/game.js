const express = require('express');
const router = express.Router();
const { Game } = require('../models/game');

// Create a new game
router.post('/', async (req, res) => {
    const game = new Game(req.body);
    try {
        await game.save();
        res.status(201).send(game);
    } catch (error) {
        res.status(400).send(error);
    }
});

// Get all games
router.get('/', async (req, res) => {
    try {
        const games = await Game.find();
        const processed_games = [...games].map((game) => {
            game.id = game._id ? (game._id.$oid ? game._id.$oid : game._id) : game.id;
            return game;
        })
        res.send(processed_games);
    } catch (error) {
        console.error(error)
        res.status(500).send(error);
    }
});

// Get a game by ID
router.get('/:id', async (req, res) => {
    const _id = req.params.id;
    try {
        const game = await Game.findById(_id);
        if (!game) {
            return res.status(404).send();
        }
        res.send(game);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Update a game by ID
router.patch('/:id', async (req, res) => {
    const _id = req.params.id;
    const updates = Object.keys(req.body);
    const allowedUpdates = [
        "name",
        "seats",
        "players",
        "watchers",
    ];
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update));

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' });
    }
    try {
        const game = await Game.findById(_id);
        if (!game) {
            return res.status(404).send();
        }

        updates.forEach((update) => game[update] = req.body[update]);
        await game.save();
        res.send(game);
    } catch (error) {
        res.status(400).send(error);
    }
});

// Delete a game by ID
router.delete('/:id', async (req, res) => {
    try {
        const game = await Game.findByIdAndDelete(req.params.id);

        if (!game) {
            return res.status(404).send();
        }

        res.send(game);
    } catch (error) {
        res.status(500).send(error);
    }
});

module.exports = router;


// const getGames = async() =>{
//     try {
//         const response = await fetch(`http://localhost:4000/games`);
//         if (!response.ok) {
//             throw new Error('Network response was not ok');
//         }
//         const data = await response.json();
//         console.log(data);

//         if (data.length == 0 ) {
//             setNoGames(true)
//         }
//         const sortedGames = [...data].sort(sortMethods[sortState].method);

//         const typedGames = []
//         for (let game of sortedGames){
//             if (game.game_type[0] === 1001) {
//                 game["gameType"] = "Fighter"
//             }
//             else if (game.game_type[0] === 1002) {
//                 game["gameType"] = "Aura"
//             }
//             else if (game.game_type[0] === 1003) {
//                 game["gameType"] = "Move"
//             }
//             else if (game.game_type[0] === 1004) {
//                 game["gameType"] = "Ending"
//             }
//             else if (game.game_type[0] === 1005) {
//                 game["gameType"] = "Any Type"
//             }
//             else if (game.game_type[0] === 1006) {
//                 game["gameType"] = "Item"
//             }
//             else if (game.game_type[0] === 1007) {
//                 game["gameType"] = "Event"
//             }
//             else if (game.game_type[0] === 1008) {
//                 game["gameType"] = "Comeback"
//             }

//             game["effectText"] = game.effect_text.split("//")

//             if (game.second_effect_text){
//                 game["secondEffectText"] = game.second_effect_text.split("//")
//             }

//             typedGames.push(game)
//         }
//         setGames(typedGames);
//     } catch (error) {
//         console.error("error")
//     }
// };
