import React from 'react';
import {
    Col
} from "react-bootstrap";


function BuilderData({main_list, pluck_list}) {
    return(
        <div style={{marginLeft: "20px"}}>
            <div style={{display: "flex", alignItems: "center"}}>
                    <h2
                        className="left"
                        style={{margin: "2% 0% 1% 0%", fontWeight: "700"}}
                    >{title}</h2>
                    <img className="logo" src="https://i.imgur.com/YpdBflG.png" alt="cards icon"/>
                    {list.length > 0 ?
                    <h5
                        className="left"
                        style={{margin: "1% 0%", fontWeight: "700"}}
                    >{list.length}</h5>:
                    null}
                </div>
                {list.length > 0 ?<>
                        {list.sort((a,b) => a.card_number - b.card_number).map((card) => {
                            return (
                                <Col style={{padding: "5px"}}>
                                    <div className="card-container pointer">
                                        <h5 onClick={() => handleRemoveCard(card)}>{card.name}</h5>
                                        <img
                                            className="card-image"
                                            src={card.picture_url}
                                            alt={card.name}
                                        />
                                    </div>
                                </Col>
                            );
                        })}
                    </>:
                <h4 className="left no-cards">No cards added</h4>}
        </div>
    )
}

export default BuilderData
