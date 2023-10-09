import {
    Button,
    Modal,
} from "react-bootstrap";
import { useParams, NavLink} from 'react-router-dom';
import React, { useState, useEffect } from 'react'
import cards from "../database/cards.json";


function RelatedCardModal() {
    const { card_number } = useParams()
    const [card, setCard] = useState("")
    const getCard = async() =>{
        const cardData = cards.find(card => card.card_number.toString() === card_number)
        console.log(cards)
        setCard(cardData);
    };

    const relatedCardsList = cards?.filter(relatedCard => (card?.hero_id === relatedCard.hero_id) && relatedCard.card_number !== card.card_number)
    relatedCardsList.sort((a,b) => a.card_number - b.card_number)

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => {
        setShow(true)
    };

    useEffect(() => {
        getCard();
    }, [card_number]);

    return (

        <div>
            <button
                className="left button100 heightNorm"
                style={{ textAlign: "center"}}
                    onClick={handleShow}>
                    Show all Cards
            </button>
            <Modal
                show={show}
                size="xl"
                onHide={handleClose}
                keyboard={false}
                className="topbar"
            >
                <Modal.Body closeButton>
                <h1 className="centered-h1"
                    style={{color: "black"}}>Related Cards</h1>
                <div className="cd-inner2 card-pool-fill2">
                    {relatedCardsList?.map((relatedCard) => {
                        return (
                            <NavLink to={`/cards/${relatedCard.card_number}`}>
                                    <img
                                        className="cd-related-card"
                                        title={relatedCard.name}
                                        src={relatedCard.picture_url ? relatedCard.picture_url : "logo4p.png"}
                                        alt={relatedCard.name}/>
                            </NavLink>
                        );
                    })}
                </div>
                <div className="cd-inner">
                    <button onClick={handleClose}>
                        Close
                    </button>
                </div>
                </Modal.Body>
            </Modal>
        </div>
    );
}


export default RelatedCardModal;
