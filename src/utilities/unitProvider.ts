
import { IDatabaseEquipment, IDatabaseRules, IDatabaseUnit, IDatabaseWeapon } from "../types/database";
import { IFullEquipment, IWarrior } from "../types/warrior";

const unitsCsv = require('../static/data/Units.csv');
const rulesCsv = require('../static/data/Rules.csv');
const weaponsCsv = require('../static/data/Weapons.csv');
const parsedWeaponsCsv: IDatabaseWeapon[] = JSON.parse(weaponsCsv.slice(17));
const parsedRulesCsv: IDatabaseRules[] = JSON.parse(rulesCsv.slice(17));
const structuredRules = parsedRulesCsv.map((csvRule: IDatabaseRules) => ({ rule: csvRule.rule, effect: csvRule.effect }));
const equipmentCsv = require('../static/data/EquipmentLists.csv');
const parsedEquipmentCsv = JSON.parse(equipmentCsv.slice(17));
const getRules = (plainRules: string[]): IDatabaseRules[] => {
    return plainRules.map((rule: string) => {
        const foundRule = structuredRules.find((csvRule: any) => csvRule.rule === rule)
        if (!foundRule) {
            throw new Error(`Rule ${rule} not found. Please add metadata to the Rules.csv file.`);
        }
        return foundRule;
    });
};


export const getWeaponProfile = (weaponName: string): IDatabaseWeapon => {
    const weapon = parsedWeaponsCsv.find((weapon: any) => weapon.weapon === weaponName);
    if (!weapon) {
        throw new Error(`Weapon ${weaponName} not found. Please add metadata to the Weapons.csv file.`);
    }
    return weapon;
};

const filterFunction = (eq: IDatabaseEquipment) : IFullEquipment => {
    const foundItem = parsedWeaponsCsv.find((weapon: IDatabaseWeapon) => weapon.weapon === eq.equipment)
    if (!foundItem) {
        throw new Error(`Weapon ${eq.equipment} not found. Please add metadata to the Weapons.csv file.`);
    }
    return {...foundItem, price: eq.price, quantity: 1};
}
export const getWarriorMeleeWeaponOptions = (warrior: IWarrior): IFullEquipment[] => {
    const filteredEquipment: IDatabaseEquipment[] = parsedEquipmentCsv.filter((equipment: IDatabaseEquipment) => equipment.list === warrior.equipment);
    const filteredWeapons: IFullEquipment[] = filteredEquipment.map((equi) => filterFunction(equi));
    const meleeWeapons = filteredWeapons.filter((weapon: IFullEquipment) => weapon.type === "Melee");
    return meleeWeapons;
}

export const getWarriorRangedWeaponOptions = (warrior: IWarrior): IFullEquipment[] => {
    const filteredEquipment: IDatabaseEquipment[] = parsedEquipmentCsv.filter((equipment: IDatabaseEquipment) => equipment.list === warrior.equipment);
    const filteredWeapons: IFullEquipment[] = filteredEquipment.map((equi) => filterFunction(equi));
    const rangedWeapons = filteredWeapons.filter((weapon: IFullEquipment) => weapon.type === "Ranged");
    return rangedWeapons;
}

export const getWarriorWargearOptions = (warrior: IWarrior): IFullEquipment[] => {
    const filteredEquipment: IDatabaseEquipment[] = parsedEquipmentCsv.filter((equipment: IDatabaseEquipment) => equipment.list === warrior.equipment);
    const filteredWeapons: IFullEquipment[] = filteredEquipment.map((equi) => filterFunction(equi));
    const wargear = filteredWeapons.filter((weapon: IFullEquipment) => weapon.type === "Wargear");
    return wargear;
}