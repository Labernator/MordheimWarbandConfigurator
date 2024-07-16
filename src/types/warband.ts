import { IWarrior } from "./warrior";

export interface IWarband {
    name: string;
    faction?: string;
    cash: number;
    stash: string[];
    warriors: IWarrior[];
    treasure: number;
    campaignLink?: string;
};