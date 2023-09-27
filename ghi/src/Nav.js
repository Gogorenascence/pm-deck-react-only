import React from "react";
import { NavLink } from "react-router-dom";

function Nav() {
  return (
    <nav className="navbar navbar-expand-md navbar-dark bg-dark sticky-top topbar">
      <div className="container-fluid">
        <NavLink className="navbar-brand" to="/">
          PlayMaker CardBase
        </NavLink>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="/#"
                id="decksDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                Decks
              </a>
              <div className="dropdown-menu" aria-labelledby="decksDropdown">
                <NavLink className="dropdown-item" to="/deckbuilder">
                  Deck Builder
                </NavLink>
                <NavLink className="dropdown-item" to="/decks">
                  Search Decks
                </NavLink>
              </div>
            </li>
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="/#"
                id="cardsDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                Cards
              </a>
              <div className="dropdown-menu" aria-labelledby="cardsDropdown">
                <NavLink className="dropdown-item" to="/cards">
                  Search Cards
                </NavLink>
                <NavLink className="dropdown-item" to="/topcards">
                  Top Cards
                </NavLink>
                <NavLink className="dropdown-item" to="/cardsets">
                  Card Sets
                </NavLink>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Nav;
