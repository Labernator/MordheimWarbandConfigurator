import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {  IPdf } from "../../types/warband";

const pdfSlice = createSlice({
    name: 'delta',
    initialState: {} as IPdf,
    reducers: {
        setPdfName(state, action: PayloadAction<string>) {
            state.name = action.payload;
        },
    },
});

export const { setPdfName } = pdfSlice.actions

export default pdfSlice.reducer;