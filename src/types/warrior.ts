import { Id } from "@reduxjs/toolkit/dist/tsHelpers";
import { IDatabaseSpell } from "./database";

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
    ethnicity: ""
};

export enum Stats {
    A = "Attacks",
    M = "Movement",
    WS = "Weapon Skill",
    BS = "Ballistic Skill",
    Ld = "Leadership",
    W = "Wounds",
    T = "Toughness",
    S = "Strength",
    I = "Initiative"
};

export function isStatProperty(input: any): input is Stats {
    return input === Stats.M || input === Stats.WS || input === Stats.BS || input === Stats.S || input === Stats.T || input === Stats.W || input === Stats.I || input === Stats.A || input === Stats.Ld;
}

export interface IEthnicMaximums {
    M: number;
    WS: number;
    BS: number;
    S: number;
    T: number;
    W: number;
    I: number;
    A: number;
    Ld: number;
}
export interface IWarrior {
    name: string;
    type: string;
    cost: number;
    xp: number;
    A: number;
    M: number;
    WS: number;
    BS: number;
    Ld: number;
    W: number;
    T: number;
    S: number;
    I: number;
    weapons?: IEquipment[];
    skills?: string[];
    wargear?: string[];
    rules?: IRules[];
    rating: number;
    max: number;
    totalCost: number;
    headCount: number;
    equipment: string;
    hero: boolean;
    position: number;
    spells?:IDatabaseSpell[];
    injuries?: string[];
    ethnicity: string;
};

export interface IRules {
    rule: string;
    effect: string;
};
export interface IDatabaseEquipment {
    weapon: string;
    type: string;
    range: string;
    strength: string;
    traits: string;
}
export interface IFullEquipment extends IDatabaseEquipment {
    price: number;
    quantity: number;
};

export enum IEquipmentType {
    Melee = "Melee Weapons",
    Ranged = "Ranged Weapons",
    Wargear = "Wargear"
};

export interface IEquipment  {
    price: number;
    quantity: number;
    weapon: string;
    type: string;
    range: string;
    strength: string;
    traits: string[];
}