import {
    Card,
} from "react-bootstrap";
import { useState, useEffect, useContext } from "react";
import { NavLink, useNavigate } from 'react-router-dom';
import { DeckQueryContext } from "../context/DeckQueryContext";
import deckQueries from "../QueryObjects/DeckQueries";
import FavoriteDeck from "../Accounts/FavoriteDeck";
import { AuthContext } from "../context/AuthContext";


function DecksPage() {
    const {
        deckQuery,
        setDeckQuery,
        deckSortState,
        setDeckSortState,
    } = useContext(DeckQueryContext)
    const {account} = useContext(AuthContext)

    const [deckShowMore, setDeckShowMore] = useState(20);
    const [loading, setLoading] = useState(false)

    const [fullDecks, setFullDecks] = useState([])

    const getDecks = async() =>{
        setLoading(true)
        const decksData = await deckQueries.getQueriedDecksData({"private": false});
        console.log(decksData)
        const sortedDecks = [...decksData].sort(deckSortMethods[deckSortState].method);
        setFullDecks(sortedDecks.reverse())
        setLoading(false)
    };

    const navigate = useNavigate()

    const getRandomDeck = async() =>{
        const randomIndex = Math.floor(Math.random() * fullDecks.length);
        const randomDeck = fullDecks[randomIndex].id;
        navigate(`/decks/${randomDeck}`);
    }

    useEffect(() => {
        getDecks();
        document.title = "Decks - PM CardBase"
        account? console.log("account") : console.log("dog")
        return () => {
            document.title = "PlayMaker CardBase"
        };
    // eslint-disable-next-line
    }, []);

    const deckSortMethods = {
        none: { method: (a,b) => b.updated_on.full_time.localeCompare(a.updated_on.full_time) },
        newest: { method: (a,b) => b.created_on.full_time.localeCompare(a.created_on.full_time) },
        oldest: { method: (a,b) => a.created_on.full_time.localeCompare(b.created_on.full_time) },
        name: { method: (a,b) => a.name.localeCompare(b.name) },
        updated: { method: (a,b) => new Date(b.updated_on.full_time) - new Date(a.updated_on.full_time) },
    };

    const handleDeckQuery = (event) => {
        setDeckQuery({ ...deckQuery, [event.target.name]: event.target.value });
    };

    const handleDeckQueryReset = (event) => {
        setDeckQuery({
            deckName: "",
            description: "",
            cardName: "",
            strategy: "",
            seriesName: "",
            user: "",
        });
        setDeckSortState("none")
    };

    const handleDeckSort = (event) => {
        setDeckSortState(event.target.value);
        // const updated = decks.map(deck => deck.updated_on)
    };

    const handleDeckShowMore = (event) => {
        setDeckShowMore(deckShowMore + 20);
    };

    const all_decks = fullDecks.filter(deck => deck.name.toLowerCase().includes(deckQuery.deckName.toLowerCase()))
        .filter(deck => (deck.description).toLowerCase().includes(deckQuery.description.toLowerCase()))
        .filter(deck => deckQuery.cardName ? (deck.card_names && deck.card_names.length > 0 ? deck.card_names.some(name => name.toLowerCase().includes(deckQuery.cardName.toLowerCase())) : false) : true)
        .filter(deck => deckQuery.strategy? deck.strategies.some(strategy => strategy.includes(deckQuery.strategy)):deck.strategies)
        .filter(deck => deckQuery.seriesName ? (deck.series_names && deck.series_names.length > 0 ? deck.series_names.some(series => series.toLowerCase().includes(deckQuery.seriesName.toLowerCase())) : false) : true)
        .sort(deckSortMethods[deckSortState].method)


    return (
        <div className="white-space">
            <h1 className="left-h1">Deck Search</h1>
            <h2 className="left">Search our collection of decks</h2>
            <input
                className="left dcbsearch-large"
                type="text"
                placeholder=" Deck Name Contains..."
                name="deckName"
                value={deckQuery.deckName}
                onChange={handleDeckQuery}>
            </input>
            <br/>
            {/* <input
                className="left dcbsearch-large"
                type="text"
                placeholder=" Description Contains..."
                name="description"
                value={deckQuery.description}
                onChange={handleDeckQuery}>
            </input>
            <br/> */}
            <input
                className="left dcbsearch-large"
                type="text"
                placeholder=" Contains Card Named..."
                name="cardName"
                value={deckQuery.cardName}
                onChange={handleDeckQuery}>
            </input>
            <br/>
            <input
                className="left dcbsearch-large"
                type="text"
                placeholder=" Contains Series Named..."
                name="seriesName"
                value={deckQuery.seriesName}
                onChange={handleDeckQuery}>
            </input>
            <br/>
            <select
                className="left"
                type="text"
                placeholder=" Strategy"
                name="strategy"
                value={deckQuery.strategy}
                onChange={handleDeckQuery}
                style={{width: "180px", height: "37px"}}>
                <option value="">Strategy</option>
                <option value="Aggro">Aggro</option>
                <option value="Combo">Combo</option>
                <option value="Control">Control</option>
                <option value="Mid-range">Mid-range</option>
                <option value="Ramp">Ramp</option>
                <option value="Second Wind">Second Wind</option>
                <option value="Stall">Stall</option>
                <option value="Toolbox">Toolbox</option>
                <option value="other">other</option>
            </select>
            <select
                className="left"
                type="text"
                placeholder="  Sorted By"
                value={deckSortState}
                onChange={handleDeckSort}
                style={{width: "180px", height: "37px"}}>
                <option value="none">Sorted By</option>
                <option value="newest">Newest</option>
                <option value="oldest">Oldest</option>
                <option value="updated">Last Updated</option>
                <option value="name">A-Z</option>
            </select>
            <br/>
            <NavLink to="/deckbuilder">
                <button className="left"
                    variant="dark">
                        Create Deck
                </button>
            </NavLink>
            <button
                className="left"
                variant="dark"
                onClick={handleDeckQueryReset}
                >
                Reset Filters
            </button>
            <button
                className="left"
                variant="dark"
                onClick={getRandomDeck}
                >
                Random Deck
            </button>

            { loading ?
                <div className="loading-container">
                    <div className="loading-spinner"></div>
                </div> :
                    <h4 className="left-h3">
                        {all_decks.length > 0 ? `Showing Results 1 - ${all_decks.slice(0, deckShowMore).length} of ${all_decks.length}`:
                            "No Decks Fit Your Search Criteria"}
                    </h4>}



            <div className="decks-page-card-list2">
                {all_decks.slice(0, deckShowMore).map((deck) => {
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
                                        <h3 className="left cd-container-child ellipsis"
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
                                    <div style={{ display: "flex", maxWidth: "90%"}}>
                                        <img className="logo2" src="https://i.imgur.com/nIY2qSx.png" alt="created on"/>
                                        <h6
                                        className="left justify-content-end ellipsis2"
                                            style={{margin: '5px 0px 5px 5px', fontWeight: "600", textAlign: "left"}}
                                        >
                                            {deck.created_on.ago} &nbsp; &nbsp;
                                        </h6>
                                        <img className="logo3" src="https://i.imgur.com/QLa1ciW.png" alt="updated on"/>
                                        <h6
                                        className="left justify-content-end ellipsis2"
                                            style={{margin: '5px 0px 5px 5px', fontWeight: "600", textAlign: "left"}}
                                        >
                                            {deck.updated_on.ago} &nbsp; &nbsp;
                                        </h6>
                                        <img className="logo2" src="https://i.imgur.com/eMGZ7ON.png" alt="created by"/>
                                        <h6
                                        className="left justify-content-end"
                                            style={{margin: '5px 0px 5px 5px', fontWeight: "600", textAlign: "left"}}
                                        >
                                            {deck.creator}
                                        </h6>
                                    </div>
                                </Card.ImgOverlay>
                            </Card>
                        </NavLink>
                    );
                })}
            </div>
            {deckShowMore < all_decks.length ?
                <button
                    variant="dark"
                    style={{ width: "100%", marginTop:"2%"}}
                    onClick={handleDeckShowMore}>
                    Show More Decks ({all_decks.length - deckShowMore} Remaining)
                </button> : null }
        </div>
    );
}

export default DecksPage;
