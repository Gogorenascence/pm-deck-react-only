import React, { useEffect, useRef } from 'react'


function OppMainDiscard({
    mainDeck,
    handleHoveredCard,
    setShowDeckSearchModal,
    mainDiscard,
    setShowDiscardModal,
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
        if (mainDeck.length === 0) {
            handleClose();
        }
        if (mainDiscard.length === 0) {
            handleCloseDiscard(); // Call handleClose when filteredCards is empty
        }
    }, [mainDeck, mainDiscard]);

    const handleClose = () => {
        setShowDeckSearchModal(false)
        document.body.style.overflow = 'auto';
    };

    const handleCloseDiscard = () => {
        setShowDiscardModal(false)
        document.body.style.overflow = 'auto';
    };

    const handleOpenDiscard = (event) => {
        event.preventDefault()
        setShowDiscardModal(true)
        document.body.style.overflow = 'hidden';
    };

    return(
        <div className='flex'>
            <span>
                <div className="matCard margin-left pointer"
                    onClick={(event) => handleOpenDiscard(event)}
                    onContextMenu={(event) => handleOpenDiscard(event)}
                    onMouseEnter={() => mainDiscard.length > 0 ? handleHoveredCard(mainDiscard[mainDiscard.length-1]): null}
                >
                    {mainDiscard.length > 1 ?
                        <div className="matCardOverlay">
                            <h1 className="fontSize60">{mainDiscard.length}</h1>
                        </div> :null
                    }
                    {mainDiscard.length > 0 ?
                    <img
                        onMouseEnter={() => handleHoveredCard(mainDiscard[mainDiscard.length-1])}
                        className="builder-card5 pointer glow3"
                        src={mainDiscard[mainDiscard.length-1].picture_url ?
                            mainDiscard[mainDiscard.length-1].picture_url :
                            "https://i.imgur.com/krY25iI.png"}
                        alt={mainDiscard[mainDiscard.length-1].name}/>
                        :null}
                </div>
            </span>
            <span>
                <div className="matCard pointer"
                    >
                    {mainDeck.length > 1 ?
                        <div className="matCardOverlay">
                            <h1 className="fontSize60">{mainDeck.length}</h1>
                        </div> :null
                    }
                    <img
                        className="builder-card5 pointer glow3"
                        src="https://i.imgur.com/krY25iI.png"
                        alt="deck"/>
                </div>
            </span>
        </div>
    )
}

export default OppMainDiscard
