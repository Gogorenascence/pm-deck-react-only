import { db } from "../Firebase"
import {
    getDocs,
    collection,
    query,
    orderBy,
    where,
    limit,
    addDoc,
    or,
    startAfter
} from "firebase/firestore"
import helper from "./Helper"

const deckQueries = {
    getdecksData: async function getdecksData() {
        const decksCollectionRef = collection(db, "decks")
        const response = await getDocs(decksCollectionRef);
        const data = response.docs.map((doc) => ({
            ...doc.data(),
        }))
        helper.createAllTimesAgos(data)
        return data
    },
    getDeckDataById: async function getDeckDataById(id) {
        const decksCollectionRef = collection(db, "decks");
        const deckQuery = query(
            decksCollectionRef,
            where("id", "==", id)
        )
        const snapshot = await getDocs(deckQuery);
        if (snapshot.empty) {
            // console.log("No matching documents.");
            return null;
        } else {
            const deckData = snapshot.docs[0].data();
            helper.createTimesAgos(deckData)
            return deckData;
        }
    },
    getRangedQueriedDecksData: async function getRangedQueriedDecksData(end, queryList) {
        let decksCollectionRef = collection(db, "decks");
        // console.log(query(decksCollectionRef))

        for (const [key, value] of Object.entries(queryList)) {
            decksCollectionRef = query(decksCollectionRef, where(key, "==", value));
        }
        decksCollectionRef = query(
            decksCollectionRef,
            orderBy("updated_on.full_time", "desc"),
            limit(end)
        )
        const snapshot = await getDocs(decksCollectionRef)
        // console.log(snapshot)
        if (snapshot.empty) {
            console.log("No matching documents.");
            return null;
        } else {
            const data = snapshot.docs.map((doc) => ({
                ...doc.data(),
            }))
            helper.createAllTimesAgos(data)
            return data;
        }
    },
    getQueriedDecksData: async function getQueriedDecksData(queryList) {
        let decksCollectionRef = collection(db, "decks");
        // console.log(query(decksCollectionRef))

        for (const [key, value] of Object.entries(queryList)) {
            decksCollectionRef = query(decksCollectionRef, where(key, "==", value));
        }
        decksCollectionRef = query(
            decksCollectionRef,
            orderBy("updated_on.full_time", "desc")
        )
        const snapshot = await getDocs(decksCollectionRef)
        // console.log(snapshot)
        if (snapshot.empty) {
            // console.log("No matching documents.");
            return null;
        } else {
            const data = snapshot.docs.map((doc) => ({
                ...doc.data(),
            }))
            helper.createAllTimesAgos(data)
            return data;
        }
    },
    createDeck: async function createDeck(deckData) {
        const decksCollectionRef = collection(db, "decks")
        const randomString = await helper.generateRandomString(24);
        const created_on = await helper.createTimeObj()

        deckData["id"] = randomString
        deckData["created_on"] = created_on
        deckData["updated_on"] = created_on

        console.log(deckData)
        addDoc(decksCollectionRef, deckData)
        return deckData
    },
    getdecksDataNoDate: async function getdecksDataNoDate() {
        const decksCollectionRef = collection(db, "decks")
        const response = await getDocs(decksCollectionRef);
        const data = response.docs.map((doc) => ({
            ...doc.data(),
        }))
        return data
    },
    getDecksListData: async function getDecksListData(
        queryList,
        sortMethod,

    ) {
        let decksCollectionRef = collection(db, "decks");
        // for (const [key, value] of Object.entries(queryList)) {
        //     if (value[2]){
        //         decksCollectionRef = query(decksCollectionRef, where(key, value[1], value[0]));
        //     }
        // }
        let needsContains = ""
        for (const [key, value] of Object.entries(queryList)) {
            if (value[2]) {
                if (key === "card_series_names" && value[0]) {
                    needsContains = value[0]
                } else {
                    decksCollectionRef = query(decksCollectionRef, where(key, value[1], value[0]));
                }
            }
        }
        if (needsContains) {
            decksCollectionRef = query(decksCollectionRef,
                or(
                    where("card_names", "array-contains", needsContains),
                    where("series_names", "array-contains", needsContains)
            ));
        }
        decksCollectionRef = query(
            decksCollectionRef,
            orderBy(sortMethod[0], sortMethod[1]),
            limit(20)
        )
        const snapshot = await getDocs(decksCollectionRef)
        console.log(snapshot)
        if (snapshot.empty) {
            console.log("No matching documents.");
            return null;
        } else {
            const lastDoc = snapshot.docs[snapshot.docs.length-1]
            const data = snapshot.docs.map((doc) => ({
                ...doc.data(),
            }))
            helper.createAllTimesAgos(data)
            return [data, lastDoc];
        }
    },
    getMoreDecksListData: async function getMoreDecksListData(
        queryList,
        sortMethod,
        lastDoc,
        end
    ) {
        let decksCollectionRef = collection(db, "decks");
        let needsContains = ""
        for (const [key, value] of Object.entries(queryList)) {
            if (value[2]) {
                if (key === "card_series_names" && value[0]) {
                    needsContains = value[0]
                } else {
                    decksCollectionRef = query(decksCollectionRef, where(key, value[1], value[0]));
                }
            }
        }
        if (needsContains) {
            decksCollectionRef = query(decksCollectionRef,
                or(
                    where("card_names", "array-contains", needsContains),
                    where("series_names", "array-contains", needsContains)
            ));
        }
        decksCollectionRef = query(
            decksCollectionRef,
            orderBy(sortMethod[0], sortMethod[1]),
        )
        if (lastDoc) {
            decksCollectionRef = query(
                decksCollectionRef,
                startAfter(lastDoc)
            );
        }
        decksCollectionRef = query(
            decksCollectionRef,
            limit(end)
        );
        const snapshot = await getDocs(decksCollectionRef)
        console.log(snapshot)
        if (snapshot.empty) {
            console.log("No matching documents.");
            return null;
        } else {
            const lastDoc = snapshot.docs[snapshot.docs.length-1]
            const data = snapshot.docs.map((doc) => ({
                ...doc.data(),
            }))
            helper.createAllTimesAgos(data)
            return [data, lastDoc];
        }
    },
}

export default deckQueries
