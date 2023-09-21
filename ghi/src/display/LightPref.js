// import { useEffect, useMemo } from "react";
// import { useMediaQuery } from "react-responsive";
// import createPersistedState from "use-persisted-state";
// const LightPrefState = createPersistedState("colorScheme");

// export function LightPref() {
//     const systemPrefersDark = useMediaQuery(
//         {
//         query: "(prefers-color-scheme: dark)",
//         },
//         undefined
//     );

//     const [isDark, setIsDark] = LightPrefState();
//     const value = useMemo(
//         () => (isDark === undefined ? !!systemPrefersDark : isDark),
//         [isDark, systemPrefersDark]
//     );

//     useEffect(() => {
//         if (value) {
//         document.body.classList.add("dark");
//         } else {
//         document.body.classList.remove("dark");
//         }
//     }, [value]);

//     return {
//         isDark: value,
//         setIsDark,
//     };
// }
