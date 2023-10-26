import {
    Card,
} from "react-bootstrap";
import { useState, useEffect, useContext } from "react";
import { NavLink, useNavigate } from 'react-router-dom';
import { DeckQueryContext } from "../context/DeckQueryContext";
import cards from "../database/cards.json";

function DecksPage(props) {

    const { decks } = props
    const [deckShowMore, setDeckShowMore] = useState(20);
    const {
        deckQuery,
        setDeckQuery,
        deckSortState,
        setDeckSortState,
    } = useContext(DeckQueryContext)

    const [loading, setLoading] = useState(false)

    const [fullDecks, setFullDecks] = useState([])

    const findCards = (deck) => {
        const card_names = []
        const series_names = []
        const deckCards = deck?.cards.concat(deck?.pluck)
        for (let cardNumber of deckCards) {
            const card = cards.find(card => card.card_number === cardNumber)
            card_names.push(card.name)
            series_names.push(card.series_name)
        }
        return [card_names, series_names]
    };

    const getDecks = async() =>{
        setLoading(true)
        const preDecks = [...decks]
        for (let deck of preDecks) {
            deck["card_names"] = findCards(deck)[0]
            console.log(deck.name, findCards(deck).length)
            deck["series_names"] = findCards(deck)[1]
        }

        const sortedDecks = preDecks.sort(deckSortMethods[deckSortState].method);

        for (let deck of sortedDecks){
            const date = new Date(deck["created_on"]["full_time"]["$date"])
            const time_now = new Date();
            time_now.setHours(time_now.getHours() + 5);
            // Calculate years, months, days, hours, minutes, and seconds
            let ago = Math.abs(time_now - date);
            const years = Math.floor(ago / 31557600000);
            ago -= years * 31557600000;
            const months = Math.floor(ago / 2630016000);
            ago -= months * 2630016000;
            const days = Math.floor(ago / 86400000);
            ago -= days * 86400000;
            const hours = Math.floor(ago / 3600000);
            ago -= hours * 3600000;
            const minutes = Math.floor(ago / 60000);
            ago -= minutes * 60000;
            // Format the time difference
            if (years > 0) {
            deck["created_on"]["ago"] = `${years} year ago`;
            } else if (months > 0) {
            deck["created_on"]["ago"] = `${months} month${months > 1 ? 's' : ''} ago`;
            } else if (days > 0) {
            deck["created_on"]["ago"] = `${days} day${days > 1 ? 's' : ''} ago`;
            } else if (hours > 0) {
            deck["created_on"]["ago"] = `${hours - 5} hour${hours - 5 > 1 ? 's' : ''} ${minutes > 1 ? ' and ' + minutes + ' minutes ago' : ' ago'}`;
            } else if (minutes > 0) {
            deck["created_on"]["ago"] = `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
            } else {
            deck["created_on"]["ago"] = "a few seconds ago";
            }

            const updateDate = new Date(deck["updated_on"]["full_time"]["$date"])
            // Calculate years, months, days, hours, minutes, and seconds
            let updateAgo = Math.abs(time_now - updateDate);
            const updateYears = Math.floor(updateAgo / 31557600000);
            updateAgo -= updateYears * 31557600000;
            const updateMonths = Math.floor(updateAgo / 2630016000);
            updateAgo -= updateMonths * 2630016000;
            const updateDays = Math.floor(updateAgo / 86400000);
            updateAgo -= updateDays * 86400000;
            const updateHours = Math.floor(updateAgo / 3600000);
            updateAgo -= updateHours * 3600000;
            const updateMinutes = Math.floor(updateAgo / 60000);
            updateAgo -= updateMinutes * 60000;
            // Format the time difference
            if (updateYears > 0) {
            deck["updated_on"]["ago"] = `${updateYears} year ago`;
            } else if (updateMonths > 0) {
            deck["updated_on"]["ago"] = `${updateMonths} month${updateMonths > 1 ? 's' : ''} ago`;
            } else if (updateDays > 0) {
            deck["updated_on"]["ago"] = `${updateDays} day${updateDays > 1 ? 's' : ''} ago`;
            } else if (updateHours > 0) {
            deck["updated_on"]["ago"] = `${updateHours - 5} hour${updateHours - 5 > 1 ? 's' : ''} ${updateMinutes > 1 ? ' and ' + updateMinutes + ' minutes ago' : ' ago'}`;
            } else if (updateMinutes > 0) {
            deck["updated_on"]["ago"] = `${updateMinutes} minute${updateMinutes > 1 ? 's' : ''} ago`;
            } else {
            deck["updated_on"]["ago"] = "a few seconds ago";
            }
        }
        setLoading(false)
        console.log(sortedDecks)
        setFullDecks(sortedDecks)
    };

    const navigate = useNavigate()

    const getRandomDeck = async() =>{
        const randomIndex = Math.floor(Math.random() * decks.length);
        const randomDeck = decks[randomIndex].id;
        navigate(`/decks/${randomDeck}`);
    }

    useEffect(() => {
        getDecks();
        document.title = "Decks - PM CardBase"
        return () => {
            document.title = "PlayMaker CardBase"
        };
    // eslint-disable-next-line
    }, []);

    const deckSortMethods = {
        none: { method: (a,b) => b.id.localeCompare(a.id) },
        newest: { method: (a,b) => b.id.localeCompare(a.id) },
        oldest: { method: (a,b) => a.id.localeCompare(b.id) },
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
            <input
                className="left dcbsearch-large"
                type="text"
                placeholder=" Description Contains..."
                name="description"
                value={deckQuery.description}
                onChange={handleDeckQuery}>
            </input>
            <br/>
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
                <h4 className="left-h3">Showing Results 1 - {all_decks.slice(0, deckShowMore).length} of {all_decks.length}</h4>}



            <div className="decks-page-card-list2">
                {all_decks.slice(0, deckShowMore).map((deck) => {
                    return (
                        <NavLink to={`/decks/${deck.id}`}  key={deck.id}>
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
                                        <h3 className="left cd-container-child media-margin-top-none"
                                        >{deck.name}</h3>
                                    </div>
                                    <h6 className="left"
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
