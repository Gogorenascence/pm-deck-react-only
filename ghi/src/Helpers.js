import React, { useEffect } from "react";

export function shortenedText(text) {
    if (text.length > 75) {
        return text.slice(0, 75) + "...";
    }
    return text;
}

// export function useOutsideAlerter(ref) {
//     useEffect(() => {
//     // Function for click event
//         function handleOutsideClick(event) {
//             if (ref.current && !ref.current.contains(event.target)) {
//                 handleShowMenu(false, "none");
//             }
//         }
//     // Adding click event listener
//         document.addEventListener("click", handleOutsideClick);
//         return () => document.removeEventListener("click", handleOutsideClick);
//     }, [ref]);
// }
export function useOutsideAlerter(ref, funct) {
    useEffect(() => {
      // Function for click event
        function handleOutsideClick(event) {
            if (ref.current && !ref.current.contains(event.target)) {
                funct();
            }
        }
      // Adding click event listener
        document.addEventListener("click", handleOutsideClick);
            return () => document.removeEventListener("click", handleOutsideClick);
    }, [ref]);
}
