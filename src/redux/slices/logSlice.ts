import { createSlice, PayloadAction } from "@reduxjs/toolkit";
export interface ILogEntry {
    command: string;
    value: string;
    cost?: number;
}
const logSlice = createSlice({
    name: "templog",
    initialState: [] as ILogEntry[],
    reducers: {
        addLog(state, action: PayloadAction<ILogEntry>) {
            state.push(action.payload);
        },
        removeLogByCommand(state, action: PayloadAction<ILogEntry>) {
            const newState = state.filter((entry) => entry.command !== action.payload.command);
            return newState;
        },
        removeLog(state, action: PayloadAction<ILogEntry>) {
            state = state.filter((entry) => entry.command !== action.payload.command && entry.value !== action.payload.value);
        },
        resetLog(_state) { // eslint-disable-line @typescript-eslint/no-unused-vars
            return [];
        },
    },
});

export const { addLog, resetLog, removeLog, removeLogByCommand } = logSlice.actions;

export default logSlice.reducer;