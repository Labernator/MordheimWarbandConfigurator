import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IUser } from "../../types/warband";

const userSlice = createSlice({
    name: "delta",
    initialState: {} as IUser,
    reducers: {
        setUserName(state, action: PayloadAction<string>) {
            state.username = action.payload;
        },
        setPassword(state, action: PayloadAction<string>) {
            state.password = action.payload;
        },
        setFileName(state, action: PayloadAction<string>) {
            state.filename = action.payload;    
        },
    },
});

export const { setFileName, setUserName, setPassword } = userSlice.actions;

export default userSlice.reducer;