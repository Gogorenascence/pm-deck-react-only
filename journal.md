3/7/23

Challenges Faced
I needed to know what API requests were made, the data that was stored from those requests, the frequency that they were called on, and the format that the data was retrieved.

Actions Taken
Aside from looking at the API documentation, I went through each relevant file and mapped the requests that were made either during componentDidMount or as an event handler.

Results Observed
Although an axios request exists for getProductList, it didn't appear to be used at all in the codebase. I will have to check again, but it initially made it so that there were three types of requests that I would need to develop: getProduct, getRelated(products), and getStyles(ofProduct).



4/1

4/2

4/3
Started work on Redux - had issues with file names.
Because I normally start my names with a capital letter and imports auto format to a lower case letter,
my display disappeared.


function BackToTop() {
    const showOnPx = 100;
    const backToTopButton = document.querySelector(".back-to-top")

    const scrollContainer = () => {
        return document.documentElement || document.body;
    };

    document.addEventListener("scroll", () => {
        if (scrollContainer().scrollTop > showOnPx) {
        backToTopButton.classList.remove("hidden")
        } else {
        backToTopButton.classList.add("hidden")
        }
    })

    const goToTop = () => {
        document.body.scrollIntoView({
        behavior: "smooth",
        });
    };



    return (
        <div>
            <img
                class="back-to-top hidden"
                src="up.png"
                style={{height: "9%"}}
                onClick={goToTop}>
            </img>
        </div>
    );
}

export default BackToTop;



.filter(card => query.extraEffect? card.extra_effects.some(effect => effect.toString() == query.extraEffect):card.extra_effects)


4/13
Worked on filter for cards page.
Started with:
       const filteredCards = sortedCards.reverse().filter(card => {
        // if (query.cardName && !card.name.toLowerCase().includes(query.cardName.toLowerCase())) {
        //     return false;
        // }
        // if (query.cardText && !(card.effect_text + card.second_effect_text).toLowerCase().includes(query.cardText.toLowerCase())) {
        //     return false;
        // }
        // if (query.cardNumber && !card.card_number.toString().includes(query.cardNumber)) {
        //     return false;
        // }
        // if (query.heroID && !card.hero_id.toLowerCase().includes(query.heroID.toLowerCase())) {
        //     return false;
        // }
        // if (query.series && !card.series_name.toLowerCase().includes(query.series.toLowerCase())) {
        //     return false;
        // }
        // if (query.illustrator && !card.illustrator.toLowerCase().includes(query.illustrator.toLowerCase())) {
        //     return false;
        // }
        // if (query.type && card.card_type[0] !== query.type) {
        //     return false;
        // }
        // if (query.cardClass && card.card_class !== query.cardClass) {
        //     return false;
        // }
        // if (query.extraEffect && !card.extra_effects.includes(query.extraEffect)) {
        //     return false;
        // }
        if (query.reaction && !card.reactions.includes(query.reaction)) {
            return false;
        }
        if (query.tag && !card.card_tags.includes(query.tag)) {
            return false;
        }
        return true;
    });

but found the state to be lagging behind the handleQuery change.
Moved the filter to the render portion.

                .filter(card => (card.effect_text + card.second_effect_text).toLowerCase().includes(query.cardText.toLowerCase()))
                .filter(card => card.card_number.toString().includes(query.cardNumber))
                .filter(card => card.hero_id.toLowerCase().includes(query.heroID.toLowerCase()))
                .filter(card => card.series_name.toLowerCase().includes(query.series.toLowerCase()))
                .filter(card => card.illustrator.toLowerCase().includes(query.illustrator.toLowerCase()))
                .filter(card => card.card_type[0].includes(query.type))
                .filter(card => card.card_class.includes(query.cardClass))

had issues with extra_effects because it was a list, so used the some() method for arrays;
then had issues with displaying cards that had an empty array for extra_effects.
Created a ternary that would look for a non-default in query.extraEffect; filter if present, show all if not present.

.filter(card => query.extraEffect? card.extra_effects.some(effect => effect.toString() == query.extraEffect):card.extra_effects)


4/14
Page crashed during Burst Esper's data entry; it was because of:
.filter(card => card.card_type[0].includes(query.type))
since upon first entry, it would not have a card type.
Was changed to:
.filter(card => query.type? card.card_type.some(type => type.includes(query.type)):card.card_type)
