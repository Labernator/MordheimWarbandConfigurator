import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IWarband } from "../../types/warband";
import { IFullEquipment, IWarrior } from "../../types/warrior";

export const initialWarband: IWarband = {
    name: "",
    faction: "",
    cash: 500,
    stash: [],
    warriors: [],
    treasure: 0,
    campaignLink: ""
}

const warbandSlice = createSlice({
    name: 'warrior',
    initialState: initialWarband,
    reducers: {
        setWarbandName(state, action: PayloadAction<string>) {
            state.name = action.payload;
        },
        loadWarband(_state, action: PayloadAction<IWarband>) {
            return action.payload;
        },
        addWarrior(state, action: PayloadAction<IWarrior>) {
            const warrior = action.payload;
            state.warriors.push({...warrior, position: state.warriors.length || 0});
            // state.cash -= state.payload.delta || 0;
        },
        updateWarrior(state, action: PayloadAction<IWarrior>) {
            state.warriors = state.warriors.filter((unit) => unit.name !== action.payload.name);
            state.warriors.push(action.payload);
            // state.cash -= action.payload.delta || 0;
        },
        removeFunds(state, action: PayloadAction<number>){
            state.cash -= action.payload;
        },
        addFunds(state, action: PayloadAction<number>){
            state.cash += action.payload;
        },
        addWeaponToStash(state, action: PayloadAction<IFullEquipment>){
            // state.stash.push(action.payload);
        },
    },
});

export const { addFunds, addWarrior, loadWarband, removeFunds, setWarbandName, updateWarrior, addWeaponToStash } = warbandSlice.actions

export default warbandSlice.reducer;