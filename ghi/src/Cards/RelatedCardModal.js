import {
    Button,
    Modal,
} from "react-bootstrap";
import { useParams, NavLink} from 'react-router-dom';
import React, { useState, useEffect } from 'react'


function RelatedCardModal(props) {

    const {relatedCardsList} = props
    const [relatedCards, setRelatedCards] = useState([]);

    console.log(relatedCards)
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => {
        setShow(true)
        getRelatedCards()
    };


    const getRelatedCards = async() => {
        setRelatedCards(relatedCardsList)
    }


    return (

        <div>
            <button
                className="left button100 heightNorm"
                style={{ textAlign: "center"}}
                    onClick={handleShow}>
                    Show all Cards
            </button>
            <Modal.Header closeButton>
            </Modal.Header>
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
                <div className="cd-inner2 card-pool-fill3">
                    {relatedCards.map((relatedCard) => {
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
