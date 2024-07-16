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
    weapons?: IFullEquipment[];
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