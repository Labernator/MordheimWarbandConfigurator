import { useEffect, useState } from "react";
import { addDelta, setDelta } from "../../redux/slices/fundsSlice";
import { setWarriorName, loadWarrior, setHeadCount } from "../../redux/slices/warriorSlice";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { IWarrior } from "../../types/warrior";
import { getWarriorsListForWarband } from "../../utilities/dataBaseProvider";

export const WarriorNameInput = () => {
    const dispatch = useAppDispatch();
    const [isIncorrect, setIsIncorrect] = useState<boolean>(true);
    const onChangeHandler = (txt: string) => {
        if (txt.length < 3) {
            setIsIncorrect(true);
            dispatch(setWarriorName(""));
        } else {
            setIsIncorrect(false);
            dispatch(setWarriorName(txt));
        }
    };
    return <input
        onChange={(e: any) => onChangeHandler(e.target.value)}
        placeholder="Add Warrior Name (min. 3 characters)"
        className={isIncorrect ? "modal-input wrong" : "modal-input correct"} />
};

export const WarriorDropdown = () => {
    const dispatch = useAppDispatch();
    const warband = useAppSelector((state) => state.warband);
    const warrior = useAppSelector((state) => state.warrior);

    const warriorOptions = getWarriorsListForWarband(warband.faction);
    const getWarriorFromOptions = (type: string) => {
        const warriorFound = warriorOptions.find((unit: IWarrior) => unit.type === type);
        if (!warriorFound) {
            throw new Error(`Warrior ${type} not found in Warrior list for Warband`);
        }
        return warriorFound;
    };
    const isDisabled = (item: IWarrior) => {
        return !!((item.cost * item.headCount) > warband.cash || item.max <= warband.warriors.filter((unit) => unit.type === item.type).length);
    };
    const onChangeHandler = (input: string) => {
        setSelectedWarrior(input);
        const warriorProfile = getWarriorFromOptions(input);
        dispatch(loadWarrior({ ...warriorProfile, name: warrior.name }));
        dispatch(setDelta(warriorProfile.cost * warrior.headCount))
    };
    let nextAvailableUnit = warriorOptions.filter((listItem) => !isDisabled(listItem))[0];
    if (nextAvailableUnit === undefined) {
        nextAvailableUnit = warriorOptions[0];
    }
    useEffect(() => {
        dispatch(loadWarrior({ ...nextAvailableUnit, name: warrior.name }));
        dispatch(setDelta(nextAvailableUnit.cost))
    }, []);
    const [selectedWarrior, setSelectedWarrior] = useState<string>(nextAvailableUnit.type);
    return <select
        value={selectedWarrior}
        onChange={(e) => onChangeHandler(e.target.value)}
        className="modal-input warrior-dropdown">
        {warriorOptions.map((item) => <option key={item.type} disabled={isDisabled(item)} label={`${item.type} (${item.cost})`} value={item.type}></option>)}
    </select>
};

export const WarriorHeadCount = () => {
    const warrior = useAppSelector((state) => state.warrior);
    const headCountOptions = Array.from(Array(Math.min(warrior.max, 5))).map((e, i) => i + 1);
    const dispatch = useAppDispatch();
    const onChangeHandler = (input: number) => {
        const oldHeadCount = warrior.headCount;
        setSelectedHeadCount(input);
        dispatch(setHeadCount(input));
        dispatch(addDelta(warrior.cost * (input - oldHeadCount)))
    };
    const [selectedHeadCount, setSelectedHeadCount] = useState<number>(headCountOptions[0]);
    return headCountOptions.length > 1 && !warrior.hero ? <select
        value={selectedHeadCount}
        onChange={(e) => onChangeHandler(parseInt(e.target.value))}
        className="modal-input warrior-dropdown">
        {headCountOptions.map((item) => <option key={item} label={`${item}`} value={item}></option>)}
    </select> : null
}
