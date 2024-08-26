import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { addLog, removeLogByCommand, setSpell } from "../redux/slices";
import { useAppDispatch, useAppSelector } from "../redux/store";
import { IDatabaseSpell, ISpellcaster } from "../types/database";
import { DataBaseProvider } from "../utilities/DatabaseProvider";

export const SpellSelection = () => {
    const dispatch = useAppDispatch();
    const location = useLocation();
    if (location.pathname !== "/add-warrior") {
        return null;
    }
    const warrior = useAppSelector((state) => state.tempwarrior);
    const maxSpells = warrior.WarriorType === "Wolf Priest of Ulric" ? 2 : 1;
    const onChangeHandler = (input: string) => {
        dispatch(removeLogByCommand({ command: "Add spells", value: "" }));
        if (maxSpells === 2) {
            if (selectedSpells) {
                if (selectedSpells.includes(input)) {
                    const filteredSpells = selectedSpells.filter((spell) => spell !== input);
                    setSelectedSpells(filteredSpells);
                    const fullFilteredSpells = filteredSpells.reduce((acc: IDatabaseSpell[], item) => {
                        const foundSpell = spellCaster?.SpellOptions.find((spell) => spell.SpellName === item);
                        if (foundSpell) {
                            acc.push(foundSpell);
                        }
                        return acc;
                    }, []);
                    fullFilteredSpells.forEach((spell) => dispatch(addLog({ command: "Add spells", value: spell.SpellName })));
                    dispatch(setSpell(fullFilteredSpells));
                    return;
                }
                const spells = selectedSpells;
                if (selectedSpells.length === 2) {
                    spells.shift();
                }
                const selected = spells ? [...spells, input] : [input];
                const actualSpells = selected.reduce((acc: IDatabaseSpell[], item) => {
                    const foundSpell = spellCaster?.SpellOptions.find((spell) => spell.SpellName === item);
                    if (foundSpell) {
                        acc.push(foundSpell);
                    }
                    return acc;
                }, []);
                setSelectedSpells(actualSpells.map((spell) => spell.SpellName));
                actualSpells.forEach((spell) => dispatch(addLog({ command: "Add spells", value: spell.SpellName })));
                dispatch(setSpell(actualSpells));
            } else {
                setSelectedSpells([input]);
                dispatch(addLog({ command: "Add spells", value: input }));
                dispatch(setSpell(spellCaster?.SpellOptions.filter((spell) => spell.SpellName === input) || []));
            }
        } else {
            setSelectedSpells([input]);
            dispatch(addLog({ command: "Add spells", value: input }));
            dispatch(setSpell(spellCaster?.SpellOptions.filter((spell) => spell.SpellName === input) || []));

        }
    };
    const [spellCaster, setSpellCaster] = useState<ISpellcaster>();
    useEffect(() => {
        async function fetchWizards() {
            if (warrior.WarriorType) {
                const DatabaseProviderInstance = await DataBaseProvider.getInstance();
                const spellCaster = await DatabaseProviderInstance.getSpellcaster(warrior.WarriorType);
                setSpellCaster(spellCaster);
            }
        }
        fetchWizards();
    }, []);
    const [selectedSpells, setSelectedSpells] = useState<string[]>(warrior.Spells?.map((spell) => spell.SpellName) || []);
    const isWizard = !!warrior.Rules?.find((rule) => rule.RuleName === "Wizard");
    const isPriest = !!warrior.Rules?.find((rule) => rule.RuleName === "Priest");
    return <React.Fragment>
        <div style={{ fontSize: "0.75em" }}>{isWizard ? "Wizard spells" : isPriest ? "Priest prayers" : ""} ({maxSpells === 1 ? "select one" : "select two"})</div>
        <div className="control-container">

            {spellCaster?.SpellOptions.map((spell) => {
                const isSelected = selectedSpells?.find((selected) => selected === spell.SpellName);
                return <div key=""
                    className={isSelected ? "control-group focused" : "control-group"}
                    onClick={() => onChangeHandler(spell.SpellName)}>
                    {/* <FontAwesomeIcon icon={faMagicWandSparkles} className={isSelected ? "list-item-icon" : "list-item-icon"} /> */}
                    {`${spell.SpellName} (${spell.Difficulty})`}
                </div>;
            }
            )}
        </div>
    </React.Fragment>;
};