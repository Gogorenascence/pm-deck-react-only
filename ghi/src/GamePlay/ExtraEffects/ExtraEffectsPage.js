import { useState, useEffect, useContext } from "react";
import { NavLink, useNavigate } from 'react-router-dom';
import ImageWithoutRightClick from "../../display/ImageWithoutRightClick";
import { shortenedText } from "../../Helpers";

function ExtraEffectsPage(props) {

    const {extra_effects} = props
    const [extraEffects, setExtraEffects ] = useState([]);

    const getExtraEffects = async() =>{
        const sortedData = [...extra_effects].sort((a,b) => a.name.localeCompare(b.name));
        setExtraEffects(sortedData.filter(item => item.tag_number !== 1000));
    };

    useEffect(() => {
        getExtraEffects();
        document.title = "Extra Effects - PM CardBase"
        return () => {
            document.title = "PlayMaker CardBase"
        };
    // eslint-disable-next-line
    },[]);


    return (
        <div className="white-space">
            <h1 className="left-h1">Extra Effects</h1>

            <div>
                {extraEffects.map(function(extraEffect, index, arr) {
                        return (
                            <NavLink to={`/extraeffects/${extraEffect.id}`} className="nav-link glow2 no-pad" key={extraEffect.name}>
                                <div style={{display: "flex"}}>
                                    <div className="table200">
                                        <h5 className="text-table">{extraEffect.name}</h5>
                                    </div>
                                    <div>
                                        <h5 className="text-table-2">{shortenedText(extraEffect.rules)}</h5>
                                    </div>
                                </div>
                            </NavLink>
                    );
                })}
            </div>

        </div>
    );
}

export default ExtraEffectsPage;
