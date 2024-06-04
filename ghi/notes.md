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
