import { IDatabaseEquipment, IDatabaseEthnicMaximums, IDatabaseInjury, IDatabaseRules, IDatabaseSkillLists, IDatabaseSpell, IDatabaseUnit, IDatabaseWarband, IDatabaseWeapon, IDatabaseWizard } from "../types/database";
import { IEquipment, IEthnicMaximums, IFullEquipment, IWarrior } from "../types/warrior";
const warbandsCsv = require('../static/data/Warbands.csv');
const unitsCsv = require('../static/data/Units.csv');
const rulesCsv = require('../static/data/Rules.csv');
const weaponsCsv = require('../static/data/Weapons.csv');
const spellsCsv = require('../static/data/Spells.csv');
const wizardsCsv = require('../static/data/Wizards.csv');
const maximumsCsv = require('../static/data/EthnicMaximums.csv');
const skillsCsv = require('../static/data/Skills.csv');
const parsedWeaponsCsv: IDatabaseWeapon[] = JSON.parse(weaponsCsv.slice(17));
const parsedRulesCsv: IDatabaseRules[] = JSON.parse(rulesCsv.slice(17));
const parsedWarbandsCsv: IDatabaseWarband[] = JSON.parse(warbandsCsv.slice(17));
const parsedSpellsCsv: IDatabaseSpell[] = JSON.parse(spellsCsv.slice(17));
const parsedWizardsCsv: IDatabaseWizard[] = JSON.parse(wizardsCsv.slice(17));
const parsedMaximumsCsv: IDatabaseEthnicMaximums[] = JSON.parse(maximumsCsv.slice(17));
const parsedSkillsCsv: IDatabaseSkillLists[] = JSON.parse(skillsCsv.slice(17));
const injuriesCsv = require('../static/data/Injuries.csv');
const parsedInjuriesCsv: IDatabaseInjury[] = JSON.parse(injuriesCsv.slice(17));
const structuredRules = parsedRulesCsv.map((csvRule: IDatabaseRules) => ({ rule: csvRule.rule, effect: csvRule.effect }));
const equipmentListCsv = require('../static/data/EquipmentLists.csv');
const parsedEquipmentListCsv: IDatabaseEquipment[] = JSON.parse(equipmentListCsv.slice(17));

export const getSkillsPerList = (list: string) => {
    return parsedSkillsCsv.filter((skillList) => skillList.skilllist === list);
}
export const getInjuries = () => {
    return parsedInjuriesCsv;
}
export const getWarbands = () => {
    return parsedWarbandsCsv;
}
export const getMaximumsForEthnicity = (ethnicity: string): IEthnicMaximums => {
    const foundMax = parsedMaximumsCsv.find((max) => max.profile === ethnicity);
    if (!foundMax) {
        throw new Error(`Ethnicity ${ethnicity} not found. Please add metadata to the EthnicMaximums.csv file.`);
    }
    return foundMax;
}
export const getWarbandMetadata = (faction: string) => {
    const warband = parsedWarbandsCsv.find((warband) => warband.faction === faction);
    if (!warband) {
        throw new Error(`Warband ${warband} not found. Please add metadata to the Warband.csv file.`);
    }
    return warband;
}

const getRules = (plainRules: string[]): IDatabaseRules[] => {
    return plainRules.map((rule: string) => {
        const foundRule = structuredRules.find((csvRule: any) => csvRule.rule === rule)
        if (!foundRule) {
            throw new Error(`Rule ${rule} not found. Please add metadata to the Rules.csv file.`);
        }
        return foundRule;
    });
};
export const listContainsDagger = (list: string) => {
    const foundDagger = parsedEquipmentListCsv.filter((entry) => entry.list === list).find((entry) => entry.equipment === "Dagger");
    return !!foundDagger;
}
export const getWarriorsListForWarband = (faction: string | undefined): IWarrior[] => {
    if (faction === undefined) {
        throw new Error("Warband faction is undefined. Please provide a warband faction.");
    }
    const parsedCSV: IDatabaseUnit[] = JSON.parse(unitsCsv.slice(17));
    const filteredCSV = parsedCSV.filter((unit: IDatabaseUnit) => unit.warband === faction);
    return filteredCSV.map((unit: IDatabaseUnit) => {
        const plainRules: string[] = (unit.rules && unit.rules.split(",").map((entry) => entry.trim())) || [];
        const transformedUnit: IWarrior = {
            ...unit,
            name: "",
            skills: (unit.skills && unit.skills.split(",")) || [],
            weapons: unit.equipment && listContainsDagger(unit.equipment) ? [{ weapon: "Dagger", type: "Melee", strength: "as User", range: "", price: 0, quantity: 1, traits: ["Enemy armour save"] }] : [],
            rules: getRules(plainRules),
            totalCost: unit.cost,
            headCount: 1,
            hero: unit.hero === "x",
            position: 0,
            ethnicity: unit.ethnicity
        }
        // transform skills
        return transformedUnit;
    })
};


export const getSpellOptions = (faction: string, warriorType: string) => {
    const foundWizard = parsedWizardsCsv.find((wizard) => wizard.warband === faction && wizard.name);
    if (!foundWizard) {
        throw new Error(`Wizard ${warriorType} not found. Please add metadata to the Wizard.csv file.`);
    }
    const spells = parsedSpellsCsv.filter((spell) => spell.school === foundWizard.school);
    if (spells.length < 1) {
        throw new Error(`Magic school ${foundWizard.school} not found. Please add metadata to the Spells.csv file.`);
    }
    return spells;
}

const filterFunction = (eq: IDatabaseEquipment): IFullEquipment => {
    const foundItem = parsedWeaponsCsv.find((weapon: IDatabaseWeapon) => weapon.weapon === eq.equipment)
    if (!foundItem) {
        throw new Error(`Weapon ${eq.equipment} not found. Please add metadata to the Weapons.csv file.`);
    }
    return { ...foundItem, price: eq.price, quantity: 1 };
}
export const getWarriorMeleeWeaponOptions = (warrior: IWarrior): IEquipment[] => {
    const filteredEquipment: IDatabaseEquipment[] = parsedEquipmentListCsv.filter((equipment: IDatabaseEquipment) => equipment.list === warrior.equipment);
    const filteredWeapons: IFullEquipment[] = filteredEquipment.map((equi) => filterFunction(equi));
    const meleeWeapons = filteredWeapons.filter((weapon: IFullEquipment) => weapon.type === "Melee").map((weapon) => ({ ...weapon, traits: (weapon.traits && weapon.traits.split(",").map((entry) => entry.trim())) || [] }));
    return meleeWeapons;
}

export const getWarriorRangedWeaponOptions = (warrior: IWarrior): IEquipment[] => {
    const filteredEquipment: IDatabaseEquipment[] = parsedEquipmentListCsv.filter((equipment: IDatabaseEquipment) => equipment.list === warrior.equipment);
    const filteredWeapons: IFullEquipment[] = filteredEquipment.map((equi) => filterFunction(equi));
    const rangedWeapons = filteredWeapons.filter((weapon: IFullEquipment) => weapon.type === "Ranged").map((weapon) => ({ ...weapon, traits: (weapon.traits && weapon.traits.split(",").map((entry) => entry.trim())) || [] }));
    return rangedWeapons;
}

export const getWarriorWargearOptions = (warrior: IWarrior): IEquipment[] => {
    const filteredEquipment: IDatabaseEquipment[] = parsedEquipmentListCsv.filter((equipment: IDatabaseEquipment) => equipment.list === warrior.equipment);
    const filteredWeapons: IFullEquipment[] = filteredEquipment.map((equi) => filterFunction(equi));
    const wargear = filteredWeapons.filter((weapon: IFullEquipment) => weapon.type === "Wargear").map((weapon) => ({ ...weapon, traits: (weapon.traits && weapon.traits.split(",").map((entry) => entry.trim())) || [] }));
    return wargear;
}