import { useEffect, useState } from "react";
import { addDelta, addLog, addWeapon } from "../redux/slices";
import { useAppDispatch, useAppSelector } from "../redux/store";
import React from "react";
import { ICombinedEquipment } from "../types/database";
import { DataBaseProvider } from "../utilities/DatabaseProvider";
import { faPlusCircle, IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export interface ITab {
    name: string;
    content: JSX.Element;
}

export const TabstripControl = ({ tabs }: { tabs: ITab[] }) => {
    const [focusedTab, setFocusedTab] = useState<string>(tabs[0].name);
    return <React.Fragment>
        <div className="tabstrip">
            {tabs.map((tab) => <div key="dummy-key" className={`tab ${focusedTab === tab.name ? "focused" : ""}`} onClick={() => setFocusedTab(tab.name)}>{tab.name}</div>)}
        </div>
        {tabs.filter((tab) => tab.name === focusedTab).map((tab) => tab.content)}
    </React.Fragment>;
};

export const EquipmentList = ({ type }: { type: string }) => {
    const dispatch = useAppDispatch();
    const warrior = useAppSelector((state) => state.tempwarrior);
    const warband = useAppSelector((state) => state.warband);
    const delta = useAppSelector((state) => state.delta);
    const isDisabledEntry = (weapon: ICombinedEquipment) => {
        if (weapon.Price > (warband.cash - delta.reduce((acc, curr) => acc + (curr.value || 0), 0))) {
            return true;
        }
        const weaponOnWarrior = warrior.Equipment?.find((equi) => equi.EquipmentName === weapon.EquipmentName);
        const numberOfWeaponsOfSameType = warrior.Equipment?.reduce((acc, equi) => {
            if (equi.EquipmentType === type && equi.Price > 0) {
                acc += equi.Quantity;
            }
            return acc;
        }, 0) || 0;
        if (weaponOnWarrior) {
            // TODO: make traits an array
            if (weapon.Traits.includes("Two-handed") || weapon.Traits.includes("Unwieldy") || weapon.Traits.includes("Pair")) {
                return true;
            }
            if (weaponOnWarrior.Quantity > 1) {
                return true;
            }
            if (weapon.EquipmentType === "Wargear") {
                return true;
            }

        }
        if (type === "Melee" && numberOfWeaponsOfSameType > 2) {
            return true;
        }
        if (type === "Ranged" && numberOfWeaponsOfSameType > 1) {
            return true;
        }
        return false;
    };
    const onChangeHandler = (weaponName: string) => {
        const foundweapon = equipmentOptions.find((option) => option.EquipmentName === weaponName);
        if (foundweapon && !isDisabledEntry(foundweapon)) {
            dispatch(addLog({ command: "Add Equipment", value: weaponName, cost: foundweapon.Price * warrior.HeadCount }));
            dispatch(addWeapon(foundweapon));
            dispatch(addDelta({ command: "addWeapon", value: foundweapon.Price * warrior.HeadCount }));
        }
    };
    const [equipmentOptions, setEquipmentOptions] = useState<ICombinedEquipment[]>([]);
    useEffect(() => {
        async function fetchEquipment() {
            const DatabaseProviderInstance = await DataBaseProvider.getInstance();
            const equipment = DatabaseProviderInstance.getEquipment(warrior.EquipmentList);
            setEquipmentOptions(equipment.filter((entry) => entry.EquipmentType === type));
        }
        fetchEquipment();
    }, [type, warrior.EquipmentList]);
    const MyDiv = ({ weapon, icon, clickHandler }: { weapon: ICombinedEquipment, icon: IconDefinition, clickHandler: () => void }) =>
        <div className={isDisabledEntry(weapon) ? "control-group disabled" : "control-group"} style={{ justifyContent: "space-around", fontWeight: "bold" }} onClick={clickHandler} >
            <FontAwesomeIcon
                icon={icon}
                style={{ height: "1.5em" }}
                className="" />
            <div style={{ wordBreak: "break-word", width: "65%",fontWeight: "bold" }}>{`${weapon.EquipmentName} (${weapon.Price})`}</div>
        </div>;
    return <React.Fragment>
        <div>{type}</div>
        <div className="control-container">
            {equipmentOptions.map((weapon) => <MyDiv key="dummy-key" weapon={weapon} icon={faPlusCircle} clickHandler={() => onChangeHandler(weapon.EquipmentName)} />)}
        </div>
    </React.Fragment>;

};

export const PurchaseWeapons = () => {
    return <React.Fragment>
        <EquipmentList type="Melee" />
        <EquipmentList type="Ranged" />
        <EquipmentList type="Wargear" />
    </React.Fragment>;
};
