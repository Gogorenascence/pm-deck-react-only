import {
    Card,
} from "react-bootstrap";
import { useState, useEffect, useContext } from "react";
import { NavLink, useNavigate } from 'react-router-dom';
import { DeckQueryContext } from "../context/DeckQueryContext";
import { AuthContext } from "../context/AuthContext";
import deckQueries from "../QueryObjects/DeckQueries";


function AccountDecks(props) {
    const [decks, setDecks] = useState([]);
    const [noDecks, setNoDecks] = useState(false)
    const {
        account,
        users,
        getAccountData,
    } = useContext(AuthContext)
    const [deckShowMore, setDeckShowMore] = useState(20);
    const {
        deckQuery,
        setDeckQuery,
        deckSortState,
        setDeckSortState,
    } = useContext(DeckQueryContext)

    const [loading, setLoading] = useState(false)

    const {option} = props;
    const navigate = useNavigate()
    const [optionDecks, setOptionDecks] = useState(false)

    const handleGetDecks = () => {
        if (option === "myDecks") {
            getDecks()
        }
    }

    const getDecks = async() =>{
        setLoading(true)
        const accountDeckData = await deckQueries.getQueriedDecksData({account_id: account.id});
        if (accountDeckData) {
            const sortedDecks = [...accountDeckData].sort(deckSortMethods[deckSortState].method);
            setDecks(sortedDecks.reverse())
        } else {
            setNoDecks(true)
        }
        setLoading(false)
    };

    const getRandomDeck = async() =>{
        const randomIndex = Math.floor(Math.random() * decks.length);
        const randomDeck = decks[randomIndex].id;
        navigate(`/decks/${randomDeck}`);
    }

    useEffect(() => {
        handleGetDecks()
        // getAccountData();
        document.title = "Account Info - PM CardBase"
        return () => {
            document.title = "PlayMaker CardBase"
        };
    // eslint-disable-next-line
    }, [option]);

    const deckSortMethods = {
        none: { method: (a,b) => b.id.localeCompare(a.id) },
        newest: { method: (a,b) => b.id.localeCompare(a.id) },
        oldest: { method: (a,b) => a.id.localeCompare(b.id) },
        name: { method: (a,b) => a.name.localeCompare(b.name) },
        updated: { method: (a,b) => new Date(b.updated_on.full_time) - new Date(a.updated_on.full_time) },
    };

    // const handleDeckQuery = (event) => {
    //     setDeckQuery({ ...deckQuery, [event.target.name]: event.target.value });
    // };

    // const handleDeckQueryReset = (event) => {
    //     setDeckQuery({
    //         deckName: "",
    //         description: "",
    //         cardName: "",
    //         strategy: "",
    //         seriesName: "",
    //     });
    //     setDeckSortState("none")
    // };

    // const handleDeckSort = (event) => {
    //     setDeckSortState(event.target.value);
    // };

    const handleDeckShowMore = (event) => {
        setDeckShowMore(deckShowMore + 20);
    };

    const all_decks = decks
        // decks.filter(deck => deck.name.toLowerCase().includes(deckQuery.deckName.toLowerCase()))
        // .filter(deck => (deck.description).toLowerCase().includes(deckQuery.description.toLowerCase()))
        // .filter(deck => deckQuery.cardName ? (deck.card_names && deck.card_names.length > 0 ? deck.card_names.some(name => name.toLowerCase().includes(deckQuery.cardName.toLowerCase())) : false) : true)
        // .filter(deck => deckQuery.strategy? deck.strategies.some(strategy => strategy.includes(deckQuery.strategy)):deck.strategies)
        // .filter(deck => deckQuery.seriesName ? (deck.series_names && deck.series_names.length > 0 ? deck.series_names.some(series => series.toLowerCase().includes(deckQuery.seriesName.toLowerCase())) : false) : true)
        .sort(deckSortMethods[deckSortState].method)

    // const all_decks = all_decks.filter(deck => account && deck.account_id && deck.account_id === account.id)


    return (
        <>
            { !noDecks?
                <div>
                    {option === "myDecks"?
                        <div className="account-options-container">
                            <span className="flex-left-media-center">
                                <div className="margin-bottom-10 media-margin-bottom-none">
                                    <h1 className="left-h1 margin-top-none media-margin-top-40">My Uploaded Decks</h1>
                                    <h4 className="left">Showing 1 - {all_decks.slice(0, deckShowMore).length} of {all_decks.length}</h4>
                                </div>
                            </span>
                            { loading ?
                                <div className="loading-container">
                                    <div className="loading-spinner"></div>
                                </div> :
                            null}
                            {!loading ?
                                <div className="account-option-items account-scrollable">
                                    {all_decks.slice(0, deckShowMore).map((deck, index) => {
                                        const marginBottom = index < all_decks.length - 1 ? '15px' : '0';
                                        return (
                                            <NavLink to={`/decks/${deck.id}`}>
                                                <Card className="text-white text-center card-list-card3 glow"
                                                    style={{marginBottom}}>
                                                    <div className="card-image-wrapper">
                                                        <div className="card-image-clip3">
                                                            <Card.Img
                                                                src={deck.cover_card ? deck.cover_card : "https://i.imgur.com/8wqd1sD.png"}
                                                                alt="Card image"
                                                                className="card-image2"
                                                                variant="bottom"/>
                                                        </div>
                                                    </div>
                                                    <Card.ImgOverlay className="blackfooter2 mt-auto">
                                                    <div className="flex">
                                                        <h3 className="left cd-container-child ellipsis">{deck.name}</h3>
                                                        { deck.private && deck.private === true ?
                                                            <img className="logo4" src="https://i.imgur.com/V3uOVpD.png" alt="private" />:null
                                                        }
                                                    </div>
                                                    {/* <h6 style={{margin: '0px 0px 5px 0px', fontWeight: "600"}}
                                                    >
                                                        User:
                                                    </h6> */}
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
                                                        className="left justify-content-end"
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
                                                        {/* <img className="logo2" src="https://i.imgur.com/eMGZ7ON.png" alt="created by"/>
                                                        <h6
                                                        className="left justify-content-end"
                                                            style={{margin: '5px 0px 5px 5px', fontWeight: "600", textAlign: "left"}}
                                                        >
                                                            {createdBy(deck)}
                                                        </h6> */}
                                                    </div>
                                                </Card.ImgOverlay>
                                                </Card>
                                            </NavLink>
                                        );
                                    })}
                                {deckShowMore < all_decks.length ?
                                    <button
                                    variant="dark"
                                    style={{ width: "100%", marginTop:"2%"}}
                                    onClick={handleDeckShowMore}>
                                        Show More Decks ({all_decks.length - deckShowMore} Remaining)
                                    </button> : null }
                                </div>:null
                            }
                        </div>: null
                    }
                </div>:
                <div>
                    {option === "myDecks"?
                        <div className="textwindow">
                            <h1 className="undercontext">Looks Like There's Nothing Here!</h1>
                        </div>: null
                    }
                </div>
            }
        </>
    );
}

export default AccountDecks;
