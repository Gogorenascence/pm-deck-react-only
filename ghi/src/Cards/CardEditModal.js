import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect, useContext } from 'react'
import { AppContext } from "../context/AppContext";
import helper from '../QueryObjects/Helper';


function CardEditModal({
    cardData,
    cardTypes,
    cardTags,
    extraEffects,
    reactionsData
}) {
    const {isDark} = useContext(AppContext)

    const [card, setCard] = useState({
        name: "",
        card_class: "",
        hero_id: "",
        series_name: "",
        card_number: "",
        enthusiasm: "",
        effect_text: "",
        second_effect_text: "",
        illustrator: "",
        picture_url: "",
        file_name: "",
        card_type: [],
        extra_effects: [],
        reactions: [],
        card_tags: [],
    });

    const [cardRef, setCardRef] = useState()
    const [card_type, setCardType] = useState([]);
    const [extra_effects, setExtraEffects] = useState([]);
    const [reactions, setReactionsData] = useState([]);
    const [card_tags, setCardTags] = useState([]);

    const [cardTypeList, setCardTypeList] = useState([]);
    const [extraEffectList, setExtraEffectList] = useState([]);
    const [reactionList, setReactionList] = useState([]);
    const [cardTagList, setCardTagList] = useState([]);

    const [cardTypeInput, setCardTypeInput] = useState("");
    const [extraEffectInput, setExtraEffectInput] = useState("");
    const [reactionInput, setReactionInput] = useState("");
    const [cardTagInput, setCardTagInput] = useState("");

    const [showComps, setShowComps] = useState(false);

    const [show, setShow] = useState(false);

    const handleClose = async() => {
        setShow(false)
        document.body.style.overflow = 'auto';
    };
    const handleShow = async() => {
        setShow(true)
        document.body.style.overflow = 'hidden';
    };

    const getCard = async() =>{
        setCard(cardData)
        setCardRef(cardData)
        setCardType(cardData.card_type)
        setExtraEffects(cardData.extra_effects)
        setReactionsData(cardData.reactions)
        setCardTags(cardData.card_tags)
    };

    const getExtraData = async() =>{
        setCardTypeList(cardTypes.sort((a,b) => a.type_number - b.type_number));
        setExtraEffectList(extraEffects.sort((a,b) => a.effect_number - b.effect_number));
        setReactionList(reactionsData.sort((a,b) => a.reaction_number - b.reaction_number));
        setCardTagList(cardTags.sort((a,b) => a.tag_number - b.tag_number));
    };

    useEffect(() => {
        getCard();
        getExtraData();
    // eslint-disable-next-line
    }, [show]);

    const handleChange = (event) => {
        setCard({ ...card, [event.target.name]: event.target.value });
        console.log(card)
        console.log(cardRef)
    };

    const handleShowComps = (event) => {
        setShowComps(!showComps);
    };

    const handleAddCardType = () => {
        if (cardTypeInput) {
            setCardType([...card_type, parseInt(cardTypeInput, 10)]);
            setCardTypeInput("");
            console.log(card_type)
        }
    };

    const nameCardType = (cardType) => {
        if (cardType === 1001) {
            return "Fighter";
        } else if (cardType === 1002) {
            return "Aura";
        } else if (cardType === 1003) {
            return "Move";
        } else if (cardType === 1004) {
            return "Ending";
        } else if (cardType === 1005) {
            return "Any Type";
        } else if (cardType === 1006) {
            return "Item";
        } else if (cardType === 1007) {
            return "Event";
        } else if (cardType === 1008) {
            return "Comeback";
        }
    }

    const handleRemoveCardType = (index) => {
        const updatedCardType = [...card_type];
        updatedCardType.splice(index, 1);
        setCardType(updatedCardType);
    };

    const handleAddExtraEffect = () => {
        if (extraEffectInput) {
            setExtraEffects([...extra_effects, parseInt(extraEffectInput, 10)]);
            setExtraEffectInput("");
            console.log(extra_effects)
        }
    };

    const nameExtraEffect = (extra_effect) => {
        if (extra_effect === 1001) {
            return "Trigger";
        } else if (extra_effect === 1002) {
            return "Critical";
        } else if (extra_effect === 1003) {
            return "Limited";
        }
    }

    const handleRemoveExtraEffect = (index) => {
        const updatedExtraEffects = [...extra_effects];
        updatedExtraEffects.splice(index, 1);
        setExtraEffects(updatedExtraEffects);
    };

    const handleAddReaction = () => {
        if (reactionInput) {
            setReactionsData([...reactions, parseInt(reactionInput, 10)]);
            setReactionInput("");
            console.log(reactions)
        }
    };

    const nameReaction = (reaction) => {
        if (reaction === 1001) {
            return "Block";
        } else if (reaction === 1002) {
            return "Counter";
        } else if (reaction === 1003) {
            return "Endure";
        } else if (reaction === 1004) {
            return "Redirect";
        }
    }

    const handleRemoveReaction = (index) => {
        const updatedReactions = [...reactions];
        updatedReactions.splice(index, 1);
        setReactionsData(updatedReactions);
    };

    const handleAddCardTag = () => {
        if (cardTagInput) {
            setCardTags([...card_tags, parseInt(cardTagInput, 10)]);
            setCardTagInput("");
            console.log(card_tags)
        }
    };

    const nameCardTag = (cardTag) => {
        if (cardTag === 1001) {
            return "5 HP";
        } else if (cardTag === 1002) {
            return "Focus";
        } else if (cardTag === 1003) {
            return "Auto";
        } else if (cardTag === 1004) {
            return "Stay";
        } else if (cardTag === 1005) {
            return "Max 1";
        } else if (cardTag === 1006) {
            return "Cycle";
        } else if (cardTag === 1007) {
            return "Hit 1";
        }else if (cardTag === 1000) {
            return "n/a";
        }
    }

    const handleRemoveCardTag = (index) => {
        const updatedCardTags = [...card_tags];
        updatedCardTags.splice(index, 1);
        setCardTags(updatedCardTags);
    };

    const navigate = useNavigate()

    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = {...card};
        const update = {}
        data["card_number"] = parseInt(card["card_number"], 10);
        data["enthusiasm"] = card.enthusiasm? parseInt(card["enthusiasm"], 10): null
        data["card_type"] = card_type
        data["extra_effects"] = extra_effects
        data["reactions"] = reactions
        data["card_tags"] = card_tags
        for (let key in data) {
            if (data[key] !== cardRef[key]) {
                update[key] = data[key]
            }
        }
        update["updated_on"] = helper.createTimeObj2()
        // console.log(update)
        const cardUrl = `https://pm-deck-react-only.onrender.com/cards${card.card_number}/`;
        const fetchConfig = {
            method: "PATCH",
            body: JSON.stringify(update),
            headers: {
                "Content-Type": "application/json",
            },
        };

        const response = await fetch(cardUrl, fetchConfig);
        if (response.ok) {
            await response.json();
            handleClose()
            navigate(`/cards/`)
        } else {
            alert("Error in updating card");
        }
    };

    const handleClear = (async (event) => {
        event.preventDefault();
        setCard({
            name: "",
            card_class: "",
            hero_id: "",
            series_name: "",
            card_number: "",
            enthusiasm: "",
            effect_text: "",
            second_effect_text: "",
            illustrator: "",
            picture_url: "",
            file_name: "",
            card_type: [],
            extra_effects: [],
            reactions: [],
            card_tags: [],
        });
        setCardType([]);
        setExtraEffects([]);
        setReactionsData([]);
        setCardTags([]);
    });


    return (

        <div>
            <button className="left red" onClick={handleShow}>
                Edit Card
            </button>
            { show?
                <>
                    <div
                        className={!isDark? "topbar large-modal edit-modal":"topbar large-modal-dark topbar edit-modal"}
                    >
                        <h1>Card Edit</h1>

                        <div className="flex-content media-display">
                            <div className="create-section">
                                <div>
                                    <h5 className="label">Name </h5>
                                    <input
                                        className="builder-input"
                                        type="text"
                                        placeholder=" Card Name"
                                        onChange={handleChange}
                                        name="name"
                                        value={card.name}>
                                    </input>
                                </div>
                                <div>
                                    <h5 className="label">Hero ID</h5>
                                    <input
                                        className="builder-input"
                                        type="text"
                                        placeholder=" Hero ID"
                                        onChange={handleChange}
                                        name="hero_id"
                                        value={card.hero_id}>
                                    </input>
                                </div>
                                <div>
                                    <h5 className="label">Series </h5>
                                    <input
                                        className="builder-input"
                                        type="text"
                                        placeholder=" Series"
                                        onChange={handleChange}
                                        name="series_name"
                                        value={card.series_name}>
                                    </input>
                                </div>
                                <div>
                                    <h5 className="label">Card Number </h5>
                                    <input
                                        className="builder-input"
                                        type="number"
                                        placeholder=" Card Number"
                                        onChange={handleChange}
                                        name="card_number"
                                        value={card.card_number}>
                                    </input>
                                </div>
                                <div>
                                    <h5 className="label">Illustrator </h5>
                                    <input
                                        className="builder-input"
                                        type="text"
                                        placeholder=" Illustrator"
                                        onChange={handleChange}
                                        name="illustrator"
                                        value={card.illustrator}>
                                    </input>
                                </div>
                                <div>
                                    <h5 className="label">Picture Url </h5>
                                    <input
                                        className="builder-input"
                                        type="text"
                                        placeholder=" Picture Url"
                                        onChange={handleChange}
                                        name="picture_url"
                                        value={card.picture_url}>
                                    </input>
                                </div>
                                <div>
                                    <h5 className="label">File Name </h5>
                                    <input
                                        className="builder-input"
                                        type="text"
                                        placeholder=" File Name"
                                        onChange={handleChange}
                                        name="file_name"
                                        value={card.file_name}>
                                    </input>
                                </div>
                            </div>
                            <div className="create-section">
                                <div>
                                    <h5 className="label">Card Class </h5>
                                    <select
                                        className="builder-input"
                                        type="text"
                                        placeholder=" Class"
                                        onChange={handleChange}
                                        name="card_class"
                                        value={card.card_class}>
                                        <option value="">Class</option>
                                        <option value="Staunch">Staunch</option>
                                        <option value="Power">Power</option>
                                        <option value="Unity">Unity</option>
                                        <option value="Canny">Canny</option>
                                    </select>
                                </div>
                                <div>
                                    <h5 className="label">Enthusiasm </h5>
                                    <input
                                        className="builder-input"
                                        type="number"
                                        placeholder=" Enthusiasm"
                                        onChange={handleChange}
                                        name="enthusiasm"
                                        value={card.enthusiasm}>
                                    </input>
                                </div>
                                <div>
                                    <h5 className="label">Effect Text </h5>
                                    <textarea
                                        className="create-card-text"
                                        type="text"
                                        placeholder=" Effect Text"
                                        onChange={handleChange}
                                        name="effect_text"
                                        value={card.effect_text}>
                                    </textarea>
                                </div>
                                <div>
                                    <h5 className="label">Second Effect Text </h5>
                                    <textarea
                                        className="create-card-text"
                                        type="text"
                                        placeholder=" Second Effect Text"
                                        onChange={handleChange}
                                        name="second_effect_text"
                                        value={card.second_effect_text}>
                                    </textarea>
                                </div>
                            </div>
                        </div>

                        <div className="cardpool margin-top-40" style={{height: "auto"}}>
                            <div style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
                                <h2 style={{margin: "1% 0% 1% 2%", fontWeight: "700"}}
                                        >Add/Remove Card Components</h2>
                                { showComps ?
                                    <h5 className="left db-main-count" onClick={() => handleShowComps()}>
                                            &nbsp;[Hide]
                                    </h5> :
                                    <h5 className="left db-main-count" onClick={() => handleShowComps()}>
                                        &nbsp;[Show]
                                    </h5>}
                            </div>
                            <div style={{ display: "flex", justifyContent: "center", alignItems: "center"}}>
                                <div className={showComps ? "create-section" : "hidden2"}>
                                    <div>
                                        <h5 className="label">Card Type </h5>
                                        <select
                                            className="builder-input margin-bottom-20"
                                            type="text"
                                            onChange={(e) => setCardTypeInput(e.target.value)}
                                            name="card_type"
                                            value={cardTypeInput}>
                                            <option value="">Card Type</option>
                                            {cardTypeList.map((card_type) => (
                                                <option value={card_type.type_number}>{card_type.name}</option>
                                                ))}
                                        </select>
                                        <button onClick={handleAddCardType}>Add</button>
                                    </div>
                                    <div>
                                        {card_type.map((item, index) => (
                                            <h5 key={index} className="pointer" onClick={() => handleRemoveCardType(index)}>
                                            {nameCardType(item)}
                                            </h5>
                                        ))}
                                    </div>
                                    <div>
                                        <h5 className="label">Extra Effect </h5>
                                        <select
                                            className="builder-input margin-bottom-20"
                                            type="text"
                                            onChange={(e) => setExtraEffectInput(e.target.value)}
                                            name="extra_effect"
                                            value={extraEffectInput}>
                                            <option value="">Extra Effect</option>
                                            {extraEffectList.map((extra_effect) => (
                                                <option value={extra_effect.effect_number}>{extra_effect.name}</option>
                                                ))}
                                        </select>
                                        <button onClick={handleAddExtraEffect}>Add</button>
                                    </div>
                                    <div>
                                        {extra_effects.map((item, index) => (
                                            <h5 key={index} className="pointer" onClick={() => handleRemoveExtraEffect(index)}>
                                            {nameExtraEffect(item)}
                                            </h5>
                                        ))}
                                    </div>
                                </div>
                                <div className={showComps ? "create-section" : "hidden2"}>
                                    <div>
                                        <h5 className="label">Reaction </h5>
                                        <select
                                            className="builder-input margin-bottom-20"
                                            type="text"
                                            onChange={(e) => setReactionInput(e.target.value)}
                                            name="reaction"
                                            value={reactionInput}>
                                            <option value="">Reaction</option>
                                            {reactionList.map((reaction) => (
                                                <option value={reaction.reaction_number}>{reaction.name}</option>
                                                ))}
                                        </select>
                                        <button onClick={handleAddReaction}>Add</button>
                                    </div>
                                    <div>
                                        {reactions.map((item, index) => (
                                            <h5 key={index} className="pointer" onClick={() => handleRemoveReaction(index)}>
                                            {nameReaction(item)}
                                            </h5>
                                        ))}
                                    </div>
                                    <div>
                                        <h5 className="label">Tag </h5>
                                        <select
                                            className="builder-input margin-bottom-20"
                                            type="text"
                                            onChange={(e) => setCardTagInput(e.target.value)}
                                            name="card_tag"
                                            value={cardTagInput}>
                                            <option value="">Tag</option>
                                            {cardTagList.map((card_tag) => (
                                                <option value={card_tag.tag_number}>{card_tag.name}</option>
                                                ))}
                                        </select>
                                        <button onClick={handleAddCardTag}>Add</button>
                                    </div>
                                    <div>
                                        {card_tags.map((item, index) => (
                                            <h5 key={index} className="pointer" onClick={() => handleRemoveCardTag(index)}>
                                            {nameCardTag(item)}
                                            </h5>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
                            <div>
                                <button
                                    className="add-comp-button"
                                    variant="dark"
                                    onClick={handleSubmit}
                                    disabled={helper.objectsAreEqual(card, cardRef)? true: false}
                                >
                                        Save
                                </button>
                                <button
                                    className="add-comp-button"
                                    variant="dark"
                                    onClick={getCard}
                                >
                                        Reset
                                </button>
                                <button
                                    className="add-comp-button"
                                    variant="dark"
                                    onClick={handleClose}
                                >
                                        Close
                                </button>
                                <button
                                    className="add-comp-button red"
                                    variant="danger"
                                    onClick={handleClear}
                                >
                                        Clear
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="blackSpace"></div>
                </>
            :null}
        </div>
    )
}


export default CardEditModal;
