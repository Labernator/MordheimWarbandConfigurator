import { faAngleRight, faAward, faChartBar, faHammer, faKitMedical, faPlusSquare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
import { setMessage } from "../../redux/slices/messageSlice";
import { addInjury, addSkill, addWeapon, increaseStat, increaseXP, loadWarrior, addDelta, resetDelta, removeFunds, removeWarrior, updateWarrior } from "../../redux/slices";
import { useAppSelector, useAppDispatch } from "../../redux/store";
import React, { useEffect, useState } from "react";
import { IEquipmentType, IFullEquipment, initialWarrior, IWarrior, Stats } from "../../types/warrior";
import { getWarriorMeleeWeaponOptions, getWarriorRangedWeaponOptions, getWarriorWargearOptions } from "../../utilities/unitProvider";
import { StatsSection, MaintainWeaponsSection, ShortWargearSection, SkillListsSection, ShortRulesSection } from "../render/UnitCard";
import { HeaderSectionWithEdit } from "../addWarrior/WarriorSheet";
import { getInjuries, getMaximumsForEthnicity, getSkillsPerList } from "../../utilities/dataBaseProvider";
import { SpellSelectionDropdown } from "../addWarrior/WarriorControls";

export const UpdateWarriorButton = () => {
    const warband = useAppSelector((state) => state.warband);
    const warrior = useAppSelector((state) => state.warrior);
    const delta = useAppSelector((state) => state.delta);
    const deltaFunds = delta.reduce((acc, curr) => acc + (curr.value || 0), 0);
    const enabled = warrior.name && warrior.name.length >= 3 && (!warrior.rules?.find((rule) => rule.rule === "Wizard") || warrior.spells?.length);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const submit = () => {
        if (!enabled) {
            return;
        }
        dispatch(setMessage(`Items in cart purchased for ${delta} gc`))
        dispatch(updateWarrior(warrior));
        dispatch(loadWarrior(initialWarrior))
        dispatch(removeFunds(deltaFunds))
        dispatch(resetDelta())
        navigate("/overview");
    };
    return <div className={`submit-button ${enabled ? "enabled" : "disabled"}`} onClick={submit}>
        <div>
            <div>Purchase selected equipment</div>
            <div style={{ fontSize: "0.7em" }}>new Bank account: ${warband.cash - deltaFunds}</div>
        </div>
        <FontAwesomeIcon icon={faAngleRight} />
    </div>
};

export const DeleteWarriorButton = () => {
    const warrior = useAppSelector((state) => state.warrior);
    const enabled = warrior.name && warrior.name.length >= 3 && (!warrior.rules?.find((rule) => rule.rule === "Wizard") || warrior.spells?.length);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const submit = () => {
        if (!enabled) {
            return;
        }
        dispatch(setMessage(`Warrior deleted`));
        dispatch(removeWarrior(warrior));
        dispatch(loadWarrior(initialWarrior))
        navigate("/overview");
    };
    return <div className={`delete-button ${enabled ? "enabled" : "disabled"}`} onClick={submit}>
        <div>
            <div>{warrior.headCount > 1 ? "Delete one member of this group" : "Delete Warrior from Roster"}</div>
            <div style={{ fontSize: "0.7em" }}>This action cannot be undone.</div>
        </div>
        <FontAwesomeIcon icon={faAngleRight} />
    </div>
};
const enum IMaintainTabs {
    Equipment = "Equipment",
    Skills = "Skills",
    Injuries = "Injuries",
    Stats = "Stats"
}
export const MetaSection = () => {
    const [focusedTab, setFocusedTab] = useState<IMaintainTabs>(IMaintainTabs.Equipment);
    return <div className="modern-container">
        <div className="content-container">
            <div className="tabstrip">
                <div className={`tab ${focusedTab === IMaintainTabs.Equipment ? "focused" : ""}`} onClick={() => setFocusedTab(IMaintainTabs.Equipment)}>{IMaintainTabs.Equipment}</div>
                <div className={`tab ${focusedTab === IMaintainTabs.Skills ? "focused" : ""}`} onClick={() => setFocusedTab(IMaintainTabs.Skills)}>{IMaintainTabs.Skills}</div>
                <div className={`tab ${focusedTab === IMaintainTabs.Injuries ? "focused" : ""}`} onClick={() => setFocusedTab(IMaintainTabs.Injuries)}>{IMaintainTabs.Injuries}</div>
                <div className={`tab ${focusedTab === IMaintainTabs.Stats ? "focused" : ""}`} onClick={() => setFocusedTab(IMaintainTabs.Stats)}>{IMaintainTabs.Stats}</div>
            </div>
            {focusedTab === IMaintainTabs.Equipment ? <EquipmentSection /> : null}
            {focusedTab === IMaintainTabs.Skills ? <SkillsSection /> : null}
            {focusedTab === IMaintainTabs.Injuries ? <InjuriesSection /> : null}
            {focusedTab === IMaintainTabs.Stats ? <StatsMaintenanceSection /> : null}
        </div>
    </div>
}

export const StatsMaintenanceSection = () => {
    const dispatch = useAppDispatch();
    const warrior = useAppSelector((state) => state.warrior);
    const ethnicMaximums = getMaximumsForEthnicity(warrior.ethnicity);
    const getWarriorStat = (input: string) => {
        switch (input) {
            case Stats.M:
                return { warriorStat: warrior.M, max: ethnicMaximums.M };
            case Stats.W:
                return { warriorStat: warrior.W, max: ethnicMaximums.W };
            case Stats.WS:
                return { warriorStat: warrior.WS, max: ethnicMaximums.WS };
            case Stats.I:
                return { warriorStat: warrior.I, max: ethnicMaximums.I };
            case Stats.BS:
                return { warriorStat: warrior.BS, max: ethnicMaximums.BS };
            case Stats.A:
                return { warriorStat: warrior.A, max: ethnicMaximums.A };
            case Stats.S:
                return { warriorStat: warrior.S, max: ethnicMaximums.S };
            case Stats.Ld:
                return { warriorStat: warrior.Ld, max: ethnicMaximums.Ld };
            case Stats.T:
                return { warriorStat: warrior.T, max: ethnicMaximums.T };
            default:
                throw new Error("Stat not found");
        }
    };
    return <React.Fragment>
        <div className="warband-control" style={{ paddingLeft: "0.5em" }}>
            <FontAwesomeIcon icon={faChartBar} style={{ width: "1.5em" }} /> {`Change XP`}</div>
        <table className="stats-maintain-table">
            <tbody>
<tr>
                        <td>Experience</td>
                        <td style={{ fontWeight: "bold" }}>{warrior.xp}</td>
                        <td><FontAwesomeIcon
                            icon={faPlusSquare}
                            className={"stats-icon"}
                            onClick={() => {
                                    dispatch(addDelta({command: "addXP"}))
                                    dispatch(increaseXP())
                            }
                            } /></td>
                        <td style={{ fontSize: "0.8em" }}>{warrior.xp ? `max. ` : "maximized"}</td>
                    </tr>
            </tbody>
        </table>
        <div className="warband-control" style={{ paddingLeft: "0.5em" }}>
            <FontAwesomeIcon icon={faChartBar} style={{ width: "1.5em" }} /> {`Change Stats`}</div>
        <table className="stats-maintain-table">
            <tbody>
                {Object.values(Stats).map((stat) => {
                    const stats = getWarriorStat(stat);
                    return <tr>
                        <td>{stat}</td>
                        <td style={{ fontWeight: "bold" }}>{stats.warriorStat}</td>
                        <td><FontAwesomeIcon
                            icon={faPlusSquare}
                            className={stats.warriorStat < stats.max ? "stats-icon" : "stats-icon disabled"}
                            onClick={() => {
                                if (stats.warriorStat < stats.max) {
                                    dispatch(increaseStat(stat))
                                }
                            }
                            } /></td>
                        <td style={{ fontSize: "0.8em" }}>{stats.warriorStat < stats.max ? `max. ${stats.max}` : "maximized"}</td>
                    </tr>
                })}
            </tbody>
        </table>
    </React.Fragment>
}

export const EquipmentSection = () => {
    return <div><div className="warband-control" style={{ paddingLeft: "0.5em" }}>
        <FontAwesomeIcon icon={faHammer} style={{ width: "1.5em" }} /> {`Purchase Equipment`}</div>
        <div className="equipment-section">
            <EquipmentDropdown type={IEquipmentType.Melee} />
            <div className="warrior-name-info-text">Select any item from the dropdown to to add to your cart. </div>
            <EquipmentDropdown type={IEquipmentType.Ranged} />
            <div className="warrior-name-info-text">Select any item from the dropdown to to add to your cart. </div>
            <EquipmentDropdown type={IEquipmentType.Wargear} />
            <div className="warrior-name-info-text">Select any item from the dropdown to to add to your cart. </div>
        </div>
    </div>
}

export const SkillsSection = () => {
    const warrior = useAppSelector((state) => state.warrior);
    return <div>
        <div className="warband-control" style={{ paddingLeft: "0.5em" }}>
            <FontAwesomeIcon icon={faAward} style={{ width: "1.5em" }} /> {`Add Skills`}</div>
        {warrior.rules?.map((rule) => rule.rule).includes("Wizard") ? <React.Fragment>
            <SpellSelectionDropdown />
            <div className="warrior-name-info-text">Select any skill from the respective dropdown. </div>
        </React.Fragment> :
            null}
        {warrior.skills?.map((skill) => <div><div>{skill}</div> <SkillsDropdown list={skill}/></div>)}
        <div className="warrior-name-info-text">Select any skill from the respective dropdown. </div>
    </div>
}


export const SkillsDropdown = ({list}:{list:string}) => {
    const dispatch = useAppDispatch();
    const skills = getSkillsPerList(list);

    const onChangeHandler = (skill: string) => {
        setSelectedSkill(skill);
        const foundSkill = skills.find((item) => item.skill === skill);
        if (!foundSkill) {
            throw new Error(`Skill ${skill} not found in the database.`);
        }

        dispatch(addSkill({ rule: foundSkill.skill, effect: foundSkill.effect }));
    };
    useEffect(() => {

    }, []);
    const [selectedSkill, setSelectedSkill] = useState<string>(list);
    return <select
        value={selectedSkill}
        onChange={(e) => onChangeHandler(e.target.value)}
        className="input input-dropdown">
        {[<option label={list} value={list} disabled={true} />, ...skills.map((item) => <option
            key={item.skill}
            label={`${item.skill}`}
            value={item.skill}
            disabled={false} />)]}
    </select>
};

export const InjuriesSection = () => {
    return <div>
        <div className="warband-control" style={{ paddingLeft: "0.5em" }}><FontAwesomeIcon icon={faKitMedical} style={{ width: "1.5em" }} /> {`Add lasting Injury`}</div>
        <InjuryDropdown />
        <div className="warrior-name-info-text">Select any lasting injury from the dropdown.</div>
    </div>
}

export const EquipmentDropdown = ({ type }: { type: IEquipmentType }) => {
    const dispatch = useAppDispatch();
    const warrior = useAppSelector((state) => state.warrior);
    const warband = useAppSelector((state) => state.warband);
    const delta = useAppSelector((state) => state.delta);
    const isDisabledEntry = (weapon: IFullEquipment) => {
        if (weapon.price > (warband.cash - delta.reduce((acc, curr) => acc + (curr.value || 0), 0))) {
            return true;
        }
        const weaponOnWarrior = warrior.weapons?.find((equi) => equi.weapon === weapon.weapon);
        if (weaponOnWarrior) {
            // TODO: make traits an array
            if (weapon.traits.includes("Two-handed") || weapon.traits.includes("Unwieldy") || weapon.traits.includes("Pair")) {
                return true;
            }
            if (weaponOnWarrior.quantity > 1) {
                return true;
            }
            if (weapon.type !== "Melee") {
                return true;
            }
        }

        return false;
    }
    const equipmentOptionsGetter = () => {
        switch (type) {
            case IEquipmentType.Melee:
                return getWarriorMeleeWeaponOptions(warrior);
            case IEquipmentType.Ranged:
                return getWarriorRangedWeaponOptions(warrior);
            case IEquipmentType.Wargear:
                return getWarriorWargearOptions(warrior);
        }
    }
    const equipmentOptions = equipmentOptionsGetter();
    const onChangeHandler = (weaponName: string) => {
        const foundweapon = equipmentOptions.find((option) => option.weapon === weaponName)
        if (foundweapon) {
            // setSelectedEquipment(foundweapon);
            dispatch(addWeapon(foundweapon));
            dispatch(addDelta({command: "addWeapon", value: foundweapon.price * warrior.headCount}))
            dispatch(setMessage(`${foundweapon.weapon} was added to cart.`))
        }
    };
    useEffect(() => {

    }, []);
    // const [selectedEquipment, setSelectedEquipment] = useState<IFullEquipment>(equipmentOptions[0]);
    return <select
        value={type}
        onChange={(e) => onChangeHandler(e.target.value)}
        className="input input-dropdown">
        {[<option label={type} value={type} disabled={true} />, ...equipmentOptions.map((item) => <option
            key={item.weapon}
            label={`${item.weapon} ($${item.price})`}
            value={item.weapon}
            disabled={isDisabledEntry(item)} />)]}
    </select>
};

export const InjuryDropdown = () => {
    const dispatch = useAppDispatch();
    const injuries = getInjuries();

    const onChangeHandler = (injury: string) => {
        setSelectedInjury(injury);
        dispatch(addInjury(injury));
    };
    useEffect(() => {

    }, []);
    const [selectedInjury, setSelectedInjury] = useState<string>("Injuries");
    return <select
        value={selectedInjury}
        onChange={(e) => onChangeHandler(e.target.value)}
        className="input input-dropdown">
        {[<option label={""} value={"Injuries"} disabled={true} />, ...injuries.map((item) => <option
            key={item.injury}
            label={`${item.injury}`}
            value={item.injury}
            disabled={false} />)]}
    </select>
};

export const MaintainWarriorSheet = ({ warrior }: { warrior: IWarrior }) => {
    return <React.Fragment>
        <div className="dialog-warrior-sheet">
            <HeaderSectionWithEdit warrior={warrior} />
            <StatsSection unit={warrior} />
            <MaintainWeaponsSection warrior={warrior} />
            <table className="unit-table">
                <tbody>
                    <ShortWargearSection unit={warrior} />
                    <SkillListsSection unit={warrior} />
                    <ShortRulesSection unit={warrior} />
                </tbody>
            </table>
        </div>
    </React.Fragment>;
};
