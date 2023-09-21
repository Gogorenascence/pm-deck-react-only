import { useState, useEffect } from "react";
import React from 'react-router-dom';


function CardModal() {
    const [show, setShow] = useState(false);

    const handleShow = () => setShow(true)
    const handleHide = () => setShow(false)

    return (
        <div>
            {/* <section className={`img-modal ${show ? null : "hidden2"}`}>
                <img
                    className="modal-card"
                    src={card.picture_url ? card.picture_url : "https://i.imgur.com/krY25iI.png"}
                    alt="Card image"/>
            </section> */}
        </div>
    );
}

export default CardModal;
