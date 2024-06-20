const mongoose = require('mongoose');


const dateDetailSchema = new mongoose.Schema({
    year: { type: Number },
    month: { type: Number },
    day: { type: Number },
    time: { type: String },
    full_time: { type: String }
}, { _id: false });

const cardSchema = new mongoose.Schema(
    {
        name: { type: String },
        card_class: { type: String },
        hero_id: { type: String },
        series_name: { type: String },
        card_number: { type: Number },
        enthusiasm: { type: Number },
        effect_text: { type: String },
        second_effect_text: { type: String },
        illustrator: { type: String },
        picture_url: { type: String },
        file_name: { type: String },
        card_type: { type: [Number] },
        extra_effects: { type: [Number] },
        reactions: { type: [Number] },
        card_tags: { type: [Number] },
        created_on: { type: dateDetailSchema },
        updated_on: { type: dateDetailSchema },
        alpha: { type: Boolean },
        beta: { type: Boolean },
        id: { type: String },
        _id: { type: mongoose.Types.ObjectId, required: true, auto: true }
    }
);

const Card = mongoose.model("Card", cardSchema, "cards")

module.exports = {
    Card,
    cardSchema
};
