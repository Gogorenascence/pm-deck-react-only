import React, { useContext } from "react";
import { AppContext } from "../context/AppContext";

function LightSwitch() {
    const {isDark, setIsDark} = useContext(AppContext)

    const handleDark = () => {
        setIsDark(!isDark);
        localStorage.setItem("darkMode", JSON.stringify(!isDark));
    };

    if (isDark) {
        document.body.classList.add("dark");
    } else {
        document.body.classList.remove("dark");
    }

    return (
        <div>
            {!isDark ? (
                <img
                className="light-dark"
                src="https://i.imgur.com/aC79zoE.png"
                alt="dark"
                onClick={handleDark}
                />
            ) : (
                <img
                className="light-dark"
                src="https://i.imgur.com/bL1Lcll.png"
                alt="light"
                onClick={handleDark}
                />
            )}
        </div>
    );
}

export default LightSwitch;
