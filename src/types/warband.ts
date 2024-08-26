import { ILogEntry } from "../redux/slices/logSlice";
import { IEquipment, IWarrior } from "./warrior";

export interface IWarband {
    name: string;
    faction: string;
    cash: number;
    stash: IEquipment[];
    warriors: IWarrior[];
    treasure: number;
    campaignLink?: string;
    limit: number;
    id: string;
    log: ILogEntry[];
}


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