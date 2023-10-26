import { useState, useEffect, useContext } from "react";
import { NavLink, useParams, useNavigate} from 'react-router-dom';
import RelatedCardModal from "./RelatedCardModal";
import BackButton from "../display/BackButton";
import cards from "../database/cards.json";
import card_types from "../database/card_types.json";
import card_tags from "../database/card_tags.json";
import extra_effects from "../database/extra_effects.json";
import reactions from "../database/reactions.json";
import card_categories from "../database/card_categories.json";
import ImageWithoutRightClick from "../display/ImageWithoutRightClick";


function CardDetailPage() {
    const { card_number } = useParams()

    const [card, setCard] = useState({
        name: "",
        card_class: "",
        hero_id: "",
        series_name: "",
        seriesNames: [],
        card_number: "",
        enthusiasm: "",
        effect_text: "",
        second_effect_text: "",
        effectText: [],
        secondEffectText: [],
        illustrator: "",
        picture_url: "",
        file_name: "",
        card_type: [],
        extra_effects: [],
        reactions: [],
        card_tags: [],
    });

    const getCard = async() =>{

        const cardData = cards.find(card => card.card_number.toString() === card_number)
        console.log(cards)
        cardData["seriesNames"] = cardData.series_name.split("//")
        cardData["effectText"] = cardData.effect_text.split("//")
        if (cardData.second_effect_text){
            cardData["secondEffectText"] = cardData.second_effect_text.split("//")
        }
        setCard(cardData);
    };

    const relatedCardsList = cards?.filter(relatedCard => (card?.hero_id === relatedCard.hero_id) && relatedCard.card_number !== card.card_number)
    relatedCardsList.sort((a,b) => a.card_number - b.card_number)

    const card_type = card_types.find(card_type => card?.card_type[0] === card_type?.type_number)

    const extra_effects_list = []
    for (let extra_effect of extra_effects) {
        if (card.extra_effects.includes(extra_effect.effect_number) ) {
            console.log(extra_effect)
            extra_effects_list.push(extra_effect)
        }
    }

    const reaction_counts = {}
    for (let reaction_number of card.reactions) {
        const reaction = reactions.find(reaction => reaction.reaction_number === reaction_number)
        console.log(reaction)
            !reaction_counts[reaction.name]?
                reaction_counts[reaction.name] = {
                    info: reaction,
                    count: 1,

                }:
                reaction_counts[reaction.name]["count"]++

        console.log(reaction_counts)
    }

    const reactions_list = Object.values(reaction_counts)

    const reactionRules = (reaction) => {
        const rules = reaction.info.rules.replace("{count}", reaction.count.toString())
        return rules
    }

    const card_tags_list = []
    for (let card_tag of card_tags) {
        console.log(card_tag)
        if (card.card_tags.includes(card_tag.tag_number) ) {
            card_tags_list.push(card_tag)
        }
    }

    const navigate = useNavigate()

    const getRandomCard = async() =>{
        const randomIndex = Math.floor(Math.random() * cards.length);
        const randomCard = cards[randomIndex].card_number;
        navigate(`/cards/${randomCard}`);
    }

    useEffect(() => {
        window.scroll(0, 0);
        getCard();
        console.log(reactions_list)
        document.title = "Cards - PM CardBase"
        return () => {
            document.title = "PlayMaker CardBase"
        };
    }, [card_number]);

    const matchSeries = (line) => {
        const cardCategory = card_categories?.find(category => category.name === line)
        console.log(card_categories)
        return cardCategory?.id
    };

    const matchClass = (card_class) => {
        const cardCategory = card_categories?.find(category => category.name === card_class)
        console.log(card_categories)
        return cardCategory?.id
    }

    return (
        <div className="white-space">
            <div className="cd-container between-space">
                <div className="cd-container-child wide40">
                    <div className="cd-inner media-display">
                        <h1 className="hidden2 media-display media-center">{card.name}</h1>
                        <img
                            className="cd-card wide100"
                            src={card.picture_url ? card.picture_url : "https://i.imgur.com/krY25iI.png"}
                            alt={card.name}/>
                    </div>
                    <div className="none" style={{margin: "5% 0%"}}>
                            <h1 className="centered-h1">Related Cards</h1>
                        <div className="cd-inner">
                            <div className="cd-inner card-list3" style={{width: "480px"}}>
                                {relatedCardsList.slice(0,6).map((relatedCard) => {
                                    return (
                                        <NavLink to={`/cards/${relatedCard.card_number}`}>
                                                <img
                                                    className="cd-related-card"
                                                    title={relatedCard.name}
                                                    src={relatedCard.picture_url ? relatedCard.picture_url : "https://i.imgur.com/krY25iI.png"}
                                                    alt={relatedCard.name}/>
                                        </NavLink>
                                    );
                                })}
                            </div>
                        </div>
                        <div className="cd-inner" style={{marginTop: "3%"}}>
                            <button
                                className="left button100 heightNorm"
                                style={{ textAlign: "center"}}
                                onClick={getRandomCard}
                            >
                                Random Card
                            </button>
                            {relatedCardsList.length > 6?
                                <RelatedCardModal/>: null
                            }

                        </div>
                    </div>
                </div>
                <div className="cd-container-child wide55 margin-left-3P">
                    <div className="cd-inner2 media-display">
                    <h1 className="none">{card.name}</h1>
                        <div>
                            <div className="cd-info">
                                <div className={card.card_class ? card.card_class : "NoClass"}>
                                    <h4 style={{fontWeight: "600", margin: "10px 0px 0px 12px"}}>Type</h4>
                                    <NavLink to={`/cardtypes/${card_type?.id}`} className="nav-link2 glow2">
                                            <h5 title={card_type?.rules}
                                                style={{fontWeight: "400", margin: "18px 12px"}}
                                                >{card_type?.name} *
                                            </h5>
                                    </NavLink>
                                </div>
                                <div className={card.card_class ? card.card_class : "NoClass"}>
                                    <h4 style={{fontWeight: "600", margin: "10px 0px 0px 12px"}}>Class</h4>
                                    { card.card_class?
                                        <NavLink to={`/cardcategories/${matchClass(card.card_class)}`} className="nav-link2 glow2">
                                            <h5 style={{fontWeight: "400", margin: "18px 12px"}}>{card.card_class ? `${card.card_class} *` : "n/a"}</h5>
                                        </NavLink>:
                                        <h5 style={{fontWeight: "400", margin: "18px 12px"}}>{card.card_class ? card.card_class : "n/a"}</h5>
                                    }
                                </div>
                                <div className={card.card_class ? card.card_class : "NoClass"}>
                                    <h4 style={{fontWeight: "600", margin: "10px 0px 0px 12px"}}>Reactions</h4>
                                    {reactions_list.length ? (
                                        reactions_list.map((reaction) => (
                                            <NavLink to={`/reactions/${reaction.info.id}`} className="nav-link2 glow2">
                                                <h5 title={reactionRules(reaction)} style={{fontWeight: "400", margin: "18px 12px"}} key={reaction.info.name}>
                                                    {reaction.info.name} {reaction.count} *
                                                </h5>
                                            </NavLink>
                                        ))
                                    ) : (
                                        <h5 style={{fontWeight: "400", margin: "18px 12px"}}>n/a</h5>
                                    )}
                                </div>
                                <div className={card.card_class ? card.card_class : "NoClass"}>
                                    <h4 style={{fontWeight: "600", margin: "10px 0px 0px 12px"}}>Enthusiasm</h4>
                                        <h5 style={{fontWeight: "400", margin: "18px 12px"}}>{card.enthusiasm ? card.enthusiasm : "n/a"}</h5>
                                </div>
                                <div className={card.card_class ? card.card_class : "NoClass"}>
                                    <h4 style={{fontWeight: "600", margin: "10px 0px 0px 12px"}}>Tags</h4>
                                    {card_tags_list[0]?.tag_number !== 1000?
                                        <>
                                            {card_tags_list.map((card_tag) => {
                                                return (
                                                    <NavLink to={`/cardtags/${card_tag.id}`} className="nav-link2 glow2">
                                                        <h5 title={card_tag.rules}
                                                            style={{fontWeight: "400", margin: "18px 12px"}}>
                                                                {
                                                                    card_tag.tag_number === "1000" ?
                                                                    card_tag.name : card_tag.name + " *"}
                                                        </h5>
                                                    </NavLink>

                                                );
                                            })}
                                        </>:
                                            <h5 style={{fontWeight: "400", margin: "18px 12px"}}>
                                                {card_tags_list[0].name}
                                            </h5>
                                    }

                                </div>
                                <div className={card.card_class ? card.card_class : "NoClass"}>
                                    <h4 style={{fontWeight: "600", margin: "10px 0px 0px 12px"}}>Series</h4>
                                        {card.seriesNames.map((line) =>
                                            <NavLink to={`/cardcategories/${matchSeries(line)}`} className="nav-link2 glow2">
                                                <h5 style={{fontWeight: "400", margin: "18px 12px"}}>
                                                {line} *</h5>
                                            </NavLink>)
                                        }
                                </div>
                                <div className={card.card_class ? card.card_class : "NoClass"}>
                                    <h4 style={{fontWeight: "600", margin: "10px 0px 0px 12px"}}>Card Number</h4>
                                        <h5 style={{fontWeight: "400", margin: "18px 12px"}}>{card.card_number}</h5>
                                </div>
                                <div className={card.card_class ? card.card_class : "NoClass"}>
                                    <h4 style={{fontWeight: "600", margin: "10px 0px 0px 12px"}}>Hero ID</h4>
                                        <h5 style={{fontWeight: "400", margin: "18px 12px"}}>{card.hero_id}</h5>
                                </div>
                                <div className={card.card_class ? card.card_class : "NoClass"}>
                                    <h4 style={{fontWeight: "600", margin: "10px 0px 0px 12px"}}>Illustrator</h4>
                                        <h5 style={{fontWeight: "400", margin: "18px 12px"}}>{card.illustrator}</h5>
                                </div>
                            </div>
                        </div>
                        <div>
                            <div>
                                <div className={card.card_class ? `big${card.card_class}` : "bigNoClass"}>
                                    <h4 style={{fontWeight: "600", margin: "12px"}}>Card Effect</h4>

                                    {card.effectText.map((line) =>
                                        <h5 style={{fontWeight: "400", margin: "18px 12px"}}>
                                            {line}</h5>)}


                                    {card.second_effect_text && (
                                        <div className="borderBlack">

                                        {card.secondEffectText.map((line) =>
                                            <h5 style={{fontWeight: "400", margin: "18px 12px"}}>
                                                {line}</h5>)}


                                        </div>
                                    )}
                                    {extra_effects_list.length ? (
                                    <>
                                        <h4 style={{fontWeight: "600", margin: "12px"}}>Extra Effect Types</h4>
                                        <div className="borderBlack" style={{display:"flex"}}>
                                            {extra_effects_list.map((extra_effect) => (
                                                <NavLink to={`/extraeffects/${extra_effect.id}`} className="nav-link2 glow2">
                                                    <h5 title={extra_effect.rules}
                                                        style={{fontWeight: "400",
                                                        height: "22px",
                                                        margin: "0px 5px 20px 15px"}}>
                                                        {extra_effect.name} *
                                                    </h5>
                                                </NavLink>
                                            ))}
                                        </div>
                                    </>
                                    ) : null}
                                </div>
                            </div>
                        </div>
                        <div className="hidden2 media-display">
                            <div style={{margin: "5% 0%"}}>
                                <h1 className="centered-h1">Related Cards</h1>
                                <div className="cd-inner">
                                    <div className="cd-inner card-pool-fill3">
                                        {relatedCardsList.slice(0,6).map((relatedCard) => {
                                            return (
                                                <NavLink to={`/cards/${relatedCard.card_number}`}>
                                                        <img
                                                            className="cd-related-card"
                                                            title={relatedCard.name}
                                                            src={relatedCard.picture_url ? relatedCard.picture_url : "https://i.imgur.com/krY25iI.png"}
                                                            alt={relatedCard.name}/>
                                                </NavLink>
                                            );
                                        })}
                                    </div>
                                </div>
                                <div className="cd-inner" style={{marginTop: "3%"}}>
                                    <button
                                        className="left button100 heightNorm"
                                        style={{ textAlign: "center"}}
                                        onClick={getRandomCard}
                                    >
                                        Random Card
                                    </button>
                                    {relatedCardsList.length > 6?
                                        <RelatedCardModal relatedCardsList={relatedCardsList}/>: null
                                    }

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CardDetailPage;
