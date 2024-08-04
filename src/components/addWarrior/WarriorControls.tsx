import { faX } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { loadWarrior, addWizardSpell, resetDelta } from "../../redux/slices";
import { useAppSelector, useAppDispatch } from "../../redux/store";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { getSpellOptions } from "../../utilities/dataBaseProvider";
import { initialWarrior } from "../../types/warrior";
export const AddWarriorCloseButton = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const navigateBack = () => {
        dispatch(loadWarrior(initialWarrior));
        dispatch(resetDelta())
        navigate("/overview");
    };
    return <FontAwesomeIcon className="close-icon" icon={faX} onClick={navigateBack}/>;
};

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