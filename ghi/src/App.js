import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./Massive.css"
import NavBar from "./FBANavBar";
import LightSwitch from "./display/LightSwitch";
import BackToTop from "./display/BackToTop";
import Footer from "./Footer";
import MainPage from "./MainPage";
import DecksPage from "./Decks/DecksPage"
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
import SimulatorPage from "./Simulator/SimulatorPage";
import UnderConstruction from "./display/UnderConstruction";
import TermsPage from "./GamePlay/TermsPage";
import ArticlesPage from "./Articles/ArticlesPage";
import ArticlePage from "./Articles/ArticlePage";
import HowToPage from "./GamePlay/HowTos/HowToPage";
import HowTosPage from "./GamePlay/HowTos/HowTosPage";
import FBDeckBuildandImport from "./Builder/FBDeckBuildandImport";
import FBDeckDetailPage from "./Decks/FBDeckDetailPage";
import FBDeckEdit from "./Builder/FBDeckEditPage";
import FBAccountPage from "./Accounts/FBAccountPage";
import FBDeckCopy from "./Builder/FBDeckCopyPage";


function App() {

  let cards = require('./database/cards.json').map(card =>
    {card["id"] = card._id.$oid
    return card
  }).map(card => ({
      ...card,
      picture_url: card.picture_url.replace("https://playmakercards","https://compressedplaymakercards")
          .replace("png", "jpg")
  }))
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
  }).filter(deck => deck.private !== true)
  let terms = require('./database/terms.json').map(term =>
    {term["id"] = term._id.$oid
    return term
  })

  let articles = require('./database/articles.json').map(article =>
    {article["id"] = article._id.$oid
    return article
  })

  let howTos = require('./database/how_tos.json').map(howTo =>
    {howTo["id"] = howTo._id.$oid
    return howTo
  })

  return (

    <AppProvider>

    <BrowserRouter>
        <div className="content">
          <NavBar/>
          <LightSwitch/>
          <BackToTop/>
          <div className="app">

            <Routes>
              <Route index element={<MainPage cards={cards}
                                              articles={articles}
                                    />} />
              <Route path="/deckbuilder" element={<FBDeckBuildandImport
                                                      cards={cards}
                                                      booster_sets={booster_sets}
                                                />} />
              <Route path="/decks" element={<DecksPage decks={decks}/>} />
              <Route path="/decks/:deck_id" element={<FBDeckDetailPage
                                                      cards={cards}
                                                    />} />
              <Route path="/decks/:deck_id/copy" element={<FBDeckCopy
                                                      cards={cards}
                                                      booster_sets={booster_sets}
                                                />} />
              <Route path="/decks/:deck_id/edit" element={<FBDeckEdit
                                                      cards={cards}
                                                      booster_sets={booster_sets}
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
              <Route path="/pulls/deckbuilder" element={<PullsDeckBuilder
                                                                                boosterSets={booster_sets}
                                                                              />} />
              <Route path="/gameplay" element={<GamePlayPage />} />
              <Route path="/glossary" element={<TermsPage terms={terms}/>} />
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
              <Route path="/simulator" element={<SimulatorPage
                                                pre_decks={decks}
                                                pre_processed_cards={cards}
                                                card_types={card_types}
                                                card_tags={card_tags}
                                                extra_effects={extra_effects}
                                                reactions={reactions}
                                                />} />
              <Route path="/articles" element={<ArticlesPage articles={articles}/>} />
              <Route path="/articles/:article_id" element={<ArticlePage articles={articles}/>} />
              <Route path="/rulebooks" element={<HowTosPage howTos={howTos.sort((a,b) => a.how_to_number - b.how_to_number)}/>} />
              <Route path="/rulebooks/:how_to_id" element={<HowToPage howTos={howTos}/>} />
              <Route path="/account" element={<FBAccountPage />} />
            </Routes>

          </div>
        </div>
        <Footer/>
    </BrowserRouter>

    </AppProvider>
  );
}

export default App;
