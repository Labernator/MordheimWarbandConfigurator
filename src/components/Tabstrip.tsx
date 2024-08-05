import { useState } from "react";
import { WarbandInfo, WarriorSummary, StashList } from "./overview/metaSection";
import { addDelta, addWeapon } from "../redux/slices";
import { useAppDispatch, useAppSelector } from "../redux/store";
import { IEquipment } from "../types/warrior";
import { getWarriorMeleeWeaponOptions, getWarriorRangedWeaponOptions, getWarriorWargearOptions } from "../utilities/dataBaseProvider";
import { faShieldHalved } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

export interface ITab {
    name: string;
    content: JSX.Element;
};

export const TabstripControl = ({ tabs }: { tabs: ITab[] }) => {
    const [focusedTab, setFocusedTab] = useState<string>(tabs[0].name);
    return <React.Fragment>
        <div className="tabstrip">
            {tabs.map((tab) => <div className={`tab ${focusedTab === tab.name ? "focused" : ""}`} onClick={() => setFocusedTab(tab.name)}>{tab.name}</div>)}
        </div>
        {tabs.filter((tab) => tab.name === focusedTab).map((tab) => tab.content)}
    </React.Fragment>
};
export const WarbandMetadata = () => {
    const content = [
        { name: "Metadata", content: <WarbandInfo /> },
        { name: "Fighters", content: <WarriorSummary /> },
        { name: "Stash", content: <StashList /> }
    ];
    return <div className="section-container"><TabstripControl tabs={content} /></div>;
}

export const EquipmentList = ({ type }: { type: string }) => {
    const dispatch = useAppDispatch();
    const warrior = useAppSelector((state) => state.warrior);
    const warband = useAppSelector((state) => state.warband);
    const delta = useAppSelector((state) => state.delta);
    const isDisabledEntry = (weapon: IEquipment) => {
        if (weapon.price > (warband.cash - delta.reduce((acc, curr) => acc + (curr.value || 0), 0))) {
            return true;
        }
        const weaponOnWarrior = warrior.weapons?.find((equi) => equi.weapon === weapon.weapon);
        const numberOfWeaponsOfSameType = warrior.weapons?.reduce((acc, equi) => {
            if (equi.type === type && equi.price > 0) {
                acc += equi.quantity
            }
            return acc;
        }, 0) || 0;
        if (weaponOnWarrior) {
            // TODO: make traits an array
            if (weapon.traits.includes("Two-handed") || weapon.traits.includes("Unwieldy") || weapon.traits.includes("Pair")) {
                return true;
            }
            if (weaponOnWarrior.quantity > 1) {
                return true;
            }
            if (weapon.type === "Wargear") {
                return true;
            }

        }
        if (numberOfWeaponsOfSameType > 1) {
            return true;
        }
        return false;
    }
    const equipmentOptionsGetter = () => {
        switch (type) {
            case "Melee":
                return getWarriorMeleeWeaponOptions(warrior);
            case "Ranged":
                return getWarriorRangedWeaponOptions(warrior);
            case "Wargear":
                return getWarriorWargearOptions(warrior);
            default:
                throw new Error(`${type} is not a valid equipment type`);
        }
    }
    const equipmentOptions = equipmentOptionsGetter();
    const onChangeHandler = (weaponName: string) => {
        const foundweapon = equipmentOptions.find((option) => option.weapon === weaponName)
        if (foundweapon) {
            // setSelectedEquipment(foundweapon);
            dispatch(addWeapon(foundweapon));
            dispatch(addDelta({ command: "addWeapon", value: foundweapon.price * warrior.headCount }))
        }
    };
    // const [selectedEquipment, setSelectedEquipment] = useState<IFullEquipment>(equipmentOptions[0]);
    return <React.Fragment>
        <div className="tooltip">Select any equipment options from the list below</div>
        {equipmentOptions.map((weapon) => <div
            className={isDisabledEntry(weapon) ? "list-item disabled" : "list-item"}
            onClick={() => onChangeHandler(weapon.weapon)}>
            <FontAwesomeIcon icon={faShieldHalved} className={"list-item-icon"} />
            {`${weapon.weapon} (${weapon.price})`}
        </div>)}
    </React.Fragment>

};

export const PurchaseWeapons = () => {
    const content = [
        { name: "Melee", content: <EquipmentList type="Melee" /> },
        { name: "Ranged", content: <EquipmentList type="Ranged" /> },
        { name: "Wargear", content: <EquipmentList type="Wargear" /> }
    ];
    return <React.Fragment><div className="header-1">Purchase equipment</div><TabstripControl tabs={content} /></React.Fragment>;
}
