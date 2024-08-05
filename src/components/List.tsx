import React, { useState } from "react";
import { setSpell } from "../redux/slices/warriorSlice";
import { useAppDispatch, useAppSelector } from "../redux/store";
import { getSpellOptions } from "../utilities/dataBaseProvider";
import { faChartBar, faMagicWandSparkles, faMedkit, faSackDollar, faUserGroup, faUserShield, faUserTag } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
import { setMessage } from "../redux/slices/messageSlice";

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
    const isWizard = !!warrior.rules?.find((rule) => rule.rule === "Wizard");
    const isPriest = !!warrior.rules?.find((rule) => rule.rule === "Priest");
    return <div className="section-container">
        <h2>{isWizard ? "Wizard spells" : isPriest ? "Priest prayers" : ""}</h2>
        <div className="tooltip">Select one {`${isWizard ? "spell" : isPriest ? "prayer" : ""}`} from the list below</div>
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
    const rules = warrior.rules;
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
        <div className={selectedSection === "Spell Selection" ? "list-item focused" : "list-item"}
            onClick={() => onChangeHandler("Spell Selection")}>
            <FontAwesomeIcon icon={faChartBar} className={selectedSection === "Spell Selection" ? "list-item-icon focused" : "list-item-icon"} />
            {rules?.find((rule) => rule.rule === "Wizard") ? "Spell Selection" : rules?.find((rule) => rule.rule === "Priest") ? "Prayer Selection" : ""}
        </div>
        </React.Fragment>
};

export const WarbandControls = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    return <div className="section-container">
        <div className="header-1">Warrior Controls</div>
        <div className="list-item" onClick={() => navigate("/add-warrior")}><FontAwesomeIcon icon={faUserGroup} className="list-item-icon" /> Add Warrior</div>
        <div className="list-item" onClick={() => dispatch(setMessage("Implementation missing."))}><FontAwesomeIcon icon={faUserShield} className="list-item-icon" /> Add Hired Sword</div>
        <div className="list-item" onClick={() => dispatch(setMessage("Implementation missing."))}><FontAwesomeIcon icon={faUserTag} className="list-item-icon" /> Add Dramatis Personae</div>
        <div className="list-item" onClick={() => dispatch(setMessage("Implementation missing."))}><FontAwesomeIcon icon={faSackDollar} className="list-item-icon" /> Trading Post</div>
    </div>
};