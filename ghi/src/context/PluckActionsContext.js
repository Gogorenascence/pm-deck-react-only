import { createContext, useState, useContext } from "react";
import { GameStateContext } from "./GameStateContext";
import { SimulatorActionsContext } from "./SimulatorActionsContext";
import {
    specialSound,
    destroySound,
    shuffleSound,
    summonSound,
    drawSound,
    gainSound,
    activateSound,
    discardSound,
    menuSound,
    startSound,
    equipSound,
    flipSound
} from "../Sounds/Sounds";

const PluckActionsContext = createContext();

const PluckActionsContextProvider = ({ children }) => {
    const {
        player,
        playerPluckDeck,
        setPlayerPluckDeck,
        setActivePluck,
        volume,
        addToLog,
    } = useContext(GameStateContext)

    const {
        selectedPluckDeck,
        ownership,
        setOwnership,
        pluckDiscard,
        setPluckDiscard,
        selectedPluckIndex,
        setSelectedPluckIndex,
        setPrompt,
        setShowCardMenu,
        placing,
        setShufflingPluck,
        allPlayerPluck,
    } = useContext(SimulatorActionsContext)

    const [swapping, setSwapping] = useState({
        cardToSwap: "",
        zone: "",
        index: null
    })

    const [movingPluck, setMovingPluck] = useState({
        pluckToMove: "",
        zone: "",
        index: null,
    })

    const isShufflingPluck = () => {
        setShufflingPluck(true)
        setTimeout(() => setShufflingPluck(false), 1000)
    }

    const shufflePluckDeck = () => {
        isShufflingPluck()
        const shuffledDeck = [...playerPluckDeck.cards]
        let currentPluckIndex = shuffledDeck.length, randomPluckIndex;
        // While there remain elements to shuffle.
        while (currentPluckIndex !== 0) {
            // Pick a remaining element.
            randomPluckIndex = Math.floor(Math.random() * currentPluckIndex);
            currentPluckIndex--;
            // And swap it with the current element.
            [shuffledDeck[currentPluckIndex], shuffledDeck[randomPluckIndex]] = [
            shuffledDeck[randomPluckIndex], shuffledDeck[currentPluckIndex]];
        }
        setPlayerPluckDeck({name: selectedPluckDeck.name, cards: shuffledDeck});
        shuffleSound(volume)
        addToLog("System", "system", "Shuffling Pluck deck")
    }

    const drawPluck = () => {
        if (ownership.length + allPlayerPluck < 8) {
            const newOwnership = [...ownership]
            const newPluckDeck = [...playerPluckDeck.cards]
            newOwnership.push(newPluckDeck[0])
            setOwnership(newOwnership)
            gainSound(volume)
            setPlayerPluckDeck({
                name: selectedPluckDeck.name,
                cards: newPluckDeck.slice(1)
            });
        } else {
            addToLog(
                "System",
                "system",
                "You can have more than 8 Pluck between in your Ownership and Active Pluck."
            )
        }
    }

    const addPluckFromDeck = (index, unfurling) => {
        if (ownership.length + allPlayerPluck < 8) {
            const newOwnership = [...ownership]
            const newPluckDeck = [...playerPluckDeck.cards]
            const cardToAdd = newPluckDeck[index]
            newOwnership.push(cardToAdd)
            gainSound(volume)
            setOwnership(newOwnership)
            const newShuffledPluckDeck = newPluckDeck.filter((_, i) => i !== index)
            if (unfurling === false) {
                isShufflingPluck()
                let currentPluckIndex = newShuffledPluckDeck.length, randomPluckIndex;
                while (currentPluckIndex !== 0) {
                    randomPluckIndex = Math.floor(Math.random() * currentPluckIndex);
                    currentPluckIndex--;
                    [newShuffledPluckDeck[currentPluckIndex], newShuffledPluckDeck[randomPluckIndex]] = [
                    newShuffledPluckDeck[randomPluckIndex], newShuffledPluckDeck[currentPluckIndex]];
                }
                shuffleSound(volume)
            }
            setPlayerPluckDeck({
                name: selectedPluckDeck.name,
                cards: newShuffledPluckDeck
            });
            !unfurling?
                addToLog("System", "system", `"${cardToAdd.name}" was added from Pluck deck to ${player.name}'s ownership`):
                addToLog("System", "system", `"${cardToAdd.name}" was added from the unfurled Pluck to ${player.name}'s ownership`)
            } else {
            addToLog(
                "System",
                "system",
                "You can have more than 8 Pluck between in your Ownership and Active Pluck."
            )
        }
    }

    const addPluckFromDiscard = (index) => {
        if (ownership.length + allPlayerPluck < 8) {
            const newOwnership = [...ownership]
            const newDiscardPile = [...pluckDiscard]
            const cardToAdd = newDiscardPile[index]
            newOwnership.push(cardToAdd)
            setOwnership(newOwnership)
            gainSound(volume)
            setPluckDiscard(newDiscardPile.filter((_, i) => i !== index));
            addToLog("System", "system", `"${cardToAdd.name}" was added from Pluck discard pile to ${player.name}'s ownership`)
        } else {
            addToLog(
                "System",
                "system",
                "You can have more than 8 Pluck between in your Ownership and Active Pluck."
            )
        }
    }

    const addPluckFromActivePluck = (card, index, zone) => {
        if (ownership.length + allPlayerPluck < 8 ) {
            const newActivePluck = {...player.activePluck}
            const selectZone = newActivePluck[zone]
            const newOwnership = [...ownership]

            newOwnership.push(card)
            setOwnership(newOwnership)
            const newSelectZone = selectZone.filter((_, i) => i !== index)
            newActivePluck[zone] = newSelectZone
            drawSound(volume);

            setActivePluck(newActivePluck)
            addToLog("System", "system", `"${player.name} returned "${card.name}" from their Active Pluck.`)
        } else {
            addToLog("You can have more than 8 Pluck between in your Ownership and Active Pluck.")
        }
    }

    const swapPluckInOwnership = (ownershipIndex) => {
        const cardInPlay = swapping.cardToSwap
        const zone = swapping.zone
        const zoneIndex = swapping.index
        const newActivePluck = {...player.activePluck}
        const selectZone = newActivePluck[zone]
        const cardInOwnership = ownership[ownershipIndex]

        const newOwnership = ownership.filter((_, i) => i !== ownershipIndex)
        newOwnership.push(cardInPlay)
        setOwnership(newOwnership)
        const newSelectZone = selectZone.filter((_, i) => i !== zoneIndex)
        newSelectZone.push(cardInOwnership)
        newActivePluck[zone] = newSelectZone
        specialSound(volume);

        setActivePluck(newActivePluck)
        setSwapping({
            cardToSwap: "",
            zone: "",
            index: null
        })
        addToLog(
            "System",
            "system",
            `"${player.name} swapped "${cardInPlay.name}"
            from their Active Pluck with "${cardInOwnership.name}" from their ownership.`)
    }

    const discardFromPluckDeck = (index) => {
        const newPluckDiscardPile = [...pluckDiscard]
        const newPluckDeck = [...playerPluckDeck.cards]
        const pluckToDiscard = newPluckDeck[index]
        newPluckDiscardPile.push(pluckToDiscard)
        setPluckDiscard(newPluckDiscardPile)
        setPlayerPluckDeck({
            name: selectedPluckDeck.name,
            cards: newPluckDeck.filter((_, i) => i !== index)
        });
        discardSound(volume)
        addToLog("System", "system", `${player.name} discarded "${pluckToDiscard.name}" from their Pluck deck`)
    }

    const selectPluck = (index) => {
        selectedPluckIndex === index? setSelectedPluckIndex(null): setSelectedPluckIndex(index)
        !placing?
        setPrompt({
            message: "Select a Zone to Play Your Pluck!",
            action: "activePluck"
        }):
        setPrompt({
            message: "Select a Zone to Place Your Pluck!",
            action: "activePluck"
        })
    }

    const playPluck = (zone) => {
        if (selectedPluckIndex !== null) {
            const playedPluck = player.ownership[selectedPluckIndex]
            const pluckZones = {...player.activePluck}
            const selectZone = pluckZones[zone]
            const newOwnership = [...player.ownership]
            setPrompt({message: "", action: ""})
            selectZone.push(playedPluck)
            setOwnership(newOwnership.filter((_, i) => i !== selectedPluckIndex))
            setSelectedPluckIndex(null)
            specialSound(volume)
            setActivePluck(pluckZones)
            addToLog("System", "system", `${player.name} played "${playedPluck.name}"`)
        }
    }

    const movePluck = (nextZone) => {
        if (movingPluck.pluckToMove) {
            const newActivePluck = {...player.activePluck}
            const selectZone = newActivePluck[movingPluck.zone]
            const nextSelectZone = newActivePluck[nextZone]

            nextSelectZone.push(movingPluck.pluckToMove)
            const newSelectZone = selectZone.filter((_, i) => i !== movingPluck.index)

            newActivePluck[movingPluck.zone] = newSelectZone
            newActivePluck[nextZone] = nextSelectZone
            setActivePluck(newActivePluck)

            {nextSelectZone.length > 1?
                equipSound(volume*1.5):
                drawSound(volume)};

            setMovingPluck({
                pluckToMove: "",
                zone: "",
                index: null,
            })
        }
    }

    const discardPluck = (card, index, zone) => {
        const newActivePluck = {...player.activePluck}
        const selectZone = newActivePluck[zone]
        const newDiscardPile = [...player.pluckDiscard]

        newDiscardPile.push(card)
        const newSelectZone = selectZone.filter((_, i) => i !== index)
        newActivePluck[zone] = newSelectZone
        destroySound(volume)
        setPluckDiscard(newDiscardPile)
        setActivePluck(newActivePluck)
        addToLog("System", "system", `${player.name} discarded "${card.name}" from their Active Pluck`)
    }

    const discardPluckFromOwnership = (index) => {
        const discardedPluck = player.ownership[index]
        const newDiscardPile = [...player.pluckDiscard]
        const newOwnership = [...player.ownership]
        newDiscardPile.push(discardedPluck)
        setOwnership(newOwnership.filter((_, i) => i !== index))
        discardSound(volume)
        setPluckDiscard(newDiscardPile)
        addToLog("System", "system", `${player.name} discarded "${discardedPluck.name}" from their ownership`)
    }

    const returnPluckToDeck = (index, position) => {
        const returnedPluck = player.ownership[index]
        const newPluck = [...player.pluckDeck]
        const newOwnership = [...player.ownership]
        if (position === "top") {
            newPluck.unshift(returnedPluck)
            addToLog("System", "system", `${player.name} returned "${returnedPluck.name}" to the top of their Pluck deck`)
        } else {
            newPluck.push(returnedPluck)
            addToLog("System", "system", `${player.name} returned "${returnedPluck.name}" to the bottom of their Pluck deck`)
        }
        setOwnership(newOwnership.filter((_, i) => i !== index))
        setPlayerPluckDeck({...playerPluckDeck, cards: newPluck})
        flipSound(volume)
        setShowCardMenu(null)
    }

    const returnDiscardedPluckToDeck = (index, position) => {
        const returnedPluck = player.pluckDiscard[index]
        const newPluck = [...player.pluckDeck]
        const newPluckDiscard = [...player.pluckDiscard]
        if (position === "top") {
            newPluck.unshift(returnedPluck)
            addToLog("System", "system", `${player.name} returned "${returnedPluck.name}" to the top of their Pluck deck`)
        } else {
            newPluck.push(returnedPluck)
            addToLog("System", "system", `${player.name} returned "${returnedPluck.name}" to the bottom of their Pluck deck`)
        }
        setPluckDiscard(newPluckDiscard.filter((_, i) => i !== index))
        setPlayerPluckDeck({...playerPluckDeck, cards: newPluck})
        flipSound(volume)
        setShowCardMenu(null)
    }

    return (
        <PluckActionsContext.Provider value={{
            isShufflingPluck,
            shufflePluckDeck,
            drawPluck,
            addPluckFromDeck,
            addPluckFromDiscard,
            addPluckFromActivePluck,
            swapPluckInOwnership,
            swapping,
            setSwapping,
            discardFromPluckDeck,
            selectPluck,
            playPluck,
            movingPluck,
            setMovingPluck,
            movePluck,
            discardPluck,
            discardPluckFromOwnership,
            returnPluckToDeck,
            returnDiscardedPluckToDeck
        }}>
            {children}
        </PluckActionsContext.Provider>
    );
};

export { PluckActionsContext, PluckActionsContextProvider };