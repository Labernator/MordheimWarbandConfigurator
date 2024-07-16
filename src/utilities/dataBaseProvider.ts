import { IDatabaseRules, IDatabaseUnit, IDatabaseWeapon } from "../types/database";
import { IWarrior } from "../types/warrior";

const unitsCsv = require('../static/data/Units.csv');
const rulesCsv = require('../static/data/Rules.csv');
const weaponsCsv = require('../static/data/Weapons.csv');
const parsedWeaponsCsv: IDatabaseWeapon[] = JSON.parse(weaponsCsv.slice(17));
const parsedRulesCsv: IDatabaseRules[] = JSON.parse(rulesCsv.slice(17));
const structuredRules = parsedRulesCsv.map((csvRule: IDatabaseRules) => ({ rule: csvRule.rule, effect: csvRule.effect }));
// const equipmentCsv = require('../static/data/EquipmentLists.csv');
// const parsedEquipmentCsv = JSON.parse(equipmentCsv.slice(17));

export const getWeaponProfile = (weaponName: string): IDatabaseWeapon => {
    const weapon = parsedWeaponsCsv.find((weapon: any) => weapon.weapon === weaponName);
    if (!weapon) {
        throw new Error(`Weapon ${weaponName} not found. Please add metadata to the Weapons.csv file.`);
    }
    return weapon;
};

const getRules = (plainRules: string[]): IDatabaseRules[] => {
    return plainRules.map((rule: string) => {
        const foundRule = structuredRules.find((csvRule: any) => csvRule.rule === rule)
        if (!foundRule) {
            throw new Error(`Rule ${rule} not found. Please add metadata to the Rules.csv file.`);
        }
        return foundRule;
    });
};

export const getWarriorsListForWarband = (faction: string | undefined): IWarrior[] => {
    if (faction === undefined) {
        throw new Error("Warband faction is undefined. Please provide a warband faction.");
    }
    const parsedCSV: IDatabaseUnit[] = JSON.parse(unitsCsv.slice(17));
    const filteredCSV = parsedCSV.filter((unit: IDatabaseUnit) => unit.warband === faction);
    return filteredCSV.map((unit: IDatabaseUnit) => {
        const plainRules: string[] = (unit.rules && unit.rules.split(",")) || [];
        const transformedUnit: IWarrior = {
            ...unit,
            name: "",
            skills: (unit.skills && unit.skills.split(",")) || [],
            weapons: unit.equipment ? [{ ...getWeaponProfile("Dagger"), price: 2, quantity: 1 }] : [],
            rules: getRules(plainRules),
            totalCost: unit.cost,
            headCount: 1,
            hero: unit.hero === "x",
            position: 0,
        }
        // transform skills
        return transformedUnit;
    })
};