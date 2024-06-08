const mongoose = require('mongoose');
const { Schema } = mongoose;

const dateDetailSchema = new Schema({
    year: { type: Number, required: true },
    month: { type: Number, required: true },
    day: { type: Number, required: true },
    time: { type: String, required: true },
    full_time: { type: String, required: true }
}, { _id: false });

const cardSchema = new Schema(
    {
        name: { type: String, required: true },
        card_class: { type: String, required: true },
        hero_id: { type: String, required: true },
        series_name: { type: String, required: true },
        card_number: { type: Number, required: true },
        enthusiasm: { type: Number },
        effect_text: { type: String },
        second_effect_text: { type: String },
        illustrator: { type: String },
        picture_url: { type: String },
        file_name: { type: String, required: true },
        card_type: { type: [Number], required: true },
        extra_effects: { type: [Number], required: true },
        reactions: { type: [Number], required: true },
        card_tags: { type: [Number], required: true },
        created_on: { type: dateDetailSchema, required: true },
        updated_on: { type: dateDetailSchema },
        alpha: { type: Boolean },
        beta: { type: Boolean },
        id: { type: String },
        _id: { type: mongoose.Types.ObjectId, required: true, auto: true }
    },
    {collection: "cards"}
);

const Card = mongoose.model("Card", cardSchema)

module.exports = {
    Card
};
