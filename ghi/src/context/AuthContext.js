import { createContext, useState } from "react";
import { auth, db } from "../Firebase";
import {
    collection,
    doc,
    setDoc,
    getDoc,
    getDocs,
    where,
    query
} from "firebase/firestore";
import {
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    GoogleAuthProvider,
    signInWithPopup,
    signInWithRedirect,
    onAuthStateChanged,
    signOut
} from "firebase/auth";


const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
    const [loginError, setLoginError] = useState("")
    const [signUpError, setSignUpError] = useState([])
    const [account, setAccount] = useState({
        userData: "",
        username: "",
        collection: [],
        wishlist: [],
        decks: [],
        favorited_decks: [],
        roles: [],
    })
    const [loginCred, setLoginCred] = useState({
        email: "",
        password: "",
        })
    const [signUpCred, setSignUpCred] = useState({
        email: "",
        password: "",
        username: "",
        collection: [],
        wishlist: [],
        decks: [],
        favorited_decks: [],
        roles: [],
        })
    const [updateCred, setUpdateCred] = useState({
        email: "",
        username: "",
        password: "",
        unhashed_password: "",
        collection: [],
        wishlist: [],
        decks: [],
        favorited_decks: [],
        roles: [],
        created_on: {},
        })
    const [passwordCon, setPasswordCon] = useState("")
    const [showLoginModal, setShowLoginModal] = useState(false)
    const [showSignUpModal, setShowSignUpModal] = useState(false)
    const [viewPass, setViewPass] = useState(false)

    const signup = async (event, handleShowSignUpModal) => {
        event.preventDefault();
        // const check = await signUpCredCheck(signUpCred)
        const time_now = new Date();
        const additionalData = {
            username: signUpCred.username,
            collection: [],
            wishlist: [],
            decks: [],
            favorited_decks: [],
            roles: [],
            created_on: time_now,
        };

        try {
        const check = []
        if (signUpCred.username.length < 6) {
            check.push("Username must contain at least 6 characters")
        }
        const emailQuery = query(collection(db, "users"), where("email", "==", signUpCred.email));
        const emailQuerySnapshot = await getDocs(emailQuery);
        if (!emailQuerySnapshot.empty) {
            check.push("Email is already used by an account")
            // throw new Error("Username is already taken.");
        }
        const usernameQuery = query(collection(db, "users"), where("username", "==", signUpCred.username));
        const usernameQuerySnapshot = await getDocs(usernameQuery);
        if (!usernameQuerySnapshot.empty) {
            check.push("Username is already taken")
            // throw new Error("Username is already taken.");
        }
        const password = signUpCred.password
        if (password.length < 6) {
            check.push("Password must contain at least 6 characters")
        }
        const specialChar = ["!","@","$","&","+","~"]
        const checkSpec = password.split('').filter(char => specialChar.includes(char))
        if (checkSpec.length === 0) {
            check.push("Password must contain at least 1 special character (!, $, &, + or ~)")
        }
        console.log("3, ",check)
        const checkUpper = password.split('').filter(char => /[A-Z]/.test(char))
        if (checkUpper.length === 0) {
            check.push("Password must contain atleast 1 Uppercase letter")
        }
        console.log("4, ",check)
        const checkLower = password.split('').filter(char => /[a-z]/.test(char))
        if (checkLower.length === 0) {
            check.push("Password must contain atleast 1 Lowercase letter")
        }
        console.log("5, ",check)
        if (password !== passwordCon) {
            check.push("Passwords must match")
        }
        if (check.length > 0) {
            setSignUpError(check)
            throw new Error("Error creating user.");
        }
        // Create the user with email and password
        const userCredential = await createUserWithEmailAndPassword(auth, signUpCred.email, signUpCred.password);
        // Get the user object from the userCredential
        const user = userCredential.user;
        // Store additional user data in Firestore or Realtime Database
        await setDoc(doc(collection(db, "users"), user.uid), {
            email: user.email,
            username: additionalData.username,
            collection: additionalData.collection,
            wishlist: additionalData.wishlist,
            decks: additionalData.decks,
            favorited_decks: additionalData.favorited_decks,
            roles: additionalData.roles,
            created_on: additionalData.created_on,
            // Add other properties as needed
        });
        handleShowSignUpModal()
        // Return the user object
        return user;
        } catch (error) {
            // Handle errors
            console.error("Error creating user:", error);
            throw error;
        }
    };

    const login = async (event, handleShowLoginModal) => {
        event.preventDefault();
        signInWithEmailAndPassword(auth, loginCred.email, loginCred.password)
        .then((userCredentials) => {
            console.log(userCredentials);
            resetLoginCred();
            setShowLoginModal(false);
            handleShowLoginModal()
        })
        .catch((error) =>{
            setLoginError("Incorrect Username/Password");
            console.log(error)
        })
    };

    const logout = () => {
        signOut(auth)
        .then(() => {
        console.log("User successfully logged out")
        })
        setAccount({
        username: "",
        collection: [],
        wishlist: [],
        decks: [],
        favorited_decks: [],
        roles: [],
        created_on: ""
        })
    }

    const getUser = async () => {
        const accountState = onAuthStateChanged(auth, async (user) => {
            if (user) {
            const userData = user
            const accountData = {
                userData: userData,
                username: "",
                collection: [],
                wishlist: [],
                decks: [],
                favorited_decks: [],
                roles: [],
                created_on: ""
            }
            try {
                const docRef = doc(db, "users", user.uid);
                const snapshot = await getDoc(docRef);
                if (snapshot.empty) {
                    console.log("User document does not exist");
                } else {
                const additionalData = snapshot.data();
                accountData["username"] = additionalData.username ?? "No Name"
                accountData["collection"] = additionalData.collection ?? []
                accountData["wishlist"] = additionalData.wishlist ?? []
                accountData["decks"] = additionalData.decks ?? []
                accountData["favorited_decks"] = additionalData.favorited_decksame ?? []
                accountData["roles"] = additionalData.roles ?? []
                accountData["created_on"] = additionalData.created_on ?? ""
                setAccount(accountData)
                }
            } catch (error) {
                console.error("Error fetching additional user data:", error);
            }
            } else {
            setAccount(null)
            }
        });
        return accountState
    }

    const resetSignUpCred = (event) => {
        setSignUpCred({
            email: "",
            username: "",
            password: "",
            collection: [],
            wishlist: [],
            decks: [],
            favorited_decks: [],
            roles: [],
            created_on: {},
        });
        setPasswordCon("")
        };

        const resetLoginCred = (event) => {
        setLoginCred({
            email: "",
            password: "",
        });
        setPasswordCon("")
        };

    const googleSignIn = (handleShowLoginModal) => {
        const provider = new GoogleAuthProvider();
        signInWithPopup(auth, provider)
        handleShowLoginModal()
    }

    const googleSignInMobile = (handleShowLoginModal) => {
        const provider = new GoogleAuthProvider();
        signInWithRedirect(auth, provider)
        handleShowLoginModal()
    }
    // const update = async (event) => {
    //     const url = `${process.env.REACT_APP_FASTAPI_SERVICE_API_HOST}/api/accounts/${account.id}`
    //     fetch(url, {
    //         method: "put",
    //         body: JSON.stringify(updateCred),
    //         headers: {
    //         "Content-Type": "application/json",
    //         },
    //     })
    //     .then(() => getAccountData())
    //     .catch(console.error);
    // };

    // const updateWithOutPass = async (event) => {
    //     const url = `${process.env.REACT_APP_FASTAPI_SERVICE_API_HOST}/api/accounts/${account.id}/without`
    //     console.log(url)
    //     console.log(updateCred)
    //     fetch(url, {
    //         method: "put",
    //         body: JSON.stringify(updateCred),
    //         headers: {
    //         "Content-Type": "application/json",
    //         },
    //     })
    //     .then(() => getAccountData())
    //     .catch(console.error);
    // };

    return (
        <AuthContext.Provider value={{
            signup,
            login,
            logout,
            signUpError,
            setSignUpError,
            loginError,
            setLoginError,
            getUser,
            signUpCred,
            setSignUpCred,
            resetSignUpCred,
            updateCred,
            setUpdateCred,
            showSignUpModal,
            setShowSignUpModal,
            showLoginModal,
            setShowLoginModal,
            viewPass,
            setViewPass,
            // update,
            // updateWithOutPass,
            passwordCon,
            setPasswordCon,
            loginCred,
            setLoginCred,
            resetLoginCred,
            account,
            setAccount,
            googleSignIn,
            googleSignInMobile
        }}>
            {children}
        </AuthContext.Provider>
    );
};

export { AuthContext, AuthContextProvider };
