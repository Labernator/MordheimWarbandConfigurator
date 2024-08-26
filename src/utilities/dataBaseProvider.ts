import axios, { AxiosResponse } from "axios";
import { ICombinedEquipment, IDatabaseEquipment, IDatabaseEthnicMaximums, IDatabaseInjury, IDatabaseProviderInstance, IDatabaseRule, IDatabaseSkill, IDatabaseSpell, IDatabaseSpellcaster, IDatabaseWarband, IDatabaseWarrior, ISpellcaster, IUserWarband } from "../types/database";
import { IWarrior } from "../types/warrior";
import { IWarband } from "../types/warband";

export const DataBaseProvider = class {

    public warbands: IDatabaseWarband[] = [];
    public rules: IDatabaseRule[] = [];
    public injuries: IDatabaseInjury[] = [];
    public warriors: IWarrior[] = [];

    private skillLists: IDatabaseSkill[] = [];
    private equipment: ICombinedEquipment[] = [];
    private maximums: IDatabaseEthnicMaximums[] = [];
    private static instance: IDatabaseProviderInstance;

    public static getInstance = async () => {
        if (!this.instance) {
            this.instance = new DataBaseProvider();
            await this.instance.init();
        }
        return this.instance;
    };

    public init = async () => {
        this.warbands = await this.getWarbands();
        this.rules = await this.getRules();
        this.injuries = await this.getInjuries();
        this.maximums = await this.getMaximums();
    };

    private callGetApi = async (endpoint: string, parameter?: { key: string, value: string }) => {
        try {
            const response: AxiosResponse = await axios.get(`https://mordheim-companion.com/index.php/${endpoint}${parameter ? `?${parameter.key}=${parameter.value}` : ""}`);
            const responseData: any[] = response.data;
            // Process the response data
            return responseData;
        } catch (error) {
            // Handle the error
            throw new Error(`Error fetching ${endpoint}: ${error}`);
        }
    };

    private getWarbands = async (): Promise<IDatabaseWarband[]> => {
        return this.callGetApi("warbands");
    };
    private getRules = async (): Promise<IDatabaseRule[]> => {
        return this.callGetApi("rules");
    };
    private getInjuries = async (): Promise<IDatabaseInjury[]> => {
        return this.callGetApi("injuries");
    };
    private getMaximums = async (): Promise<IDatabaseEthnicMaximums[]> => {
        return this.callGetApi("maximums");
    };
    private getSpellcasterFromDatabase = async (warriorType: string): Promise<IDatabaseSpellcaster[]> => {
        return this.callGetApi("spellcaster", { key: "warriorType", value: warriorType });
    };
    private getSpells = async (magicType: string): Promise<IDatabaseSpell[]> => {
        return this.callGetApi("spells", { key: "magicType", value: magicType });
    };
    public getWarriors = async (warbandId: string): Promise<IDatabaseWarrior[]> => {
        return this.callGetApi("warriors", { key: "warbandId", value: warbandId });
    };
    public searchWarbands = async (userId: string): Promise<IUserWarband[]> => {
        return this.callGetApi("warbandstore", { key: "userId", value: userId });
    };
    private getListsEquipment = async (listIds: string[]) => {
        const parameters = listIds.map((listId) => `listId[]=${listId}`).join("&");
        try {
            const response: AxiosResponse = await axios.get(`https://mordheim-companion.com/index.php/equipment?${parameters}`);
            const responseData: IDatabaseEquipment[] = response.data;
            // Process the response data
            return responseData;
        } catch (error) {
            // Handle the error
            throw new Error(`Error fetching warbands: ${error}`);
        }
    };
    public getEquipment = (listId: string) => {
        return this.equipment.filter((equi) => equi.ListId === listId);
    };
    public getSpellcaster = async (warriorType: string): Promise<ISpellcaster> => {
        const spellcaster = (await this.getSpellcasterFromDatabase(warriorType))[0];
        const spells = await this.getSpells(spellcaster.MagicType);
        return { ...spellcaster, SpellOptions: spells };
    };

    public getSkillOptions = (listId: string) => this.skillLists.filter((entry) => entry.ListId === listId);

    public getWarbandHumanReadableType = (warbandType: string) => this.warbands.find((entry) => entry.Id === warbandType)?.Name || "";

    private getEquipmentOptions = async (listIds: string[]) => {
        // this looks wrong!

        const filteredIds = listIds.filter((listId) => !this.equipment.some((entry) => entry.ListId === listId));
        if (filteredIds.length > 0) {
            const additionalEquipment = await this.getListsEquipment(filteredIds);
            const mappedEquipment: ICombinedEquipment[] = additionalEquipment.map((equi) => ({ ...equi, Quantity: 1, Price: equi.Cost }));
            this.equipment = this.equipment.concat(mappedEquipment);
            return mappedEquipment;
        }
        return this.equipment.filter((entry) => entry.ListId in listIds);
    };

    public getWarbandMetadata = async (faction: string) => {

        const getDataBaseRules = (ruleNames: string[]) => {
            return ruleNames.map((rule: string) => {
                const foundRule = this.rules.find((dbRule: IDatabaseRule) => dbRule.RuleName === rule);
                if (!foundRule) {
                    throw new Error(`Rule ${rule} not found. Please add metadata to the Rules table.`);
                }
                return foundRule;
            });
        };

        const warband = this.warbands.find((warband) => warband.Id === faction);
        if (!warband) {
            throw new Error(`Warband ${warband} not found. Please add metadata to the Warbands table.`);
        }
        const warriors = await this.getWarriors(faction);

        const equipmentSet = new Set<string>(warriors.filter((warrior) => !!warrior.EquipmentList).map((warrior) => warrior.EquipmentList));
        const listArray = await this.getEquipmentOptions(Array.from(equipmentSet));

        this.warriors = warriors.map((warrior) => {
            const isWolfPriest = warrior.WarriorType === "Wolf Priest of Ulric";
            const hasFreeDagger = !!listArray.filter((entry) => entry.ListId === warrior.EquipmentList).find((entry) => entry.EquipmentName === "Dagger");
            const ruleNames: string[] = (warrior.Rules && warrior.Rules.split(";").map((entry) => entry.trim())) || [];
            return {
                ...warrior,
                Name: "",
                SkillLists: (warrior.SkillLists && warrior.SkillLists.split(";")) || [],
                // Equipment: warrior.EquipmentList && listContainsDagger(warrior.EquipmentList) ? [{ weapon: "Dagger", type: "Melee", strength: "as User", range: "", price: 0, quantity: 1, traits: ["Enemy armour save"] }] : [],
                Equipment: isWolfPriest ? listArray.filter((equi) => equi.ListId === warrior.EquipmentList) : [],
                Rules: getDataBaseRules(ruleNames),
                TotalCost: warrior.Cost,
                HeadCount: 1,
                Hero: !!warrior.Hero,
                Position: 0,
                Ethnicity: warrior.Ethnicity,
                HasFreeDagger: isWolfPriest ? false : hasFreeDagger,
                FixedEquipment: isWolfPriest
            };
        });
        return warband;
    };

    public getEthnicMaximum = (ethnicity: string) => {
        const foundMax = this.maximums.find((max) => max.Ethnicity === ethnicity);
        if (!foundMax) {
            throw new Error(`Ethnicity ${ethnicity} not found. Please add metadata to the EthnicMaximums table.`);
        }
        return foundMax;
    };
    public saveWarband = async (warband: IWarband, user: string) => {
        const jsonObj = { UserId: user, WarbandId: warband.id, WarbandJson: JSON.stringify(warband) };
        try {
            const response: AxiosResponse = await axios.post("https://mordheim-companion.com/index.php/warbandstore", jsonObj, {
                headers: { "Content-Type": "application/json" },
            });
            const responseData = response.data;
            // Process the response data
            return responseData;
        } catch (error) {
            // Handle the error
            throw new Error(`Error saving warband: ${error}`);
        }
    };

    public deleteWarband = async (warbandId: string) => {
        try {
            const response: AxiosResponse = await axios.delete(`https://mordheim-companion.com/index.php/deletewarband?warbandId=${warbandId}`);
            const responseData: boolean = response.data;
            // Process the response data
            return responseData;
        } catch (error) {
            // Handle the error
            throw new Error(`Error deleting warbands: ${error}`);
        }
    };
};