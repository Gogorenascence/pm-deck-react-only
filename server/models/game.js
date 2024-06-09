const mongoose = require('mongoose');
const { cardSchema } = require('./card');


const playAreaSchema = new mongoose.Schema({
    fighter_slot: { type: Array, default: [] },
    aura_slot: { type: Array, default: [] },
    move_slot: { type: Array, default: [] },
    ending_slot: { type: Array, default: [] },
    slot_5: { type: Array, default: [] },
    slot_6: { type: Array, default: [] },
    slot_7: { type: Array, default: [] },
    slot_8: { type: Array, default: [] },
});

const activePluckSchema = new mongoose.Schema({
    slot_1: { type: Array, default: [] },
    slot_2: { type: Array, default: [] },
    slot_3: { type: Array, default: [] },
    slot_4: { type: Array, default: [] },
});

const faceDownSchema = new mongoose.Schema({
    fighter_slot: Boolean,
    aura_slot: Boolean,
    move_slot: Boolean,
    ending_slot: Boolean,
});

const defendingSchema = new mongoose.Schema({
    fighter_slot: Boolean,
    aura_slot: Boolean,
    move_slot: Boolean,
    ending_slot: Boolean,
    slot_5: Boolean,
    slot_6: Boolean,
    slot_7: Boolean,
    slot_8: Boolean,
});

const defendingCardSchema = new mongoose.Schema({
    card: { type: Object },
    hp: Number,
    block: Number,
    counter: Number,
    endure: Number,
    redirect: Number,
    slot: String,
    owner: String,
}, { _id: false });

const activatingSchema = new mongoose.Schema({
    fighter_slot: Boolean,
    aura_slot: Boolean,
    move_slot: Boolean,
    ending_slot: Boolean,
    slot_5: Boolean,
    slot_6: Boolean,
    slot_7: Boolean,
    slot_8: Boolean,
    slot_1: Boolean,
    slot_2: Boolean,
    slot_3: Boolean,
    slot_4: Boolean,
}, { _id: false });

const ownerSchema = new mongoose.Schema({
    name: { type: String, required: true },
    p_id: { type: String, required: true }
}, { _id: false })

const watcherSchema = new mongoose.Schema({
    name: { type: String, required: true },
}, { _id: false })

const playerSchema = new mongoose.Schema({
    name: { type: String, required: true },
    hp: { type: Number, required: true },
    mainDeck: { type: [cardSchema], default: [] },
    pluckDeck: { type: [cardSchema], default: [] },
    hand: { type: [cardSchema], default: [] },
    ownership: { type: [cardSchema], default: [] },
    mainDiscard: { type: [cardSchema], default: [] },
    pluckDiscard: { type: [cardSchema], default: [] },
    playArea: { type: playAreaSchema },
    activePluck: { type: activePluckSchema },
    focus: { type: Number, default: 0 },
    enthusiasm: { type: Number, default: 0 },
    mettle: { type: Number, default: 0 },
    secondWind: { type: Boolean, default: false },
    faceDown: { type: faceDownSchema },
    defending: { type: defendingSchema },
    defendingCard: { type: defendingCardSchema },
    activating: { type: activatingSchema },
    p_id: { type: String, required: true },
    g_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Game', required: true },
    _id: { type: mongoose.Types.ObjectId, required: true, auto: true }
});

const gameSchema = new mongoose.Schema({
    name: { type: String, required: true },
    owner: { type: ownerSchema, required: true },
    seats: { type: Number, required: true },
    players: { type: [mongoose.Schema.Types.ObjectId], ref: 'Player', default: [] },
    watchers: { type: [watcherSchema], default: [] },
    id: { type: String, required: true },
    _id: { type: mongoose.Types.ObjectId, required: true, auto: true }
})

const Player = mongoose.model('Player', playerSchema, 'players');
const Game = mongoose.model('Game', gameSchema, 'games');

module.exports = { Game, Player };
