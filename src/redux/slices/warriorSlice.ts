import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { initialWarrior, IWarrior, Stats } from "../../types/warrior";
import { ICombinedEquipment, IDatabaseRule, IDatabaseSpell } from "../../types/database";

const warriorSlice = createSlice({
    name: "temp-warrior",
    initialState: initialWarrior,
    reducers: {
        setWarriorName(state, action: PayloadAction<string>) {
            state.Name = action.payload;
        },
        loadWarrior(_state, action: PayloadAction<IWarrior>) {
            return action.payload;
        },
        setHeadCount(state, action: PayloadAction<number>) {
            state.HeadCount = action.payload;
        },
        addWeapon(state, action: PayloadAction<ICombinedEquipment>) {
            const weapon = state.Equipment?.find((item) => item.EquipmentName === action.payload.EquipmentName);
            if (weapon) {
                weapon.Quantity++;
            } else {
                state.Equipment?.push(action.payload);
            }
            state.TotalCost += action.payload.Price;
        },
        removeWeapon(state, action: PayloadAction<ICombinedEquipment>) {
            const weapon = state.Equipment?.find((item) => item.EquipmentName === action.payload.EquipmentName);
            if (weapon && weapon.Quantity > 1) {
                weapon.Quantity--;
            } else {
                const idx = state.Equipment?.findIndex((item) => item.EquipmentName === action.payload.EquipmentName);
                if (idx !== undefined) {
                    state.Equipment?.splice(idx,1);
                }
            }
            state.TotalCost = (state.Cost + (state.Equipment?.reduce((acc, item) => acc + (item.Quantity * item.Price), 0) || 0)) * state.HeadCount;
        },
        addWizardSpell(state, action: PayloadAction<IDatabaseSpell>) {
            if (state.Spells) {
                state.Spells.push(action.payload);
            } else {
                state.Spells = [action.payload];
            }
        },
        setSpell(state, action: PayloadAction<IDatabaseSpell[]>) {
            state.Spells = action.payload;
        },
        addInjury(state, action: PayloadAction<string>) {
            if (state.Injuries) {
            state.Injuries?.push(action.payload);
            } else {
                state.Injuries = [action.payload];
            }
        },
        addSkill(state, action: PayloadAction<IDatabaseRule>) {
            if (state.Rules) {
                state.Rules?.push(action.payload);
            } else {
                state.Rules = [action.payload];
            }
        },
        increaseXP(state) {
            state.Experience += 1;
        },
        increaseStat(state, action: PayloadAction<string>) {
            switch (action.payload) {
                case Stats.M:
                    state.M++;
                    break;
                case Stats.WS:
                    state.WS++;
                    break;
                case Stats.BS:
                    state.BS++;
                    break;
                case Stats.S:
                    state.S++;
                    break;
                case Stats.T:
                    state.T++;
                    break;
                case Stats.W:
                    state.W++;
                    break;
                case Stats.I:
                    state.I++;
                    break;
                case Stats.A:
                    state.A++;
                    break;
                case Stats.Ld:
                    state.LD++;
                    break;
                default:
                    throw new Error(`Stat ${action.payload} not found.`);
            }
        }
    },
});

export const { addInjury, addWeapon, addWizardSpell, addSkill, increaseStat, increaseXP,setHeadCount, setWarriorName, loadWarrior, removeWeapon, setSpell } = warriorSlice.actions;

export default warriorSlice.reducer;