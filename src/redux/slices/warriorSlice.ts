import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IFullEquipment, initialWarrior, IRules, IWarrior, Stats } from "../../types/warrior";
import { IDatabaseSpell } from "../../types/database";

const warriorSlice = createSlice({
    name: 'warrior',
    initialState: initialWarrior,
    reducers: {
        setWarriorName(state, action: PayloadAction<string>) {
            state.name = action.payload;
        },
        loadWarrior(_state, action: PayloadAction<IWarrior>) {
            return action.payload;
        },
        setHeadCount(state, action: PayloadAction<number>) {
            state.headCount = action.payload;
        },
        addWeapon(state, action: PayloadAction<IFullEquipment>) {
            const weapon = state.weapons?.find((item) => item.weapon === action.payload.weapon);
            if (weapon) {
                weapon.quantity++;
            } else {
                state.weapons?.push(action.payload);
            }
            state.totalCost += action.payload.price;
        },
        removeWeapon(state, action: PayloadAction<IFullEquipment>) {
            const weapon = state.weapons?.find((item) => item.weapon === action.payload.weapon);
            if (weapon && weapon.quantity > 1) {
                weapon.quantity--;
            } else {
                const idx = state.weapons?.findIndex((item) => item.weapon === action.payload.weapon);
                if (idx !== undefined) {
                    state.weapons?.splice(idx,1);
                }
            }
            state.totalCost = (state.cost + (state.weapons?.reduce((acc, item) => acc + item.price, 0) || 0)) * state.headCount;
        },
        addWizardSpell(state, action: PayloadAction<IDatabaseSpell>) {
            if (state.spells) {
                state.spells.push(action.payload);
            } else {
                state.spells = [action.payload];
            }
        },
        setSpell(state, action: PayloadAction<IDatabaseSpell>) {
            state.spells = [action.payload];
        },
        addInjury(state, action: PayloadAction<string>) {
            if (state.injuries) {
            state.injuries?.push(action.payload);
            } else {
                state.injuries = [action.payload];
            }
        },
        addSkill(state, action: PayloadAction<IRules>) {
            if (state.rules) {
                state.rules?.push(action.payload);
            } else {
                state.rules = [action.payload];
            }
        },
        increaseXP(state) {
            state.xp += 1;
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
                    state.Ld++;
                    break;
                default:
                    throw new Error(`Stat ${action.payload} not found.`);
            }
        }
    },
});

export const { addInjury, addWeapon, addWizardSpell, addSkill, increaseStat, increaseXP,setHeadCount, setWarriorName, loadWarrior, removeWeapon, setSpell } = warriorSlice.actions

export default warriorSlice.reducer;