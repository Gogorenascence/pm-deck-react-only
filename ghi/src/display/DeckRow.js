import {
    Card,
} from "react-bootstrap";
import { useState, useEffect, useContext } from "react";
import { NavLink } from 'react-router-dom';
import deckQueries from "../QueryObjects/DeckQueries";
import { AuthContext } from "../context/AuthContext";
import FavoriteDeck from "../Accounts/FavoriteDeck";


function DeckRow() {
    const [newDecks, setNewDecks] = useState([])
    const {account} = useContext(AuthContext)

    const getDecks = async() =>{
        const data = await deckQueries.getRangedQueriedDecksData(4, {"private": false})
        setNewDecks(data);
    };

    useEffect(() => {
        getDecks();
    }, []);


    return(
        <div className="white-space">
            <div className="deck-row-card-list2">
                {newDecks.map((deck) => {
                    return (
                        <NavLink to={`/decks/${deck.id}`} key={deck.id}>
                            <Card className="text-white text-center card-list-card3 glow">
                                <div className="card-image-wrapper">
                                    <div className="card-image-clip">
                                        <Card.Img
                                            src={deck.cover_card ? deck.cover_card : "https://i.imgur.com/8wqd1sD.png"}
                                            alt="Card image"
                                            className="card-image2"
                                            variant="bottom"/>
                                    </div>
                                </div>
                                <Card.ImgOverlay className="blackfooter2">
                                    <div style={{display: "flex"}}>
                                        <h3 className="left cd-container-child ellipsis2"
                                        >{deck.name}</h3>
                                        {account?
                                            <FavoriteDeck deck={deck}/>:null
                                        }
                                    </div>
                                    <h6 className="left ellipsis2"
                                        style={{margin: '0px 0px 5px 10px', fontWeight: "600"}}
                                    >
                                        Strategies: {deck.strategies.length > 0 ? deck.strategies.join(', ') : "n/a"}
                                    </h6>
                                    <h6 className="left"
                                        style={{margin: '0px 0px 10px 10px', fontWeight: "600"}}
                                    >
                                        Main Deck: {deck.cards.length} &nbsp; Pluck Deck: {deck.pluck.length}
                                    </h6>
                                    <div style={{ display: "flex" }}>
                                        <img className="logo2" src="https://i.imgur.com/nIY2qSx.png" alt="created on"/>
                                        <h6
                                        className="left justify-content-end"
                                            style={{margin: '5px 0px 5px 5px', fontWeight: "600", textAlign: "left"}}
                                        >
                                            {deck.created_on.ago} &nbsp; &nbsp;
                                        </h6>
                                        <img className="logo3" src="https://i.imgur.com/QLa1ciW.png" alt="updated on"/>
                                        <h6
                                        className="left justify-content-end"
                                            style={{margin: '5px 0px 5px 5px', fontWeight: "600", textAlign: "left"}}
                                        >
                                            {deck.updated_on.ago} &nbsp; &nbsp;
                                        </h6>
                                    </div>
                                </Card.ImgOverlay>
                            </Card>
                        </NavLink>
                    );
                })}
            </div>
            <br/>
            <div className="d-grid gap-2">
                <NavLink to="/decks">
                    <button style={{ width: "100%" }}>
                        Browse All Decks
                    </button>
                </NavLink>
            </div>
        </div>
    );
}

export default DeckRow;
