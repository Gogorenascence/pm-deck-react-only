<!-- deck/discard pile/stack search -->
<!-- menu on cards and piles -->
<!-- shuffle -->
<!-- add all board cards to context -->
<!-- player info display -->
Note when player is checking a player display
<!-- toggle for extra slots -->
<!-- defending cards and tokens
                            onMouseEnter={() => {
                                console.log(defending, defendingCard)
                                if (!defending === objectName) {
                                    handleHoveredCard(zoneArray[0])
                                } else {
                                    handleHoveredCard(defendingCard)
                                }
                            }} -->
<!-- return cards to the hand -->
<!-- send cards to the discard pile -->
<!-- return cards to deck -->
<!-- place cards underneath stacks -->
<!-- toggle for perspective tool -->
<!-- large background for simulator page -->
<!-- hide lightswitch and back-to-top -->
<!-- play area menu - move, flip, discard, swap, return -->
<!-- stack modal menu - move, discard, swap, return -->
main deck add to play
<!-- active pluck menu - move, discard, return -->
<!-- place option will include active pluck -->
<!-- place from hand -->
<!-- move from active pluck to play areas -->
<!-- send cards in the active pluck to the discard pile -->
<!-- discard entire stacks -->
<!-- stack right click menu: discard move -->
move dialog for placing cards
<!-- card details when hovering -->
<!-- card tokens on hover -->
<!-- After crashing selecting a new deck crashes it again -->
contact us navtab
<!-- player actions tab -->
<!-- modal for deck select -->
<!-- remove footer, lightSwitch and backToTop when in simulator -->
<!-- Glossary object -->
rules
<!-- site news slider -->

<!-- article model

article = {
    title: string
    subtitle:
    author:
    created:
    updated:
    section:
    text:
    images: {
        int(paragraph number): [
            {
                src
                caption
                link
                order
                alt
            }
        ]
    }
}

change story model to article -->

<!-- dedicated article row -->
<!-- favoriting for articles -->
add articles to gameplay sections
<!-- make a site links object similar to images object for articles -->
make a template for Artwork added articles
<!-- make card images clickable in articles -->
<!-- site links need to work for internal and external sites -->
finish backtrack through commits
make article delete and pop up

<!-- card sheet pdf generator -->


finish acount page

hashmapping
<!-- pagination for decks and cards -->

save article creation and editting to session storage or state
facedown object to include active pluck
<!-- add card ownership to card objects -->
            const filledMainDeck = []
            for (let cardNumber of deckFound.cards) {
                    const newCard = cards.find(card => card.card_number === cardNumber)
                    if (newCard) {
                        newCard["owner"] = player.name
                        filledMainDeck.push(newCard)
                    }
                }
            );
