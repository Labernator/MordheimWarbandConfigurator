import { addDelta, resetDelta } from "./deltaSlice";
import { addWarbandLog, addFunds, addWarrior, loadWarband, removeFunds, removeWarrior, setCampaignUrl, setWarbandFaction, setWarbandName, updateWarrior, addWeaponToStash } from "./warbandSlice";
import { addInjury, addWeapon, addWizardSpell, addSkill, increaseStat, increaseXP, setHeadCount, setWarriorName, loadWarrior, removeWeapon, setSpell } from "./warriorSlice";
import { addLog, resetLog, removeLogByCommand } from "./logSlice";
export {
    addWarbandLog,
    addDelta, 
    addLog,
    resetLog,
    removeLogByCommand,
    resetDelta, 
    addInjury, 
    addWeapon, 
    addWizardSpell, 
    addSkill, 
    increaseStat, 
    increaseXP, 
    setHeadCount, 
    setWarriorName, 
    loadWarrior, 
    removeWeapon, 
    setSpell,
    addFunds, 
    addWarrior, 
    loadWarband, 
    removeFunds, 
    removeWarrior, 
    setCampaignUrl, 
    setWarbandFaction, 
    setWarbandName, 
    updateWarrior, 
    addWeaponToStash
};