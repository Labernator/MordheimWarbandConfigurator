import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IFullEquipment, IWarrior } from "../../types/warrior";
import { IDatabaseSpell } from "../../types/database";

export const initialWarrior: IWarrior = {
    name: "",
    type: "",
    cost: 0,
    xp: 0,
    A: 0,
    M: 0,
    WS: 0,
    BS: 0,
    Ld: 0,
    W: 0,
    T: 0,
    S: 0,
    I: 0,
    rating: 5,
    max: 99,
    totalCost: 0,
    headCount: 1,
    equipment: "",
    hero: false,
    position: 0,
};

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
        }
    },
});

export const { addWeapon, addWizardSpell, setHeadCount, setWarriorName, loadWarrior, removeWeapon } = warriorSlice.actions

export default warriorSlice.reducer;