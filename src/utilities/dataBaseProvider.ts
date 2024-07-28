import { IDatabaseEthnicMaximums, IDatabaseInjury, IDatabaseRules, IDatabaseSkillLists, IDatabaseSpell, IDatabaseUnit, IDatabaseWarband, IDatabaseWeapon, IDatabaseWizard } from "../types/database";
import { IEthnicMaximums, IWarrior } from "../types/warrior";
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
// const equipmentCsv = require('../static/data/EquipmentLists.csv');
// const parsedEquipmentCsv = JSON.parse(equipmentCsv.slice(17));

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