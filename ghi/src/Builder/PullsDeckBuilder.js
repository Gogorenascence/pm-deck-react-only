import {
    Col,
    Row,
} from "react-bootstrap";
import { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from "react-router-dom";
import { PullsContext } from "../context/PullsContext";
import { AuthContext } from "../context/AuthContext";
import ImageWithoutRightClick from "../display/ImageWithoutRightClick";

function PullsDeckBuilder() {
    const [deck, setDeck] = useState({
        name: "",
        account_id: "",
        description: "",
        strategies: [],
        cards: [],
        pluck: [],
        side: [],
        views: 0,
        cover_card: null,
        parent_id: "",
        private: false,
    });

    const {card_set_id} = useParams();
    const {account} = useContext(AuthContext)

    const [main_list, setMainList] = useState([]);
    const [pluck_list, setPluckList] = useState([]);
    const combinedList = main_list.concat(pluck_list);
    const uniqueList = [...new Set(combinedList)];

    const [selectedList, setSelectedList] = useState([]);
    const [selectedCard, setSelectedCard] = useState(null);

    const [cards, setCards] = useState([]);
    const {pulls}= useContext(PullsContext);

    const [showMore, setShowMore] = useState(50);
    const [listView, setListView] = useState(false);

    const [showPool, setShowPool] = useState(true);
    const [showMain, setShowMain] = useState(true);
    const [showPluck, setShowPluck] = useState(true);

    const [boosterSet, setBoosterSet] = useState("");
    const [ultraRares, setUltraRares] = useState([]);
    const [rarity, setRarity] = useState("");



    const [noCards, setNoCards] = useState(false);

    const getCards = async() =>{
        if (pulls.length == 0 ) {
            setNoCards(true)
        }
        const pulledCards = [];
        for (let pull of pulls) {
            pulledCards.push(...pull);
        }
        const sortedCards = [...pulledCards].sort(sortMethods[sortState].method);
        console.log(pulledCards)

        setCards(sortedCards);
    };

    const [query, setQuery] = useState({
        cardName: "",
        cardText: "",
        cardNumber: "",
        heroID: "",
        series: "",
        illustrator: "",
        type: "",
        cardClass: "",
        extraEffect: "",
        reaction: "",
        tag: "",
    });

    const getBoosterSet = async() =>{
        const response = await fetch(`${process.env.REACT_APP_FASTAPI_SERVICE_API_HOST}/api/booster_sets/${card_set_id}`);
        const boosterSetData = await response.json();
        setBoosterSet(boosterSetData)
        setUltraRares(boosterSetData.ultra_rares)

    };

    const [sortState, setSortState] = useState("none");

    useEffect(() => {
        getCards();
        console.log(card_set_id)
        getBoosterSet();
        document.title = "Deck Builder - PM CardBase"
        console.log(typeof pulls)
        return () => {
            document.title = "PlayMaker CardBase"
        };
    // eslint-disable-next-line
    },[]);

    const sortMethods = {
        none: { method: (a,b) => a.card_number - b.card_number },
        newest: { method: (a,b) => b.id.localeCompare(a.id) },
        oldest: { method: (a,b) => a.id.localeCompare(b.id) },
        name: { method: (a,b) => a.name.localeCompare(b.name) },
        card_number: { method: (a,b) => a.card_number - b.card_number },
        enthusiasm_highest: { method: (a,b) => b.enthusiasm - a.enthusiasm },
        enthusiasm_lowest: { method: (a,b) => a.enthusiasm - b.enthusiasm },
    };

    const handleQuery = (event) => {
        setQuery({ ...query, [event.target.name]: event.target.value });
        setShowMore(50)
    };

    const handleRarityChange = (event) => {
        setRarity(event.target.value);
        console.log(rarity)
    };

    const handleQueryReset = (event) => {
        setQuery({
            cardName: "",
            cardText: "",
            cardNumber: "",
            heroID: "",
            series: "",
            illustrator: "",
            type: "",
            cardClass: "",
            extraEffect: "",
            reaction: "",
            tag: "",
        });
        setRarity("")
    };

    const handleSort = (event) => {
        setSortState(event.target.value);
    };

    const all_cards = cards.filter(card => card.name.toLowerCase().includes(query.cardName.toLowerCase()))
        .filter(card => (card.effect_text + card.second_effect_text).toLowerCase().includes(query.cardText.toLowerCase()))
        .filter(card => card.card_number.toString().includes(query.cardNumber))
        .filter(card => card.hero_id.toLowerCase().includes(query.heroID.toLowerCase()))
        .filter(card => card.series_name.toLowerCase().includes(query.series.toLowerCase()))
        .filter(card => card.illustrator.toLowerCase().includes(query.illustrator.toLowerCase()))
        .filter(card => query.type? card.card_type.some(type => type.toString() == query.type):card.card_type)
        .filter(card => card.card_class.includes(query.cardClass))
        .filter(card => query.extraEffect? card.extra_effects.some(effect => effect.toString() == query.extraEffect):card.extra_effects)
        .filter(card => query.reaction? card.reactions.some(reaction => reaction.toString() == query.reaction):card.reactions)
        .filter(card => query.tag? card.card_tags.some(tag => tag.toString() == query.tag):card.card_tags)
        .filter(card => boosterSet && rarity ? boosterSet[rarity].includes(card.card_number):card.card_number)
        .sort(sortMethods[sortState].method)

    const handleShowMore = (event) => {
        setShowMore(showMore + 50);
    };

    const handleChange = (event) => {
        setDeck({ ...deck, [event.target.name]: event.target.value });
    };

    const handleCheck = (event) => {
        setDeck({ ...deck, [event.target.name]: event.target.checked });
        console.log(deck.private)
    };

    const handleCoverCardChange = (event) => {
        setSelectedCard( event.target.value );
        setDeck({ ...deck, [event.target.name]: event.target.value });
        console.log(selectedCard)
    };

    const handleStrategyChange = e => {
        let { options } = e.target;
        options = Array.apply(null, options)
        const selectedValues = options.filter(x => x.selected).map(x => x.value);
        setSelectedList(selectedValues);
        console.log(selectedValues)
    }

    const handleClick = (card) => {
        if (card.card_type[0] === 1006 ||
            card.card_type[0] === 1007 ||
            card.card_type[0] === 1008){
            setPluckList([...pluck_list, card]);
            console.log(pluck_list);
        }else{
            setMainList([...main_list, card]);
            console.log(main_list);
        }
    }

    const handleRemoveCard = (card) => {
        if (card.card_type[0] === 1006 ||
            card.card_type[0] === 1007 ||
            card.card_type[0] === 1008){
                const pluckIndex = pluck_list.indexOf(card);
                const newPluckList = [...pluck_list];
                newPluckList.splice(pluckIndex, 1);
                setPluckList(newPluckList);
                if (card.picture_url === selectedCard){
                    setSelectedCard(null)
                }
        }else{
            const mainIndex = main_list.indexOf(card);
            const newMainList = [...main_list];
            newMainList.splice(mainIndex, 1);
            setMainList(newMainList);
            if (card.picture_url === selectedCard){
                setSelectedCard(null)
            }
        }
    }

    const clearMain = async() => {
        setMainList([]);
        const picture_urls = []
        for (let card of main_list){
            picture_urls.push(card.picture_url)
        }
        if (picture_urls.includes(selectedCard)){
            setSelectedCard(null);
        }
    }

    const clearPluck = async() => {
        setPluckList([]);
        const picture_urls = []
        for (let card of pluck_list){
            picture_urls.push(card.picture_url)
        }
        if (picture_urls.includes(selectedCard)){
            setSelectedCard(null);
        }
    }

    const navigate = useNavigate()

    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = {...deck};
        const main = []
        const pluck = []
        for (let card of main_list){
            main.push(card.card_number)
        }
        for (let card of pluck_list){
            pluck.push(card.card_number)
        }
        data["cards"] = main;
        data["pluck"] = pluck;
        data["strategies"] = selectedList
        account ? data["account_id"] = account.id : data["account_id"] = deck.account_id
        console.log(data)

        const cardUrl = `${process.env.REACT_APP_FASTAPI_SERVICE_API_HOST}/api/decks/`;
        const fetchConfig = {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json",
            },
        };

        const response = await fetch(cardUrl, fetchConfig);
        if (response.ok) {
            const responseData = await response.json();
            const deck_id = responseData.id;
            setDeck({
                name: "",
                account_id: "",
                description: "",
                strategies: [],
                cards: [],
                pluck: [],
                side: [],
                views: 0,
                cover_card: "",
                parent_id: "",
            });
            navigate(`/decks/${deck_id}`);
        } else {
            alert("Error in creating deck");
        }
    }

    const handleListView = (event) => {
        setListView(!listView);
    };

    const handleShowPool = (event) => {
        setShowPool(!showPool);
        console.log(showPool)
    };

    const handleShowMain = (event) => {
        setShowMain(!showMain);
        console.log(showMain)
    };

    const handleShowPluck = (event) => {
        setShowPluck(!showPluck);
        console.log(showPluck)
    };

    const preprocessText = (text) => {
        return text.split("//").join("\n");
    };

    const isQueryEmpty = Object.values(query).every((value) => value === "");

    return (
        <div className="white-space">
            <h1 className="left-h1">Deck Builder</h1>
            <div style={{display: "flex", justifyContent: "space-between"}}>
                <div
                    id="create-deck-page">
                    <h2 className="left">Deck Details</h2>
                    <h5 className="label">Name </h5>
                    <input
                        className="builder-input"
                        type="text"
                        placeholder=" Deck Name"
                        onChange={handleChange}
                        name="name"
                        value={deck.name}>
                    </input>
                    <br/>
                    <h5 className="label">Cover Card</h5>
                    <select
                        className="builder-input"
                        type="text"
                        placeholder=" Cover Card"
                        onChange={handleCoverCardChange}
                        name="cover_card"
                        value={deck.cover_card}>
                        <option value="">Cover Card</option>
                        {uniqueList.sort((a,b) => a.card_number - b.card_number).map(function(card)
                        {return( <option value={card.picture_url}>{card.name}</option>)}
                            )}
                    </select>
                    <br/>
                    <h5 className="label"> Description </h5>
                    <textarea
                        className="builder-text"
                        type="text"
                        placeholder=" Deck Description"
                        onChange={handleChange}
                        name="description"
                        value={deck.description}>
                    </textarea>
                    <h5 className="label">Strategies </h5>
                    <h7 className="label"><em>hold ctrl/cmd to select more than one</em></h7>
                    <br/>
                    <select
                        className="builder-text"
                        multiple
                        name="strategies"
                        onChange={handleStrategyChange}
                        >
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
                    <br/>
                    <input
                        style={{margin: "20px 8px 15px 5px"}}
                        id="private"
                        type="checkbox"
                        onChange={handleCheck}
                        name="private"
                        checked={deck.private}>
                    </input>
                    <label for="private"
                        className="bold"
                    >
                        Make my deck private
                    </label>
                    <br/>
                    {account?
                        <button
                            className="left"
                            style={{ marginTop: "9px"}}
                            onClick={handleSubmit}
                        >
                            Create Deck
                        </button>:
                        <button
                        className="left"
                        style={{ marginTop: "9px"}}
                        >
                            Create Deck
                        </button>
                    }
                    <button
                        className="left red"
                        style={{ marginTop: "9px"}}
                        onClick={clearMain}
                    >
                        Clear Main
                    </button>
                    <button
                        className="left red"
                        style={{ marginTop: "9px"}}
                        onClick={clearPluck}
                    >
                        Clear Pluck
                    </button>
                    <br/>
                    { !account?
                        <h6 className="error">You must be logged in to create a deck</h6>:
                    null
                    }
                    </div>
                <div>
                    <h2 className="left">Cover Card</h2>
                    {selectedCard ? (
                        <img
                            className="cover-card"
                            src={selectedCard}
                            alt={selectedCard.name}
                            variant="bottom"/>
                            ):(
                        <img
                            className="cover-card"
                            src={"https://i.imgur.com/krY25iI.png"}
                            alt="Card"
                            variant="bottom"/>)}
                </div>

                <div>
                    <h2 className="left">Search for cards</h2>
                    <input
                        className="left dcbsearch-large"
                        type="text"
                        placeholder=" Card Name Contains..."
                        name="cardName"
                        value={query.cardName}
                        onChange={handleQuery}>
                    </input>
                    <br/>
                    <input
                        className="left dcbsearch-large"
                        type="text"
                        placeholder=" Card Text Contains..."
                        name="cardText"
                        value={query.cardText}
                        onChange={handleQuery}>
                    </input>
                    <br/>
                    <input
                        className="left dcbsearch-medium"
                        type="text"
                        placeholder=" Card Number"
                        name="cardNumber"
                        value={query.cardNumber}
                        onChange={handleQuery}>
                    </input>
                    <input
                        className="left dcbsearch-medium"
                        type="text"
                        placeholder=" Hero ID"
                        name="heroID"
                        value={query.heroID}
                        onChange={handleQuery}>
                    </input>
                    <br/>
                    <input
                        className="left dcbsearch-medium"
                        type="text"
                        placeholder=" Series"
                        name="series"
                        value={query.series}
                        onChange={handleQuery}>
                    </input>
                    <input
                        className="left dcbsearch-medium"
                        type="text"
                        placeholder=" Illustrator"
                        name="illustrator"
                        value={query.illustrator}
                        onChange={handleQuery}>
                    </input>
                    <br/>
                    <select
                        className="left dcbsearch-small"
                        type="text"
                        placeholder=" Type"
                        name="type"
                        value={query.type}
                        onChange={handleQuery}>
                        <option value="">Type</option>
                        <option value="1001">Fighter</option>
                        <option value="1002">Aura</option>
                        <option value="1003">Move</option>
                        <option value="1004">Ending</option>
                        <option value="1005">Any Type</option>
                        <option value="1006">Item</option>
                        <option value="1007">Event</option>
                        <option value="1008">Comeback</option>
                    </select>
                    <select
                        className="left dcbsearch-small"
                        type="text"
                        placeholder=" Class"
                        name="cardClass"
                        value={query.cardClass}
                        onChange={handleQuery}>
                        <option value="">Class</option>
                        <option value="Staunch">Staunch</option>
                        <option value="Power">Power</option>
                        <option value="Unity">Unity</option>
                        <option value="Canny">Canny</option>
                    </select>
                    <select
                        className="left dcbsearch-small"
                        type="text"
                        placeholder=" Extra Effect"
                        name="extraEffect"
                        value={query.extraEffect}
                        onChange={handleQuery}>
                        <option value="">Extra Effect</option>
                        <option value="1001">Trigger</option>
                        <option value="1003">Limited</option>
                        <option value="1002">Critical</option>
                    </select>
                    <br/>
                    <select
                        className="left dcbsearch-small"
                        type="text"
                        placeholder=" Reaction"
                        name="reaction"
                        value={query.reaction}
                        onChange={handleQuery}>
                        <option value="">Reaction</option>
                        <option value="1001">Block</option>
                        <option value="1002">Counter</option>
                        <option value="1003">Endure</option>
                        <option value="1004">Redirect</option>
                    </select>
                    <select
                        className="left dcbsearch-small"
                        type="text"
                        placeholder=" Tag"
                        name="tag"
                        value={query.tag}
                        onChange={handleQuery}>
                        <option value="">Tag</option>
                        <option value="1001">5 HP</option>
                        <option value="1002">Focus</option>
                        <option value="1003">Auto</option>
                        <option value="1004">Stay</option>
                        <option value="1005">Max</option>
                    </select>
                    <select
                        className="left dcbsearch-small"
                        type="text"
                        placeholder=" Sorted By"
                        value={sortState}
                        onChange={handleSort}>
                        <option value="none">Sorted By</option>
                        <option value="newest">Newest</option>
                        <option value="oldest">Oldest</option>
                        <option value="name">A-Z</option>
                        <option value="card_number">Card Number</option>
                        <option value="enthusiasm_highest">Enth (High)</option>
                        <option value="enthusiasm_lowest">Enth (Low)</option>
                        </select>
                    <br/>
                    <br/>
                    <h5 className="left">Search by Rarity</h5>
                    <select
                        className="left dcbsearch-medium"
                        type="text"
                        name="boosterSet">
                        <option value={boosterSet.id}>{boosterSet.name}</option>
                    </select>
                    <select
                        className="left dcbsearch-medium"
                        type="text"
                        placeholder=" Rarity"
                        onChange={handleRarityChange}
                        name="rarity"
                        value={rarity}>
                        <option value="">Rarity</option>
                        <option value="mv">Max Variables</option>
                        <option value="normals">Normals</option>
                        <option value="rares">Rares</option>
                        <option value="super_rares">Super Rares</option>
                        <option value="ultra_rares">Ultra Rares</option>
                    </select>
                    <br/>
                    <button
                        className="left"
                        variant="dark"
                        onClick={handleQueryReset}
                        >
                        Reset Filters
                    </button>
                    {listView?
                        <button
                            className="left"
                            variant="dark"
                            onClick={handleListView}
                        >
                            Deck Image View
                        </button>:
                        <button
                            className="left"
                            variant="dark"
                            onClick={handleListView}
                        >
                            Deck List View
                        </button>}
                    <br/>
                </div>

                </div>
                {all_cards.length?
                    <div className={showPool ? "cardpool" : "no-cardpool"}>
                        <div style={{marginLeft: "0px"}}>
                            <div style={{display: "flex", alignItems: "center"}}>
                                <h2
                                    className="left"
                                    style={{margin: "1% 0px 1% 20px", fontWeight: "700"}}
                                >Card Pool</h2>
                                <img className="logo" src="https://i.imgur.com/YpdBflG.png" alt="cards icon"/>
                                {all_cards.length > 0 ?
                                    <h5
                                        className="left db-pool-count"
                                    >{all_cards.length}</h5>:
                                    null}
                                { showPool ?
                                    <h5 className="left db-pool-count"
                                        onClick={() => handleShowPool()}>
                                            &nbsp;[Hide]
                                    </h5> :
                                    <h5 className="left db-pool-count"
                                        onClick={() => handleShowPool()}>
                                        &nbsp;[Show]
                                    </h5>}
                            </div>
                            <div className={showPool ? "scrollable" : "hidden2"}>
                                <div style={{margin: "8px"}}>

                                { all_cards.length == 0 && isQueryEmpty && !noCards?
                                    <div className="loading-container">
                                        <div className="loading-spinner"></div>
                                    </div> :
                                null}

                                <div className="card-pool-fill">
                                    {all_cards.slice(0, showMore).map((card) => {
                                        return (
                                            <div>
                                                {ultraRares.includes(card.card_number) ?
                                                    <div className={uniqueList.includes(card) ? "selected ultra2 pointer glow3" : "ultra2 pointer glow3"}
                                                    style={{display: "flex", justifyContent: "center"}}>
                                                        <img
                                                            onClick={() => handleClick(card)}
                                                            className="builder-card4 pointer"
                                                            title={`${card.name}\n${preprocessText(card.effect_text)}\n${card.second_effect_text ? preprocessText(card.second_effect_text) : ""}`}
                                                            src={card.picture_url ? card.picture_url : "https://i.imgur.com/krY25iI.png"}
                                                            alt={card.name}/>
                                                    </div>:
                                                    <img
                                                        onClick={() => handleClick(card)}
                                                        className={uniqueList.includes(card) ? "selected builder-card pointer glow3" : "builder-card pointer glow3"}
                                                        title={`${card.name}\n${preprocessText(card.effect_text)}\n${card.second_effect_text ? preprocessText(card.second_effect_text) : ""}`}
                                                        src={card.picture_url ? card.picture_url : "https://i.imgur.com/krY25iI.png"}
                                                        alt={card.name}/>
                                                }
                                            </div>
                                        );
                                    })}
                                </div>
                                </div>
                                {showMore < all_cards.length ?
                                    <button
                                        style={{ width: "97%", margin:".5% 0% .5% 1.5%"}}
                                        onClick={handleShowMore}>
                                        Show More Cards ({all_cards.length - showMore} Remaining)
                                    </button> : null }
                            </div>
                        </div>
                    </div>:
                    <div className="no-cardpool">
                    <div style={{marginLeft: "0px"}}>
                        <div style={{display: "flex", alignItems: "center"}}>
                            <h2
                                className="left"
                                style={{margin: "1% 0px 1% 20px", fontWeight: "700"}}
                            >Card Pool</h2>
                            <img className="logo" src="https://i.imgur.com/YpdBflG.png" alt="cards icon"/>

                        </div>

                            <div style={{marginLeft: "20px"}}>
                            <h4 className="left no-cards">No cards added</h4>
                            </div>

                    </div>
                </div>
                    }
                {listView?
                    <div className="deck-list">
                        <div className="maindeck3">
                        <div style={{marginLeft: "20px"}}>
                            <div style={{display: "flex", alignItems: "center"}}>
                                <h2
                                    className="left"
                                    style={{margin: "2% 0% 1% 0%", fontWeight: "700"}}
                                >Main Deck</h2>
                                <img className="logo" src="https://i.imgur.com/YpdBflG.png" alt="cards icon"/>
                                {main_list.length > 0 ?
                                <h5
                                    className="left"
                                    style={{margin: "1% 0%", fontWeight: "700"}}
                                >{main_list.length}</h5>:
                                null}
                            </div>
                            {main_list.length > 0 ?<>
                                    {main_list.sort((a,b) => a.card_number - b.card_number).map((card) => {
                                        return (
                                            <Col style={{padding: "5px"}}>
                                                <div className="card-container pointer">
                                                    <h5 onClick={() => handleRemoveCard(card)}>{card.name}</h5>
                                                    <img
                                                        className="card-image"
                                                        src={card.picture_url}
                                                        alt={card.name}
                                                    />
                                                </div>
                                            </Col>
                                        );
                                    })}
                                </>:
                            <h4 className="left no-cards">No cards added</h4>}
                        </div>
                    </div>

                    <div className="pluckdeck3">
                        <div style={{marginLeft: "20px"}}>
                        <div style={{display: "flex", alignItems: "center"}}>
                                <h2
                                    className="left"
                                    style={{margin: "2% 0% 1% 0%", fontWeight: "700"}}
                                >Pluck Deck</h2>
                                <img className="logo" src="https://i.imgur.com/YpdBflG.png" alt="cards icon"/>
                                {pluck_list.length > 0 ?
                                <h5
                                    className="left"
                                    style={{margin: "1% 0%", fontWeight: "700"}}
                                >{pluck_list.length}</h5>:
                                null}
                            </div>
                            {pluck_list.length > 0 ?<>
                                    {pluck_list.sort((a,b) => a.card_number - b.card_number).map((card) => {
                                        return (
                                            <Col style={{padding: "5px"}}>
                                                <div className="card-container pointer">
                                                    <h5 onClick={() => handleRemoveCard(card)}>{card.name}</h5>
                                                    <img
                                                        className="card-image"
                                                        src={card.picture_url}
                                                        alt={card.name}
                                                    />
                                                </div>
                                            </Col>
                                        );
                                    })}
                                </>:
                            <h4 className="left no-cards">No cards added</h4>}
                        </div>
                    </div>
                </div>
                :<>
                    <div className="maindeck">
                        <div>
                            <div style={{display: "flex", alignItems: "center", marginLeft: "20px"}}>
                                <h2
                                    className="left"
                                    style={{margin: "1% 0%", fontWeight: "700"}}
                                >Main Deck</h2>
                                <img className="logo" src="https://i.imgur.com/YpdBflG.png" alt="cards icon"/>
                                {main_list.length > 0 ?
                                <h5
                                    className="left"
                                    style={{margin: "1% 0%", fontWeight: "700"}}
                                >{main_list.length}</h5>:
                                null}
                                { showMain ?
                                    <h5 className={main_list.length > 0 ? "left db-main-count" : "hidden2"}
                                        onClick={() => handleShowMain()}>
                                            &nbsp;[Hide]
                                    </h5> :
                                    <h5 className={main_list.length > 0 ? "left db-main-count" : "hidden2"}
                                        onClick={() => handleShowMain()}>
                                        &nbsp;[Show]
                                    </h5>}
                            </div>

                            {main_list.length > 0 ?
                            <div className={showMain ? "card-pool-fill2": "hidden2"}>
                                {main_list.sort((a,b) => a.card_number - b.card_number).map((card) => {
                                    return (
                                        <div style={{display: "flex", justifyContent: "center"}}>
                                            {ultraRares.includes(card.card_number) ?
                                                <div className="ultra">
                                                    <img
                                                        onClick={() => handleRemoveCard(card)}
                                                        className="builder-card4 pointer"
                                                        title={card.name}
                                                        src={card.picture_url ? card.picture_url : "https://i.imgur.com/krY25iI.png"}
                                                        alt={card.name}
                                                        variant="bottom"/>
                                                </div>:
                                                <img
                                                    onClick={() => handleRemoveCard(card)}
                                                    className="builder-card2 pointer"
                                                    title={card.name}
                                                    src={card.picture_url ? card.picture_url : "https://i.imgur.com/krY25iI.png"}
                                                    alt={card.name}
                                                    variant="bottom"/>
                                            }
                                        </div>
                                    );
                                })}
                            </div> :
                        <h4 className="left no-cards">No cards added</h4>}
                    </div>
                    </div>

                    <div className="pluckdeck">
                        <div>
                            <div style={{display: "flex", alignItems: "center", marginLeft: "20px"}}>
                                <h2
                                    className="left"
                                    style={{margin: "1% 0%", fontWeight: "700"}}
                                >Pluck Deck</h2>
                                <img className="logo" src="https://i.imgur.com/YpdBflG.png" alt="cards icon"/>
                                {pluck_list.length > 0 ?
                                <h5
                                    className="left"
                                    style={{margin: "1% 0%", fontWeight: "700"}}
                                >{pluck_list.length}</h5>:
                                null}
                                { showPluck ?
                                    <h5 className={pluck_list.length > 0 ? "left db-pluck-count" : "hidden2"}
                                        onClick={handleShowPluck}
                                    >
                                        &nbsp;[Hide]
                                    </h5> :
                                    <h5 className={pluck_list.length > 0 ? "left db-pluck-count" : "hidden2"}
                                        onClick={handleShowPluck}
                                    >
                                        &nbsp;[Show]
                                    </h5>}
                            </div>
                            {pluck_list.length > 0 ?
                            <div className={showPluck ? "card-pool-fill2": "hidden2"}>
                                {pluck_list.sort((a,b) => a.card_number - b.card_number).map((card) => {
                                    return (
                                        <div style={{display: "flex", justifyContent: "center"}}>
                                            {ultraRares.includes(card.card_number) ?
                                                <div className="ultra">
                                                    <img
                                                        onClick={() => handleRemoveCard(card)}
                                                        className="builder-card4 pointer"
                                                        title={card.name}
                                                        src={card.picture_url ? card.picture_url : "https://i.imgur.com/krY25iI.png"}
                                                        alt={card.name}
                                                        variant="bottom"/>
                                                </div>:
                                                <img
                                                    onClick={() => handleRemoveCard(card)}
                                                    className="builder-card2 pointer"
                                                    title={card.name}
                                                    src={card.picture_url ? card.picture_url : "https://i.imgur.com/krY25iI.png"}
                                                    alt={card.name}
                                                    variant="bottom"/>
                                            }
                                        </div>
                                    );
                                })}
                            </div> :
                        <h4 className="left no-cards">No cards added</h4>}
                    </div>
                </div>
            </>}
        </div>
    );
}


export default PullsDeckBuilder;
