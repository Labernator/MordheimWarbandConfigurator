import { useState } from "react";
import { setWarbandFaction } from "../redux/slices/warbandSlice";
import { useAppDispatch, useAppSelector } from "../redux/store";
import { getWarbands, getWarriorsListForWarband } from "../utilities/dataBaseProvider";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IWarrior } from "../types/warrior";
import { addDelta, loadWarrior, resetDelta } from "../redux/slices";

export interface ISelectOption {
    label: string;
    value: string;
    disabled?: boolean;
};

export const WarbandSelection = () => {
    const warbandOptions = getWarbands();
    const dispatch = useAppDispatch();
    const command = (input: string) => {
        dispatch(setWarbandFaction(input));
    }

    return <DropdownControl
        label="Select a faction"
        options={warbandOptions.map((warband) => ({ value: warband.faction, label: `${warband.faction} (max. ${warband.limit} warriors)` }))}
        command={command} />
};

export const WarriorSelection = () => {
    const dispatch = useAppDispatch();
    const warband = useAppSelector((state) => state.warband);
    const storeWarrior = useAppSelector((state) => state.warrior);
    const warriorOptions = getWarriorsListForWarband(warband.faction);
    const getWarriorFromOptions = (type: string) => {
        const warriorFound = warriorOptions.find((unit: IWarrior) => unit.type === type);
        if (!warriorFound) {
            throw new Error(`Warrior ${type} not found in Warrior list for Warband`);
        }
        return warriorFound;
    };
    const command = (input: string) => {
        const warriorProfile = getWarriorFromOptions(input);
        dispatch(loadWarrior({ ...warriorProfile, name: storeWarrior.name }));
        dispatch(resetDelta());
        dispatch(addDelta({command:"loadWarrior", value: warriorProfile.totalCost * storeWarrior.headCount}));
    }
    const isDisabled = (item: IWarrior) => {
        return !!((item.cost * item.headCount) > warband.cash || item.max <= warband.warriors.filter((warrior) => warrior.type === item.type).length);
    };
    return <DropdownControl
        label="Select a Warrior"
        options={warriorOptions.map((warrior) => ({ value: warrior.type, label: `${warrior.type} (${warrior.cost})`, disabled:isDisabled(warrior) }))}
        command={command} />
};

export const DropdownControl = ({label, options, command,onClickHandler} : {label: string; options: ISelectOption[]; command: (input: string) => void; onClickHandler?: () => void}) => {
    const onChangeHandler = (faction: string) => {
        console.log("click");
        setSelectedOption(faction);
        command(faction);
    };
    const optionsIncludingEmpty = [{label:"", value:"", disabled: true}, ...options]
    const [selectedOption, setSelectedOption] = useState<string>("");
    return <div className="input-container">
        <label className="input-label">{label}</label>
        <select
            id={label}
            value={selectedOption}
            onClick={onClickHandler}
            onChange={(e) => onChangeHandler(e.target.value)}
            className="dropdown-box">
            {optionsIncludingEmpty.map((item) => <option key={item.value} label={item.label} value={item.value} disabled={item.disabled || false}></option>)}
        </select>
        <FontAwesomeIcon icon={faAngleDown} className={"input-icon"} onClick={() => {
            const elem = document.getElementById(label) as any; 
            elem?.showPicker();}}/>
    </div>
};