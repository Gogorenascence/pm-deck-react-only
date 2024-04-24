import { useParams, NavLink, useNavigate } from 'react-router-dom';
import React, { useState, useEffect, useRef, useContext } from 'react'
import cards from "../database/cards.json";
import { AppContext } from '../Context/AppContext';


function RelatedCardModal({relatedCardsList}) {
    const { card_number } = useParams()
    const [card, setCard] = useState("")
    const content = useRef(null)
    const {isDark} = useContext(AppContext)

    useOutsideAlerter(content)
    const navigate = useNavigate()
    const getCard = async() =>{
        const cardData = cards.find(card => card.card_number.toString() === card_number)
        setCard(cardData);
    };

    // const relatedCardsList = cards?.filter(relatedCard => (card?.hero_id === relatedCard.hero_id) && relatedCard.card_number !== card.card_number)
    // relatedCardsList.sort((a,b) => a.card_number - b.card_number)

    const [show, setShow] = useState(false);

    const handleClose = async() => {
        setShow(false)
        document.body.style.overflow = 'auto';
    };
    const handleShow = async() => {
        setShow(true)
        document.body.style.overflow = 'hidden';
        console.log(isDark)
    };

    // useEffect(() => {
    //     getCard();
    // }, [card_number]);

    const selectCard = async(card) =>{
        const cards_number = card.card_number
        navigate(`/cards/${cards_number}`);
        handleClose()
    }

    function useOutsideAlerter(ref) {
        useEffect(() => {
          // Function for click event
            function handleOutsideClick(event) {
                if (ref.current && !ref.current.contains(event.target)
                    && !event.target.closest(".left.button100")) {
                    handleClose();
                }
            }
          // Adding click event listener
            document.addEventListener("click", handleOutsideClick);
                return () => document.removeEventListener("click", handleOutsideClick);
        }, [ref]);
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
                <div className={!isDark? "large-modal topbar":"large-modal-dark topbar"}>
                    <div className="outScrollable"  ref={content}>
                        <h1 className="centered-h1">Related Cards</h1>
                        <div>
                            <div className="cd-inner2 card-pool-fill">
                                {relatedCardsList.map((relatedCard) => {
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
