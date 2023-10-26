import { useState, useEffect, useContext } from "react";
import { NavLink, useNavigate } from 'react-router-dom';
import ImageWithoutRightClick from "../../display/ImageWithoutRightClick";
import { shortenedText } from "../../Helpers";

function CardTypesPage(props) {

    const {card_types} = props
    const [cardTypes, setCardTypes ] = useState([]);

    const getCardTypes = async() =>{
        const sortedData = [...card_types].sort((a,b) => a.name.localeCompare(b.name));
        setCardTypes(sortedData.filter(item => item.tag_number !== 1000));
    };

    useEffect(() => {
        getCardTypes();
        document.title = "Card Types - PM CardBase"
        return () => {
            document.title = "PlayMaker CardBase"
        };
    // eslint-disable-next-line
    },[]);


    return (
        <div className="white-space">
            <h1 className="left-h1">Card Types</h1>

            <div>
                {cardTypes.map(function(cardType, index, arr) {
                        return (
                            <NavLink to={`/cardtypes/${cardType.id}`} className="nav-link glow2 no-pad" key={cardType.name}>
                                <div style={{display: "flex"}}>
                                    <div className="table200">
                                        <h5 className="text-table">{cardType.name}</h5>
                                    </div>
                                    <div>
                                        <h5 className="text-table-2">{shortenedText(cardType.description)}</h5>
                                    </div>
                                </div>
                        </NavLink>
                    );
                })}
            </div>

        </div>
    );
}

export default CardTypesPage;
