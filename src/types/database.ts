import { IUser, IWarband } from "./warband";
import { IWarrior } from "./warrior";

export interface IDatabaseProviderInstance {
    init: () => void;
    getWarbandMetadata: (faction: string) => Promise<IDatabaseWarband>;
    getEthnicMaximum: (ethnicity: string) => IDatabaseEthnicMaximums;
    // getEquipmentOptions: (lists: string[]) => Promise<IDatabaseListEquipment[]>;
    getSkillOptions: (list: string) => IDatabaseSkill[];
    getSpellcaster: (warriorType: string) => Promise<ISpellcaster>;
    getWarbandHumanReadableType: (faction: string) => string;
    getEquipment: (list: string) => ICombinedEquipment[];
    searchWarbands: (userId: string) => Promise<IUserWarband[]>;
    saveWarband: (warband: IWarband, user: IUser) => Promise<boolean>;
    injuries: IDatabaseInjury[];
    warriors: IWarrior[];
    warbands: IDatabaseWarband[];
    rules: IDatabaseRule[];
    // listEquipment: IDatabaseListEquipment[];
}

export interface IDatabaseSkill {
    ListId: string;
    RuleName: string;
    Text: string;
    Prerequisite: string;
}
export interface IDatabaseUnit {
    warband: string;
    type: string;
    cost: number;
    M: number;
    WS: number;
    BS: number;
    S: number;
    T: number;
    W: number;
    I: number;
    A: number;
    Ld: number;
    rating: number;
    xp: number;
    rules: string;
    skills: string;
    large: string | null;
    max: number;
    equipment: string;
    hero: string;
    Ethnicity: string;
}

export interface IDatabaseEthnicMaximums {
    Ethnicity: string;
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

export interface IDatabaseInjury {
    Injury: string;
    Text: string;
    Characteristic: string;
    Rule: string;
}
export interface IDatabaseListEquipment {
    ListId: string;
    EquipmentName: string;
    Cost: number;
}

export interface IDatabaseWarband {
    Id: string;
    Name: string;
    ShortName: string;
    Maximum: number;
    Gold: number;
}

export interface IDatabaseWarrior {
    WarbandId: string;
    WarriorType: string;
    Cost: number;
    M: number;
    WS: number;
    BS: number;
    S: number;
    T: number;
    W: number;
    I: number;
    A: number;
    LD: number;
    Rating: number;
    Experience: number;
    Maximum: number;
    Rules: string;
    SkillLists: string;
    EquipmentList: string;
    Hero: number;
    Ethnicity: string;
}

export interface IDatabaseRule {
    RuleName: string;
    Text: string;
}

export interface IDatabaseSpell {
    MagicType: string;
    SpellName: string;
    Text: string;
    Difficulty: number;
}

export interface IDatabaseSpellcaster {
    WarbandId: string;
    WarriorType: string;
    MagicType: string;
}


export interface ISpellcaster {
    WarbandId: string;
    WarriorType: string;
    MagicType: string;
    SpellOptions: IDatabaseSpell[];
}

export interface IDatabaseEquipment {
    ListId: string;
    EquipmentType: string;
    Cost: number;
    EquipmentName: string;
    Distance: number;
    Strength: string;
    Traits: string;
}

export interface ICombinedEquipment {
    ListId: string;
    EquipmentName: string;
    EquipmentType: string;
    Distance: number;
    Strength: string;
    Traits: string;
    Price: number;
    Quantity: number;
}

export interface IUserWarband {
    UserId: string;
    WarbandId: string;
    WarbandJson: string;
}