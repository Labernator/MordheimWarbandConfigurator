import { ICombinedEquipment, IDatabaseRule, IDatabaseSpell } from "./database";

export const initialWarrior: IWarrior = {
    Name: "",
    WarriorType: "",
    Cost: 0,
    Experience: 0,
    A: 0,
    M: 0,
    WS: 0,
    BS: 0,
    LD: 0,
    W: 0,
    T: 0,
    S: 0,
    I: 0,
    Rating: 5,
    Maximum: 99,
    TotalCost: 0,
    HeadCount: 1,
    EquipmentList: "",
    Hero: false,
    Position: 0,
    Ethnicity: "",
    HasFreeDagger: false,
    FixedEquipment: false
};

export enum Stats {
    "M" = "Movement",
    "WS" = "Weapon Skill",
    "BS" = "Ballistic Skill",
    "S" = "Strength",
    "T" = "Toughness",
    "W" = "Wounds",
    "I" = "Initiative",
    "A" = "Attacks",
    "Ld" = "Leadership",
}

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
    Name: string;
    WarriorType: string;
    Cost: number;
    Experience: number;
    A: number;
    M: number;
    WS: number;
    BS: number;
    LD: number;
    W: number;
    T: number;
    S: number;
    I: number;
    Equipment?: ICombinedEquipment[];
    SkillLists?: string[];
    Rules?: IDatabaseRule[];
    Rating: number;
    Maximum: number;
    TotalCost: number;
    HeadCount: number;
    EquipmentList: string;
    Hero: boolean;
    Position: number;
    Spells?:IDatabaseSpell[];
    Injuries?: string[];
    Ethnicity: string;
    HasFreeDagger: boolean;
    FixedEquipment: boolean;
}

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
}

export enum IEquipmentType {
    Melee = "Melee Weapons",
    Ranged = "Ranged Weapons",
    Wargear = "Wargear"
}

export interface IEquipment  {
    price: number;
    quantity: number;
    weapon: string;
    type: string;
    range: string;
    strength: string;
    traits: string[];
}