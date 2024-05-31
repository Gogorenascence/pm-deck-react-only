import React, { useState, useEffect, useRef } from 'react'


function OppPluckDiscardModal({
    player,
    pluckDiscard,
    handleHoveredCard,
    showOppPluckDiscardModal,
    setShowOppPluckDiscardModal,
}) {

    const content = useRef(null)
    useOutsideAlerter(content)

    function useOutsideAlerter(ref) {
        useEffect(() => {
          // Function for click event
            function handleOutsideClick(event) {
                if (ref.current &&
                    !ref.current.contains(event.target)&&
                    !event.target.closest(".card-menu-item")&&
                    !event.target.closest(".deck-menu-item")&&
                    !event.target.closest(".matCard")&&
                    !event.target.closest(".matCardSelected")
                    ) {
                    handleCloseDiscard();
                }
            }
          // Adding click event listener
            document.addEventListener("click", handleOutsideClick);
                return () => document.removeEventListener("click", handleOutsideClick);
        }, [ref]);
    }

    const handleCloseDiscard = () => {
        setShowOppPluckDiscardModal(false)
        document.body.style.overflow = 'auto';
    };

    return(
        <div>
            {showOppPluckDiscardModal ?
                <div className="sim-modal3 topbar"
                >
                    <div className={pluckDiscard.length < 5 ? "outScrollableSim" : "outScrollableSim2"} ref={content}>
                        <h2 className="aligned margin-top-0 margin-bottom-10">{player}</h2>
                        <h3 className="aligned margin-top-0 margin-bottom-30">Discard Pile</h3>
                        <div className="card-pool-fill padding-bottom-30">
                            {pluckDiscard.slice().reverse().map((card, index) => {
                                return (
                                    <div style={{display: "flex", justifyContent: "center"}}>
                                        <div>
                                            <img
                                                onMouseEnter={() => handleHoveredCard(card)}
                                                className="builder-card margin-10 pointer"
                                                src={card.picture_url ? card.picture_url : "https://i.imgur.com/krY25iI.png"}
                                                alt={card.name}/>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>:null
            }
        </div>
    )
}

export default OppPluckDiscardModal
