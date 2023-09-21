import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import { PullSlice } from "./PullSlice";

export const store = configureStore({
    reducer: {
        [PullSlice.name]: PullSlice.reducer,
    }
});

export const PullActions = PullSlice.actions;

setupListeners(store.dispatch);
