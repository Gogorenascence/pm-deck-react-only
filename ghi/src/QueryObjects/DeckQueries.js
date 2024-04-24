import { db } from "../Firebase"
import { getDocs, collection, query, orderBy, where } from "firebase/firestore"

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
    }
}

export default deckQueries


// def get_deck_list(self, id: str) -> list:
// deck = self.collection.find_one({"_id": ObjectId(id)})
// card_list = deck["cards"]
// pluck_list = deck["pluck"]
// types = {
//     "fighters": 0,
//     "auras": 0,
//     "moves": 0,
//     "endings": 0,
//     "max_variables": 0,
//     "items": 0,
//     "events": 0,
//     "comebacks": 0,
// }

// DATABASE_URL = os.environ["DATABASE_URL"]
// conn = MongoClient(DATABASE_URL)
// db = conn.cards.cards
// main_deck = []
// for card_item in card_list:
//     card = db.find_one({"card_number": card_item})
//     card["id"] = str(card["_id"])
//     main_deck.append(CardOut(**card))
// pluck_deck = []
// for pluck_item in pluck_list:
//     pluck = db.find_one({"card_number": pluck_item})
//     if pluck:
//         pluck["id"] = str(pluck["_id"])
//         pluck_deck.append(CardOut(**pluck))
// full_list = main_deck + pluck_deck
// for card in full_list:
//     if card.card_type[0] == 1001:
//         types["fighters"] += 1
//     elif card.card_type[0] == 1002:
//         types["auras"] += 1
//     elif card.card_type[0] == 1003:
//         types["moves"] += 1
//     elif card.card_type[0] == 1004:
//         types["endings"] += 1
//     elif card.card_type[0] == 1006:
//         types["items"] += 1
//     elif card.card_type[0] == 1007:
//         types["events"] += 1
//     elif card.card_type[0] == 1008:
//         types["comebacks"] += 1
//     else:
//         types["max_variables"] += 1
// deck_list = [main_deck, pluck_deck, types]
// return deck_list

// def get_counted_deck_list(self, id: str) -> list:
// deck = self.collection.find_one({"_id": ObjectId(id)})
// card_list = deck["cards"]
// pluck_list = deck["pluck"]
// side_list = deck["side"]

// card_count = {}
// for item in card_list:
//     if item not in card_count.keys():
//         card_count[item] = 1
//     else:
//         card_count[item] += 1

// pluck_count = {}
// for item in pluck_list:
//     if item not in pluck_count.keys():
//         pluck_count[item] = 1
//     else:
//         pluck_count[item] += 1

// DATABASE_URL = os.environ["DATABASE_URL"]
// conn = MongoClient(DATABASE_URL)
// db = conn.cards.cards
// main_deck = []
// for card_item, count in card_count.items():
//     card = db.find_one({"card_number": card_item})
//     card["id"] = str(card["_id"])
//     card["count"] = count
//     main_deck.append(CardOut(**card))
// pluck_deck = []
// for pluck_item, count in pluck_count.items():
//     pluck = db.find_one({"card_number": pluck_item})
//     if pluck:
//         pluck["id"] = str(pluck["_id"])
//         pluck["count"] = count
//         pluck_deck.append(CardOut(**pluck))
// side_deck = []
// for side_item in side_list:
//     side = db.find_one({"card_number": side_item})
//     side["id"] = str(side["_id"])
//     side_deck.append(CardOut(**side))
// deck_list = [main_deck, pluck_deck, side_deck]
// return deck_list
