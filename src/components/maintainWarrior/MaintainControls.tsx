import { faAngleRight, faChartBar, faDeleteLeft, faHammer, faKitMedical, faMagicWandSparkles, faMoneyBill1 } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
import { addDelta, resetDelta } from "../../redux/slices/fundsSlice";
import { setMessage } from "../../redux/slices/messageSlice";
import { addWarrior, removeFunds, setWarbandFaction } from "../../redux/slices/warbandSlice";
import { addWeapon, setWarriorName } from "../../redux/slices/warriorSlice";
import { useAppSelector, useAppDispatch } from "../../redux/store";
import React, { useEffect, useState } from "react";
import { IEquipmentType, IFullEquipment, IWarrior } from "../../types/warrior";
import { getWarriorMeleeWeaponOptions, getWarriorRangedWeaponOptions, getWarriorWargearOptions } from "../../utilities/unitProvider";
import { StatsSection, MaintainWeaponsSection, ShortWargearSection, SkillListsSection, ShortRulesSection } from "../render/UnitCard";
import { HeaderSectionWithEdit } from "../addWarrior/WarriorSheet";
import { IDatabaseWarband } from "../../types/database";
import { getWarbandMetadata } from "../../utilities/dataBaseProvider";

export const SubmitMaintainWarriorButton = () => {
    const warband = useAppSelector((state) => state.warband);
    const warrior = useAppSelector((state) => state.warrior);
    const delta = useAppSelector((state) => state.funds);
    const enabled = warrior.name && warrior.name.length >= 3;
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const submit = () => {
        if (!enabled) {
            return;
        }
        dispatch(setMessage(`${warrior.type} purchased for ${delta} gc`))
        dispatch(addWarrior(warrior));
        dispatch(setWarriorName(""))
        dispatch(removeFunds(delta))
        dispatch(resetDelta())
        navigate("/warband-overview");
    };
    return <div className={`submit-button ${enabled ? "enabled" : "disabled"}`} onClick={submit}>
        <div>
            <div>Purchase selected equipment (${delta})</div>
            <div style={{ fontSize: "0.7em" }}>new Bank account: ${warband.cash - delta}</div>
        </div>
        <FontAwesomeIcon icon={faAngleRight}/>
    </div>
};


export const MaintainControls = () => {
    const [equipmentSectionVisible, setEquipmentSectionVisible] = useState<boolean>(false);
    return <div className="content-container"><h4 style={{ margin: "0.5em"}}>Warband Controls</h4>
        <div className="warband-control" style={{paddingLeft: "0.5em"}} onClick={() => setEquipmentSectionVisible(equipmentSectionVisible ? false : true)}><FontAwesomeIcon icon={faHammer} style={{ width: "1.5em" }} /> {equipmentSectionVisible ? `Buy Equipment - Warband warchest gc` : `Buy Equipment`}</div>
        {equipmentSectionVisible ?
            <div className="equipment-section">
                <EquipmentDropdown type={IEquipmentType.Melee} />
                <EquipmentDropdown type={IEquipmentType.Ranged} />
                <EquipmentDropdown type={IEquipmentType.Wargear} />
            </div> : undefined}
        <div className="warband-control" onClick={() => { }}><FontAwesomeIcon icon={faMagicWandSparkles} style={{ width: "1.5em" }} /> Maintain Skills/Magic</div>
        <div className="warband-control" onClick={() => { }}><FontAwesomeIcon icon={faKitMedical} style={{ width: "1.5em" }} /> Add Injury</div>
        <div className="warband-control" onClick={() => { }}><FontAwesomeIcon icon={faDeleteLeft} style={{ width: "1.5em" }} /> Delete Fighter</div>
        <div className="warband-control" onClick={() => { }}><FontAwesomeIcon icon={faChartBar} style={{ width: "1.5em" }} /> Change Stats</div>
    </div>
};

const EquipmentSelect = () => {

}

export const EquipmentDropdown = ({type} : {type: IEquipmentType}) => {
    const dispatch = useAppDispatch();
    const warrior = useAppSelector((state) => state.warrior);
    const warband = useAppSelector((state) => state.warband);
    const delta = useAppSelector((state) => state.funds);
    const isDisabledEntry = (weapon: IFullEquipment) => {
        if (weapon.price > (warband.cash - delta )) {
            return true;
        }
        const weaponOnWarrior = warrior.weapons?.find((equi) => equi.weapon === weapon.weapon);
        if (weaponOnWarrior) {
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
            dispatch(addDelta(foundweapon.price * warrior.headCount))
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
        {[<option label={type} value={type} disabled={true}/>, ...equipmentOptions.map((item) => <option 
        key={item.weapon} 
        label={`${item.weapon} ($${item.price})`} 
        value={item.weapon}
        disabled= {isDisabledEntry(item)}/>)]}
    </select>
};

const EquipmentTable = ({type} : {type: IEquipmentType}) => {
    const dispatch = useAppDispatch();
    const warrior = useAppSelector((state) => state.warrior);
    const getter = (type: IEquipmentType) => {
        switch (type) {
            case IEquipmentType.Melee:
                return getWarriorMeleeWeaponOptions(warrior);
            case IEquipmentType.Ranged:
                return getWarriorRangedWeaponOptions(warrior);
            case IEquipmentType.Wargear:
                return getWarriorWargearOptions(warrior);
        }
    }
    return <table className="table-striped equipment-section-table">
        <thead>
            <tr>
                <td>{type}</td>
                <td>Cost</td>
                <td>Command</td>
            </tr>
        </thead>
        <tbody>
            {getter(type).map((weapon) => <tr
                onClick={() => {
                    dispatch(addWeapon(weapon));
                    dispatch(addDelta(weapon.price * warrior.headCount))
                    dispatch(setMessage(`${weapon.weapon} was purchased.`))
                }}
            >
                <td>{weapon.weapon}</td>
                <td style={{ textAlign: "center" }}>{weapon.price}</td>
                <td><FontAwesomeIcon icon={faMoneyBill1} style={{ height: "2em", padding: "0.3em" }} /></td>
            </tr>)}
        </tbody>
    </table>
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