const mongoose = require('mongoose');

const playerSchema = new mongoose.Schema({
    name: { type: String, required: true },
    hp: { type: Number, required: true },
    mainDeck: { type: Array, default: [] },
    pluckDeck: { type: Array, default: [] },
    hand: { type: Array, default: [] },
    ownership: { type: Array, default: [] },
    mainDiscard: { type: Array, default: [] },
    pluckDiscard: { type: Array, default: [] },
    playArea: { type: Array, default: [] },
    activePluck: { type: Array, default: [] },
    focus: { type: Number, default: 0 },
    enthusiasm: { type: Number, default: 0 },
    mettle: { type: Number, default: 0 },
    secondWind: { type: Boolean, default: false },
    faceDown: { type: Boolean, default: false },
    defending: { type: Boolean, default: false },
    defendingCard: { type: String, default: "" },
    p_id: { type: String, required: true, unique: true }
});

const Player = mongoose.model('Player', playerSchema);

module.exports = Player;
