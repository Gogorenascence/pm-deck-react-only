import React, { useEffect, useRef, useState } from 'react'


function OppPluckDiscard({
    pluckDeck,
    handleHoveredCard,
    setShowPluckSearchModal,
    pluckDiscard,
    setShowPluckDiscardModal,
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
                    handleClose();
                    handleCloseDiscard();
                }
            }
          // Adding click event listener
            document.addEventListener("click", handleOutsideClick);
                return () => document.removeEventListener("click", handleOutsideClick);
        }, [ref]);
    }

    useEffect(() => {
        if (pluckDeck.length === 0) {
            handleClose();
        }
        if (pluckDiscard.length === 0) {
            handleCloseDiscard(); // Call handleClose when filteredCards is empty
        }
    }, [pluckDeck, pluckDiscard]);

    const handleClose = () => {
        setShowPluckSearchModal(false)
        document.body.style.overflow = 'auto';
    };

    const handleCloseDiscard = () => {
        setShowPluckDiscardModal(false)
        document.body.style.overflow = 'auto';
    };

    const handleOpenDiscard = (event) => {
        event.preventDefault()
        setShowPluckDiscardModal(true)
        document.body.style.overflow = 'hidden';
    };

    return(
        <div className='flex'>
            <span>
                <div className="matCard margin-left pointer"
                    onClick={(event) => handleOpenDiscard(event)}
                    onContextMenu={(event) => handleOpenDiscard(event)}
                    onMouseEnter={() => pluckDiscard.length > 0? handleHoveredCard(pluckDiscard[pluckDiscard.length-1]):null}
                >
                    {pluckDiscard.length > 1 ?
                        <div className="matCardOverlay">
                            <h1 className="fontSize60">{pluckDiscard.length}</h1>
                        </div> :null
                    }
                    {pluckDiscard.length > 0 ?
                    <img
                        onMouseEnter={() => handleHoveredCard(pluckDiscard[pluckDiscard.length-1])}
                        className="builder-card5 pointer glow3"
                        src={pluckDiscard[pluckDiscard.length-1].picture_url ?
                            pluckDiscard[pluckDiscard.length-1].picture_url :
                            "https://playmakercards.s3.us-west-1.amazonaws.com/plucks4-1.png"}
                        alt={pluckDiscard[pluckDiscard.length-1].name}/>
                        :null}
                </div>
            </span>
            <span>
                <div className="matCard pointer">
                    {pluckDeck.length > 1 ?
                        <div className="matCardOverlay">
                            <h1 className="fontSize60">{pluckDeck.length}</h1>
                        </div> :null
                    }
                    <img
                        className="builder-card5 pointer glow3"
                        src="https://playmakercards.s3.us-west-1.amazonaws.com/plucks4-1.png"
                        alt="pluck deck"/>
                </div>
            </span>
        </div>
    )
}

export default OppPluckDiscard
