export function saveDeckToSessionStorage(
    deck,
    main_list,
    pluck_list
) {
    try {
        // Create an object representing the deck state
        const deckState = {
            name: deck.name,
            account_id: deck.account_id,
            description: deck.description,
            cover_card: deck.cover_card,
            parent_id: deck.parent_id,
            main_list: main_list,
            pluck_list: pluck_list
        };
        // Convert the deck state object to a string
        const deckStateString = JSON.stringify(deckState);
        // Save the deck state string to session storage under a specific key
        sessionStorage.setItem('savedDeckState', deckStateString);
        console.log(sessionStorage.getItem('savedDeckState'))

        // Optionally, you can also save other related states to session storage here
        // sessionStorage.setItem('otherStateKey', JSON.stringify(otherState));
    } catch (error) {
        console.error('Error saving deck state to session storage:', error);
    }
};

export function loadDeckFromSessionStorage(
    deck,
    setDeck,
    setMainList,
    setPluckList
) {
    try {
        // Retrieve the deck state string from session storage
        const savedDeckState = sessionStorage.getItem('savedDeckState');
        if (savedDeckState) {
            // Parse the stored string back to an object
            const parsedDeckState = JSON.parse(savedDeckState);

            // Update the deck state with the retrieved data
            setDeck({ ...deck,
                name: parsedDeckState.name,
                account_id: parsedDeckState.account_id,
                description: parsedDeckState.description,
                cover_card: parsedDeckState.cover_card,
                parent_id: parsedDeckState.parent
            });
            setMainList(parsedDeckState.main_list);
            setPluckList(parsedDeckState.pluck_list)

            // Optionally, load and set other related states from session storage here
            // const otherState = JSON.parse(sessionStorage.getItem('otherStateKey'));
            // setOtherState(otherState);
        }
    } catch (error) {
        console.error('Error loading deck state from session storage:', error);
    }
}


    // // Load deck state from session storage on component mount
    // useEffect(() => {
    //     loadDeckFromSessionStorage();
    // }, []);

    // // Save deck state to session storage whenever it changes
    // useEffect(() => {
    //     saveDeckToSessionStorage();
    // }, [deck]);
