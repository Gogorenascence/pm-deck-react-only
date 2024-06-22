const mongoose = require('mongoose');


const dateDetailSchema = new mongoose.Schema({
    year: { type: Number },
    month: { type: Number },
    day: { type: Number },
    time: { type: String },
    full_time: { type: String }
}, { _id: false });

const deckSchema = new mongoose.Schema(
    {
        name: { type: String },
        account_id: { type: String },
        description: { type: String },
        strategies: { type: [String] },
        cards: { type: [Number] },
        pluck: { type: [Number] },
        side: { type: [Number] },
        views: { type: Number },
        created_on: { type: dateDetailSchema },
        updated_on: { type: dateDetailSchema },
        cover_card: { type: String },
        parent_id: { type: String },
        card_names: { type: [String] },
        series_names: { type: [String] },
        private: { type: Boolean },
        creator: { type: String },
        id: { type: String },
        _id: { type: mongoose.Types.ObjectId, required: true, auto: true }
    }
);

const Deck = mongoose.model("Deck", deckSchema, "decks")

module.exports = {
    Deck
};
