import { faAngleRight, faX } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { addDelta, resetDelta } from "../../redux/slices/deltaSlice";
import { addWarrior, removeFunds } from "../../redux/slices/warbandSlice";
import { loadWarrior, initialWarrior, setWarriorName, setHeadCount, addWizardSpell } from "../../redux/slices/warriorSlice";
import { useAppSelector, useAppDispatch } from "../../redux/store";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { setMessage } from "../../redux/slices/messageSlice";
import { useState, useEffect } from "react";
import { IWarrior } from "../../types/warrior";
import { getSpellOptions, getWarriorsListForWarband } from "../../utilities/dataBaseProvider";

export const AddWarriorButton = () => {
    const warband = useAppSelector((state) => state.warband);
    const warrior = useAppSelector((state) => state.warrior);
    const delta = useAppSelector((state) => state.delta);
    const deltaFunds = delta.reduce((acc, curr) => acc + (curr.value || 0), 0);
    const enabled = warrior.name && warrior.name.length >= 3 && (!warrior.rules?.find((rule) => rule.rule === "Wizard" || rule.rule === "Priest") || warrior.spells?.length);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const submit = () => {
        if (!enabled) {
            return;
        }
        dispatch(setMessage(`${warrior.type} purchased for ${delta} gc`))
        dispatch(addWarrior(warrior));
        dispatch(setWarriorName(""))
        dispatch(removeFunds(deltaFunds))
        dispatch(resetDelta())
        navigate("/warband-overview");
    };
    return <div className={`submit-button ${enabled ? "enabled" : "disabled"}`} onClick={submit}>
        <div>
            <div>Purchase {warrior.type} ({warrior.cost})</div>
            <div style={{ fontSize: "0.7em" }}>new Bank account: ${warband.cash - deltaFunds}</div>
        </div>
        <FontAwesomeIcon icon={faAngleRight}/>
    </div>
};
export const AddWarriorCloseButton = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const navigateBack = () => {
        dispatch(loadWarrior(initialWarrior));
        dispatch(resetDelta())
        navigate("/warband-overview");
    };
    return <FontAwesomeIcon className="close-icon" icon={faX} onClick={navigateBack}/>;
};

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
    return <div className="name-input-container"><input
        onChange={(e: any) => onChangeHandler(e.target.value)}
        placeholder="Warrior Name *"
        className={`input input-dimensions ${isIncorrect ? "wrong" : "correct"}`} />
        <div className="warrior-name-info-text">* required (min. 3 Characters)</div></div>
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
        dispatch(resetDelta());
        dispatch(addDelta({command:"loadWarrior", value: warriorProfile.cost * warrior.headCount}));
    };
    let nextAvailableUnit = warriorOptions.filter((listItem) => !isDisabled(listItem))[0];
    if (nextAvailableUnit === undefined) {
        nextAvailableUnit = warriorOptions[0];
    }
    useEffect(() => {
        dispatch(loadWarrior({ ...nextAvailableUnit, name: warrior.name }));
        dispatch(resetDelta());
        dispatch(addDelta({command:"loadWarrior", value: nextAvailableUnit.cost}));
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    const [selectedWarrior, setSelectedWarrior] = useState<string>(nextAvailableUnit.type);
    return <select
        value={selectedWarrior}
        onChange={(e) => onChangeHandler(e.target.value)}
        className="input input-dropdown">
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
        dispatch(addDelta({command: "addHeadcount", value: warrior.cost * (input - oldHeadCount)}))
    };
    const [selectedHeadCount, setSelectedHeadCount] = useState<number>(headCountOptions[0]);
    return headCountOptions.length > 1 && !warrior.hero ? <div className="headcount-container"> <div># of warriors to add</div> <select
        value={selectedHeadCount}
        onChange={(e) => onChangeHandler(parseInt(e.target.value))}
        className="number-input">
        {headCountOptions.map((item) => <option key={item} label={`${item}`} value={item}></option>)}
    </select> </div>: null
}

export const SpellSelectionDropdown = () => {
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
        dispatch(addWizardSpell(foundSpell));
    };
    const [selectedSpell, setSelectedSpell] = useState<string>();
    return <div className="name-input-container"><select
        value={"Select a spell for your Wizard *"}
        onChange={(e) => onChangeHandler(e.target.value)}
        className={`input input-dropdown ${selectedSpell ? "" : "wrong"}`}>
        {[<option key={1} label={`Select a spell for your Wizard *`} value={"Select a spell for your Wizard *"} disabled={true}></option>, ...spellOptions.map((item) => <option key={item.name} label={`${item.name} (${item.difficulty})`} value={item.name}></option>)]}
    </select>
    <div className="warrior-name-info-text">* required (select one)</div>
    </div>
};