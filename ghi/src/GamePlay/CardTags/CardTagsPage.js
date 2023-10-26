import { useState, useEffect, useContext } from "react";
import { NavLink, useNavigate } from 'react-router-dom';
import ImageWithoutRightClick from "../../display/ImageWithoutRightClick";
import { shortenedText } from "../../Helpers";
// import card_tags from "../database/card_tags.json";

function CardTagsPage(props) {

    const { card_tags } = props
    const [cardTags, setCardTags ] = useState([]);
    const getCardTags = async() =>{
        const sortedData = [...card_tags].sort((a,b) => a.name.localeCompare(b.name));
        setCardTags(sortedData.filter(item => item.tag_number !== 1000));
    };

    useEffect(() => {
        window.scroll(0, 0);
        getCardTags();
        document.title = "Card Tags - PM CardBase"
        return () => {
            document.title = "PlayMaker CardBase"
        };
    // eslint-disable-next-line
    },[]);


    return (
        <div className="white-space">
            <h1 className="left-h1">Card Tags</h1>

            <div>
                {cardTags.map(function(cardTag, index, arr) {
                        return (
                            <NavLink to={`/cardtags/${cardTag.id}`} className="nav-link glow2 no-pad" key={cardTag.name}>
                                <div style={{display: "flex"}}>
                                    <div className="table200">
                                        <h5 className="text-table">{cardTag.name}</h5>
                                    </div>
                                    <div>
                                        <h5 className="text-table-2">{shortenedText(cardTag.rules)}</h5>
                                    </div>
                                </div>
                            </NavLink>
                    );
                })}
            </div>

        </div>
    );
}

export default CardTagsPage;
