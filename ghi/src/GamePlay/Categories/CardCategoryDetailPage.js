import { useState, useEffect, useContext } from "react";
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import ErrorPage from "../../display/ErrorPage";


function CardCategoryDetail(props) {
    const {
        card_categories,
        cards
    } = props
    const {card_category_id} = useParams()

    const [cardCategory, setCardCategory ] = useState({
        cat_type: "",
        name: "",
        description: "",
        support: [],
        anti_support: [],
        created_on: {},
        updated_on: {},
    });
    const [noCardCategory, setNoCardCategory ] = useState(false)

    const [support_list, setSupportList] = useState([]);
    const [anti_support_list, setAntiSupportList] = useState([]);

    const [members, setMembers] = useState([]);

    const [showPool, setShowPool] = useState(true);
    const [showSupport, setShowSupport] = useState(true);
    const [showAntiSupport, setShowAntiSupport] = useState(true);


    const getCardCategory = async() =>{
        const category_data = card_categories.find(category => category.id === card_category_id);
        if (category_data) {
            setCardCategory(category_data);

            const sortedCards = [...cards].sort((a,b) => a.name.localeCompare(b.name));
            const cat_name = category_data.name.toLowerCase()
            const seriesMembersList = sortedCards.filter(card => card.series_name.toLowerCase().includes(cat_name))
            const classMembersList = sortedCards.filter(card => card.card_class.toLowerCase().includes(cat_name))
            if (category_data.cat_type === "series"||category_data.cat_type === "sub_series") {
                setMembers(seriesMembersList);
            } else {
                setMembers(classMembersList)
            }

            const support_card_list = category_data.support.map(supportItem =>
                cards.find(card => card.card_number === supportItem))
            const anti_support_card_list = category_data.anti_support.map(antiSupportItem =>
                cards.find(card => card.card_number === antiSupportItem))
            setSupportList(support_card_list)
            setAntiSupportList(anti_support_card_list)
        } else {
            setNoCardCategory(true)
        }
    };

    useEffect(() => {
        window.scroll(0, 0);
        getCardCategory();
    // eslint-disable-next-line
    },[]);

    useEffect(() => {
        document.title = `${cardCategory.name} - PM CardBase`
        return () => {
            document.title = "PlayMaker CardBase"
        };
    // eslint-disable-next-line
    },[cardCategory]);

    const handleShowPool = (event) => {
        setShowPool(!showPool);
    };

    const handleShowSupport = (event) => {
        setShowSupport(!showSupport);
    };

    const handleShowAntiSupport = (event) => {
        setShowAntiSupport(!showAntiSupport);
    };

    const preprocessText = (text) => {
        return text.split("//").join("\n");
    };

    return (
        <>
            { !noCardCategory?
                <div className="white-space">
                    <h1 className="margin-top-40">{cardCategory.name}</h1>
                    <h2>{cardCategory.description}</h2>
                        <div className={showPool ? "rarities" : "no-rarities"} style={{marginTop: "20px"}}>
                            <div style={{display: "flex", alignItems: "center"}}>
                                <h2
                                    className="left"
                                    style={{margin: "1% 0px 1% 20px", fontWeight: "700"}}
                                >Members</h2>
                                <img className="logo" src="https://i.imgur.com/YpdBflG.png" alt="cards icon"/>
                                {members.length > 0 ?
                                    <h5
                                        className="left db-pool-count"
                                    >{members.length}</h5>:
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
                            <div className={showPool ? "card-pool-fill2" : "hidden2"}>
                                    {members.map((card) => {
                                        return (
                                            <NavLink to={`/cards/${card.card_number}`} key={card.name}>
                                            <div style={{display: "flex", justifyContent: "center"}}>
                                                <img
                                                    className="builder-card2 pointer glow3"
                                                    title={`${card.name}\n${preprocessText(card.effect_text)}\n${card.second_effect_text ? preprocessText(card.second_effect_text) : ""}`}
                                                    src={card.picture_url ? card.picture_url : "https://i.imgur.com/krY25iI.png"}
                                                    alt={card.name}/>
                                            </div>
                                            </NavLink>
                                        );
                                    })}
                            </div>
                        </div>
                        <div className={support_list.length > 0? "support":"hidden2"}>
                        <div>
                            <div style={{display: "flex", alignItems: "center", marginLeft: "20px"}}>
                                    <h2
                                        className="left"
                                        style={{margin: "1% 0%", fontWeight: "700"}}
                                    >Support</h2>
                                    <img className="logo" src="https://i.imgur.com/YpdBflG.png" alt="cards icon"/>
                                    {support_list.length > 0 ?
                                    <h5
                                        className="left"
                                        style={{margin: "1% 0%", fontWeight: "700"}}
                                    >{support_list.length}</h5>:
                                    null}
                                    { showSupport ?
                                        <h5 className={support_list.length > 0 ? "left db-main-count" : "hidden2"}
                                            onClick={() => handleShowSupport()}>
                                                &nbsp;[Hide]
                                        </h5> :
                                        <h5 className={support_list.length > 0 ? "left db-main-count" : "hidden2"}
                                            onClick={() => handleShowSupport()}>
                                            &nbsp;[Show]
                                        </h5>}
                            </div>

                            {support_list.length > 0 ?
                                <div className={showSupport ? "card-pool-fill2": "hidden2"}>
                                {support_list.sort((a,b) => a.card_number - b.card_number).map((card) => {
                                    return (
                                        <NavLink to={`/cards/${card.card_number}`} key={card.name}>
                                        <div style={{display: "flex", justifyContent: "center"}}>
                                            <img
                                                className="builder-card2 pointer"
                                                title={card.name}
                                                src={card.picture_url ? card.picture_url : "https://i.imgur.com/krY25iI.png"}
                                                alt={card.name}/>
                                        </div>
                                        </NavLink>
                                    );
                                })}
                                </div> :
                            <h4 className="left no-cards">No cards added</h4>}
                        </div>
                        </div>

                            <div className={anti_support_list.length > 0? "anti_support":"hidden2"}>
                                <div>
                                    <div style={{display: "flex", alignItems: "center", marginLeft: "20px"}}>
                                        <h2
                                            className="left"
                                            style={{margin: "1% 0%", fontWeight: "700"}}
                                        >Anti-Support</h2>
                                        <img className="logo" src="https://i.imgur.com/YpdBflG.png" alt="cards icon"/>
                                        {anti_support_list.length > 0 ?
                                        <h5
                                            className="left"
                                            style={{margin: "1% 0%", fontWeight: "700"}}
                                        >{anti_support_list.length}</h5>:
                                        null}
                                        { showAntiSupport ?
                                            <h5 className={anti_support_list.length > 0 ? "left db-main-count" : "hidden2"}
                                                onClick={handleShowAntiSupport}
                                            >
                                                &nbsp;[Hide]
                                            </h5> :
                                            <h5 className={anti_support_list.length > 0 ? "left db-main-count" : "hidden2"}
                                                onClick={handleShowAntiSupport}
                                            >
                                                &nbsp;[Show]
                                            </h5>}
                                    </div>
                                    {anti_support_list.length > 0 ?
                                    <div className={showAntiSupport ? "card-pool-fill2": "hidden2"}>
                                    {anti_support_list.sort((a,b) => a.card_number - b.card_number).map((card) => {
                                        return (
                                            <NavLink to={`/cards/${card.card_number}`} key={card.name}>
                                            <div style={{display: "flex", justifyContent: "center"}}>
                                                <img
                                                    className="builder-card2 pointer"
                                                    title={card.name}
                                                    src={card.picture_url ? card.picture_url : "https://i.imgur.com/krY25iI.png"}
                                                    alt={card.name}/>
                                            </div>
                                            </NavLink>
                                        );
                                    })}
                                </div> :
                                <h4 className="left no-cards">No cards added</h4>}
                            </div>
                        </div>
                </div>:
                <ErrorPage path={"/cardcategories/"}/>
            }
        </>
    );
}

export default CardCategoryDetail;
