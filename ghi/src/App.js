import { BrowserRouter, Routes, Route } from "react-router-dom";
// import { useContext } from "react";
import MainPage from "./MainPage";
import DeckBuilder from "./Builder/DeckBuilder"
import DecksPage from "./Decks/DecksPage"
import DeckDetailPage from "./Decks/DeckDetailPage";
import DeckEditPage from "./Builder/DeckEditPage";
import DeckCopyPage from "./Builder/DeckCopyPage";
import CardsPage from "./Cards/CardsPage"
import CardCreatePage from "./Cards/CardCreatePage";
import CardDetailPage from "./Cards/CardDetailPage";
import TopCardsPage from "./Cards/TopCardsPage";
import SetsPage from "./Cards/SetsPage";
import SetDetailPage from "./Cards/SetDetailPage";
import PullPage from "./Cards/PullPage";
import UnderConstruction from "./display/UnderConstruction";
import Nav from "./Nav";
import Footer from "./Footer";
import LightSwitch from "./display/LightSwitch";
import BackToTop from "./display/BackToTop";
import "./index.css"
import "./Massive.css"
import AppProvider from "./context/AppProvider";
import PullsDeckBuilder from "./Builder/PullsDeckBuilder";
import AccountPage from "./Accounts/AccountPage";
import ResetPassword from "./Accounts/ResetPasswordPage";
import GameCards from "./Cards/GameCards";
import GameDecks from "./Decks/GameDecks";


function App() {

  let cards = require('./database/cards.json').map(card =>
    {card["id"] = card._id.$oid
    return card
  })
  let card_types = require('./database/card_types.json').map(card_type =>
      {card_type["id"] = card_type._id.$oid
      return card_type
  })
  let extra_effects = require('./database/extra_effects.json').map(extra_effect =>
      {extra_effect["id"] = extra_effect._id.$oid
      return extra_effect
  })
  let card_tags = require('./database/card_tags.json').map(card_tag =>
      {card_tag["id"] = card_tag._id.$oid
      return card_tag
  })
  let reactions = require('./database/reactions.json').map(reaction =>
      {reaction["id"] = reaction.$oid
      return reaction
  })
  let booster_sets = require('./database/booster_sets.json').map(booster_set =>
      {booster_set["id"] = booster_set._id.$oid
      return booster_set
  })
  let decks = require('./database/decks.json').map(deck =>
    {deck["id"] = deck._id.$oid
    return deck
  })


  return (

    <AppProvider>

    <BrowserRouter>
        <div className="content">
          <Nav/>
          <LightSwitch/>
          <BackToTop/>
          <div className="App">

            <Routes>
              <Route index element={<MainPage cards={cards} />} />
              <Route path="/deckbuilder" element={<DeckBuilder
                                                      cards={cards}
                                                      booster_sets={booster_sets}
                                                />} />
              <Route path="/decks" element={<DecksPage decks={decks}/>} />
              <Route path="/decks/:deck_id" element={<DeckDetailPage
                                                            decks={decks}
                                                            cards={cards}
                                                    />} />
              <Route path="/decks/:deck_id/edit" element={<DeckEditPage />} />
              <Route path="/decks/:deck_id/copy" element={<DeckCopyPage />} />
              <Route path="/cards" element={<CardsPage cards={cards}  booster_sets={booster_sets}/>} />
              <Route path="/cards/:card_number" element={<CardDetailPage
                                                            cards={cards}
                                                            card_types={card_types}
                                                            card_tags={card_tags}
                                                            extra_effects={extra_effects}
                                                            reactions={reactions}
                                                        />} />
              <Route path="/topcards" element={<TopCardsPage />} />
              <Route path="/series" element={<UnderConstruction />} />
              <Route path="/cardsets" element={<SetsPage
                                                boosterSets={booster_sets}
                                              />} />
              <Route path="/cardsets/:card_set_id" element={<SetDetailPage
                                                              cards={cards}
                                                              boosterSets={booster_sets}
                                                            />} />
              <Route path="/cardsets/:card_set_id/pulls" element={<PullPage
                                                                    cards={cards}
                                                                    boosterSets={booster_sets}
                                                                  />} />
              <Route path="/cardsets/:card_set_id/pulls/deckbuilder" element={<PullsDeckBuilder
                                                                                boosterSets={booster_sets}
                                                                              />} />


            </Routes>

          </div>
        </div>
        <Footer/>
    </BrowserRouter>

    </AppProvider>
  );
}

export default App;
