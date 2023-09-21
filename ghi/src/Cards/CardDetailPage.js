import {
    Container,
} from "react-bootstrap";
import { useState, useEffect, useContext } from "react";
import { NavLink, useParams, useNavigate} from 'react-router-dom';
import CardEditModal from "./CardEditModal";
import RelatedCardModal from "./RelatedCardModal";
import BackButton from "../display/BackButton";
import { AuthContext } from "../context/AuthContext";
import ImageWithoutRightClick from "../display/ImageWithoutRightClick";


function CardDetailPage() {

    const {card_number} = useParams();
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
    const [relatedCards, setRelatedCards] = useState([]);
    const [card_type, setCardType] = useState("")
    const [extra_effects, setExtraEffects] = useState([])
    const [reactions, setReactions] = useState([])
    const [card_tags, setCardTags] = useState([])

    const [cards, setCards] = useState([]);

    const { account } = useContext(AuthContext)

    const getCard = async() =>{
        const response = await fetch(`${process.env.REACT_APP_FASTAPI_SERVICE_API_HOST}/api/cards/${card_number}/`);
        const cardData = await response.json();

        cardData["seriesNames"] = cardData.series_name.split("//")
        cardData["effectText"] = cardData.effect_text.split("//")
        if (cardData.second_effect_text){
            cardData["secondEffectText"] = cardData.second_effect_text.split("//")
        }
        setCard(cardData);
    };

    const getRelatedCards = async() =>{
        const response = await fetch(`${process.env.REACT_APP_FASTAPI_SERVICE_API_HOST}/api/cards/${card_number}/related_cards/`);
        const relatedData = await response.json();

        setRelatedCards(relatedData.cards.sort((a,b) => a.card_number - b.card_number));
    };

    const getCardType = async() =>{
        const response = await fetch(`${process.env.REACT_APP_FASTAPI_SERVICE_API_HOST}/api/cards/${card_number}/get_card_type/`);
        const cardTypeData = await response.json();

        setCardType(cardTypeData);
    };

    const getExtraEffects = async() =>{
        const response = await fetch(`${process.env.REACT_APP_FASTAPI_SERVICE_API_HOST}/api/cards/${card_number}/get_extra_effects/`);
        const extraEffectData = await response.json();

        setExtraEffects(extraEffectData);
    };

    const getReactions = async() =>{
        const response = await fetch(`${process.env.REACT_APP_FASTAPI_SERVICE_API_HOST}/api/cards/${card_number}/get_reactions/`);
        const reactionData = await response.json();
        reactionData.map(reaction => reaction["rules"] = reaction["rules"].replace("{count}", reaction["count"].toString()))
        setReactions(reactionData);
    };

    const getCardTags = async() =>{
        const response = await fetch(`${process.env.REACT_APP_FASTAPI_SERVICE_API_HOST}/api/cards/${card_number}/get_tags/`);
        const cardTagData = await response.json();

        setCardTags(cardTagData);
    };

    const getCards = async() =>{
        const response = await fetch(`${process.env.REACT_APP_FASTAPI_SERVICE_API_HOST}/api/cards/`);
        const data = await response.json();

        setCards(data.cards.reverse());
    };

    const navigate = useNavigate()

    const getRandomCard = async() =>{
        const randomIndex = Math.floor(Math.random() * cards.length);
        const randomCard = cards[randomIndex].card_number;
        navigate(`/cards/${randomCard}`);
    }

    useEffect(() => {
        getCard();
        getRelatedCards();
        getCardType();
        getExtraEffects();
        getReactions();
        getCardTags();
        getCards();
        document.title = "Cards - PM CardBase"
        return () => {
            document.title = "PlayMaker CardBase"
        };
    }, [card_number]);

    return (
        <div className="white-space">
            <div className="cd-container">
                <div className="cd-container-child" style={{width: "40%"}}>
                    <div className="cd-inner">
                        <img
                            className="cd-card"
                            src={card.picture_url ? card.picture_url : "https://i.imgur.com/krY25iI.png"}
                            alt={card.name}/>
                    </div>
                    <div style={{margin: "5% 0%"}}>
                            <h1 className="centered-h1">Related Cards</h1>
                        <div className="cd-inner">
                            <div className="cd-inner card-list3" style={{width: "480px"}}>
                                {relatedCards.slice(0,6).map((relatedCard) => {
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
                            {relatedCards.length > 6?
                                <RelatedCardModal/>: null
                            }
                            { account && account.roles.includes("admin")?
                                null:
                                <BackButton
                                    className="left button100 heightNorm"
                                    style={{marginLeft: "5%", textAlign: "center"}}
                                />
                            }
                        </div>
                    </div>
                </div>
                <div className="cd-container-child" style={{width: "55%", marginLeft: "3%"}}>
                    <div className="cd-inner2">
                    <h1 >{card.name}</h1>
                        <div>
                            <div className="cd-info">
                                <div className={card.card_class ? card.card_class : "NoClass"}>
                                    <h4 style={{fontWeight: "600", margin: "10px 0px 0px 12px"}}>Type</h4>
                                        <h5 title={card_type.rules}
                                            style={{fontWeight: "400", margin: "18px 12px"}}
                                            >{card_type.name} *</h5>
                                </div>
                                <div className={card.card_class ? card.card_class : "NoClass"}>
                                    <h4 style={{fontWeight: "600", margin: "10px 0px 0px 12px"}}>Class</h4>
                                        <h5 style={{fontWeight: "400", margin: "18px 12px"}}>{card.card_class ? card.card_class : "n/a"}</h5>
                                </div>
                                <div className={card.card_class ? card.card_class : "NoClass"}>
                                    <h4 style={{fontWeight: "600", margin: "10px 0px 0px 12px"}}>Reactions</h4>
                                    {reactions.length ? (
                                        reactions.map((reaction) => (
                                        <h5 title={reaction.rules} style={{fontWeight: "400", margin: "18px 12px"}} key={reaction.name}>
                                            {reaction.name} {reaction.count} *
                                        </h5>
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
                                    {card_tags.map((card_tag) => {
                                            return (
                                                <h5 title={card_tag.rules}
                                                    style={{fontWeight: "400", margin: "18px 12px"}}>
                                                        {
                                                            card_tag.id === "641292cf38b70f477bb72e6f" ?
                                                            card_tag.name : card_tag.name + " *"}
                                                </h5>
                                            );
                                        })}
                                </div>
                                <div className={card.card_class ? card.card_class : "NoClass"}>
                                    <h4 style={{fontWeight: "600", margin: "10px 0px 0px 12px"}}>Series</h4>
                                        {card.seriesNames.map((line) =>
                                        <h5 style={{fontWeight: "400", margin: "18px 12px"}}>
                                            {line}</h5>)}
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

                                    {/* <h5 style={{fontWeight: "400", margin: "18px 12px"}}>{card.effect_text}</h5> */}
                                    {card.second_effect_text && (
                                        <div className="borderBlack">

                                        {card.secondEffectText.map((line) =>
                                            <h5 style={{fontWeight: "400", margin: "18px 12px"}}>
                                                {line}</h5>)}

                                            {/* <h5 className="borderBlack"
                                                style={{fontWeight: "600", margin: "18px 10px 18px 10px"}}>{card.second_effect_text}</h5> */}
                                        </div>
                                    )}
                                    {extra_effects.length ? (
                                    <>
                                        <h4 style={{fontWeight: "600", margin: "12px"}}>Extra Effect Types</h4>
                                        <div className="borderBlack" style={{display:"flex"}}>
                                            {extra_effects.map((extra_effect) => (

                                                <h5 title={extra_effect.rules}
                                                    style={{fontWeight: "400",
                                                        height: "22px",
                                                        margin: "0px 5px 20px 15px"}}>
                                                    {extra_effect.name} *</h5>
                                            ))}
                                        </div>
                                    </>
                                    ) : null}
                                </div>
                            </div>
                        </div>
                        <div>
                            { account && account.roles.includes("admin")?
                                <Container style={{margin: "2% 0%", width: "662px"}}>
                                    <div style={{display: "flex", marginBottom: ".75%"}}>
                                        <CardEditModal/>
                                        <BackButton
                                            className="left button100 heightNorm"
                                            style={{marginLeft: "5%", textAlign: "center"}}
                                        />
                                    </div>
                                </Container>:
                            null}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CardDetailPage;
