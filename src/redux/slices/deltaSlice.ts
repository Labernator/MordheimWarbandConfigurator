import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IDelta } from "../../types/warband";

const deltaSlice = createSlice({
    name: 'delta',
    initialState: [] as IDelta[],
    reducers: {
        addDelta(state, action: PayloadAction<IDelta>) {
            state.push(action.payload);
        },
        resetDelta(state) {
            return [];
        },
    },
});

export const { addDelta, resetDelta } = deltaSlice.actions

export default deltaSlice.reducer;