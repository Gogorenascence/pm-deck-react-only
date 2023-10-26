import { useState, useEffect, useContext } from "react";
import { NavLink, useNavigate } from 'react-router-dom';
import ImageWithoutRightClick from "../../display/ImageWithoutRightClick";
import { shortenedText } from "../../Helpers";


function ReactionsPage(props) {

    const {reactionProps} = props
    const [reactions, setReactions ] = useState([]);

    const getReactions = async() =>{
        const sortedData = [...reactionProps].sort((a,b) => a.name.localeCompare(b.name));
        setReactions(sortedData.filter(item => item.tag_number !== 1000));
    };

    useEffect(() => {
        getReactions();
        document.title = "Reactions - PM CardBase"
        return () => {
            document.title = "PlayMaker CardBase"
        };
    // eslint-disable-next-line
    },[]);

    console.log(reactions)

    return (
        <div className="white-space">
            <h1 className="left-h1">Reactions</h1>

            <div>
                {reactions.map(function(reaction, index, arr) {
                        return (
                            <NavLink to={`/reactions/${reaction.id}`} className="nav-link glow2 no-pad" key={reaction.name}>
                                <div style={{display: "flex"}}>
                                    <div className="table200">
                                        <h5 className="text-table">{reaction.name}</h5>
                                    </div>
                                    <div>
                                        <h5 className="text-table-2">{shortenedText(reaction.rules)}</h5>
                                    </div>
                                </div>
                        </NavLink>
                    );
                })}
            </div>

        </div>
    );
}

export default ReactionsPage;