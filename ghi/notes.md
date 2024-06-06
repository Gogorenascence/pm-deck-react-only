.account-scrollable {
    margin: 0% 0% 0% .5%;
    height: 473px;
    /* overflow-x: hidden; */
    /* overflow-y: auto; */
    border: 1px solid rgba(0, 0, 0, 0.212);
    background-color: rgba(15, 0, 50, 0.315);
    border-radius: 2px;
    outline: 1px solid rgba(255, 255, 255, 0.3);
  }

  .newsRow {
    max-height: 250px;
    overflow-y: scroll;
  }

  Breaks dark-mode when rendered in account decks, favorited decks and new row



Add an environment variable to use the legacy OpenSSL provider. You can do this by adding a script to your package.json or by exporting the variable directly in your terminal:

Option A: Modify package.json
Add a start script in your package.json:
  "scripts": {
    "start": "set NODE_OPTIONS=--openssl-legacy-provider && react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject"
  },




    const matchMake = async() => {
        console.log(opponents)
        console.log("Finding opponents")
        const opponent = {
            name: "",
            hp: 16,
            mainDeck: [],
            pluckDeck: [],
            hand: [],
            ownership: [],
            mainDiscard: [],
            pluckDiscard: [],
            playArea:"",
            activePluck: "",
            focus: 0,
            enthusiasm: 0,
            mettle: 0,
            secondWind: false,
            playArea: "",
            activePluck: "",
            faceDown: "",
            defending: "",
            defendingCard: ""
        }

        const newPlayer = helper.deepCopy(player)
        const newFaceDown = {...faceDown}
        const newDefending = {...defending}
        const newDefendingCard = {...defendingCard}
        for (let [key, value] of Object.entries(newPlayer)) {
            console.log(key, value)
            opponent[key] = value
        }
        const oppFaceDown = {}
        for (let [key, value] of Object.entries(newFaceDown)) {
            oppFaceDown[key] = value
        }
        opponent["faceDown"] = oppFaceDown
        const oppDefending = {}
        for (let [key, value] of Object.entries(newDefending)) {
            oppDefending[key] = value
        }
        opponent["defending"] = oppDefending
        const oppDefendingCard = {}
        for (let [key, value] of Object.entries(newDefendingCard)) {
            oppDefendingCard[key] = value
        }
        opponent["defendingCard"] = oppDefendingCard
        console.log(opponent)
        console.log("Opponent Found")
        if (opponents.length < 3) {
            setOpponents([...opponents, opponent])
        }
        console.log("Opponent Added")
        console.log(opponents)
    }
