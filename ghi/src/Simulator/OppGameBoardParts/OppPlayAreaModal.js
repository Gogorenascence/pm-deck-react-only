import React, { useEffect, useRef } from 'react'

function OppPlayAreaModal({
    player,
    playArea,
    handleHoveredCard,
    showOppPlayAreaModal,
    setShowOppPlayAreaModal,
}) {

    const content = useRef(null)
    useOutsideAlerter(content)

    function useOutsideAlerter(ref) {
        useEffect(() => {
          // Function for click event
            function handleOutsideClick(event) {
                if (ref.current &&
                    !ref.current.contains(event.target)&&
                    !event.target.closest(".matCardOverlay")
                    // !event.target.closest(".cd-related-modal-card")
                ) {
                    handleClose();
                }
            }
          // Adding click event listener
            document.addEventListener("click", handleOutsideClick);
                return () => document.removeEventListener("click", handleOutsideClick);
        }, [ref]);
    }

    useEffect(() => {
        if (playArea[showOppPlayAreaModal.objectName]?.length === 0) {
            handleClose(); // Call handleClose when filteredCards is empty
        }
    }, [playArea[showOppPlayAreaModal.objectName]]);

    const handleClose = () => {
        setShowOppPlayAreaModal({name: "", objectName: ""})
        document.body.style.overflow = 'auto';
    };

    console.log(playArea)
    console.log("show", showOppPlayAreaModal)

    const zoneArray = playArea[showOppPlayAreaModal.objectName]

    return(
        <div>
            {zoneArray?
                <div className="sim-modal3 topbar">
                    <div className={zoneArray.length < 5 ? "outScrollableSim" : "outScrollableSim2"} ref={content}>
                        <h2 className="aligned margin-top-0 margin-bottom-10">{player}</h2>
                        <h3 className="aligned margin-top-0 margin-bottom-30">{showOppPlayAreaModal.name}</h3>
                        <div className="card-pool-fill padding-bottom-30">
                            {zoneArray.map((card, index) => {
                                return (
                                    <div style={{display: "flex", justifyContent: "center"}}>
                                        <div>
                                            <img
                                                onMouseEnter={() => handleHoveredCard(card)}
                                                className="builder-card margin-10 pointer glow3"
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

export default OppPlayAreaModal
