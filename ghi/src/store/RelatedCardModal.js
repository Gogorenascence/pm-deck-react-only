import { useParams, NavLink, useNavigate} from 'react-router-dom';
import React, { useState, useEffect } from 'react'


function RelatedCardModal() {

    const {card_number} = useParams();

    const [show, setShow] = useState(false);

    const handleClose = async() => {
        setShow(false)
        document.body.style.overflow = 'auto';
    };
    const handleShow = async() => {
        setShow(true)
        document.body.style.overflow = 'hidden';
    };

    const [relatedCards, setRelatedCards] = useState([]);

    const getRelatedCards = async() =>{
        const response = await fetch(`${process.env.REACT_APP_FASTAPI_SERVICE_API_HOST}/api/cards/${card_number}/related_cards/`);
        const relatedData = await response.json();

        setRelatedCards(relatedData.cards.sort((a,b) => a.card_number - b.card_number));
    };

    useEffect(() => {
        getRelatedCards();
    // eslint-disable-next-line
    }, []);

    const navigate = useNavigate()

    const selectCard = async(card) =>{
        const cards_number = card.card_number
        navigate(`/cards/${cards_number}`);
        handleClose()
    }

    return (

        <div>
            <button
                className="left button100 heightNorm"
                style={{ textAlign: "center"}}
                    onClick={handleShow}>
                    Show all Cards
            </button>
            {show?
                <div className="large-modal topbar"
                >
                    <div className="outScrollable">
                        <h1 className="centered-h1"
                            style={{color: "black"}}>Related Cards</h1>
                        <div>
                            <div className="cd-inner2 card-pool-fill">
                                {relatedCards.map((relatedCard) => {
                                    return (
                                        <img
                                            className="cd-related-modal-card pointer"
                                            onClick={() => selectCard(relatedCard)}
                                            title={relatedCard.name}
                                            src={relatedCard.picture_url ? relatedCard.picture_url : "logo4p.png"}
                                            alt={relatedCard.name}/>
                                    );
                                })}
                            </div>
                        </div>
                        <div className="cd-inner margin-top-20">
                            <button onClick={handleClose}>
                                Close
                            </button>
                        </div>
                    </div>
                </div>:null
            }
        </div>
    );
}


export default RelatedCardModal;
