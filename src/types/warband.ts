import { IWarrior } from "./warrior";

export interface IWarband {
    name: string;
    faction: string;
    cash: number;
    stash: string[];
    warriors: IWarrior[];
    treasure: number;
    campaignLink?: string;
    limit: number;
};


export function isMordheimConfigWarband(input: any): input is IWarband {
    return (input as IWarband).name !== undefined && (input as IWarband).faction !== undefined && (input as IWarband).cash !== undefined && (input as IWarband).stash !== undefined && (input as IWarband).warriors !== undefined && (input as IWarband).treasure !== undefined;
}

export interface IDelta {
    command: string;
    value?: number;
}

export interface IPdf {
    name: string;
    // value?: number;
}