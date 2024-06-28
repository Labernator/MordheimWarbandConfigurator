import OutofAction from './outofaction.png';
import FleshWound from './fleshwound.png';
import SeriousInjury from './seriousinjury.png';

export const OutofActionPic = OutofAction;
export const FleshWoundPic = FleshWound;
export const SeriousInjuryPic = SeriousInjury;

export interface IPageInfo {
        "link": string;
        "header": string;
        "parent": string;
};
export const tempWarband = {
        cash: 0,
        stash: [],
        rating: 0,
        units: [],
        bodycount: 0,
        treasure: 0,
        routlimit: 0
}
export interface ITempWarband {
        name?: string;
        faction: string;
        cash: number;
        stash: string[];
        rating: number;
        units: IUnit[];
        bodycount: number;
        treasure: number;
        routlimit: number;
}
export interface IWarband {
        "name": string;
        "faction": string;
        "campaignpoints": number;
        "cash": number;
        "stash": string[];
        "rating": number;
        "units": IUnit[];
        bodycount: number;
        treasure: number;
        "routlimit": number;
}
export interface IUnit {
        "name": string;
        "type": string;
        "cost": number;
        "armour": string;
        "xp": number;
        "stats": IStats;
        "weapons"?: IWeapon[];
        "skilllists"?: string[];
        "wargear"?: string[];
        "rules"?: IRules[];
};
export interface IRules {
        "name": string;
        "text": string;
};
export interface IStats {
        "movement": number;
        "weaponskill": number;
        "ballisticskill": number;
        "strength": number;
        "toughness": number;
        "wounds": number;
        "leadership": number;
        "initiative": number;
        "attacks": string;
};

export interface IWeapon {
        "name": string;
        "range": string;
        "strength": string;
        "traits": string[];
};

export interface IPlot {
        "name": string;
        "objectives": IObjectives[];
        "achievements": IAchievement[];
};

export interface IObjectives{
        "name": string;
        "condition": string;
        "reward": string;
};

export interface IAchievement {
        "name": string;
        "cp": number;
        "text": string;
};
