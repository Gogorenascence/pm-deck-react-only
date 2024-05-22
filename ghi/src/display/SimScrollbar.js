import { useLocation } from "react-router-dom";

function SimScrollbar() {
    const location = useLocation();
    if (location.pathname.slice(0, 10) === "/simulator") {
        document.body.classList.add("sim-scrollbar");
    } else {
        document.body.classList.remove("sim-scrollbar");
    }
}

export default SimScrollbar;
