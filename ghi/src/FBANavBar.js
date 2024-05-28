import { NavLink } from "react-router-dom";
import React, { useEffect, useState, useContext, useRef } from "react";
import { AuthContext } from "./context/AuthContext";
import { AppContext } from "./context/AppContext";
import {GoogleButton} from "react-google-button"


function NavBar() {
  const [showMenu, setShowMenu] = useState({
    show: false,
    section: ""
  })

  const [showMobileMenu, setShowMobileMenu] = useState(false)
  const [showForgot, setShowForgot] = useState(false)
  const [forgotEmail, setForgotEmail] = useState("")

  const {
    signup,
    login,
    logout,
    getUser,
    signUpCred,
    setSignUpCred,
    resetSignUpCred,
    loginCred,
    setLoginCred,
    resetLoginCred,
    signUpError,
    setSignUpError,
    loginError,
    setLoginError,
    passwordCon,
    setPasswordCon,
    showSignUpModal,
    setShowSignUpModal,
    showLoginModal,
    setShowLoginModal,
    viewPass,
    setViewPass,
    account,
    googleSignIn,
    googleSignInMobile,
    forgotPassword
  } = useContext(AuthContext)

  const {isDark} = useContext(AppContext)

  const navbar = useRef(null)
  useOutsideAlerter(navbar);

  const handleShowMenu = (show, section) => {
    setShowMenu({
      show: show,
      section: section
    })
  }

  useEffect(() => {
    getUser()
  },[]);

  const handleShowLoginModal = (event) => {
    if (!showLoginModal){
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    setShowLoginModal(!showLoginModal)
    if (showLoginModal === false) {
      resetLoginCred()
    }
    setShowSignUpModal(false)
    setSignUpError("")
    setLoginError("")
    setViewPass(false)
    resetSignUpCred()
    setShowMobileMenu(false)
  }

  const handleShowSignUpModal = async (event) => {
    if (!showSignUpModal){
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    setShowSignUpModal(!showSignUpModal)
    if (showSignUpModal === false) {
      resetSignUpCred()
    }
    setShowLoginModal(false)
    setSignUpError("")
    setLoginError("")
    setViewPass(false)
    resetLoginCred()
    setShowMobileMenu(false)
  }

  const handleSignUpCredChange = (event) => {
      setSignUpCred({ ...signUpCred, [event.target.name]: event.target.value });
      // setLoginCred({...loginCred, [event.target.name]: event.target.value})
  };

  const handlePasswordConChange = (event) => {
      setPasswordCon(event.target.value);
  };

  const handleLoginCredChange = (event) => {
    setLoginCred({ ...loginCred, [event.target.name]: event.target.value });
  };

  const handleForgotEmail = (event) => {
    setForgotEmail(event.target.value);
  };

  const handleViewPass = (event) => {
    const pass = document.getElementById("pass");
    const passConf = document.getElementById("passConf");
    if (pass.type === "password") {
      pass.type = "text";
      setViewPass(true)
    } else {
      pass.type = "password";
      setViewPass(false)
    }
    if (passConf.type === "password") {
      passConf.type = "text";
      setViewPass(true)
    } else {
      passConf.type = "password";
      setViewPass(false)
    }
  };

  const handleGoogleSignIn = async () => {
    handleShowLoginModal()
    try {
      await googleSignIn()
    } catch (error) {
      console.log(error)
    }
  }

  const handleGoogleSignInMobile = async () => {
    try {
      await googleSignInMobile()
    } catch (error) {
      console.log(error)
    }
  }

  const handleSendPasswordReset = (event, email) => {
    event.preventDefault()
    forgotPassword(email)
    handleShowLoginModal()
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

  const handleShowForgot = () => {
    if (showForgot) {
      setShowForgot(false)
      setForgotEmail("")
      setLoginError([])
    } else {
      setShowForgot(true)
      setLoginError([])
    }
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
                <NavLink className="dropdown-select username2" to="/decks" onClick={() => followLink()}>
                  <div className="nav-dropdown-item">
                    Deck Search
                  </div>
                </NavLink>
                <NavLink className="dropdown-select username2" to="/deckbuilder" onClick={() => followLink()}>
                  <div className="nav-dropdown-item">
                    Deck Builder
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
                      Card List
                    </div>
                  </NavLink>
                  {/* <NavLink className="dropdown-select username2" to="/topcards" onClick={() => followLink()}>
                    <div className="nav-dropdown-item">
                      Top Cards
                    </div>
                  </NavLink> */}
                  <NavLink className="dropdown-select username2" to="/cardsets" onClick={() => followLink()}>
                    <div className="nav-dropdown-item">
                      Card Set List
                    </div>
                  </NavLink>
                  <NavLink className="dropdown-select username2" to="/pulls/deckbuilder" onClick={() => followLink()}>
                    <div className="nav-dropdown-item">
                      Pulls Deck Builder
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
                  <NavLink className="dropdown-select username2" to="/rulebooks" onClick={() => followLink()}>
                    <div className="nav-dropdown-item">
                      How To Play
                    </div>
                  </NavLink>
                  <NavLink className="dropdown-select username2" to="/gameplay" onClick={() => followLink()}>
                    <div className="nav-dropdown-item">
                      GamePlay Portal
                    </div>
                  </NavLink>
                </div>:null
              }
            </li>
            <li className="nav-item">
              <div className={ showMenu.show && showMenu.section === "articles"?
                "navbar-selected pointer": "navbar-select pointer"}
                onClick={() => handleShowMenu(true, "articles")}>
                <h5 className="navbar-menu-item">
                  Articles
                </h5>
              </div>
              { showMenu.show && showMenu.section === "articles"?
                <div className="nav-dropdown-content">
                  <NavLink className="dropdown-select username2" to="/articles" onClick={() => followLink()}>
                    <div className="nav-dropdown-item">
                      Article List
                    </div>
                  </NavLink>
                </div>:null
              }
            </li>
            <li className="nav-item">
              <div className="navbar-select pointer">
                <NavLink className="username2" to="/simulator">
                  <h5 className="navbar-menu-item">
                    Simulator
                  </h5>
                </NavLink>
              </div>
            </li>
            {/* <li className="nav-item">
                <NavLink className="username2" to="/simulator" onClick={() => followLink()}>
                  <div className="navbar-select pointer">
                      <h5 className="navbar-menu-item">
                        Simulator
                      </h5>
                  </div>
                </NavLink>
            </li> */}
            {/* { account && account.roles.includes("admin")?
              <li className="nav-item">
                <div className={showMenu.show && showMenu.section === "admin"?
                  "navbar-selected pointer": "navbar-select pointer"}
                  onClick={() => handleShowMenu(true, "admin")}>
                  <h5 className="navbar-menu-item">
                    Admin
                  </h5>
                </div>
                { showMenu.show && showMenu.section === "admin"?
                  <div className="nav-dropdown-content">
                    <NavLink className="dropdown-select username2" to="/createportal" onClick={() => followLink()}>
                      <div className="nav-dropdown-item">
                        Admin Create Portal
                      </div>
                    </NavLink>
                  </div>:null
                }
              </li>:null
            } */}
          </ul>
        </div>

        <img className="threebars hidden2 media-display"
          onClick={() => handleShowMobileMenu()}
          src="https://i.imgur.com/Q1Y2vV9.png"
          alt="menu"/>

        <div className="none">
          { !account?
            <div className="accountbuttons">
              <div className="navbar-select pointer"
                onClick={() => handleShowLoginModal()}>
                <h5 className="navbar-menu-item">
                  Login
                </h5>
              </div>
              <div className="navbar-select pointer"
                onClick={() => handleShowSignUpModal()}>
                <h5 className="navbar-menu-item">
                  Signup
                </h5>
              </div>
            </div>
              :
            <div className="accountbuttons">
              <NavLink className="username2" to="/account">
                <div className="navbar-select pointer">
                  <h5 className="navbar-menu-item">
                    {account.username}
                  </h5>
                </div>
              </NavLink>
              <div className="navbar-select pointer" onClick={() => logout()}>
                <h5 className="navbar-menu-item">
                  Logout
                </h5>
              </div>
            </div>
          }
        </div>
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
            <NavLink className="nav-dropdown-item" to="/decks" onClick={() => handleShowMobileMenu()}>
              <div className="dropdown-select">
                Deck Search
              </div>
            </NavLink>
            <NavLink className="nav-dropdown-item" to="/deckbuilder" onClick={() => handleShowMobileMenu()}>
              <div className="dropdown-select">
                  Deck Builder
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
                  Card List
                </div>
              </NavLink>
              {/* <NavLink className="nav-dropdown-item" to="/topcards" onClick={() => handleShowMobileMenu()}>
                <div className="dropdown-select">
                  Top Cards
                </div>
              </NavLink> */}
              <NavLink className="nav-dropdown-item" to="/cardsets" onClick={() => handleShowMobileMenu()}>
                <div className="dropdown-select">
                  Card Set List
                </div>
              </NavLink>
              <NavLink className="nav-dropdown-item" to="/pulls/deckbuilder" onClick={() => handleShowMobileMenu()}>
                <div className="dropdown-select">
                  Pulls Deck Builder
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
              <NavLink className="nav-dropdown-item" to="/rulebooks" onClick={() => handleShowMobileMenu()}>
                <div className="dropdown-select">
                  How To Play
                </div>
              </NavLink>
              <NavLink className="nav-dropdown-item" to="/gameplay" onClick={() => handleShowMobileMenu()}>
                <div className="dropdown-select">
                  GamePlay Portal
                </div>
              </NavLink>
            </div>:null
          }
        </li>
        <li className="nav-item">
          <div className={ showMenu.show && showMenu.section === "articles"?
            "navbar-selected pointer": "navbar-select pointer"}
            onClick={() => handleShowMenu(true, "articles")}>
            <h5 className="navbar-menu-item">
              Articles
            </h5>
          </div>
          { showMenu.show && showMenu.section === "articles"?
            <div className="nav-dropdown-content">
              <NavLink className="nav-dropdown-item" to="/articles" onClick={() => handleShowMobileMenu()}>
                <div className="dropdown-select">
                  Article List
                </div>
              </NavLink>
            </div>:null
          }
        </li>
        {/* { account && account.roles.includes("admin")?
          <li className="nav-item">
            <div className={showMenu.show && showMenu.section === "admin"?
              "navbar-selected pointer": "navbar-select pointer"}
              onClick={() => handleShowMenu(true, "admin")}>
              <h5 className="navbar-menu-item">
                Admin
              </h5>
            </div>
            { showMenu.show && showMenu.section === "admin"?
              <div className="nav-dropdown-content">
                <NavLink className="nav-dropdown-item" to="/createportal" onClick={() => handleShowMobileMenu()}>
                  <div className="dropdown-select">
                    Admin Create Portal
                  </div>
                </NavLink>
              </div>:null
            }
          </li>:null
        } */}
        { !account?
          <li className="nav-item2">
            <div className="navbar-select2 pointer"
              onClick={() => handleShowLoginModal()}>
              <h5 className="navbar-menu-item">
                Login
              </h5>
            </div>
            <div className="navbar-select2 pointer"
              onClick={() => handleShowSignUpModal()}>
              <h5 className="navbar-menu-item">
                Signup
              </h5>
            </div>
          </li>
          :
          <li className="nav-item2">
            <NavLink className="username2" to="/account" onClick={() => handleShowMobileMenu()}>
              <div className="navbar-select2 pointer">
                <h5 className="navbar-menu-item ellipsis2">
                  {account.username}
                </h5>
              </div>
            </NavLink>
            <div className="navbar-select2 pointer"
              onClick={() => logout()}
              >
              <h5 className="navbar-menu-item">
                Logout
              </h5>
            </div>
          </li>
        }
      </ul>
      { showSignUpModal?
        <>
          <form onSubmit={(event) => signup(event, handleShowSignUpModal)} className={!isDark? "medium-modal" :"medium-modal-dark"}>
            <h2 className="label-center">Create Account </h2>
            <span className="flex-content">
              <div className="login" style={{ margin: "20px 20px 20px 20px"}}>

                <h5 className="label">Email </h5>
                <input
                    className="builder-input"
                    type="text"
                    placeholder=" Email"
                    onChange={handleSignUpCredChange}
                    name="email"
                    value={signUpCred.email}>
                </input>

                <h5 className="label">Username </h5>
                <input
                    className="builder-input"
                    type="text"
                    placeholder=" Username"
                    onChange={handleSignUpCredChange}
                    name="username"
                    value={signUpCred.username}>
                </input>

                <h5 className="label">Password </h5>
                <input
                    className="builder-input"
                    id="pass"
                    type="password"
                    placeholder=" Password"
                    onChange={handleSignUpCredChange}
                    name="password"
                    value={signUpCred.password}>
                </input>

                { !viewPass?
                  <img
                    className="logo2 pointer"
                    src={!isDark? "https://i.imgur.com/MfNqq8S.png":"https://i.imgur.com/z4CRxAm.png"}
                    onClick={handleViewPass}
                    title="view password"
                  />:
                  <img
                    className="logo2 pointer"
                    src={!isDark? "https://i.imgur.com/w8oag0B.png":"https://i.imgur.com/NE539ZZ.png"}
                    onClick={handleViewPass}
                    title="hide password"
                  />
                }

                <h5 className="label">Confirm Password </h5>
                <input
                    className="builder-input"
                    id="passConf"
                    type="password"
                    placeholder=" Confirm Password"
                    onChange={handlePasswordConChange}
                    value={passwordCon}>
                </input>

                { !viewPass?
                  <img
                    className="logo2 pointer"
                    src={!isDark? "https://i.imgur.com/MfNqq8S.png":"https://i.imgur.com/z4CRxAm.png"}
                    onClick={handleViewPass}
                    title="view password"
                  />:
                  <img
                    className="logo2 pointer"
                    src={!isDark? "https://i.imgur.com/w8oag0B.png":"https://i.imgur.com/NE539ZZ.png"}
                    onClick={handleViewPass}
                    title="hide password"
                  />
                }
              </div>
            </span>
            <div style={{margin: "20px 0px 20px 0px"}}>
              { signUpError? (
                signUpError.map((error) =>
                  (
                    <>
                      <p className="error">{error}</p>
                    </>
                  ))): null
                }
            </div>

            <div className="aligned">
              <button className="front-button" type="submit">Signup</button>
              <button className="end-button margin-left-3" onClick={handleShowSignUpModal}>Close</button>
              <p onClick={handleShowLoginModal}
                className="pointer label-center">
                  Already have an account? Log in!
              </p>
            </div>
          </form>
          <div className="blackSpace"></div>
        </>:
        null
      }
      { showLoginModal?
        <>
          {!showForgot?
            <>
              <form onSubmit={(event) => login(event, handleShowLoginModal)}
                className={!isDark? "medium-modal" :"medium-modal-dark"}>
                <h2 className="label-center">User Login </h2>
                <span className="flex-content">
                  <div className="login" style={{margin: "20px 20px 20px 20px"}}>
                    <h5 className="label">Email </h5>
                    <input
                        className="builder-input"
                        type="text"
                        placeholder=" Email"
                        onChange={handleLoginCredChange}
                        name="email"
                        value={loginCred.email}>
                    </input>

                    <h5 className="label">Password </h5>
                    <input
                        className="builder-input"
                        id="pass"
                        type="password"
                        placeholder=" Password"
                        onChange={handleLoginCredChange}
                        name="password"
                        value={loginCred.password}>
                    </input>

                    { !viewPass?
                      <img
                        className="logo2 pointer"
                        src={!isDark? "https://i.imgur.com/MfNqq8S.png":"https://i.imgur.com/z4CRxAm.png"}
                        onClick={handleViewPass}
                        title="view password"
                      />:
                      <img
                        className="logo2 pointer"
                        src={!isDark? "https://i.imgur.com/w8oag0B.png":"https://i.imgur.com/NE539ZZ.png"}
                        onClick={handleViewPass}
                        title="hide password"
                      />
                    }

                    { loginError?
                      <p className="error">{loginError}</p>:
                      null
                    }

                  </div>
                </span>
                <div className="aligned">
                  <button className="front-button" type="submit">Login</button>
                  <button className="end-button margin-left-3" onClick={handleShowLoginModal}>Close</button>
                  <div className="wide100p flex-full margin-top-20 none">
                    <GoogleButton onClick={() => handleGoogleSignIn(handleShowLoginModal)}/>
                  </div>
                  <div className="wide100p flex-full margin-top-20 hidden4 media-flex-center">
                    <GoogleButton onClick={() => handleGoogleSignInMobile(handleShowLoginModal)}/>
                  </div>
                  <p onClick={handleShowSignUpModal}
                    className="pointer label-center">
                      New here? Sign Up!
                  </p>
                  <p onClick={handleShowForgot}
                    className="pointer label-center">
                      Forgot Password?
                  </p>
                </div>
              </form>
              <div className="blackSpace"></div>
            </>:
            <>
              <form onSubmit={(event) => handleSendPasswordReset(event, forgotEmail)}
                className={!isDark? "medium-modal" :"medium-modal-dark"}>
                <h2 className="label-center">Password Reset </h2>
                <span className="flex-content">
                  <div className="login" style={{margin: "20px 20px 20px 20px"}}>
                    <h5 className="label">Account Email </h5>
                    <input
                        className="builder-input"
                        type="text"
                        placeholder=" Account Email"
                        onChange={handleForgotEmail}
                        name="email"
                        value={forgotEmail}>
                    </input>
                  </div>
                </span>
                <div className="aligned margin-bottom-20">
                  <button className="front-button" type="submit">Send An Email</button>
                  <button className="end-button margin-left-3" onClick={handleShowForgot}>Cancel</button>
                </div>
              </form>
              <div className="blackSpace"></div>
            </>
          }
        </>:null
      }
    </nav>
  );
}

export default NavBar;
