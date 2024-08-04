import { addDelta, resetDelta } from "./deltaSlice";
import { addFunds, addWarrior, loadWarband, removeFunds, removeWarrior, setCampaignUrl, setWarbandFaction, setWarbandName, updateWarrior, addWeaponToStash } from "./warbandSlice";
import { addInjury, addWeapon, addWizardSpell, addSkill, increaseStat, increaseXP, setHeadCount, setWarriorName, loadWarrior, removeWeapon, setSpell } from "./warriorSlice";

export {
    addDelta, 
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