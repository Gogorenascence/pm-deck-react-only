import { db } from "../Firebase"
import { getDocs, collection, query, orderBy, where, limit, addDoc } from "firebase/firestore"
import helper from "./Helper"

const deckQueries = {
    getdecksData: async function getdecksData() {
        const decksCollectionRef = collection(db, "decks")
        const response = await getDocs(decksCollectionRef);
        const data = response.docs.map((doc) => ({
            ...doc.data(),
        }))
        for (let deck of data){
            const date = new Date(deck["created_on"]["full_time"])

            const time_now = new Date();
            time_now.setHours(time_now.getHours() + 5);

            // Calculate years, months, days, hours, minutes, and seconds
            let ago = Math.abs(time_now - date);
            const years = Math.floor(ago / 31557600000);
            ago -= years * 31557600000;
            const months = Math.floor(ago / 2630016000);
            ago -= months * 2630016000;
            const days = Math.floor(ago / 86400000);
            ago -= days * 86400000;
            const hours = Math.floor(ago / 3600000);
            ago -= hours * 3600000;
            const minutes = Math.floor(ago / 60000);
            ago -= minutes * 60000;
            // Format the time difference
            if (years > 0) {
                deck["created_on"]["ago"] = `${years} year ago`;
            } else if (months > 0) {
                deck["created_on"]["ago"] = `${months} month${months > 1 ? 's' : ''} ago`;
            } else if (days > 0) {
                deck["created_on"]["ago"] = `${days} day${days > 1 ? 's' : ''} ago`;
            } else if (hours > 0) {
                deck["created_on"]["ago"] = `${hours} hour${hours > 1 ? 's' : ''} ${minutes > 1 ? ' and ' + minutes + ' minutes ago' : ' ago'}`;
            } else if (minutes > 0) {
                deck["created_on"]["ago"] = `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
            } else {
                deck["created_on"]["ago"] = "a few seconds ago";
            }

            const updateDate = new Date(deck["updated_on"]["full_time"])
            // Calculate years, months, days, hours, minutes, and seconds
            let updateAgo = Math.abs(time_now - updateDate);
            const updateYears = Math.floor(updateAgo / 31557600000);
            updateAgo -= updateYears * 31557600000;
            const updateMonths = Math.floor(updateAgo / 2630016000);
            updateAgo -= updateMonths * 2630016000;
            const updateDays = Math.floor(updateAgo / 86400000);
            updateAgo -= updateDays * 86400000;
            const updateHours = Math.floor(updateAgo / 3600000);
            updateAgo -= updateHours * 3600000;
            const updateMinutes = Math.floor(updateAgo / 60000);
            updateAgo -= updateMinutes * 60000;
            // Format the time difference
            if (updateYears > 0) {
                deck["updated_on"]["ago"] = `${updateYears} year ago`;
            } else if (updateMonths > 0) {
                deck["updated_on"]["ago"] = `${updateMonths} month${updateMonths > 1 ? 's' : ''} ago`;
            } else if (updateDays > 0) {
                deck["updated_on"]["ago"] = `${updateDays} day${updateDays > 1 ? 's' : ''} ago`;
            } else if (updateHours > 0) {
                deck["updated_on"]["ago"] = `${updateHours} hour${updateHours > 1 ? 's' : ''} ${updateMinutes > 1 ? ' and ' + updateMinutes + ' minutes ago' : ' ago'}`;
            } else if (updateMinutes > 0) {
                deck["updated_on"]["ago"] = `${updateMinutes} minute${updateMinutes > 1 ? 's' : ''} ago`;
            } else {
                deck["updated_on"]["ago"] = "a few seconds ago";
            }
        }
        return data
    },
    getDeckDataById: async function getDeckDataById(id) {
        console.log("dog")
        const decksCollectionRef = collection(db, "decks");
        const deckQuery = query(
            decksCollectionRef,
            where("id", "==", id)
        )
        const snapshot = await getDocs(deckQuery);
        if (snapshot.empty) {
            console.log("No matching documents.");
            return null;
        } else {
            const deckData = snapshot.docs[0].data();

            const date = new Date(deckData["created_on"]["full_time"])

            const time_now = new Date();
            time_now.setHours(time_now.getHours() + 5);

            // Calculate years, months, days, hours, minutes, and seconds
            let ago = Math.abs(time_now - date);
            const years = Math.floor(ago / 31557600000);
            ago -= years * 31557600000;
            const months = Math.floor(ago / 2630016000);
            ago -= months * 2630016000;
            const days = Math.floor(ago / 86400000);
            ago -= days * 86400000;
            const hours = Math.floor(ago / 3600000);
            ago -= hours * 3600000;
            const minutes = Math.floor(ago / 60000);
            ago -= minutes * 60000;
            // Format the time difference
            if (years > 0) {
            deckData["created_on"]["ago"] = `${years} year ago`;
            } else if (months > 0) {
            deckData["created_on"]["ago"] = `${months} month${months > 1 ? 's' : ''} ago`;
            } else if (days > 0) {
                deckData["created_on"]["ago"] = `${days} day${days > 1 ? 's' : ''} ago`;
            } else if (hours > 0) {
            deckData["created_on"]["ago"] = `${hours} hour${hours > 1 ? 's' : ''} ${minutes > 1 ? ' and ' + minutes + ' minutes ago' : ' ago'}`;
            } else if (minutes > 0) {
            deckData["created_on"]["ago"] = `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
            } else {
            deckData["created_on"]["ago"] = "a few seconds ago";
            }

            const updateDate = new Date(deckData["updated_on"]["full_time"])
            // Calculate years, months, days, hours, minutes, and seconds
            let updateAgo = Math.abs(time_now - updateDate);
            const updateYears = Math.floor(updateAgo / 31557600000);
            updateAgo -= updateYears * 31557600000;
            const updateMonths = Math.floor(updateAgo / 2630016000);
            updateAgo -= updateMonths * 2630016000;
            const updateDays = Math.floor(updateAgo / 86400000);
            updateAgo -= updateDays * 86400000;
            const updateHours = Math.floor(updateAgo / 3600000);
            updateAgo -= updateHours * 3600000;
            const updateMinutes = Math.floor(updateAgo / 60000);
            updateAgo -= updateMinutes * 60000;
            // Format the time difference
            if (updateYears > 0) {
            deckData["updated_on"]["ago"] = `${updateYears} year ago`;
            } else if (updateMonths > 0) {
            deckData["updated_on"]["ago"] = `${updateMonths} month${updateMonths > 1 ? 's' : ''} ago`;
            } else if (updateDays > 0) {
                deckData["updated_on"]["ago"] = `${updateDays} day${updateDays > 1 ? 's' : ''} ago`;
            } else if (updateHours > 0) {
            deckData["updated_on"]["ago"] = `${updateHours} hour${updateHours > 1 ? 's' : ''} ${updateMinutes > 1 ? ' and ' + updateMinutes + ' minutes ago' : ' ago'}`;
            } else if (updateMinutes > 0) {
            deckData["updated_on"]["ago"] = `${updateMinutes} minute${updateMinutes > 1 ? 's' : ''} ago`;
            } else {
            deckData["updated_on"]["ago"] = "a few seconds ago";
            }
            return deckData;
        }
    },
    getRangedQueriedDecksData: async function getRangedQueriedDecksData(end, queryList) {
        let decksCollectionRef = collection(db, "decks");
        console.log(query(decksCollectionRef))

        for (const [key, value] of Object.entries(queryList)) {
            decksCollectionRef = query(decksCollectionRef, where(key, "==", value));
        }
        decksCollectionRef = query(
            decksCollectionRef,
            orderBy("updated_on.full_time", "desc"),
            limit(end)
        )
        const snapshot = await getDocs(decksCollectionRef)
        console.log(snapshot)
        if (snapshot.empty) {
            console.log("No matching documents.");
            return null;
        } else {
            const data = snapshot.docs.map((doc) => ({
                ...doc.data(),
            }))

            for (let deck of data) {
                const date = new Date(deck["created_on"]["full_time"])

                const time_now = new Date();
                time_now.setHours(time_now.getHours() + 5);

                // Calculate years, months, days, hours, minutes, and seconds
                let ago = Math.abs(time_now - date);
                const years = Math.floor(ago / 31557600000);
                ago -= years * 31557600000;
                const months = Math.floor(ago / 2630016000);
                ago -= months * 2630016000;
                const days = Math.floor(ago / 86400000);
                ago -= days * 86400000;
                const hours = Math.floor(ago / 3600000);
                ago -= hours * 3600000;
                const minutes = Math.floor(ago / 60000);
                ago -= minutes * 60000;
                // Format the time difference
                if (years > 0) {
                    deck["created_on"]["ago"] = `${years} year ago`;
                } else if (months > 0) {
                    deck["created_on"]["ago"] = `${months} month${months > 1 ? 's' : ''} ago`;
                } else if (days > 0) {
                    deck["created_on"]["ago"] = `${days} day${days > 1 ? 's' : ''} ago`;
                } else if (hours > 0) {
                    deck["created_on"]["ago"] = `${hours} hour${hours > 1 ? 's' : ''} ${minutes > 1 ? ' and ' + minutes + ' minutes ago' : ' ago'}`;
                } else if (minutes > 0) {
                    deck["created_on"]["ago"] = `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
                } else {
                    deck["created_on"]["ago"] = "a few seconds ago";
                }

                const updateDate = new Date(deck["updated_on"]["full_time"])
                // Calculate years, months, days, hours, minutes, and seconds
                let updateAgo = Math.abs(time_now - updateDate);
                const updateYears = Math.floor(updateAgo / 31557600000);
                updateAgo -= updateYears * 31557600000;
                const updateMonths = Math.floor(updateAgo / 2630016000);
                updateAgo -= updateMonths * 2630016000;
                const updateDays = Math.floor(updateAgo / 86400000);
                updateAgo -= updateDays * 86400000;
                const updateHours = Math.floor(updateAgo / 3600000);
                updateAgo -= updateHours * 3600000;
                const updateMinutes = Math.floor(updateAgo / 60000);
                updateAgo -= updateMinutes * 60000;
                // Format the time difference
                if (updateYears > 0) {
                    deck["updated_on"]["ago"] = `${updateYears} year ago`;
                } else if (updateMonths > 0) {
                    deck["updated_on"]["ago"] = `${updateMonths} month${updateMonths > 1 ? 's' : ''} ago`;
                } else if (updateDays > 0) {
                    deck["updated_on"]["ago"] = `${updateDays} day${updateDays > 1 ? 's' : ''} ago`;
                } else if (updateHours > 0) {
                    deck["updated_on"]["ago"] = `${updateHours} hour${updateHours > 1 ? 's' : ''} ${updateMinutes > 1 ? ' and ' + updateMinutes + ' minutes ago' : ' ago'}`;
                } else if (updateMinutes > 0) {
                    deck["updated_on"]["ago"] = `${updateMinutes} minute${updateMinutes > 1 ? 's' : ''} ago`;
                } else {
                    deck["updated_on"]["ago"] = "a few seconds ago";
                }
            }
            return data;
        }
    },
    getQueriedDecksData: async function getQueriedDecksData(queryList) {
        let decksCollectionRef = collection(db, "decks");
        console.log(query(decksCollectionRef))

        for (const [key, value] of Object.entries(queryList)) {
            decksCollectionRef = query(decksCollectionRef, where(key, "==", value));
        }
        decksCollectionRef = query(
            decksCollectionRef,
            orderBy("updated_on.full_time", "desc"),
        )
        const snapshot = await getDocs(decksCollectionRef)
        console.log(snapshot)
        if (snapshot.empty) {
            console.log("No matching documents.");
            return null;
        } else {
            const data = snapshot.docs.map((doc) => ({
                ...doc.data(),
            }))

            for (let deck of data) {
                const date = new Date(deck["created_on"]["full_time"])

                const time_now = new Date();
                time_now.setHours(time_now.getHours() + 5);

                // Calculate years, months, days, hours, minutes, and seconds
                let ago = Math.abs(time_now - date);
                const years = Math.floor(ago / 31557600000);
                ago -= years * 31557600000;
                const months = Math.floor(ago / 2630016000);
                ago -= months * 2630016000;
                const days = Math.floor(ago / 86400000);
                ago -= days * 86400000;
                const hours = Math.floor(ago / 3600000);
                ago -= hours * 3600000;
                const minutes = Math.floor(ago / 60000);
                ago -= minutes * 60000;
                // Format the time difference
                if (years > 0) {
                    deck["created_on"]["ago"] = `${years} year ago`;
                } else if (months > 0) {
                    deck["created_on"]["ago"] = `${months} month${months > 1 ? 's' : ''} ago`;
                } else if (days > 0) {
                    deck["created_on"]["ago"] = `${days} day${days > 1 ? 's' : ''} ago`;
                } else if (hours > 0) {
                    deck["created_on"]["ago"] = `${hours} hour${hours > 1 ? 's' : ''} ${minutes > 1 ? ' and ' + minutes + ' minutes ago' : ' ago'}`;
                } else if (minutes > 0) {
                    deck["created_on"]["ago"] = `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
                } else {
                    deck["created_on"]["ago"] = "a few seconds ago";
                }

                const updateDate = new Date(deck["updated_on"]["full_time"])
                // Calculate years, months, days, hours, minutes, and seconds
                let updateAgo = Math.abs(time_now - updateDate);
                const updateYears = Math.floor(updateAgo / 31557600000);
                updateAgo -= updateYears * 31557600000;
                const updateMonths = Math.floor(updateAgo / 2630016000);
                updateAgo -= updateMonths * 2630016000;
                const updateDays = Math.floor(updateAgo / 86400000);
                updateAgo -= updateDays * 86400000;
                const updateHours = Math.floor(updateAgo / 3600000);
                updateAgo -= updateHours * 3600000;
                const updateMinutes = Math.floor(updateAgo / 60000);
                updateAgo -= updateMinutes * 60000;
                // Format the time difference
                if (updateYears > 0) {
                    deck["updated_on"]["ago"] = `${updateYears} year ago`;
                } else if (updateMonths > 0) {
                    deck["updated_on"]["ago"] = `${updateMonths} month${updateMonths > 1 ? 's' : ''} ago`;
                } else if (updateDays > 0) {
                    deck["updated_on"]["ago"] = `${updateDays} day${updateDays > 1 ? 's' : ''} ago`;
                } else if (updateHours > 0) {
                    deck["updated_on"]["ago"] = `${updateHours} hour${updateHours > 1 ? 's' : ''} ${updateMinutes > 1 ? ' and ' + updateMinutes + ' minutes ago' : ' ago'}`;
                } else if (updateMinutes > 0) {
                    deck["updated_on"]["ago"] = `${updateMinutes} minute${updateMinutes > 1 ? 's' : ''} ago`;
                } else {
                    deck["updated_on"]["ago"] = "a few seconds ago";
                }
            }
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
    }
}

export default deckQueries
