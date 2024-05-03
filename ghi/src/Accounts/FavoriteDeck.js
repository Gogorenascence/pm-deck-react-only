import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";


function FavoriteDeck(props) {
    const {
        account,
        updateUser
    } =  useContext(AuthContext)

    const {deck} = props;

    const favorite = async () => {
        if (!account.favorited_decks.includes(deck.id)) {
            const newFavoritedDecks = [...account.favorited_decks, deck.id];
            updateUser({ "favorited_decks": newFavoritedDecks });
        }
    };

    const unfavorite = async () => {
        if (account.favorited_decks.includes(deck.id)) {
            const newFavoritedDecks = [...account.favorited_decks];
            const favoriteIndex = newFavoritedDecks.indexOf(deck.id);
            newFavoritedDecks.splice(favoriteIndex, 1);
            updateUser({ "favorited_decks": newFavoritedDecks });
        }
    };


    return(
        <>
            {account?
                <div style={{display: "flex", flexGrow: "20", justifyContent: "end"}}>
                    {account.favorited_decks.includes(deck.id)?
                        <img className="logo5 pointer"
                            src="https://i.imgur.com/9fuxfxy.png"
                            alt="unfavorited"
                            onClick={() => unfavorite()}
                            title="Favorited"
                        />
                        :
                        <img className="logo5 pointer"
                            src="https://i.imgur.com/cecWS0L.png"
                            alt="favorited"
                            onClick={() => favorite()}
                        />
                    }
                </div>: null
            }
        </>
    )
}

export default FavoriteDeck;
