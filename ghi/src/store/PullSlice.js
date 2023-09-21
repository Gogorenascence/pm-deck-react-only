import { createSlice } from "@reduxjs/toolkit";


export const PullSlice = createSlice({
    initialState: {
        pull: [],
    },
    name: "pull",
    reducers: {
        setPull: (state, action) => {
            state.pull = action.payload;
        },
    },
});

export const { setPull } = PullSlice.actions;
