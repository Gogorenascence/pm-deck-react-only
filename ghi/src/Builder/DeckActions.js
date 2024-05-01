import { db } from "../Firebase"
import {
    getDocs,
    collection,
    query,
    orderBy,
    where,
    limit,
    addDoc,
    doc,
    deleteDoc,
    setDoc
} from "firebase/firestore"
import helper from "../QueryObjects/Helper"

const deckActions = {
    createDeck: async function createDeck() {
        console.log("Hi")
    },
    copyDeck: async function copyDeck(id) {
        console.log("Hi")
    },
    editDeck: async function editDeck(id, deckData) {
        const decksCollectionRef = collection(db, "decks")
        const deckQuery = query(
            decksCollectionRef,
            where("id", "==", id)
        );

        const snapshot = await getDocs(deckQuery);
        if (!snapshot.empty) {
            const updated_on = await helper.createTimeObj()
            deckData["updated_on"] = updated_on
            console.log(deckData)

            const deckDoc = snapshot.docs[0];
            await setDoc(deckDoc.ref, deckData);
            return true;
        } else {
            console.log("Deck not found");
            return false;
        }
    },
    deleteDeck: async function deleteDeck(id) {
        const decksCollectionRef = collection(db, "decks");
        const deckQuery = query(
            decksCollectionRef,
            where("id", "==", id)
        );

        const snapshot = await getDocs(deckQuery);
        if (!snapshot.empty) {
            // Document exists, delete it
            const deckDoc = snapshot.docs[0];
            await deleteDoc(deckDoc.ref);
            return true; // Deletion successful
        } else {
            console.log("Deck not found");
            return false; // Deck not found
        }
    }
}

export default deckActions
