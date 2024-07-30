import { Stats } from "./warrior";

export interface IDatabaseSkillLists {
    skilllist: string;
    skill: string;
    effect: string;
    condition: string;
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
    ethnicity: string;
}

export interface IDatabaseEthnicMaximums {
    profile: string;
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
    injury: string;
    effect: string;
}
export interface IDatabaseEquipment {
    list: string;
    equipment: string;
    price: number;
}

export interface IDatabaseWeapon {
    weapon: string;
    type: string;
    range: string;
    strength: string;
    traits: string;
}
export interface IDatabaseRules {
    rule: string;
    effect: string;
}

export interface IDatabaseWarband {
    faction: string;
    limit: number;
    abbreviaton: string;
}

export interface IDatabaseSpell {
    school: string;
    name: string;
    effect: string;
    difficulty: number;
}

export interface IDatabaseWizard {
    warband: string;
    name: string;
    school: string;
}