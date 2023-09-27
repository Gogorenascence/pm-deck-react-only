import cards from "../database/cards.json";
import { useState, useEffect } from "react";
import { NavLink } from 'react-router-dom';
import ImageWithoutRightClick from "./ImageWithoutRightClick";


function CardRow() {

    const [newCards, setNewCards] = useState([]);
    const getCards = async() =>{
        setNewCards(cards.sort((a,b) => new Date(b.updated_on.full_time.$date) - new Date(a.updated_on.full_time.$date)).slice(0, 5));
    }
    useEffect(() => {
        getCards();
    }, []);

    return(
        <div className="white-space">
            <div className="cards-page-card-list5">
                {newCards.map((card) => {
                    return (
                        <div key={card.name}>
                            <NavLink to={`/cards/${card.card_number}`}>
                                    <img
                                        className="card-row glow3"
                                        title={card.name}
                                        src={card.picture_url ? card.picture_url : "https://i.imgur.com/krY25iI.png"}
                                        alt={card.name}/>
                            </NavLink>
                        </div>
                    );
                })}
            </div>
            <br/>
            <NavLink to="/cards">
                <button style={{ width: "100%" }}>
                    Browse All Cards
                </button>
            </NavLink>
        </div>
    );
}

export default CardRow;
