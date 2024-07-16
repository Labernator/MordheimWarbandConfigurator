import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "../redux/store";
import {  WarriorHeadCount } from "../components/render/Warrior";
import { MaintainWarriorSheet, WarbandFunds } from "../components/render/WarriorSheet";
import { MaintainWarriorControls } from "../components/render/DialogHeader";
import { faHammer, faMagicWandSparkles, faKitMedical, faDeleteLeft, faChartBar, faMoneyBill1 } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getWarriorMeleeWeaponOptions, getWarriorRangedWeaponOptions, getWarriorWargearOptions } from "../utilities/unitProvider";
import { IEquipmentType } from "../types/warrior";
import { addWeapon } from "../redux/slices/warriorSlice";
import { addDelta } from "../redux/slices/fundsSlice";
export const MaintainWarriorPage = () => {
    const warband = useAppSelector((state) => state.warband);
    const warrior = useAppSelector((state) => state.warrior);
    return <React.Fragment>
        <div id="new-warbands" className="new-warbands">
            <h2>Maintain Warrior</h2>
            <div className="warband-overview dialog-page">
                <div className="content-container">
                    <WarbandFunds cash={warband.cash} />
                    <MaintainWarriorSheet warrior={warrior} />
                    <WarriorHeadCount />
                    <MaintainControls />
                </div>
                <MaintainWarriorControls />
            </div>
        </div>
    </React.Fragment>;
};

export const MaintainControls = () => {
    const [equipmentSectionVisible, setEquipmentSectionVisible] = useState<boolean>(false);
    return <React.Fragment><h4 style={{ marginTop: "0.2em", marginBottom: "0.5em" }}>Warband Controls</h4>
        <div className="warband-control" onClick={() => setEquipmentSectionVisible(equipmentSectionVisible ? false : true)}><FontAwesomeIcon icon={faHammer} style={{ width: "1.5em" }} /> {equipmentSectionVisible ? `Buy Equipment - Warband warchest gc` : `Buy Equipment`}</div>
        {equipmentSectionVisible ?
            <div className="equipment-section">
                <EquipmentTable type={IEquipmentType.Melee} />
                <EquipmentTable type={IEquipmentType.Ranged} />
                <EquipmentTable type={IEquipmentType.Wargear} />
            </div> : undefined}
        <div className="warband-control" onClick={() => { }}><FontAwesomeIcon icon={faMagicWandSparkles} style={{ width: "1.5em" }} /> Maintain Skills/Magic</div>
        <div className="warband-control" onClick={() => { }}><FontAwesomeIcon icon={faKitMedical} style={{ width: "1.5em" }} /> Add Injury</div>
        <div className="warband-control" onClick={() => { }}><FontAwesomeIcon icon={faDeleteLeft} style={{ width: "1.5em" }} /> Delete Fighter</div>
        <div className="warband-control" onClick={() => { }}><FontAwesomeIcon icon={faChartBar} style={{ width: "1.5em" }} /> Change Stats</div>
    </React.Fragment>
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
                }}
            >
                <td>{weapon.weapon}</td>
                <td style={{ textAlign: "center" }}>{weapon.price}</td>
                <td><FontAwesomeIcon icon={faMoneyBill1} style={{ height: "2em", padding: "0.3em" }} /></td>
            </tr>)}
        </tbody>
    </table>
};
