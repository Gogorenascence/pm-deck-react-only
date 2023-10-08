import {
    Col,
    Row,
    Card,
} from "react-bootstrap";
import { useState, useEffect, useContext } from "react";
import { NavLink, useParams, useNavigate } from 'react-router-dom';
import DeckExport from "./DeckExport";
import BackButton from "../display/BackButton";
import { AuthContext } from "../context/AuthContext";
import FavoriteDeck from "../Accounts/FavoriteDeck";


function DeckDetailPage(props) {

    const {deck_id} = useParams();
    const {decks, cards} = props
    const [shuffledDeck, setShuffledDeck] = useState([]);
    const [ownership, setOwnership] = useState("");
    const [mulliganList, setMulliganList] = useState([]);

    const [listView, setListView] = useState(false);
    const [showMain, setShowMain] = useState(true);
    const [showPluck, setShowPluck] = useState(true);

    const {account, users} = useContext(AuthContext)

    const deck = decks.find(deck => deck.id === deck_id)

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

    const main_list = []
    const pluck_list = []
    for (let card_number of deck.cards) {
        const mainDeckCard = cards.find(card => card.card_number === card_number)
        main_list.push(mainDeckCard)
    }
    for (let card_number of deck.pluck) {
        const pluckDeckCard = cards.find(card => card.card_number === card_number)
        pluck_list.push(pluckDeckCard)
    }

    const mainCount = {}
    const pluckCount = {}
    for (let card_number of deck.cards) {
        const mainDeckCard = cards.find(card => card.card_number === card_number)
        !mainCount[card_number]?
            mainCount[card_number] = {
                info: mainDeckCard,
                count: 1,
            }:
            mainCount[card_number]["count"]++
    }
    const countedMainList = Object.values(mainCount)

    for (let card_number of deck.pluck) {
        const pluckDeckCard = cards.find(card => card.card_number === card_number)
        !pluckCount[card_number]?
            pluckCount[card_number] = {
                info: pluckDeckCard,
                count: 1,
            }:
            pluckCount[card_number]["count"]++
    }
    const countedPluckList = Object.values(pluckCount)



    const getCountedDeckList = async() =>{
        // const response = await fetch(`${process.env.REACT_APP_FASTAPI_SERVICE_API_HOST}/api/decks/${deck_id}/counted_list/`);
        // const deckListData = await response.json();
        // setCountedMainList(deckListData[0])
        // setCountedPluckList(deckListData[1])
    };

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

    const createdBy = (deck) => {
        const account = deck.account_id? users.find(user => user.id === deck.account_id): null
        return account? account.username : "TeamPlayMaker"
    };

    useEffect(() => {
        getCountedDeckList();

        console.log("Deck Details: ", deck)
        document.title = `${deck.name} - PM CardBase`
        return () => {
            document.title = "PlayMaker CardBase"
        };
    },[]);

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

    const navigate = useNavigate()

    const handleDelete = async (event) => {
        event.preventDefault();
        const cardUrl = `${process.env.REACT_APP_FASTAPI_SERVICE_API_HOST}/api/decks/${deck_id}/`;
        const fetchConfig = {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
        };

        const response = await fetch(cardUrl, fetchConfig);
        if (response.ok) {
            navigate(`/decks`)
        };
    }


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
                            { deck.private && deck.private === true ?
                                <img className="logo4" src="https://i.imgur.com/V3uOVpD.png" alt="private" />:null
                            }
                            {account?
                                <FavoriteDeck deck={deck}/>:null
                            }
                        </div>
                        <h6 className="left"
                            style={{margin: '0px 0px 5px 10px', fontWeight: "600"}}
                        >
                            Strategies: {deck.strategies.length > 0 ? deck.strategies.join(', ') : "n/a"}
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
                                {deck.created_on.ago} &nbsp; &nbsp;
                            </h6>
                            <img className="logo3" src="https://i.imgur.com/QLa1ciW.png" alt="updated on"/>
                            <h6
                            className="left justify-content-end"
                                style={{margin: '5px 0px 5px 5px', fontWeight: "600", textAlign: "left"}}
                            >
                                {deck.updated_on.ago} &nbsp; &nbsp;
                            </h6>
                            <img className="logo2" src="https://i.imgur.com/eMGZ7ON.png" alt="created by"/>
                            <h6
                            className="left justify-content-end"
                                style={{margin: '5px 0px 5px 5px', fontWeight: "600", textAlign: "left"}}
                            >
                                {createdBy(deck)}
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
            <div style={{ display: "flex" }}>
            { (account && account.roles.includes("admin")) || (account && deck.account_id === account.id)?
                <>
                    <NavLink to={`/decks/${deck.id}/edit`}>
                        <button
                            className="left heightNorm button100 red"
                            variant="danger"
                            style={{marginLeft: ".5%", marginRight: "7px"}}
                            >
                            Edit Deck
                        </button>
                    </NavLink>
                    <button
                        className="left heightNorm button100 red"
                        onClick={handleDelete}
                        style={{marginLeft: ".5%", marginRight: "7px"}}
                        >
                        Delete Deck
                    </button>
                </>
                :
            null}
            {listView?
                <button
                    className="left"
                    variant="dark"
                    onClick={handleListView}
                >
                    Image View
                </button>:
                <button
                    className="left"
                    variant="dark"
                    onClick={handleListView}
                >
                    List View
                </button>}
            <button
                    className="left none"
                    variant="dark"
                    onClick={getShuffledDeck}
                    style={{marginLeft: ".5%"}}
                    >
                    Test Hand
            </button>
            {shuffledDeck.length > 0 ?
                <>
                    <button
                            className="left"
                            variant="dark"
                            onClick={mulligan}
                            style={{marginLeft: ".5%"}}
                            >
                            Mulligan
                    </button>
                    <button
                            className="left"
                            variant="dark"
                            onClick={clearShuffledDeck}
                            style={{marginLeft: ".5%", width: '108px', textAlign: "center"}}
                            >
                            Hide Hand
                    </button>
                </>:
            null}
            <DeckExport deck_id={deck_id} deck={deck} main_list={main_list} pluck_list={pluck_list}/>
            <BackButton/>
            </div>
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
                                                    <h5>{card.info.name} x <b>{card.count}</b></h5>
                                                        <img
                                                            className="media-card-image"
                                                            src={card.info.picture_url}
                                                            alt={card.info.name}
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
                                        className="left db-pluck-count"
                                    >{pluck_list.length}</h5>:
                                    null}
                                </div>
                                {pluck_list.length > 0 ?<>
                                        {countedPluckList.sort((a,b) => a.card_number - b.card_number).map((card) => {
                                            return (
                                                <Col style={{padding: "5px"}}>
                                                    <div className="card-container">
                                                    <h5>{card.info.name} x <b>{card.count}</b></h5>
                                                        <img
                                                            className="media-card-image"
                                                            src={card.info.picture_url}
                                                            alt={card.info.name}
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
                                            <img
                                                className="builder-card2"
                                                title={card.name}
                                                src={card.picture_url ? card.picture_url : "https://i.imgur.com/krY25iI.png"}
                                                alt={card.name}
                                                variant="bottom"/>
                                        </div>
                                    );
                                })}
                            </div>:
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
                                            <img
                                            className="builder-card2"
                                            title={card.name}
                                            src={card.picture_url ? card.picture_url : "https://i.imgur.com/krY25iI.png"}
                                            alt={card.name}
                                            variant="bottom"/>
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


export default DeckDetailPage;
