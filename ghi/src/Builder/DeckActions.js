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
    deleteDoc
} from "firebase/firestore"

const deckActions = {
    createDeck: async function createDeck() {
        console.log("Hi")
    },
    copyDeck: async function copyDeck(id) {
        console.log("Hi")
    },
    editDeck: async function editDeck(end, queryList) {
        console.log("Hi")
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
