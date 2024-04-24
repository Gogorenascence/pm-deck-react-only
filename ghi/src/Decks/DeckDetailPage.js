import {
    Col,
    Row,
    Card,
} from "react-bootstrap";
import { useState, useEffect } from "react";
import { NavLink, useParams } from 'react-router-dom';
import DeckExport from "./DeckExport";
import BackButton from "../display/BackButton";
import StatsPanel from "./StatsPanel";
import SimulateButton from "../Simulator/SimulateButton";
import DeckSheetPage from "./DeckSheetPage";
import deckQueries from "../QueryObjects/DeckQueries";


function DeckDetailPage(props) {
    const {deck_id} = useParams();
    const {cards} = props
    const [deck, setDeck] = useState("");
    const [shuffledDeck, setShuffledDeck] = useState([]);
    const [ownership, setOwnership] = useState("");
    const [mulliganList, setMulliganList] = useState([]);

    const [main_list, setMainList] = useState([]);
    const [pluck_list, setPluckList] = useState([]);
    const [countedMainList, setCountedMainList] = useState([]);
    const [countedPluckList, setCountedPluckList] = useState([]);
    const [createdAgo, setCreatedAgo] = useState("");
    const [updatedAgo, setUpdatedAgo] = useState("");

    const [listView, setListView] = useState(false);
    const [showMain, setShowMain] = useState(true);
    const [showPluck, setShowPluck] = useState(true);

    const getDeck = async() => {
        const deckData = await deckQueries.getDeckDataById(deck_id);
        setDeck(deckData);
        console.log(deckData)
        setCreatedAgo(deckData.created_on.ago);
        setUpdatedAgo(deckData.updated_on.ago);

        const mainList = []
        const pluckList = []
        for (let card_number of deckData.cards) {
            const mainDeckCard = cards.find(card => card.card_number === card_number)
            mainList.push(mainDeckCard)
        }
        setMainList(mainList)

        for (let card_number of deckData.pluck) {
            const pluckDeckCard = cards.find(card => card.card_number === card_number)
            pluckList.push(pluckDeckCard)
        }
        setPluckList(pluckList)

        const mainCount = {}
        const pluckCount = {}
        for (let card_number of deckData.cards) {
            const mainDeckCard = cards.find(card => card.card_number === card_number)
            !mainCount[card_number]?
                mainCount[card_number] = {
                    info: mainDeckCard,
                    count: 1,
                }:
                mainCount[card_number]["count"]++
        }
        setCountedMainList(Object.values(mainCount))

        for (let card_number of deckData.pluck) {
            const pluckDeckCard = cards.find(card => card.card_number === card_number)
            !pluckCount[card_number]?
                pluckCount[card_number] = {
                    info: pluckDeckCard,
                    count: 1,
                }:
                pluckCount[card_number]["count"]++
        }
        setCountedPluckList(Object.values(pluckCount))
    }


    const getShuffledDeck = async() =>{
        const shuffledDeck = main_list.slice(0)
        let currentIndex = shuffledDeck.length,  randomIndex;
        // While there remain elements to shuffle.
        while (currentIndex !== 0) {
            // Pick a remaining element.
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;
            // And swap it with the current element.
            [shuffledDeck[currentIndex], shuffledDeck[randomIndex]] = [
            shuffledDeck[randomIndex], shuffledDeck[currentIndex]];
        }
        setShuffledDeck(shuffledDeck);

        const randomPluckIndex = Math.floor(Math.random() * pluck_list.length);
        setOwnership(pluck_list[randomPluckIndex]);
    }

    const clearShuffledDeck = async() =>{
        setShuffledDeck([]);
        setOwnership("");
    }


    useEffect(() => {
        window.scroll(0, 0);
        document.body.style.overflow = 'auto';
        getDeck();
    },[deck_id]);

    useEffect(() => {
        document.title = `${deck.name} - PM CardBase`
        return () => {
            document.title = "PlayMaker CardBase"
        };
    },[deck]);

    const handleMulliganChange = (card) => {
        const deckIndex = shuffledDeck.indexOf(card)
        if (mulliganList.includes(deckIndex)){
            const mulliganIndex = mulliganList.indexOf(deckIndex);
            const newMulliganList = [...mulliganList];
            newMulliganList.splice(mulliganIndex, 1);
            setMulliganList(newMulliganList);
        }else{
            setMulliganList([...mulliganList, deckIndex]);
        }
    }

    const mulligan = async() => {
        for (let card of shuffledDeck){
            const cardIndex = shuffledDeck.indexOf(card)
            if (mulliganList.includes(cardIndex)){
                shuffledDeck[cardIndex] = "Gone"
            }
        }
        for (let card of shuffledDeck.slice(0)){
            const removeIndex = shuffledDeck.indexOf(card)
            if (card === "Gone"){
                shuffledDeck.splice(removeIndex, 1)
            }
        }
        setShuffledDeck(shuffledDeck.slice(0))
        setMulliganList([])
    }

    const handleListView = (event) => {
        setListView(!listView);
    };

    const handleShowMain = (event) => {
        setShowMain(!showMain);
    };

    const handleShowPluck = (event) => {
        setShowPluck(!showPluck);
    };


    return (
        <div className="white-space">
            <Card className="text-white text-center card-list-card3" style={{margin: "2% 0%" }}>
                <div className="card-image-wrapper">
                    <div className="card-image-clip2">
                        <Card.Img
                            src={deck.cover_card ? deck.cover_card : "https://i.imgur.com/8wqd1sD.png"}
                            alt="Card image"
                            className="card-image2"
                            variant="bottom"/>
                    </div>
                </div>
                <Card.ImgOverlay className="blackfooter2">
                    <div style={{display: "flex"}}>
                        <h3 className="left cd-container-child media-margin-top-none">{deck.name}</h3>
                    </div>
                    <h6 className="left"
                        style={{margin: '0px 0px 5px 10px', fontWeight: "600"}}
                    >
                        Strategies: {deck.strategies?.length > 0 ? deck.strategies.join(', ') : "n/a"}
                    </h6>
                    <h6 className="left"
                        style={{margin: '0px 0px 10px 10px', fontWeight: "600"}}
                    >
                        Main Deck: {main_list.length} &nbsp; Pluck Deck: {pluck_list.length}
                    </h6>
                    <div style={{ display: "flex" }}>
                        <img className="logo2" src="https://i.imgur.com/nIY2qSx.png" alt="created on"/>
                        <h6
                        className="left justify-content-end"
                            style={{margin: '5px 0px 5px 5px', fontWeight: "600", textAlign: "left"}}
                        >
                            {createdAgo} &nbsp; &nbsp;
                        </h6>
                        <img className="logo3" src="https://i.imgur.com/QLa1ciW.png" alt="updated on"/>
                        <h6
                        className="left justify-content-end"
                            style={{margin: '5px 0px 5px 5px', fontWeight: "600", textAlign: "left"}}
                        >
                            {updatedAgo} &nbsp; &nbsp;
                        </h6>
                    </div>
                </Card.ImgOverlay>
            </Card>
            {deck.description ?
            <div>
                <h3 className="left-h1">Deck Description</h3>
                <h5 className="left-h1"
                    style={{marginTop: "0"}}
                    >{deck.description}</h5>
            </div>:
            null}
            <div style={{display: "flex"}}>
                        {shuffledDeck.length > 0 ?
                <div className="maindeck" style={{width: "90%"}}>
                    <div style={{marginLeft: "10px"}}>
                        <h4
                            className="left"
                            style={{margin: "10px 10px", fontWeight: "700"}}
                            >Test Hand
                        </h4>
                        <div style={{width: "95%", marginLeft: "20px"}}>
                            <Row xs="auto" className="justify-content-start">
                                {shuffledDeck.slice(0,6).map((card) => {
                                    return (
                                        <Col
                                            style={{padding: "2px 5px 8px 5px"}}>
                                            <img
                                                style={{
                                                    width: '115px',
                                                    margin: '10px 0px 10px 0px',
                                                    borderRadius: "7px",
                                                    overflow: "hidden"}}
                                                onClick={() => handleMulliganChange(card)}
                                                className={mulliganList.includes(shuffledDeck.indexOf(card)) ? "selected builder-card3" : "builder-card3"}
                                                title={card.name}
                                                src={card.picture_url ? card.picture_url : "https://i.imgur.com/krY25iI.png"}
                                                alt={card.name}/>
                                        </Col>
                                    );
                                })}
                            </Row>
                        </div>
                    </div>
                </div>:
                        null}
                    {ownership ?

                    <div className="pluckdeck" style={{marginLeft: ".5%"}}>
                        <h4
                            className="left"
                            style={{margin: "10px 10px", fontWeight: "700"}}
                            >Ownwership
                        </h4>
                        <Row xs="auto" className="justify-content-center">
                            <Col style={{paddingTop: "2px"}}>
                                <img
                                    className="builder-card3"
                                    style={{ width: '115px',
                                    margin: '10px 0px 10px 0px',
                                    borderRadius: "7px",
                                    overflow: "hidden"}}

                                    title={ownership.name}
                                    src={ownership.picture_url ? ownership.picture_url : "https://i.imgur.com/krY25iI.png"}
                                    alt={ownership.name}
                                    variant="bottom"/>

                            </Col>
                        </Row>
                    </div>:
                    null}
            </div>
            <div className="dd-button-row flex">
                {listView?
                    <button
                        className="left"
                        onClick={handleListView}
                    >
                        Image View
                    </button>:
                    <button
                        className="left"
                        onClick={handleListView}
                    >
                        List View
                    </button>
                }
                <button
                        className="left none"
                        onClick={getShuffledDeck}
                        style={{marginLeft: ".5%"}}
                        >
                        Test Hand
                </button>
                {shuffledDeck.length > 0 ?
                    <>
                        <button
                            className="left"
                            onClick={mulligan}
                            style={{marginLeft: ".5%"}}
                            >
                            Mulligan
                        </button>
                        <button
                            className="left"
                            onClick={clearShuffledDeck}
                            style={{marginLeft: ".5%", width: '108px', textAlign: "center"}}
                            >
                            Hide Hand
                        </button>
                    </>: null
                }
                <DeckExport deck_id={deck_id} deck={deck} main_list={main_list} pluck_list={pluck_list}/>
                <DeckSheetPage name={deck.name} main_list={main_list} pluck_list={pluck_list}/>
                <NavLink to={`/decks/${deck.id}/copy`}>
                    <button
                        className="left heightNorm"
                        style={{marginLeft: ".5%", textAlign: "center"}}
                        >
                        Copy Decks
                    </button>
                </NavLink>
                <SimulateButton
                    deckName={deck.name}
                    main_list={deck.cards}
                    pluck_list={deck.pluck}
                    />
                <BackButton/>
            </div>
            <StatsPanel
                main_list={main_list}
                pluck_list={pluck_list}
            />
            {listView?
                <div className="deck-list media-display">
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
                                    className="left db-main-count"
                                >{main_list.length}</h5>:
                                null}
                            </div>
                            {main_list.length > 0 ?<>
                                    {countedMainList.sort((a,b) => a.card_number - b.card_number).map((card) => {
                                        return (
                                            <Col style={{padding: "5px"}}>
                                                <div className="card-container">
                                                    <NavLink to={`/cards/${card.info.card_number}`} className="nav-link2">
                                                        <h5>{card.info.name} x <b>{card.count}</b></h5>
                                                        <img
                                                            className="card-image media-card-image"
                                                            src={card.info.picture_url}
                                                            alt={card.info.name}
                                                        />
                                                    </NavLink>
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
                                    className="left db-pluck-count"
                                >{pluck_list.length}</h5>:
                                null}
                            </div>
                            {pluck_list.length > 0 ?<>
                                    {countedPluckList.sort((a,b) => a.card_number - b.card_number).map((card) => {
                                        return (
                                            <Col style={{padding: "5px"}}>
                                                <div className="card-container">
                                                    <NavLink to={`/cards/${card.info.card_number}`} className="nav-link2">
                                                        <h5>{card.info.name} x <b>{card.count}</b></h5>
                                                        <img
                                                            className="card-image media-card-image"
                                                            src={card.info.picture_url}
                                                            alt={card.info.name}
                                                        />
                                                    </NavLink>
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
                <div className="maindeck2">
                    <div>
                        <div style={{display: "flex", alignItems: "center", marginLeft: "20px"}}>
                            <h2
                                className="left"
                                style={{margin: "1% 0%", fontWeight: "700"}}
                            >Main Deck</h2>
                            <img className="logo" src="https://i.imgur.com/YpdBflG.png" alt="cards icon"/>
                            {main_list.length > 0 ?
                            <h5
                                className="left db-main-count"
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
                                            <NavLink to={`/cards/${card.card_number}`} className="nav-link2">
                                                <img
                                                    className="builder-card2"
                                                    title={card.name}
                                                    src={card.picture_url ? card.picture_url : "https://i.imgur.com/krY25iI.png"}
                                                    alt={card.name}
                                                    variant="bottom"/>
                                            </NavLink>
                                        </div>
                                    );
                                })}
                            </div>:
                            <h4 className="left no-cards">No cards added</h4>
                        }
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
                                className="left db-pluck-count"
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
                                            <NavLink to={`/cards/${card.card_number}`} className="nav-link2">
                                                <img
                                                    className="builder-card2"
                                                    title={card.name}
                                                    src={card.picture_url ? card.picture_url : "https://i.imgur.com/krY25iI.png"}
                                                    alt={card.name}
                                                    variant="bottom"/>
                                            </NavLink>
                                        </div>
                                    );
                                })}
                            </div> :
                            <h4 className="left no-cards">No cards added</h4>
                        }
                    </div>
                </div>
            </>}
        </div>
    );
}


export default DeckDetailPage;
