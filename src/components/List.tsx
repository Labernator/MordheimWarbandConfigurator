import React, { useState } from "react";
import { setSpell } from "../redux/slices/warriorSlice";
import { useAppDispatch, useAppSelector } from "../redux/store";
import { getSpellOptions } from "../utilities/dataBaseProvider";
import { faChartBar, faMagicWandSparkles, faMedkit, faSackDollar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const SpellSelection = () => {
    const dispatch = useAppDispatch();
    const warband = useAppSelector((state) => state.warband);
    const warrior = useAppSelector((state) => state.warrior);
    const spellOptions = getSpellOptions(warband.faction, warrior.type);

    const onChangeHandler = (input: string) => {
        const foundSpell = spellOptions.find((spell) => spell.name === input);
        if (!foundSpell) {
            throw new Error(`This lookup should not fail.`);
        }
        setSelectedSpell(input);
        dispatch(setSpell(foundSpell));
    };
    const [selectedSpell, setSelectedSpell] = useState<string>();
    return <div className="section-container">
        <h2>Wizard spells</h2>
        <div className="tooltip">Select one spell from the list below</div>
        {spellOptions.map((spell) => <div
            className={selectedSpell === spell.name ? "list-item focused" : "list-item"}
            onClick={() => onChangeHandler(spell.name)}>
            <FontAwesomeIcon icon={faMagicWandSparkles} className={selectedSpell === spell.name ? "list-item-icon focused" : "list-item-icon"} />
            {`${spell.name} (${spell.difficulty})`}
        </div>)}
    </div>
};

export const WarriorActions = ({actionHandler}: {actionHandler: (selection: string) => void}) => {
    const warrior = useAppSelector((state) => state.warrior);
    const onChangeHandler = (input: string) => {
        setSelectedSection(input);
        actionHandler(input);
    };
    const [selectedSection, setSelectedSection] = useState<string>();
    return <React.Fragment>
        {warrior.equipment ? <div className={`list-item ${selectedSection === "Purchase Equipment" ? "focused" : ""}`}
            onClick={() => onChangeHandler("Purchase Equipment")}>
            <FontAwesomeIcon icon={faSackDollar} className={selectedSection === "Purchase Equipment" ? "list-item-icon focused" : "list-item-icon"} />
            Purchase Equipment
        </div> : null}
        {warrior.hero ? <div className={selectedSection === "Maintain Skills" ? "list-item focused" : "list-item"}
            onClick={() => onChangeHandler("Maintain Skills")}>
            <FontAwesomeIcon icon={faMagicWandSparkles} className={selectedSection === "Maintain Skills" ? "list-item-icon focused" : "list-item-icon"} />
            Maintain Skills
        </div>: null}
        <div className={selectedSection === "Add Injuries" ? "list-item focused" : "list-item"}
            onClick={() => onChangeHandler("Add Injuries")}>
            <FontAwesomeIcon icon={faMedkit} className={selectedSection === "Add Injuries" ? "list-item-icon focused" : "list-item-icon"} />
            Add Injuries
        </div>
        <div className={selectedSection === "Change Stats" ? "list-item focused" : "list-item"}
            onClick={() => onChangeHandler("Change Stats")}>
            <FontAwesomeIcon icon={faChartBar} className={selectedSection === "Change Stats" ? "list-item-icon focused" : "list-item-icon"} />
            Change Stats
        </div>
        </React.Fragment>
};