function OppDefendingCard({
    opponentCard
}) {

    console.log("card", opponentCard)

    return (
        <div className='margin-top-10 margin-bottom-10'style={{width: "370px"}}>
            {opponentCard.card?
                <div>
                    <div className="flex-items between-space" style={{width: "370px"}}>
                        <img
                            className="panel-card2"
                            // title={`${card.name}\n${preprocessText(card.effect_text)}\n${card.second_effect_text ? preprocessText(card.second_effect_text) : ""}`}
                            src={opponentCard.card ? opponentCard.card.picture_url : "https://i.imgur.com/krY25iI.png"}
                            alt={opponentCard.card.name}/>
                        <div>
                            <h4 className="label margin-bottom-10">HP: {opponentCard.hp}</h4>
                            <h5 className="label margin-bottom-10">Block: {opponentCard.block}</h5>
                            <h5 className="label margin-bottom-10">Counter: {opponentCard.counter}</h5>
                            <h5 className="label margin-bottom-10">Endure: {opponentCard.endure}</h5>
                            <h5 className="label margin-bottom-10">Redirect: {opponentCard.redirect}</h5>
                        </div>
                    </div>
                </div>
            :null}
        </div>
    );
}

export default OppDefendingCard;
