import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./Massive.css"
import NavBar from "./NavBar";
import LightSwitch from "./display/LightSwitch";
import BackToTop from "./display/BackToTop";
import Footer from "./Footer";
import MainPage from "./MainPage";
import DeckBuilder from "./Builder/DeckBuilder"
import DecksPage from "./Decks/DecksPage"
import DeckDetailPage from "./Decks/DeckDetailPage";
import CardsPage from "./Cards/CardsPage"
import CardDetailPage from "./Cards/CardDetailPage";
import SetsPage from "./Cards/SetsPage";
import SetDetailPage from "./Cards/SetDetailPage";
import PullPage from "./Cards/PullPage";
import PullsDeckBuilder from "./Builder/PullsDeckBuilder";
import AppProvider from "./context/AppProvider";
import GamePlayPage from "./GamePlay/GamePlayPage";
import CardCategoriesPage from "./GamePlay/Categories/CardCategoriesPage";
import CardCategoryDetail from "./GamePlay/Categories/CardCategoryDetailPage";
import CardTagsPage from "./GamePlay/CardTags/CardTagsPage";
import CardTagDetails from "./GamePlay/CardTags/CardTagDetailPage";
import CardTypesPage from "./GamePlay/CardTypes/CardTypesPage";
import CardTypeDetails from "./GamePlay/CardTypes/CardTypeDetailPage";
import ExtraEffectsPage from "./GamePlay/ExtraEffects/ExtraEffectsPage";
import ExtraEffectDetails from "./GamePlay/ExtraEffects/ExtraEffectDetailPage";
import ReactionsPage from "./GamePlay/Reactions/ReactionsPage";
import ReactionDetails from "./GamePlay/Reactions/ReactionDetailPage";
import UnderConstruction from "./display/UnderConstruction";


function App() {

  let cards = require('./database/cards.json').map(card =>
    {card["id"] = card._id.$oid
    return card
  })
  let card_categories = require('./database/card_categories.json').map(category =>
    {category["id"] = category._id.$oid
    return category
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
    {reaction["id"] = reaction._id.$oid
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
          <NavBar/>
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
              <Route path="/cards" element={<CardsPage cards={cards}  booster_sets={booster_sets}/>} />
              <Route path="/cards/:card_number" element={<CardDetailPage
                                                            cards={cards}
                                                            card_types={card_types}
                                                            card_tags={card_tags}
                                                            extra_effects={extra_effects}
                                                            reactions={reactions}
                                                        />} />
              <Route path="/topcards" element={<UnderConstruction />} />
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
              <Route path="/gameplay" element={<GamePlayPage />} />
              <Route path="/cardcategories" element={<CardCategoriesPage card_categories={card_categories}/>} />
              <Route path="/cardcategories/:card_category_id" element={<CardCategoryDetail
                                                                          card_categories={card_categories}
                                                                          cards={cards}
                                                                      />} />
              <Route path="/cardtags" element={<CardTagsPage card_tags={card_tags}/>} />
              <Route path="/cardtags/:card_tag_id" element={<CardTagDetails
                                                              card_tags={card_tags}
                                                              cards={cards}
                                                            />} />
              <Route path="/cardtypes" element={<CardTypesPage card_types={card_types} />} />
              <Route path="/cardtypes/:card_type_id" element={<CardTypeDetails
                                                                card_types={card_types}
                                                                cards={cards}
                                                            />} />
              <Route path="/extraeffects" element={<ExtraEffectsPage extra_effects={extra_effects}/>} />
              <Route path="/extraeffects/:extra_effect_id" element={<ExtraEffectDetails
                                                                      extra_effects={extra_effects}
                                                                      cards={cards}
                                                                    />} />
              <Route path="/reactions" element={<ReactionsPage reactionProps={reactions}/>} />
              <Route path="/reactions/:reaction_id" element={<ReactionDetails
                                                              reactionProps={reactions}
                                                              cards={cards}
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
