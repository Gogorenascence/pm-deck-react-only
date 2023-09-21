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

  return (

    <AppProvider>

    <BrowserRouter>
        <div className="content">
          <Nav/>
          <LightSwitch/>
          <BackToTop/>
          <div className="App">

            <Routes>
              <Route index element={<MainPage />} />
              <Route path="/deckbuilder" element={<DeckBuilder />} />
              <Route path="/decks" element={<DecksPage />} />
              <Route path="/decks/:deck_id" element={<DeckDetailPage />} />
              <Route path="/decks/:deck_id/edit" element={<DeckEditPage />} />
              <Route path="/decks/:deck_id/copy" element={<DeckCopyPage />} />
              <Route path="/cards" element={<CardsPage />} />
              <Route path="/cardcreate" element={<CardCreatePage />} />
              <Route path="/cards/:card_number" element={<CardDetailPage />} />
              <Route path="/topcards" element={<TopCardsPage />} />
              <Route path="/series" element={<UnderConstruction />} />
              <Route path="/cardsets" element={<SetsPage />} />
              <Route path="/cardsets/:card_set_id" element={<SetDetailPage />} />
              <Route path="/cardsets/:card_set_id/pulls" element={<PullPage />} />
              <Route path="/cardsets/:card_set_id/pulls/deckbuilder" element={<PullsDeckBuilder />} />
              <Route path="/account" element={<AccountPage />} />
              <Route path="/reset/:reset_id" element={<ResetPassword />} />
              <Route path="/articles" element={<UnderConstruction />} />
              <Route path="/gameplay" element={<UnderConstruction />} />
              <Route path="/forum" element={<UnderConstruction />} />
              <Route path="/game/cards" element={<GameCards />} />
              <Route path="/game/decks" element={<GameDecks />} />
            </Routes>

          </div>
        </div>
        <Footer/>
    </BrowserRouter>

    </AppProvider>
  );
}

export default App;
