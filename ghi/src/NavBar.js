import { NavLink } from "react-router-dom";
import React, { useEffect, useState, useRef } from "react";


function NavBar() {
  const [showMenu, setShowMenu] = useState({
    show: false,
    section: ""
  })

  const [showMobileMenu, setShowMobileMenu] = useState(false)

  const navbar = useRef(null)
  useOutsideAlerter(navbar);

  const handleShowMenu = (show, section) => {
    setShowMenu({
      show: show,
      section: section
    })
    console.log(showMenu)
  }

  function useOutsideAlerter(ref) {
    useEffect(() => {
      // Function for click event
      function handleOutsideClick(event) {
        if (ref.current && !ref.current.contains(event.target)) {
          handleShowMenu(false, "none");
        }
      }
      // Adding click event listener
      document.addEventListener("click", handleOutsideClick);
      return () => document.removeEventListener("click", handleOutsideClick);
    }, [ref]);
  }

  const followLink = () => {
    handleShowMenu(false, "none")
  }

  const handleShowMobileMenu = () => {
    setShowMobileMenu(!showMobileMenu)
    handleShowMenu(false, "none")
  }

  const handleClickBrand = () => {
    setShowMobileMenu(false)
    handleShowMenu(false, "none")
  }

  return (
    <nav className="navbar topbar" ref={navbar}>
      <div className="nav-main">
        <div style={{display: "flex"}}>
          <NavLink className="navbar-brand2 navbar-select" to="/"
            onClick={() => handleClickBrand()}>
            PlayMaker CardBase
          </NavLink>
          <ul className="navbar-menu none">
            <li className="nav-item">
              <div className={ showMenu.show && showMenu.section === "decks"?
                "navbar-selected pointer": "navbar-select pointer"}
                onClick={() => handleShowMenu(true, "decks")}>
                <h5 className="navbar-menu-item">
                  Decks
                </h5>
              </div>
              { showMenu.show && showMenu.section === "decks"?
              <div className="nav-dropdown-content">
                <NavLink className="dropdown-select username2" to="/deckbuilder" onClick={() => followLink()}>
                  <div className="nav-dropdown-item">
                    Deck Builder
                  </div>
                </NavLink>
                <NavLink className="dropdown-select username2" to="/decks" onClick={() => followLink()}>
                  <div className="nav-dropdown-item">
                    Search Decks
                  </div>
                </NavLink>
              </div>: null
              }
            </li>
            <li className="nav-item">
              <div className={ showMenu.show && showMenu.section === "cards"?
                "navbar-selected pointer": "navbar-select pointer"}
                onClick={() => handleShowMenu(true, "cards")}>
                <h5 className="navbar-menu-item">
                  Cards
                </h5>
              </div>
              { showMenu.show && showMenu.section === "cards"?
                <div className="nav-dropdown-content">
                  <NavLink className="dropdown-select username2" to="/cards" onClick={() => followLink()}>
                    <div className="nav-dropdown-item">
                      Search Cards
                    </div>
                  </NavLink>
                  <NavLink className="dropdown-select username2" to="/cardsets" onClick={() => followLink()}>
                    <div className="nav-dropdown-item">
                      Card Sets
                    </div>
                  </NavLink>
                </div>:null
                }
            </li>
            <li className="nav-item">
              <div className={ showMenu.show && showMenu.section === "gameplay"?
                "navbar-selected pointer": "navbar-select pointer"}
                onClick={() => handleShowMenu(true, "gameplay")}>
                <h5 className="navbar-menu-item">
                  Game Play
                </h5>
              </div>
              { showMenu.show && showMenu.section === "gameplay"?
                <div className="nav-dropdown-content">
                  <NavLink className="dropdown-select username2" to="/gameplay" onClick={() => followLink()}>
                    <div className="nav-dropdown-item">
                      GamePlay Portal
                    </div>
                  </NavLink>
                </div>:null
              }
            </li>
          </ul>
        </div>

        <img className="threebars hidden2 media-display"
          onClick={() => handleShowMobileMenu()}
          src="https://i.imgur.com/Q1Y2vV9.png"
          alt="menu"/>
      </div>

      <ul className={showMobileMenu? "navbar-menu hidden2 maximize": "navbar-menu hidden2 minimize"}>
        <li className="nav-item">
          <div className={ showMenu.show && showMenu.section === "decks"?
            "navbar-selected pointer": "navbar-select pointer"}
            onClick={() => handleShowMenu(true, "decks")}>
            <h5 className="navbar-menu-item">
              Decks
            </h5>
          </div>
          { showMenu.show && showMenu.section === "decks"?
          <div className="nav-dropdown-content">
            <NavLink className="nav-dropdown-item" to="/deckbuilder" onClick={() => handleShowMobileMenu()}>
              <div className="dropdown-select">
                  Deck Builder
              </div>
            </NavLink>
            <NavLink className="nav-dropdown-item" to="/decks" onClick={() => handleShowMobileMenu()}>
              <div className="dropdown-select">
                Search Decks
              </div>
            </NavLink>
          </div>: null
          }
        </li>
        <li className="nav-item">
          <div className={ showMenu.show && showMenu.section === "cards"?
            "navbar-selected pointer": "navbar-select pointer"}
            onClick={() => handleShowMenu(true, "cards")}>
            <h5 className="navbar-menu-item">
              Cards
            </h5>
          </div>
          { showMenu.show && showMenu.section === "cards"?
            <div className="nav-dropdown-content">
              <NavLink className="nav-dropdown-item" to="/cards" onClick={() => handleShowMobileMenu()}>
                <div className="dropdown-select">
                  Search Cards
                </div>
              </NavLink>
              <NavLink className="nav-dropdown-item" to="/cardsets" onClick={() => handleShowMobileMenu()}>
                <div className="dropdown-select">
                  Card Sets
                </div>
              </NavLink>
            </div>:null
            }
        </li>
        <li className="nav-item">
          <div className={ showMenu.show && showMenu.section === "gameplay"?
            "navbar-selected pointer": "navbar-select pointer"}
            onClick={() => handleShowMenu(true, "gameplay")}>
            <h5 className="navbar-menu-item">
              Game Play
            </h5>
          </div>
          { showMenu.show && showMenu.section === "gameplay"?
            <div className="nav-dropdown-content">
              <NavLink className="nav-dropdown-item" to="/gameplay" onClick={() => handleShowMobileMenu()}>
                <div className="dropdown-select">
                  GamePlay Portal
                </div>
              </NavLink>
            </div>:null
          }
        </li>
      </ul>
    </nav>
  );
}

export default NavBar;
