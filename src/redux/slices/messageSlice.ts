import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const messageSlice = createSlice({
    name: 'message',
    initialState: "",
    reducers: {
        setMessage(state, action: PayloadAction<string>) {
            return action.payload;
        },
        resetMessage(state) {
            return "";
        },
    },
});

export const { setMessage, resetMessage } = messageSlice.actions

export default messageSlice.reducer;