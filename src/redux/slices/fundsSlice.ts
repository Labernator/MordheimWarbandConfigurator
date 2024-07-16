import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const fundsSlice = createSlice({
    name: 'delta',
    initialState: 0,
    reducers: {
        setDelta(state, action: PayloadAction<number>) {
            return action.payload;
        },
        addDelta(state, action: PayloadAction<number>) {
            return state + action.payload;
        },
        resetDelta(state) {
            return 0;
        },
    },
});

export const { addDelta, resetDelta, setDelta } = fundsSlice.actions

export default fundsSlice.reducer;