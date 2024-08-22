import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { addDelta, loadWarrior, resetDelta } from "../redux/slices";
import { useAppDispatch, useAppSelector } from "../redux/store";
import { IWarrior } from "../types/warrior";
import { DataBaseProvider } from "../utilities/DatabaseProvider";

export interface ISelectOption {
    label: string;
    value: string;
    disabled?: boolean;
}


export const WarriorSelection = () => {
    const dispatch = useAppDispatch();
    const warband = useAppSelector((state) => state.warband);
    const storeWarrior = useAppSelector((state) => state.tempwarrior);
    const getWarriorFromOptions = (type: string) => {
        const warriorFound = warriorOptions.find((warrior: IWarrior) => warrior.WarriorType === type);
        if (!warriorFound) {
            throw new Error(`Warrior ${type} not found in Warrior list for Warband`);
        }
        return warriorFound;
    };
    const command = (input: string) => {
        const warriorProfile = getWarriorFromOptions(input);
        dispatch(loadWarrior({ ...warriorProfile, Name: storeWarrior.Name }));
        dispatch(resetDelta());
        dispatch(addDelta({ command: "loadWarrior", value: warriorProfile.TotalCost * storeWarrior.HeadCount }));
    };
    const isDisabled = (item: IWarrior) => {
        return !!((item.Cost * item.HeadCount) > warband.cash || item.Maximum <= warband.warriors.filter((warrior) => warrior.WarriorType === item.WarriorType).length);
    };
    const [warriorOptions, setWarriorOptions] = useState<IWarrior[]>([]);
    useEffect(() => {
        async function fetchWarbands() {
            const DatabaseProviderInstance = await DataBaseProvider.getInstance();
            setWarriorOptions(DatabaseProviderInstance.warriors);
        }
        fetchWarbands();
    }, []);
    return <DropdownControl
        label="Select a Warrior"
        options={warriorOptions.map((warrior) => ({ value: warrior.WarriorType, label: `${warrior.WarriorType} (${warrior.Cost})`, disabled: isDisabled(warrior) }))}
        command={command} />;
};

export const DropdownControl = ({ label, options, command, onClickHandler }: { label: string; options: ISelectOption[]; command: (_input: string) => void; onClickHandler?: () => void }) => {
    const onChangeHandler = (faction: string) => {
        console.log("click");
        setSelectedOption(faction);
        command(faction);
    };
    const optionsIncludingEmpty = [{ label: "", value: "", disabled: true }, ...options];
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
            elem?.showPicker();
        }} />
    </div>;
};