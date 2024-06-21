import {
    Card,
} from "react-bootstrap";
import { useState, useEffect, useContext } from "react";
import { NavLink } from 'react-router-dom';
import { FBDeckQueryContext } from "../context/FBDeckQueryContext";
import deckQueries from "../QueryObjects/DeckQueries";
import FavoriteDeck from "../Accounts/FavoriteDeck";
import { AuthContext } from "../context/AuthContext";
import AutoComplete from "../display/AutoComplete";
import helper from "../QueryObjects/Helper";


function DecksPage({
    cards,
    card_categories
}) {
    const {
        deckQuery,
        setDeckQuery,
        deckSortState,
        setDeckSortState,
        queryChanged,
        setQueryChanged
    } = useContext(FBDeckQueryContext)
    const {account} = useContext(AuthContext)

    const [deckShowMore, setDeckShowMore] = useState(20);
    const [loading, setLoading] = useState(false)

    const [fullDecks, setFullDecks] = useState([])
    const [lastDoc, setLastDoc] = useState("")
    const [endOfList, setEndOfList] = useState("false")

    const [showAutoComplete, setShowAutoComplete] = useState(false)

    const getDecks = async() =>{
        setLoading(true)
        // const decksData = await deckQueries.getQueriedDecksData({"private": false});
        const decksData = await deckQueries.getDecksListData(
            deckQuery,
            firebaseSortMethods[deckSortState]
        )
        if (decksData && decksData[0].length) {
            setFullDecks(decksData[0])
            setLastDoc(decksData[1])
            decksData[0].length < 20?
                setEndOfList(true):
                setEndOfList(false)
        } else {
            setFullDecks([])
            setEndOfList(true)
        }
        setLoading(false)
    };

    const getMoreDecks = async() =>{
        setLoading(true)
        const decksData = await deckQueries.getMoreDecksListData(
            deckQuery,
            firebaseSortMethods[deckSortState],
            lastDoc,
            20
        )
        if (decksData && decksData[0].length) {
            if (queryChanged) {
                setFullDecks(decksData[0])
                setLastDoc(decksData[1])
            } else {
                const newFullDecks = fullDecks.concat(decksData[0])
                setFullDecks(newFullDecks)
                setLastDoc(decksData[1])
            }
            decksData[0].length < 20?
            setEndOfList(true):
            setEndOfList(false)
        } else {
            setEndOfList(true)
        }
        setLoading(false)
        setQueryChanged(false)
        console.log(fullDecks)
    };

    useEffect(() => {
        getDecks();
        document.title = "Decks - PM CardBase"
        account? console.log("account") : console.log("dog")
        return () => {
            document.title = "PlayMaker CardBase"
        };
    // eslint-disable-next-line
    }, []);

    const firebaseSortMethods = {
        none: ["updated_on.full_time", "desc"],
        newest: ["created_on.full_time", "desc"],
        oldest: ["created_on.full_time", "asc"],
        name: ["name", "asc"],
        updated: ["updated_on.full_time", "desc"]
    };

    const firebaseQueryTerms = {
        none: "",
        equals: "=="
    }

    const handleDeckQuery = (event, term) => {
        if (event.target.value) {
            setDeckQuery({ ...deckQuery, [event.target.name]: [event.target.value, term, true] });
        } else {
            setDeckQuery({ ...deckQuery, [event.target.name]: [event.target.value, term, false] });
        }
        if (event.target.name === "card_series_names") setShowAutoComplete(true)
        setQueryChanged(true)
    };

    const handleDeckQueryReset = () => {
        const oldDeckQuery = deckQuery
        const newDeckQuery = {
            name: ["","", false],
            creator: ["","", false],
            card_series_names: ["","", false],
            private: [false, "==", true]
        }
        setDeckQuery(newDeckQuery);
        setDeckSortState("none")
        if (helper.objectsAreEqual(oldDeckQuery, newDeckQuery)) {
            setQueryChanged(false)
        }
    };

    const handleDeckSort = (event) => {
        setDeckSortState(event.target.value);
        console.log(firebaseSortMethods[deckSortState])
        // const updated = decks.map(deck => deck.updated_on)
    };

    const all_decks = fullDecks

    const cardNameList = cards.filter(card => card.name.toLowerCase()
        .includes(deckQuery.card_series_names[0].toLowerCase()))

    const cardCatList = card_categories.filter(card_category => card_category.cat_type !== "card_class")
        .filter(card_category => card_category.name.toLowerCase()
        .includes(deckQuery.card_series_names[0].toLowerCase()))

    const nameSeriesList = cardNameList.concat(cardCatList).sort((a,b) => a.name.localeCompare(b.name))
    const uniqueNameSeriesList = nameSeriesList.reduce((acc, listItem) => {
        if (!acc.find(item => item.name === listItem.name)) {
            acc.push(listItem)
        }
        return acc
    }, [])

    const getAllDecksData = async() => {
        const all_decks_data = await deckQueries.getAllDecksData()
        if (all_decks_data) console.log(all_decks_data)
    }


    return (
        <div className="white-space">
            <h1 className="left-h1">Deck Search</h1>
            <h2 className="left">Search our collection of decks</h2>
            <input
                className="left dcbsearch-large"
                type="text"
                placeholder=" Deck's Name is..."
                name="name"
                value={deckQuery.name[0]}
                onChange={(event) => handleDeckQuery(event, firebaseQueryTerms.equals)}>
            </input>
            <br/>
            <input
                className="left dcbsearch-large"
                type="text"
                placeholder=" Creator's Username is..."
                name="creator"
                value={deckQuery.creator[0]}
                onChange={(event) => handleDeckQuery(event, firebaseQueryTerms.equals)}>
            </input>
            <br/>
            <AutoComplete
                itemList={uniqueNameSeriesList}
                renderCondition={showAutoComplete && uniqueNameSeriesList.length > 1}
                setNoneRenderFunction={() => setShowAutoComplete(false)}
                onChangeFunction={(event) => handleDeckQuery(event, firebaseQueryTerms.none)}
                name={"card_series_names"}
                value={deckQuery.card_series_names[0]}
                placeholder={" Contains a Card or Series Named..."}
                onClickFunction={(item) => setDeckQuery(
                    {...deckQuery, ["card_series_names"]: [item.name, "", true]})}
                size={"360px"}
            />
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
            <button
                className="left"
                variant="dark"
                onClick={getDecks}
                >
                Search Decks
            </button>
            <button
                className="left"
                variant="dark"
                onClick={handleDeckQueryReset}
                >
                Reset Filters
            </button>
            <NavLink to="/deckbuilder">
                <button className="left"
                    variant="dark">
                        Create Deck
                </button>
            </NavLink>

            { loading ?
                <div className="loading-container">
                    <div className="loading-spinner"></div>
                </div> :
                <h4 className="left-h3">
                    {all_decks.length > 0 ? `Showing Results 1 - ${all_decks.length}${!endOfList? " of Many": ` of ${all_decks.length}`}`:
                        "No Decks Fit Your Search Criteria"}
                </h4>}

            <div className="decks-page-card-list2">
                {all_decks.map((deck) => {
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
            {!endOfList ?
                <button
                    variant="dark"
                    style={{ width: "100%", marginTop:"2%"}}
                    onClick={getMoreDecks}>
                    Show More Decks
                </button>
                : null }
            <button onClick={getAllDecksData}>All Decks</button>
        </div>
    );
}

export default DecksPage;
