import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IWarband } from "../../types/warband";
import { IWarrior } from "../../types/warrior";
import { ICombinedEquipment } from "../../types/database";
import { ILogEntry } from "./logSlice";

export const initialWarband: IWarband = {
    name: "",
    faction: "",
    cash: 0,
    stash: [],
    warriors: [],
    treasure: 0,
    campaignLink: "",
    limit: 0,
    id: window.self.crypto.randomUUID(),
    log: [],
};

const warbandSlice = createSlice({
    name: "warrior",
    initialState: initialWarband,
    reducers: {
        setWarbandName(state, action: PayloadAction<string>) {
            state.name = action.payload;
        },
        setWarbandFaction(state, action: PayloadAction<string>) {
            state.faction = action.payload;
        },
        setCampaignUrl(state, action: PayloadAction<string>) {
            state.campaignLink = action.payload;
        },
        loadWarband(_state, action: PayloadAction<IWarband>) {
            return action.payload;
        },
        addWarrior(state, action: PayloadAction<IWarrior>) {
            const warrior = action.payload;
            state.warriors.push({...warrior, Position: state.warriors.length || 0});
            // state.cash -= state.payload.delta || 0;
        },
        removeWarrior(state, action: PayloadAction<IWarrior>) {
            const idx = state.warriors?.findIndex((item) => item.Name === action.payload.Name);
            if (idx !== undefined) {
                if (action.payload.HeadCount <= 1) {
                    state.warriors?.splice(idx,1);
                } else {
                    state.warriors[idx].HeadCount--;
                }
            }
        },
        updateWarrior(state, action: PayloadAction<IWarrior>) {
            state.warriors = state.warriors.filter((unit) => unit.Name !== action.payload.Name);
            state.warriors.push(action.payload);
            // state.cash -= action.payload.delta || 0;
        },
        removeFunds(state, action: PayloadAction<number>){
            state.cash -= action.payload;
        },
        addFunds(state, action: PayloadAction<number>){
            state.cash += action.payload;
        },
        addWeaponToStash(_state, _action: PayloadAction<ICombinedEquipment>){
            // state.stash.push(action.payload);
        },
        addWarbandLog(state, action: PayloadAction<ILogEntry[]>){
            state.log.push(...action.payload);
        }
    },
});

export const { addFunds, addWarrior, addWarbandLog, loadWarband, removeFunds, removeWarrior, setCampaignUrl, setWarbandFaction, setWarbandName, updateWarrior, addWeaponToStash } = warbandSlice.actions;

export default warbandSlice.reducer;