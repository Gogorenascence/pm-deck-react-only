const helper = {
    todaysFormattedDate: async function todaysFormattedDate() {
        const timeZone = 'America/Chicago';
        const options = { timeZone: timeZone, year: 'numeric', month: '2-digit', day: '2-digit' };
        const adjustedDate = new Intl.DateTimeFormat('en-US', options).format(new Date());
        const formattedDate = new Date(adjustedDate).toISOString().split('T')[0];
        return formattedDate;
    },
    createTimeObj: async function createTimeObj() {
        let now = new Date();
        now.setHours(now.getHours() + 5)

        let year = now.getFullYear();
        let month = String(now.getMonth() + 1).padStart(2, '0');
        let day = String(now.getDate()).padStart(2, '0');
        let hours = String(now.getHours()).padStart(2, '0');
        let minutes = String(now.getMinutes()).padStart(2, '0');

        // Construct time_dict
        let time_dict = {
            "year": year,
            "month": month,
            "day": day,
            "time": hours + ":" + minutes,
            "full_time": now.toISOString()
        };

        console.log(time_dict);
        return time_dict
    },
    generateRandomString: async function generateRandomString(length) {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let randomString = '';

        for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        randomString += characters.charAt(randomIndex);
        }
        return randomString;
    },
    generateRandomStringNA: function (length) {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let randomString = '';

        for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        randomString += characters.charAt(randomIndex);
        }
        return randomString;
    },
    createAllTimesAgos: function createAllTimesAgos(data){
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
    },
    createTimesAgos: function createTimesAgos(deckData){
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
    },
    objectsAreEqual: function objectsAreEqual(obj1, obj2) {
        const obj1Keys = Object.keys(obj1);
        for (const key of obj1Keys) {
            if (obj1[key] != obj2[key]) {
                return false;
            }
        }
        return true;
    },
    deepCopy: function deepCopy(obj) {
        return JSON.parse(JSON.stringify(obj));
    }
}

export default helper
