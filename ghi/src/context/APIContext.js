import { createContext, useState, useEffect } from "react";


const APIContext = createContext();

const APIContextProvider = ({ children }) => {

    const [cards, setCards] = useState([])
    const [card_types, setCardTypes] = useState("")
    const [extra_effects, setExtraEffects] = useState([])
    const [reactions, setReactions] = useState([])
    const [card_tags, setCardTags] = useState([])
    const [booster_sets, setBoosterSets] = useState([])
    const [card_categories, setCardCategories] = useState([])

    const getAPIData = async() => {
        let cards_data = require('../database/cards.json').map(card =>
            {card["id"] = card._id.$oid
            return card
        })
        setCards(cards_data)
        let card_types_data = require('../database/card_types.json').map(card_type =>
            {card_type["id"] = card_type._id.$oid
            return card_type
        })
        setCardTypes(card_types_data)
        let extra_effects_data = require('../database/extra_effects.json').map(extra_effect =>
            {extra_effect["id"] = extra_effect._id.$oid
            return extra_effect
        })
        setExtraEffects(extra_effects_data)
        let card_tags_data = require('../database/card_tags.json').map(card_tag =>
            {card_tag["id"] = card_tag._id.$oid
            return card_tag
        })
        setCardTags(card_tags_data)
        let reactions_data = require('../database/reactions.json').map(reaction =>
            {reaction["id"] = reaction._id.$oid
            return reaction
        })
        setReactions(reactions_data)
        let booster_sets_data = require('../database/booster_sets.json').map(booster_set =>
            {booster_set["id"] = booster_set._id.$oid
            return booster_set
        })
        setBoosterSets(booster_sets_data)
        let card_categories_data = require('../database/card_categories.json').map(category =>
            {category["id"] = category._id.$oid
            return category
        })
        setCardCategories(card_categories_data)
    }

    useEffect(() => {
        getAPIData();
    }, []);

    return (
        <APIContext.Provider value={{
            getAPIData,
            cards,
            card_types,
            extra_effects,
            card_tags,
            reactions,
            booster_sets,
            }}>
            {children}
        </APIContext.Provider>
    );
};

export { APIContext, APIContextProvider };
