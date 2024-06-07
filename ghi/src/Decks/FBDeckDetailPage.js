import {
    Col,
    Row,
    Card,
} from "react-bootstrap";
import { useState, useEffect, useContext } from "react";
import { NavLink, useParams, useNavigate } from 'react-router-dom';
import DeckExport from "./DeckExport";
import BackButton from "../display/BackButton";
import StatsPanel from "./StatsPanel";
import SimulateButton from "../Simulator/SimulateButton";
import DeckSheetPage from "./DeckSheetPage";
import deckQueries from "../QueryObjects/DeckQueries";
import ErrorPage from "../display/ErrorPage";
import { AuthContext } from "../context/AuthContext";
import PopUp from "../display/PopUp"
import deckActions from "../Builder/DeckActions";
import FavoriteDeck from "../Accounts/FavoriteDeck";


function FBDeckDetailPage(props) {
    const {deck_id} = useParams();
    const {cards} = props
    const {account} = useContext(AuthContext)
    const navigate = useNavigate()

    const [deck, setDeck] = useState("");
    const [noDeck, setNoDeck] = useState(false)

    const [main_list, setMainList] = useState([]);
    const [pluck_list, setPluckList] = useState([]);
    const [countedMainList, setCountedMainList] = useState([]);
    const [countedPluckList, setCountedPluckList] = useState([]);
    const [createdAgo, setCreatedAgo] = useState("");
    const [updatedAgo, setUpdatedAgo] = useState("");

    const [listView, setListView] = useState(false);
    const [showMain, setShowMain] = useState(true);
    const [showPluck, setShowPluck] = useState(true);

    const [popUpAction, setPopUpAction] = useState({
        action: "",
        message: "",
        show: false
    });

    const getDeck = async() => {
        const deckData = await deckQueries.getDeckDataById(deck_id);
        if (deckData) {
            setDeck(deckData);
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
        } else {
            setNoDeck(true)
        }
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

    const handleListView = (event) => {
        setListView(!listView);
    };

    const handleShowMain = (event) => {
        setShowMain(!showMain);
    };

    const handleShowPluck = (event) => {
        setShowPluck(!showPluck);
    };

    const handlePopUp = (action, message, show) => {
        setPopUpAction({
            action: action,
            message: message,
            show: show
        })
    }

    const handleDelete = async() => {
        const deletedDeck = await deckActions.deleteDeck(deck.id)
        if (deletedDeck) {
            navigate("/decks/")
        } else {
            console.log("Deck not deleted")
        }
    }

    return (
        <>
            { !noDeck?
                <div className="white-space">
                    {popUpAction.show === true?
                        <PopUp
                            action={popUpAction.action}
                            message={popUpAction.message}
                            show={popUpAction.show}
                            setPopUpAction={setPopUpAction}
                        />
                    :null}
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
                                <h3 className="left cd-container-child ellipsis">{deck.name}</h3>
                                { deck.private && deck.private === true ?
                                <img className="logo4"
                                    src="https://i.imgur.com/V3uOVpD.png"
                                    alt="private"
                                    title="This deck is hidden" />:
                                    null
                                }
                                {account?
                                    <FavoriteDeck deck={deck}/>:null
                                }
                            </div>
                            <h6 className="left ellipsis2"
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
                                className="left justify-content-end ellipsis2"
                                    style={{margin: '5px 0px 5px 5px', fontWeight: "600", textAlign: "left"}}
                                >
                                    {createdAgo} &nbsp; &nbsp;
                                </h6>
                                <img className="logo3" src="https://i.imgur.com/QLa1ciW.png" alt="updated on"/>
                                <h6
                                className="left justify-content-end ellipsis2"
                                    style={{margin: '5px 0px 5px 5px', fontWeight: "600", textAlign: "left"}}
                                >
                                    {updatedAgo} &nbsp; &nbsp;
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
                    {deck.description ?
                    <div>
                        <h3 className="left-h1">Deck Description</h3>
                        <h5 className="left-h1"
                            style={{marginTop: "0"}}
                            >{deck.description}</h5>
                    </div>:
                    null}
                    <div className="dd-button-row flex">
                        {(account && account.roles.includes("admin")) || (account && deck.account_id === account.id)?
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
                                    className="left heightNorm red"
                                    onClick={() => handlePopUp(handleDelete, "Are you sure you want to delete this deck?", true)}
                                    style={{marginLeft: "5px", marginRight: "7px"}}
                                    >
                                    Delete Deck
                                </button>
                            </>
                        :
                            null
                        }
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
                            deck={deck}
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
                                        <h2 className="left"
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
                                    {pluck_list.length > 0 ?
                                        <>
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
                                        <h4 className="left no-cards">No cards added</h4>
                                    }
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
                                        {main_list.sort((a,b) => a.card_number - b.card_number).map((card, index) => {
                                            return (
                                                <div style={{display: "flex", justifyContent: "center"}} key={index}>
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
                </div>:
                <ErrorPage path={"/decks/"}/>
            }
        </>
    );
}


export default FBDeckDetailPage;
