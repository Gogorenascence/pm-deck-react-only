function OppPlayAreaZone({
objectName,
stringName,
zoneArray,
setShowOppPlayAreaModal,
handleHoveredCard,
faceDown,
}){

    const nullCard = {
        "name": "Unidentified Card",
        "card_class": "",
        "series_name": "",
        "enthusiasm": 0,
        "effect_text": "The identity of this card eludes you.",
        "second_effect_text": "Time will hopefully tell before it's too late.",
        "illustrator": "",
        "picture_url": "https://i.imgur.com/krY25iI.png",
        "card_type": [
            {
                "name": "???",
            }
        ],
        "reactions": [],
        "card_tags": [],
        "seriesNames": ["???"],
        "effectText": [
            "The identity of this card eludes you.",
        ],
        "secondEffectText": ["Time will hopefully tell before it's too late."]
    }

    return(
        <div>
            <div className="matCard">
                {zoneArray.length > 0 ?
                    <>
                        {zoneArray.length > 1 ?
                            <div className="matCardOverlay"
                                onClick={() => {
                                    setShowOppPlayAreaModal({
                                        name: stringName,
                                        objectName: objectName
                                    })
                                }}
                                onMouseEnter={() => handleHoveredCard(zoneArray[0])}
                            >
                                <h1 className="fontSize60">{zoneArray.length}</h1>
                            </div> :null
                        }
                        <img
                            onMouseEnter={() => {
                                !faceDown[objectName]?
                                    handleHoveredCard(zoneArray[0]):
                                    handleHoveredCard(nullCard)
                            }}
                            className="builder-card5 pointer glow3"
                            src={!faceDown[objectName]?
                                    (zoneArray[0].picture_url?
                                        zoneArray[0].picture_url :
                                        "https://i.imgur.com/krY25iI.png"
                                    ):
                                    zoneArray.length > 1?
                                        zoneArray[0].picture_url:
                                        "https://i.imgur.com/krY25iI.png"
                                }
                            alt={zoneArray[0].name}/>
                    </>
                :null}
            </div>
        </div>
    )
}


function OppActivePluckZone({
    objectName,
    stringName,
    zoneArray,
    handleHoveredCard,
    setShowOppActivePluckModal,
}){

    return(
        <div>
            <div className="matCard">
                {zoneArray.length > 0 ?
                    <>
                        {zoneArray.length > 1 ?
                            <div className="matCardOverlay"
                                onClick={() => {
                                    setShowOppActivePluckModal({
                                        name: stringName,
                                        objectName: objectName
                                    })
                                }}
                                onMouseEnter={() => handleHoveredCard(zoneArray[0])}
                            >
                                <h1 className="fontSize60">{zoneArray.length}</h1>
                            </div> :null
                        }
                        <img
                            onMouseEnter={() => handleHoveredCard(zoneArray[0])}
                            className="builder-card5 pointer glow3"
                            src={zoneArray[0].picture_url ?
                                    zoneArray[0].picture_url :
                                    "https://playmakercards.s3.us-west-1.amazonaws.com/plucks4-1.png"}
                            alt={zoneArray[0].name}/>
                    </>
                :null}
            </div>
        </div>
    )
}


function OppExtraZone({
    objectName,
    stringName,
    zoneArray,
    setShowOppPlayAreaModal,
    handleHoveredCard,
}){

    return(
        <div>
            <div className="matCard">
                {zoneArray.length > 0 ?
                    <>
                        {zoneArray.length > 1 ?
                            <div className="matCardOverlay"
                                    onClick={() => {
                                        setShowOppPlayAreaModal({
                                            name: stringName,
                                            objectName: objectName
                                        })
                                    }}
                                onMouseEnter={() => handleHoveredCard(zoneArray[0])}
                            >
                                <h1 className="fontSize60">{zoneArray.length}</h1>
                            </div> :null
                        }
                        <img
                            onMouseEnter={() => handleHoveredCard(zoneArray[0])}
                            className="builder-card5 pointer glow3"
                            src={zoneArray[0].picture_url ?
                                zoneArray[0].picture_url :
                                "https://i.imgur.com/krY25iI.png"}
                            alt={zoneArray[0].name}/>
                    </>
                :null}
            </div>
        </div>
    )
}


export {
    OppPlayAreaZone,
    OppActivePluckZone,
    OppExtraZone
};
