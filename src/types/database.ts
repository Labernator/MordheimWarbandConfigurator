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
    animal: string | null;
    large: string | null;
    max: number;
    equipment: string;
    hero: string;
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