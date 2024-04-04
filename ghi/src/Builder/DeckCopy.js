import {
    Col,
} from "react-bootstrap";
import React, { useState, useEffect, useContext, useRef } from 'react';
import { useParams } from "react-router";
import { BuilderQueryContext } from "../context/BuilderQueryContext";
import BuilderCardSearch from "./BuilderCardSearch";
import FEDeckExport from "../Decks/FEDeckExport";
import DeckImport from './DeckImport'
import StatsPanel from "./StatsPanel";
import FEDeckSheetPage from "../Decks/FEDeckSheetPage";


function DeckCopy(props) {
    const {deck_id} = useParams()
    const {query,
        sortState,
        boosterSet,
        rarity,
        listView,
        showMore,
        setShowMore} = useContext(BuilderQueryContext)

    const fileInput = useRef(null);
    const [importedDecks, setImportedDecks] = useState([]);
    const [showDecks, setShowDecks] = useState(false);

    const handleFileChange = (event) => {
        const files = event.target.files;
        if (files.length > 0) {
            const importedDecksArray = [];

            for (let i = 0; i < files.length; i++) {
                const file = files[i];
                const reader = new FileReader();

                reader.onload = (e) => {
                    try {
                        const importedDeck = JSON.parse(e.target.result);
                        importedDecksArray.push(importedDeck);
                        // If all files have been read, update the state
                        if (importedDecksArray.length === files.length) {
                            setImportedDecks((prevDecks) => [...prevDecks, ...importedDecksArray]);
                        }
                    } catch (error) {
                        console.error('Error parsing imported deck JSON:', error);
                    }
                };
                reader.readAsText(file);
            }
            setShowDecks(true)
        }
    };

    const importDeck = (importedDeck) => {

        const cardIDList = importedDeck.ObjectStates[0].DeckIDs.map(num => num/100)
        const cardList = cardIDList.map(cardID => cards.find(card => card.card_number === cardID))
        const main = cardList.filter(card => card.card_type[0] === 1001||
            card.card_type[0] === 1002||
            card.card_type[0] === 1003||
            card.card_type[0] === 1004||
            card.card_type[0] === 1005)
        setMainList([...main_list, ...main])
        const pluck = cardList.filter(card => card.card_type[0] === 1006||
            card.card_type[0] === 1007||
            card.card_type[0] === 1008)
        setPluckList([...pluck_list, ...pluck])
    };

    const clearDecks = () => {
        setImportedDecks([])
    }

    const handleShowDecks = (event) => {
        setShowDecks(!showDecks);
    };

    const { decks, cards, booster_sets } = props
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

    const getDeck = () => {
        const deckData = decks.find((deck) => deck.id === deck_id)
        setDeck(deckData)
        const mainList = deckData.cards.map(cardId => (cards.find(card => card.card_number === cardId)))
        const pluckList = deckData.pluck.map(cardId => (cards.find(card => card.card_number === cardId)))
        setMainList(mainList)
        setPluckList(pluckList)
    }


    const [main_list, setMainList] = useState([]);
    const [pluck_list, setPluckList] = useState([]);
    const combinedList = main_list.concat(pluck_list);
    const uniqueList = [...new Set(combinedList)];

    const [selectedCard, setSelectedCard] = useState(null);

    const [showPool, setShowPool] = useState(true);
    const [showMain, setShowMain] = useState(true);
    const [showPluck, setShowPluck] = useState(true);

    useEffect(() => {
        getDeck()
        document.title = "Deck Copy - PM CardBase"
        return () => {
            document.title = "PlayMaker CardBase"
        };
    // eslint-disable-next-line
    },[deck_id]);

    const sortMethods = {
        none: { method: (a,b) => a.card_number - b.card_number },
        newest: { method: (a,b) => b.id.localeCompare(a.id) },
        oldest: { method: (a,b) => a.id.localeCompare(b.id) },
        name: { method: (a,b) => a.name.localeCompare(b.name) },
        card_number: { method: (a,b) => a.card_number - b.card_number },
        enthusiasm_highest: { method: (a,b) => b.enthusiasm - a.enthusiasm },
        enthusiasm_lowest: { method: (a,b) => a.enthusiasm - b.enthusiasm },
    };

    const all_cards = cards.filter(card => card.name.toLowerCase().includes(query.cardName.toLowerCase()))
        .filter(card => (card.effect_text + card.second_effect_text).toLowerCase().includes(query.cardText.toLowerCase()))
        .filter(card => card.card_number.toString().includes(query.cardNumber))
        .filter(card => card.hero_id.toLowerCase().includes(query.heroID.toLowerCase()))
        .filter(card => card.series_name.toLowerCase().includes(query.series.toLowerCase()))
        .filter(card => card.illustrator.toLowerCase().includes(query.illustrator.toLowerCase()))
        .filter(card => query.type? card.card_type.some(type => type.toString() === query.type):card.card_type)
        .filter(card => card.card_class.includes(query.cardClass))
        .filter(card => query.extraEffect? card.extra_effects.some(effect => effect.toString() === query.extraEffect):card.extra_effects)
        .filter(card => query.reaction? card.reactions.some(reaction => reaction.toString() === query.reaction):card.reactions)
        .filter(card => query.tag? card.card_tags.some(tag => tag.toString() === query.tag):card.card_tags)
        .filter(card => boosterSet && !rarity ? boosterSet.all_cards.includes(card.card_number):card.card_number)
        .filter(card => boosterSet && rarity ? boosterSet[rarity].includes(card.card_number):card.card_number)
        .sort(sortMethods[sortState].method)

    const handleShowMore = (event) => {
        setShowMore(showMore + 20);
    };

    const handleChange = (event) => {
        setDeck({ ...deck, [event.target.name]: event.target.value });
    };

    const handleClick = (card) => {
        if (card.card_type[0] === 1006 ||
            card.card_type[0] === 1007 ||
            card.card_type[0] === 1008){
            setPluckList([...pluck_list, card]);
        }else{
            setMainList([...main_list, card]);
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

    const handleShowPool = (event) => {
        setShowPool(!showPool);
    };

    const handleShowMain = (event) => {
        setShowMain(!showMain);
    };

    const handleShowPluck = (event) => {
        setShowPluck(!showPluck);
    };

    const preprocessText = (text) => {
        return text.split("//").join("\n");
    };

    function generateRandomString(length) {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let randomString = '';

            for (let i = 0; i < length; i++) {
            const randomIndex = Math.floor(Math.random() * characters.length);
            randomString += characters.charAt(randomIndex);
            }

            return randomString;
        }

    return (
        <div className="white-space">
            <div className="between-space">
                <span className="media-flex-center">
                    <div>
                        <h1 className="left-h1">Deck Copy</h1>
                        <BuilderCardSearch boosterSets={booster_sets}/>
                        <br/>
                        <div className="media-bot-30">
                            <h2 className="left media-margin-top-none">Deck Name</h2>
                            <input
                                className="builder-input"
                                type="text"
                                placeholder=" Deck Name"
                                onChange={handleChange}
                                name="name"
                                value={deck.name}>
                            </input>
                            <br/>
                            <div style={{display: "flex", marginTop: "3px"}}>
                                <FEDeckExport deck_id={generateRandomString(16)} deck={deck} main_list={main_list} pluck_list={pluck_list}/>
                                <FEDeckSheetPage deck={deck} main_list={main_list} pluck_list={pluck_list}/>
                                <button
                                    className="left red"
                                    style={{ marginTop: "5px"}}
                                    onClick={clearMain}
                                    >
                                    Clear Main
                                </button>
                                <button
                                    className="left red"
                                    style={{ marginTop: "5px"}}
                                    onClick={clearPluck}
                                    >
                                    Clear Pluck
                                </button>
                            </div>
                        </div>
                    </div>
                </span>
                <div className={showPool ? "cardpool2-ro" : "no-cardpool-ro"}>
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
                                <h5 className="left db-pool-count hidden2 media-display"
                                    onClick={() => handleShowPool()}>
                                        &nbsp;[Hide]
                                </h5> :
                                <h5 className="left db-pool-count"
                                    onClick={() => handleShowPool()}>
                                    &nbsp;[Show]
                                </h5>}
                        </div>
                        <div className={showPool ? "scrollable2" : "hidden2"}>
                            <div style={{margin: "8px"}}>

                            <div className="card-pool-fill">
                                {all_cards.slice(0, showMore).map((card) => {
                                    return (
                                        <div style={{display: "flex", justifyContent: "center"}}>
                                            { ((card.card_type[0] < 1006 && main_list.length < 60)||
                                                (card.card_type[0] > 1005 && (card.hero_id === "GEN" || main_list?.filter(cardItem => cardItem.hero_id === card.hero_id).length > 3) && pluck_list.length < 30))
                                                && combinedList.filter(cardItem => cardItem.card_number === card.card_number).length < 4?
                                                <img
                                                    onClick={() => handleClick(card)}
                                                    className={uniqueList.includes(card) ? "selected builder-card pointer glow3" : "builder-card pointer glow3"}
                                                    title={`${card.name}\n${preprocessText(card.effect_text)}\n${card.second_effect_text ? preprocessText(card.second_effect_text) : ""}`}
                                                    src={card.picture_url ? card.picture_url : "https://i.imgur.com/krY25iI.png"}
                                                    alt={card.name}/>
                                            :
                                                <img
                                                    className="builder-card glow3 greyScale"
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
                </div>
            </div>
            <DeckImport
                fileInput={fileInput}
                importDeck={importDeck}
                importedDecks={importedDecks}
                showDecks={showDecks}
                handleFileChange={handleFileChange}
                handleShowDecks={handleShowDecks}
                clearDecks={clearDecks}
            />
            <StatsPanel
                main_list={main_list}
                pluck_list={pluck_list}
                handleRemoveCard={handleRemoveCard}
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
                                                        className="card-image media-hover-center"
                                                        src={card.picture_url}
                                                        alt={card.name}
                                                    />
                                                </div>
                                            </Col>
                                        );
                                    })}
                                </>:
                            <h4 className="left margin-0 media-margin-bottom-20">No cards added</h4>}
                        </div>
                    </div>

                    <div className="pluckdeck3 media-margin-top-10">
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
                                                { (card.hero_id === "GEN" || main_list?.filter(cardItem => cardItem.hero_id === card.hero_id).length > 3)?
                                                    <div className="card-container pointer">
                                                        <h5 onClick={() => handleRemoveCard(card)}>{card.name}</h5>
                                                        <img
                                                            className="card-image media-hover-center"
                                                            src={card.picture_url}
                                                            alt={card.name}
                                                        />
                                                    </div>
                                                :
                                                    <div className="card-container pointer">
                                                        <h5 onClick={() => handleRemoveCard(card)}>{card.name}</h5>
                                                        <h6 className='error3'>The Main deck needs at least 4 cards with the same Hero ID as this card.</h6>
                                                        <img
                                                            className="card-image3 greyScale media-hover-center"
                                                            src={card.picture_url}
                                                            alt={card.name}
                                                        />
                                                    </div>
                                                }
                                            </Col>
                                        );
                                    })}
                                </>:
                            <h4 className="left margin-0 media-margin-bottom-20">No cards added</h4>}
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
                                        <img
                                            className="builder-card2 pointer"
                                            onClick={() => handleRemoveCard(card)}
                                            title={card.name}
                                            src={card.picture_url ? card.picture_url : "https://i.imgur.com/krY25iI.png"}
                                            alt={card.name}/>
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
                                        { (card.hero_id === "GEN" || main_list?.filter(cardItem => cardItem.hero_id === card.hero_id).length > 3)?
                                            <img
                                                className="builder-card2 pointer"
                                                onClick={() => handleRemoveCard(card)}
                                                title={card.name}
                                                src={card.picture_url ? card.picture_url : "https://i.imgur.com/krY25iI.png"}
                                                alt={card.name}/>
                                        :
                                            <img
                                                className="builder-card2 pointer greyScale"
                                                onClick={() => handleRemoveCard(card)}
                                                title="The Main deck needs at least 4 cards with the same Hero ID as this card."
                                                src={card.picture_url ? card.picture_url : "https://i.imgur.com/krY25iI.png"}
                                                alt={card.name}/>
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


export default DeckCopy;
