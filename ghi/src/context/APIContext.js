import { createContext, useState, useEffect } from "react";


const APIContext = createContext();

const APIContextProvider = ({ children }) => {

    const [cards, setCards] = useState([])
    const [card_types, setCardTypes] = useState("")
    const [extra_effects, setExtraEffects] = useState([])
    const [reactions, setReactions] = useState([])
    const [card_tags, setCardTags] = useState([])
    const [booster_sets, setBoosterSets] = useState([])

    const getAPIData = async() => {
        let cardsData = require('../database/cards.json').map(card =>
            {card["id"] = card._id.$oid
            return card
        })
        setCards(cardsData)
        let card_typesData = require('../database/card_types.json').map(card_type =>
            {card_type["id"] = card_type._id.$oid
            return card_type
        })
        setCardTypes(card_typesData)
        let extra_effectsData = require('../database/extra_effects.json').map(extra_effect =>
            {extra_effect["id"] = extra_effect._id.$oid
            return extra_effect
        })
        setExtraEffects(extra_effectsData)
        let card_tagsData = require('../database/card_tags.json').map(card_tag =>
            {card_tag["id"] = card_tag._id.$oid
            return card_tag
        })
        setCardTags(card_tagsData)
        let reactionsData = require('../database/reactions.json').map(reaction =>
            {reaction["id"] = reaction.$oid
            return reaction
        })
        setReactions(reactionsData)
        let booster_setsData = require('../database/booster_sets.json').map(booster_set =>
            {booster_set["id"] = booster_set._id.$oid
            return booster_set
        })
        setBoosterSets(booster_setsData)
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
