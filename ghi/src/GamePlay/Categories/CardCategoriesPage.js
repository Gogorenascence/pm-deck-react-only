import { useState, useEffect, useContext } from "react";
import { NavLink, useNavigate } from 'react-router-dom';
import ImageWithoutRightClick from "../../display/ImageWithoutRightClick";
import { shortenedText } from "../../Helpers";


function CardCategoriesPage(props) {

    const {card_categories} = props
    const [cardCategories, setCardCategories ] = useState([]);
    const [showClasses, setShowClasses] = useState(false);
    const [showSeries, setShowSeries] = useState(false);
    const [showSubSeries, setShowSubSeries] = useState(false);

    const getCardCategories = async() =>{
        const sortedData = [...card_categories].sort((a,b) => a.name.localeCompare(b.name));
        setCardCategories(sortedData);
    };

    useEffect(() => {
        getCardCategories();
        document.title = "Card Categories - PM CardBase"
        return () => {
            document.title = "PlayMaker CardBase"
        };
    // eslint-disable-next-line
    },[]);

    const handleShowClasses = () => {
        setShowClasses(!showClasses)
    }

    const handleShowSeries = () => {
        setShowSeries(!showSeries)
    }

    const handleShowSubSeries = () => {
        setShowSubSeries(!showSubSeries)
    }

    const untyped = cardCategories.filter(cardCategory =>
    cardCategory.cat_type !== "card_class" &&
    cardCategory.cat_type !== "series" &&
    cardCategory.cat_type !== "sub_series")

    return (
        <div className="white-space">
            <h1 className="left-h1">Card Categories</h1>

            <div style={{margin: "20px"}}>

            <div style={{display: "flex", marginTop: "20px"}}>
                <h3 className="cat-label">Card Classes</h3>
                { showClasses ?
                    <h5 className="left db-pool-count"
                    onClick={() => handleShowClasses()}>
                            &nbsp;[Hide]
                    </h5> :
                    <h5 className="left db-pool-count"
                    onClick={() => handleShowClasses()}>
                        &nbsp;[Show]
                    </h5>}
            </div>
            {showClasses?
                <div>
                    {cardCategories.filter(cardCategory => cardCategory.cat_type === "card_class")
                        .map(function(cardCategory, index, arr) {
                            return (
                                <NavLink to={`/cardcategories/${cardCategory.id}`} className="nav-link glow2 no-pad" key={cardCategory.name}>
                                    <div style={{display: "flex"}}>
                                        <div className="table200">
                                            <h5 className="text-table">{cardCategory.name}</h5>
                                        </div>
                                        <div>
                                            <h5 className="text-table-2">{shortenedText(cardCategory.description)}</h5>
                                        </div>
                                    </div>
                            </NavLink>
                        );
                    })}
                </div>:null
            }

            <div style={{display: "flex", marginTop: "20px"}}>
                <h3 className="cat-label">Series</h3>
                { showSeries ?
                    <h5 className="left db-pool-count"
                    onClick={() => handleShowSeries()}>
                            &nbsp;[Hide]
                    </h5> :
                    <h5 className="left db-pool-count"
                    onClick={() => handleShowSeries()}>
                        &nbsp;[Show]
                    </h5>}
            </div>
            {showSeries?
                <div>
                    {cardCategories.filter(cardCategory => cardCategory.cat_type === "series")
                        .map(function(cardCategory, index, arr) {
                        return (
                            <NavLink to={`/cardcategories/${cardCategory.id}`} className="nav-link glow2 no-pad" key={cardCategory.name}>
                                    <div style={{display: "flex"}}>
                                        <div className="table200">
                                            <h5 className="text-table">{cardCategory.name}</h5>
                                        </div>
                                        <div>
                                            <h5 className="text-table-2">{shortenedText(cardCategory.description)}</h5>
                                        </div>
                                    </div>
                            </NavLink>
                        );
                    })}
                </div>:null
            }

            <div style={{display: "flex", marginTop: "20px"}}>
                <h3 className="cat-label">Sub-Series</h3>
                { showSubSeries ?
                    <h5 className="left db-pool-count"
                    onClick={() => handleShowSubSeries()}>
                            &nbsp;[Hide]
                    </h5> :
                    <h5 className="left db-pool-count"
                    onClick={() => handleShowSubSeries()}>
                        &nbsp;[Show]
                    </h5>}
            </div>
            {showSubSeries?
                <div>
                    {cardCategories.filter(cardCategory => cardCategory.cat_type === "sub_series")
                        .map(function(cardCategory, index, arr) {
                            return (
                                <NavLink to={`/cardcategories/${cardCategory.id}`} className="nav-link glow2 no-pad" key={cardCategory.name}>
                                    <div style={{display: "flex"}}>
                                        <div className="table200">
                                            <h5 className="text-table">{cardCategory.name}</h5>
                                        </div>
                                        <div>
                                            <h5 className="text-table-2">{shortenedText(cardCategory.description)}</h5>
                                        </div>
                                    </div>
                            </NavLink>
                        );
                    })}
                </div>:null
            }

            </div>

        </div>
    );
}

export default CardCategoriesPage;