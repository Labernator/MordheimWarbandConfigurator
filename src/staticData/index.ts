import { IFullEquipment, IRules } from "../types/warrior";

export enum DialogType {
        Fighter = "Fighter",
        HiredSword = "HiredSword",
        DramatisPersonae = "DramatisPersonae",
        TradingPost = "Trading",
        PrintRoster = "Print",
        Maintain = "MaintainUnit"
};
export interface IDisplayWeapon {
        list: string;
        equipment: string;
        price: number;
}

export interface IIncompleteUnit {
        warband: string;
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
        max: number;
        rating: number;
        animal: string | null;
        large: string | null;
        weapons?: IFullEquipment[];
        skills?: string[];
        wargear?: string[];
        rules?: IRules[];
        equipment: string;
};

export interface IUnit extends IIncompleteUnit {
        name: string;
}
export interface ITempUnit {
        warband: string;
        name: string;
        type: string;
        cost: number;
        armour: string;
        xp: number;
        // stats: IStats;
        A: number;
        M: number;
        WS: number;
        BS: number;
        Ld: number;
        W: number;
        T: number;
        S: number;
        I: number;
        // weapons?: IWeapon[];
        weapons?: IFullEquipment[];
        skills?: string[];
        wargear?: string[];
        rules?: IRules[];
};

export interface IWeapon extends IWeaponProfile {
        cost: number;
};

export interface IWeaponProfile {
        name: string;
        range: string;
        strength: string;
        traits: string[];
};

export interface IEquipment {
        name: string;
        range?: string;
        strength?: string;
        traits?: string[];
};

